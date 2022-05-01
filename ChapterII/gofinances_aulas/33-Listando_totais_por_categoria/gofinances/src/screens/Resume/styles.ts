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
const Content = styled.ScrollView.attrs({
  contentContainerStyle: { flex: 1, padding: 24 },
})``;

export { Container, Header, Title, Content };
