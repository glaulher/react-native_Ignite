import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.header};
  padding-top: ${getStatusBarHeight() + 96}px;
`;

export const Content = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  margin-top: 40px;
`;

export const Message = styled.Text`
  color: ${({theme}) => theme.colors.text_detail};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  text-align: center;
  margin-top: 16px;
  line-height: ${RFValue(25)}px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin: 80px 0;
`;