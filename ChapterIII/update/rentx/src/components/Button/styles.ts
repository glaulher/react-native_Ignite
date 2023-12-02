import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
interface ButtonProps{
  color: string;
}

interface ButtonTextProps {
  light: boolean;
}


export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 19px;

  background-color: ${({ color }) => color };
  margin-bottom: 8px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;