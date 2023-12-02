import {useState, useEffect} from 'react';
import { Container, Header, Steps, Title, SubTitle, Form, FormeTitle } from './styles';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { useTheme } from 'styled-components';
import { 
  Keyboard,
  Alert
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { api } from '../../../services/api';

interface Params{
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep(props) {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const theme = useTheme();
  const route = useRoute()

  const { user } = route.params as Params;

  function handleBack() {
    props.navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm){
      return Alert.alert('Ops','Informe a senha e a confirmção.');
    }
    if(password != passwordConfirm){
      return Alert.alert('Ops','As senhas são iguais');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      props.navigation.navigate('confirmation', {
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreenRoute: 'signin'
      })
    })
    .catch(() => {
      Alert.alert('Opa', 'Não foi possível cadastrar')
    });
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
          <Bullet />
          <Bullet active />
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
          2. Senha 
        </FormeTitle>
        <PasswordInput
          iconName='lock'
          placeholder='Senha'
          onChangeText={setPassword}
          value={password}
        />
        <PasswordInput
          iconName='lock'
          placeholder='Repetir senha'
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
        />
      </Form>

      <Button 
        title='Cadastrar'
        color={theme.colors.success}
        onPress={handleRegister}
      />

    </Container>
  );
}