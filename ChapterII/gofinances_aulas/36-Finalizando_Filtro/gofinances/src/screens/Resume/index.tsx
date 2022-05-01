/* eslint-disable import/no-duplicates */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  color: string;
  x: string;
  y: number;
}

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(new Date(selectedDate), 1));
    } else {
      setSelectedDate(subMonths(new Date(selectedDate), 1));
    }
  }

  async function loadData() {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount);
      },
      0,
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0,
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          totalFormatted,
          x: percent,
          y: categorySum,
        });
      }
    });
    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM,yyyy', { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(15),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={120}
          />
        </ChartContainer>
        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            color={item.color}
            title={item.name}
            amount={item.totalFormatted}
          />
        ))}
      </Content>
    </Container>
  );
}
