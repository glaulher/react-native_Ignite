import React, { useState } from 'react';
import { Container, InputText, IconContainer} from './styles';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({iconName, value, ...rest} : Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocoused, setIsFocoused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const theme = useTheme(); 

    function handleInputFocus() {
        setIsFocoused(true);
    }

    function handleInputBlur() {
        setIsFocoused(false);
        setIsFilled(!!value);
    }

    function handlePasswordVisibilityChange(){
        setIsPasswordVisible(preveState => !preveState);
    }

    return (
        <Container isFocused={isFocoused}>
            <IconContainer>
                <Feather 
                    name={iconName}
                    size={24}
                    color={(isFocoused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>
            <InputText 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}                
                secureTextEntry={isPasswordVisible}
                autoCorrect={false} 
                {...rest} 
            />
            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconContainer>
                    <Feather 
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}