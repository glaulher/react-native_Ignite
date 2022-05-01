import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

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
  lastTransaction: string;
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

  const { signOut, user } = useAuth();

  const getLastTransactionDate = (
    collection: DataListProps[],
    type: 'positive' | 'negative',
  ) => {
    const collectionFiltered = collection.filter(
      transaction => transaction.type === type,
    );

    if (collectionFiltered.length === 0) return null;

    /* Math.max.apply(....)retorna a maior transação em numero */
    const lastTransaction = new Date(
      // eslint-disable-next-line prefer-spread
      Math.max.apply(
        Math,
        collectionFiltered.map(transaction =>
          new Date(transaction.date).getTime(),
        ),
      ),
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long' },
    )}`;
  };

  async function loadTransaction() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);

    const transactionGetItem = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactionGetItem.map(
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

    const lastTransactionEntries = getLastTransactionDate(
      transactionGetItem,
      'positive',
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactionGetItem,
      'negative',
    );

    const totalInterval = () => {
      if (lastTransactionEntries === null) {
        const totalTransactions = lastTransactionExpensives;
        return totalTransactions;
      }
      if (lastTransactionExpensives === null) {
        const totalTransactions = lastTransactionEntries;
        return totalTransactions;
      }
      const totalTransactions =
        lastTransactionExpensives > lastTransactionEntries
          ? lastTransactionExpensives
          : lastTransactionEntries;
      return totalTransactions;
    };

    const total = entriesTotal - expensivesTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTransactionEntries === null
            ? 'Não há transações'
            : `Ultima entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensivesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTransactionExpensives === null
            ? 'Não há transações'
            : `Ultima saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          totalInterval() === null
            ? 'Não há transações'
            : `01 a ${totalInterval()}`,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButtom onPress={signOut}>
                <Icon name="power" />
              </LogoutButtom>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />

            <HighlightCard
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
              type="down"
            />

            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
