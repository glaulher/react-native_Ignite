import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  LogoutButtom,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const [transactions, setTransactions] = useState<DataListProps[]>([]);

  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData,
  );

  const theme = useTheme();

  async function loadTransaction() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const transaction = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormatted: DataListProps[] = transaction.map(
      (item: DataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensivesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      },
    );

    setTransactions(transactionsFormatted);

    const total = entriesTotal - expensivesTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      expensives: {
        amount: expensivesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/53663328?v=4',
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Glaulher</UserName>
                </User>
              </UserInfo>
              <LogoutButtom
                onPress={() => {
                  // eslint-disable-next-line no-console
                  console.log('ok');
                }}
              >
                <Icon name="power" />
              </LogoutButtom>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransactional="Última entrada dia 13 de abril"
              type="up"
            />

            <HighlightCard
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransactional="Última saída dia 03 de abril"
              type="down"
            />

            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransactional="01 à de abril"
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
