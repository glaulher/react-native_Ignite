import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { format } from 'date-fns';
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
export function SchedulingDetails() {
  const theme = useTheme();

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );

  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setLoading(true);

    await api
      .post('rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() =>
        navigation.navigate('Confirmation', {
          nextScreenRoute: 'Home',
          title: 'Carro alugado!',
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        }),
      )
      .catch(() => {
        Alert.alert('Não foi possível confirmar o agendamento');
        setLoading(false);
      });
  }

  function handleBack() {
    navigation.goBack();
  }
  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),

      endFormatted: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }
    if (netInfo.isConnected === true) fetchCarUpdated();
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton
          color=""
          onPress={() => {
            handleBack();
          }}
        />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand} </Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{car.price}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted} </DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted} </DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.price} x ${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={() => handleConfirmRental()}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
