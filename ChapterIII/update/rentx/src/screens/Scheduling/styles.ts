import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';
interface DateValueProps{
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_secondary};
`;

interface HeightProps{
  Dimensions: number;
}

export const Header = styled.View<HeightProps>`
  width: 100%;
  height: ${({ Dimensions }) => Dimensions*0.46}px;
  background-color: ${({theme}) => theme.colors.header};
  justify-content: center;
  padding: ${RFValue(25)}px;
  padding-top: ${getStatusBarHeight() + RFValue(30)}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(34)}px;
  margin-top: ${RFValue(24)}px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${RFValue(32)}px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;
export const DateValue = styled.Text<DateValueProps>`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(13.5)}px;

  ${({selected, theme}) => !selected && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.text};
    padding-bottom: ${RFValue(5)}px;
  `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle:{
    paddingBottom: 24
  },
  showVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  width: 100%;  
  background-color: ${({theme}) => theme.colors.background_secondary};
  padding: ${RFValue(24)}px ${RFValue(24)}px ${getBottomSpace() + RFValue(24)}px;
`


