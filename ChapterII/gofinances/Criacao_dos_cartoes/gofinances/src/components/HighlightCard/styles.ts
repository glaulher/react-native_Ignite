import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};

  width: ${RFValue(300)}px;

  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
`;
const Header = styled.View``;
const Title = styled.Text``;
const Icon = styled(Feather)``;
const Footer = styled.View``;
const Amount = styled.Text``;
const LastTransactional = styled.Text``;

export { Container, Header, Title, Icon, Footer, Amount, LastTransactional };
