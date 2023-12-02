import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { format } from 'date-fns';
import { Alert } from 'react-native';

import { api } from '../../services/api';
import { getPlatformDate } from '../../Utils/getPlatformDate';
import { getAccessoryIcon } from '../../Utils/getAccessoryIcon';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
  CalendarIcon,
  Acessories,
  Footer,
  RentalPeriod,
  DateInfo, 
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';


interface RentalPeriod{
  startFormatted: string;
  endFormatted: string;
}
interface Params{
  car: CarDTO;
  dates: string[];
}

export function SchedulingDetails(props) {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  //function navigation back screen
  function handleBack() {
    props.navigation.goBack();
  }  

  async function handleConfirmRental() {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post(`schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    });
    // .then(() => props.navigation.navigate('schedulingComplete'))
    // .catch(() => Alert.alert('Sentimos muito', 'Não foi possivel confirmar o agendamento!'))


    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => props.navigation.navigate('confirmation', {
      title: 'Carro alugado!',
      message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
      nextScreenRoute: 'home'
    }))
    .catch(() => {
      setLoading(false);
      Alert.alert('Sentimos muito', 'Não foi possivel confirmar o agendamento!');
    });
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),      
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />          
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos} 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        
        <Acessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)} 
              />
            ))
          }        
        </Acessories>

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
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.shape}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title='Alugar agora' 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}