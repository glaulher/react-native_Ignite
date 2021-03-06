import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`;

const TitleWrapper = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;

  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  margin-top: 45px;
`;

const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  margin-top: 80px;
  margin-bottom: 67px;
`;

const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export { Container, Header, TitleWrapper, Title, SignInTitle, Footer };
