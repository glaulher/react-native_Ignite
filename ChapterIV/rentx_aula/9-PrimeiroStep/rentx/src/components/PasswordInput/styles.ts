import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View``;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secundary};
`;

export const InputText = styled.TextInput`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secundary};
  color: ${({ theme }) => theme.colors.text};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;
`;
export const ContainerWrapper = styled.View`
  flex-direction: row;
`;
export const Line = styled.View<ContainerProps>`
  width: 100%;
  height: 2px;
  position: absolute;
  margin-top: ${RFPercentage(7)}px;

  background-color: transparent;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      background-color: ${theme.colors.main};
    `}
`;
