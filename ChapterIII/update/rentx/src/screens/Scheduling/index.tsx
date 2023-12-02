// native imports
import { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { StatusBar, Dimensions, Alert } from 'react-native';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';

// components
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { getPlatformDate } from '../../Utils/getPlatformDate';
import { 
  Calendar, 
  DayProps, 
  generateInterval,
  MarkedDatesProps
} from '../../components/Calendar';
//icons
import ArrowSvg from '../../assets/arrow.svg';
//styles imports
import { 
  Container, 
  Header, 
  Title, 
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';




//Types import
interface RentalPeriod{
  startFormatted: string;
  endFormatted: string;
}

import { CarDTO } from '../../dtos/CarDTO';

interface Params{
  car: CarDTO;
}

export function Scheduling(props) {
  //useStates
  const [lastSelectedDate, setLastSelectedDate ] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates ] = useState<MarkedDatesProps>({} as MarkedDatesProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  //Theme
  const theme = useTheme();
  //Get height window
  const { height } = Dimensions.get('window');

  const route = useRoute();
  const { car } = route.params as Params;

  //function navigation next screen
  function handleConfirmRental() {   
      props.navigation.navigate('schedulingDetails', {
        car, 
        dates: Object.keys(markedDates)
      });    
  }
  //function navigation back screen
  function handleBack() {
    props.navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    
    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }    

    setLastSelectedDate(end);
    const interval = generateInterval(start, end)
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({      
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),      
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    });
  }

  return (
    <Container>
        <Header Dimensions={height}>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor='transparent'
          />
          <BackButton 
            onPress={handleBack}
            color={theme.colors.shape}
          />
          <Title>
            Escolha uma {'\n'}
            data de início e {'\n'}
            fim do aluguel
          </Title>
          <RentalPeriod>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={!!rentalPeriod.startFormatted}>
                {rentalPeriod.startFormatted}
              </DateValue>
            </DateInfo>

            <ArrowSvg />

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={!!rentalPeriod.endFormatted}>
                {rentalPeriod.endFormatted}
              </DateValue>
            </DateInfo>
          </RentalPeriod>
        </Header>
        
        <Content>
          <Calendar 
            markedDates={markedDates}
            onDayPress={handleChangeDate}
          />
        </Content>

        <Footer>
          <Button 
            title='Confirmar' 
            onPress={handleConfirmRental}
            disabled={!rentalPeriod.endFormatted}
          />
        </Footer>

    </Container>
  );
}