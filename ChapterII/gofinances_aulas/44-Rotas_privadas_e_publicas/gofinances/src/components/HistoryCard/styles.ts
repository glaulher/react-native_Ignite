import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
  color: string;
}

const Container = styled.View<ContainerProps>`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;

  padding: 13px 24px;
  margin-bottom: 8px;

  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;

export { Container, Title, Amount };
