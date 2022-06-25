import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import api from '../../services/api';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Car as ModelCar } from '../../database/model/Car';
import { CarDTO } from '../../dtos/CarDTO';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const synchronizing = useRef(false);

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  async function offLineSyncnchronize() {
    await synchronize({
      // o banco a ser sincronizado
      database,
      // busca as informações no backend
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
        );
        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      // sobe para o backend as atualizações na sincronização
      pushChanges: async ({ changes }) => {
        const user = changes.users;

        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        //  const response = await api.get('/cars');
        const carCollection = database.get<ModelCar>('cars');
        const carsCollection = await carCollection.query().fetch();

        if (isMounted) setCars(carsCollection);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   if (netInfo.isConnected) {
  //     Alert.alert('On-line');
  //   } else {
  //     Alert.alert('Off-line');
  //   }
  // }, [netInfo.isConnected]);

  useEffect(() => {
    if (netInfo.isConnected && !synchronizing.current) {
      synchronizing.current = true;
      offLineSyncnchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
