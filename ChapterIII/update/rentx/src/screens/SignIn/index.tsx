import { useState, useEffect } from 'react';
import { 
  StatusBar, 
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import * as Yup from 'yup';
import { useAuth } from "../../hooks/auth";

import { 
  Container, 
  Header, 
  Title, 
  SubTitle, 
  Footer, 
  Form 
} from './styles';

export function SignIn(props:any) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const { signIn } = useAuth();

  async function handleSignIn() {    
    try {
      const schema = Yup.object().shape({
        email: 
          Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        password: 
          Yup.string()
            .required('A senha é obrigatória')
      });
  
      await schema.validate({email, password})
      signIn({email, password});
    }catch(error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message)
      }else{
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer o login, verifique as credenciais')
      }
    }
  }

  function handleNewAccount() {
    props.navigation.navigate('signupfirststep')
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
    <KeyboardAvoidingView
      behavior='position'
      enabled
    > 
      <Container>
        <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
        <Header>
          {
            !keyboardStatus ?
              <Title>
                Estamos{'\n'}quase lá.
              </Title>:
            <Title>              
              {'\n'}
            </Title>
          }
          <SubTitle>
            Faça seu login para começar{'\n'}
            uma experiência incrível.
          </SubTitle>
        </Header>
        <Form>
          <Input 
            iconName="mail"
            placeholder='E-mail'
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={setEmail}
            value={email}
          />       
          
          <PasswordInput 
            iconName="lock"
            placeholder='Senha'    
            onChangeText={setPassword}
            value={password}            
          />       
          

        </Form>
        <Footer>
          <Button
            title='Login'
            onPress={handleSignIn}
            enabled={true}
            loading={false}
          />
          <Button
            title='Criar conta gratuita'
            color={theme.colors.background_secondary}
            light={true}
            onPress={handleNewAccount}          
            loading={false}
          />
        </Footer>

      </Container>
    </KeyboardAvoidingView>
  );
}