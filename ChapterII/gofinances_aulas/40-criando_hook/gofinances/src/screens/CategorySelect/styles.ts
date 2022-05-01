import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryProps {
  isActive: boolean;
}

const Container = styled(GestureHandlerRootView)`
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

const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

const Separator = styled.View`
  background-color: ${({ theme }) => theme.colors.text};

  width: 100%;
  height: 1px;
`;
const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;

export { Container, Header, Title, Category, Icon, Name, Separator, Footer };
