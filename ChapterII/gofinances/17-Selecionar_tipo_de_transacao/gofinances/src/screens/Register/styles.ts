import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

const Form = styled.View`
  flex: 1;
  justify-content: space-between;

  width: 100%;

  padding: 24px;
`;
const Fields = styled.View``;

const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export { Container, Header, Title, Form, Fields, TransactionsTypes };
