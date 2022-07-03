import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { useTheme } from 'styled-components';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import api from '../../services/api';

import { Car as ModelCar } from '../../database/model/Car';

import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';
import { getPlatformDate } from '../../utils/getPlatformDate';

import {
  Container,
  Header,
  ButtonWrapper,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarList,
  CarWapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { Car } from '../../components/Car';

interface DataProps {
  id: string;
  start_date: string;
  end_date: string;
  car: ModelCar;
}

export function MyCars() {
  const theme = useTheme();

  const screenIsFocus = useIsFocused();

  const navigation = useNavigation();

  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('rentals');

        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,

            start_date: format(
              getPlatformDate(parseISO(data.start_date)),
              'dd/MM/yyyy',
            ),
            end_date: format(
              getPlatformDate(parseISO(data.end_date)),
              'dd/MM/yyyy',
            ),
          };
        });

        setCars(dataFormatted);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocus]);

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

        <Title>Seus agendamentos, {'\n'} estão aqui.</Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CarWapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
