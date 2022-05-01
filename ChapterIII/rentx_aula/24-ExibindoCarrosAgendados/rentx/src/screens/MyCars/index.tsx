import React, { useEffect, useState } from 'react';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';

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
} from './styles';
import { Car } from '../../components/Car';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars() {
  const theme = useTheme();

  const navigation = useNavigation();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('schedules_byuser?user_id=1');

        setCars(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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
            <AppointmentsQuantity>05</AppointmentsQuantity>
          </Appointments>

          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item.car} />}
          />
        </Content>
      )}
    </Container>
  );
}
