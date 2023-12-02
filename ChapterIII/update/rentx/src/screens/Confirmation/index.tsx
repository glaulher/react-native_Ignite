import { StatusBar, useWindowDimensions } from 'react-native'
import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';
import { useRoute } from '@react-navigation/native';

interface Params{
    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation(props) {
    const { width } = useWindowDimensions();
    const route = useRoute();

    const {title, message, nextScreenRoute} = route.params as Params;

    function handleCompleteRental() {
        props.navigation.navigate(nextScreenRoute);    
    }

    return (
    <Container>
         <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor='transparent'
          />
        <LogoSvg
            width={width}            
        />

        <Content>
            <DoneSvg 
                width={80}
                height={80}
            />
            <Title>{title}</Title>
            <Message>
                {message}
            </Message>
            <Footer>
                <ConfirmButton 
                    title='OK'
                    onPress={handleCompleteRental}
                />
            </Footer>
        </Content>
    </Container>
  );
}