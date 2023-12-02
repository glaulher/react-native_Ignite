import { useEffect, useState } from 'react';
import { StatusBar, Dimensions, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
import { 
  Container,
  Header, 
  Title, 
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps{
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(props) {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    fetchCars();
  });

  //Theme
  const theme = useTheme();
  //Get height window
  const { height } = Dimensions.get('window');

  //function navigation back screen
  function handleBack() {
    props.navigation.goBack();
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
            Seus agendamentos, {'\n'}
            estão aqui.
          </Title>
          <SubTitle>
            Conforto, segurança e praticidade.
          </SubTitle>
          
        </Header>

        { loading ? <LoadAnimation /> : 
          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

              <FlatList 
                data={cars}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <CarWapper>
                    <Car
                      data={item.car}
                    />
                    <CarFooter>
                      <CarFooterTitle>Periodo</CarFooterTitle>
                      <CarFooterPeriod>
                        <CarFooterDate>{item.startDate}</CarFooterDate>
                        <AntDesign 
                          name="arrowright"
                          size={20}
                          color={theme.colors.title} 
                          style={{marginHorizontal: 10}}
                        />
                        <CarFooterDate>{item.endDate}</CarFooterDate>
                      </CarFooterPeriod>
                    </CarFooter>
                  </CarWapper>
                )}
              />
          
          </Content>
        }
    </Container>
  );
}