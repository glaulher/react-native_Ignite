import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};

  width: ${RFValue(300)}px;

  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;

  margin-right: 16px;
  height: 300px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

const Icon = styled(Feather)`
  font-size: ${RFValue(40)}px;
`;

const Footer = styled.View``;

const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.text_dark};

  margin-top: 30px;
`;

const LastTransactional = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export { Container, Header, Title, Icon, Footer, Amount, LastTransactional };
