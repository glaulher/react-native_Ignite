import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
  ButtonWrapper,
} from './styles';

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );

  const theme = useTheme();

  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails');
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);

    setMarkedDates(interval);
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <ButtonWrapper>
          <BackButton color={theme.colors.shape} onPress={() => handleBack()} />
        </ButtonWrapper>
        <Title>
          Escolha uma {'\n'} data de início e {'\n'} fim de aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/06/2022</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2022</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={date => handleChangeDate(date)}
        />
      </Content>

      <Footer>
        <Button
          color=""
          title="Confirmar"
          onPress={() => handleConfirmRental()}
        />
      </Footer>
    </Container>
  );
}
