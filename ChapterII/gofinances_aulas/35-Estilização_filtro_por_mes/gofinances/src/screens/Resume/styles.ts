import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

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
const Content = styled.ScrollView``;

const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const MonthSelect = styled.View`
  width: 100%;

  justify-content: space-between;
  align-items: center;

  flex-direction: row;

  margin-top: 24px;
`;

const MonthSelectButton = styled(BorderlessButton)``;

const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
};
