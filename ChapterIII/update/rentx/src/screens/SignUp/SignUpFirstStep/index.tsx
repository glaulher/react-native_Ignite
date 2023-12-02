import {useState, useEffect} from 'react';
import { Keyboard, Alert } from 'react-native';
import { Container, Header, Steps, Title, SubTitle, Form, FormeTitle } from './styles';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function SignUpFirstStep(props) {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  function handleBack() {
    props.navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatório'),
        email: Yup.string()
        .required('Email é obrigatório')
        .email('Digite um e-mail válido'),        
        name: Yup.string()
        .required('Nome é obrigatório')
      });

      const data = {name, email, driverLicense}
      await schema.validate(data);

      props.navigation.navigate('signupsecondstep', {user: data});
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message)
      }
    }
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
        <Steps>
          <Bullet active />
          <Bullet />
        </Steps>
      </Header>
      {
        !keyboardStatus &&
        <>
          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>
        </>
      }

      <Form>
        <FormeTitle>
          1. Dados 
        </FormeTitle>
        <Input
          iconName='user'
          placeholder='Nome'
          onChangeText={setName}
          value={name}
        />
        <Input
          iconName='mail'
          placeholder='E-mail'
          keyboardType='email-address'
          onChangeText={setEmail}
          value={email}
        />
        <Input
          iconName='credit-card'
          placeholder='CNH'
          keyboardType='numeric'
          onChangeText={setDriverLicense}
          value={driverLicense}
        />
      </Form>

      <Button 
        title='Próximo'
        onPress={handleNextStep}
      />

    </Container>
  );
}