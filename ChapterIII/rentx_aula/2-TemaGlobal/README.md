<p align="center" >
  <img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="100" />
</p>

<h1 align="center"> 
  🚀 Tema Global e Instalação das Fontes🚀
</h1>

<p align="center" >
  <img alt="Repository size" src="https://img.shields.io/badge/Mobile-react--native-blue?style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/npm/types/typescript?style=for-the-badge">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/glaulher/react-native_Ignite?style=for-the-badge">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" />
</p>

---

## 📋 Sobre

<img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="22" /> Aula Criação do Projeto e Dica Ninja , Chapter 03, Ignite (Rocketseat) - React Native.

---

## 📂 Como rodar este projeto

Para clonar e executar este aplicativo, você precisará de [Git](https://git-scm.com), [NodeJs](https://nodejs.org/en/) e [Android Studio](https://developer.android.com/studio) Instalado em seu computador.

### 🌀 Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/glaulher/react-native_Ignite.git

# Acesse a pasta do projeto no terminal/cmd
$ cd react-native_Ignite/ChapterIII/rentx_aula/2-TemaGlobal/rentx/
```

### ⏬ Ou instalando pacotes e criando o Projeto

```bash
$ expo init rentx  

$ cd rentx  

$ yarn add styled-components

$ yarn add @types/styled-components-react-native -D 

# Para instalar as fontes no projeto.
$ expo install expo-font @expo-google-fonts/inter @expo-google-fonts/archivo

# Para que  projeto espere o carregamento das fontes,
# para só depois disso, poder carregar a tela.
$ expo install expo-app-loading

```
### 🎲 Rodando a Aplicação

```bash
# Instale as dependências
$ yarn install ou npm install

# Execute a Aplicação em Desenvolvimento

# Se está utilizando o emulador, rode
$ yarn start

# Se está utilizando o aparelho físico, rode
$ yarn web
```

---
✔️ Notas:

Para instalar as fontes foi seguido a documentação:
- [expo fonts](https://docs.expo.dev/guides/using-custom-fonts/)

Foi inserida as alterações no arquivo App.tsx,
centralizando assim as modificações.

Para o tema global foi criada uma pasta styles e 2 arquivos dentro dela:

styled.d.ts:

OBS - Com a criação desse arquivo, o styled-components reconhece os tipos em theme.ts.

```javascript
import 'styled-components';

import theme from './theme';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}

```

theme.ts


```javascript
export default {
  colors: {
    header: '#1B1B1F',

    background_primary: '#F4F5F6',
    background_secundary: '#FFFFFF',

    text: '#7A7A80',
    text_detail: '#AEAEB3',
    title: '#47474D',

    line: '#EBEBF0',

    main: '#DC1637',
    main_light: '#FDEDEF',
    success: '#03B252',

    shape: '#E1E1E8',
    shape_dark: '#29292E',
  },

  fonts: {
    primary_400: 'Inter_400Regular',
    primary_500: 'Inter_500Medium',

    secundary_400: 'Archivo_400Regular',
    secundary_500: 'Archivo_500Medium',
    secundary_600: 'Archivo_600SemiBold',
  },
};

```

Em App.tsx foi importado o theme e adicionando em ThemeProvider envolvendo o component conforme abaixo:

```javascript
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';

import { Home } from './src/screens/Home';
import theme from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });
  if (!fontsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

```


## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org)

---


## 🧑 Autor

<img style="border-radius: 80px;" src="https://glaulher.github.io/assets/img/sample/avatar.jpeg" width="150px;" alt=""/>
 <h4>Glaulher Medeiros</h4>

<p align="left">
<span style="inline-block;">
  <a href="https://www.linkedin.com/in/glaulher-medeiros-03799967/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" ></a>
</span>
<span style="inline-block;">
  <a href="https://glaulher.github.io/" target="_blank"><img src="https://img.shields.io/badge/github.io-gray?style=for-the-badge&logo=github&logoColor=white" ></a>
</span>

<span style="inline-block;">
  <a href="https://terminaldopenguin.blogspot.com/" target="_blank"><img src="https://img.shields.io/badge/blog-orange?style=for-the-badge&logo=blogger&logoColor=white"></a>
</span>
</p>

---

## 📝 Licença

Este projeto esta sobe a licença MIT. Veja a [LICENÇA](https://github.com/glaulher/react-native_Ignite/blob/main/LICENSE) para saber mais.
<br>