import React, { useState } from 'react';
import { Container, InputText, IconContainer } from './styles';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function Input({iconName, value, ...rest} : Props) {
    const theme = useTheme();
    const [isFocoused, setIsFocoused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocoused(true);
    }

    function handleInputBlur() {
        setIsFocoused(false);
        setIsFilled(!!value);
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
                {...rest}
             />
        </Container>
    );
}