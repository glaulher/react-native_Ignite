import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

interface FormaData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),

  amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório'),
});

export function Register() {
  const dataKey = '@gofinances:transactions';

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  // function handleOpenSelectionCategoryModal(type: boolean) {
  //   setCategoryModalOpen(type);
  // }

  // function handleCloseSelectionCategoryModal() {
  //   setCategoryModalOpen(false);
  // }

  function handleSelectionCategoryModal(type: boolean) {
    setCategoryModalOpen(type);
  }
  async function handleRegister(form: FormaData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }
    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }
    const newTransaction = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      return data;
    } catch (error) {
      return Alert.alert('Não foi possível cadastrar');
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
      console.log(data ? JSON.parse(data) : []);
    }
    loadData();

    // async function deleteItems() {
    //   await AsyncStorage.removeItem(dataKey);
    // }
    // deleteItems();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={() => handleSelectionCategoryModal(true)}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => handleSelectionCategoryModal(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
