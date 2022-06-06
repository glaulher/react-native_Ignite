<p align="center" >
  <img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="100" />
</p>

<h1 align="center"> 
  🚀SignOut🚀
</h1>

<p align="center" >
  <img alt="Repository size" src="https://img.shields.io/badge/Mobile-react--native-blue?style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/npm/types/typescript?style=for-the-badge">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/glaulher/react-native_Ignite?style=for-the-badge">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" />
</p>

---

## 📋 Sobre

<img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="22" /> SignOut, Chapter 04, Ignite (Rocketseat) - React Native.

---

## 📂 Como rodar este projeto

Para clonar e executar este aplicativo, você precisará de [Git](https://git-scm.com), [NodeJs](https://nodejs.org/en/) e [Android Studio](https://developer.android.com/studio) Instalado em seu computador.

### 🌀 Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/glaulher/react-native_Ignite.git

# Acesse a pasta do projeto no terminal/cmd
$ cd react-native_Ignite/ChapterIV/rentx_aula/25-SignOut/rentx/
```

### 🎲 Rodando a Aplicação

```bash
# Instale as dependências
$ yarn install ou npm install

# Execute o expo
$ expo start
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

# para o react-native possa suportar o svg:
$ expo install react-native-svg

# Para o react native usar o svg como componente:
$ yarn add -D react-native-svg-transformer

# Biblioteca pra lidar melhor com proporções:
$ yarn add react-native-responsive-fontsize 

# Biblioteca para botões como BorderlessButton
$ expo install react-native-gesture-handler

# Lida com as animações nos Botões VER NOTAS
$ expo install react-native-reanimated 

# Lida com detalhes sobre o design da tela do iphone, dando o espaçamento correto.
$ yarn add react-native-iphone-x-helper 

# Adiciona o calendário ao projeto.
$ yarn add react-native-calendars 

# Corrige os tipos para a biblioteca calendars
$ yarn add @types/react-native-calendars -D

# Bilbioteca para nevegação
$ yarn add @react-navigation/native

# Complementos para navegação
$ expo install react-native-screens react-native-safe-area-context

# Simula uma api
$ npm install -g json-server

# Para lidar com requisições feitas para a api:
$ yarn add axios

# biblioteca para lidar com datas:
$ yarn add date-fns

# Biblioteca para tela de splash screen
$ expo install expo-splash-screen

# Biblioteca para utilizarmos loads com imagens animadas.
$ expo install lottie-react-native

# Biblioteca para utilizarmos nas validações dos formulários.
$ yarn add yup

# Biblioteca para tab navigation
yarn add @react-navigation/bottom-tabs

# Biblioteca para iserir o banco watermelondb
$ yarn add @nozbe/watermelondb

# Biblioteca para decorators
$ yarn add --dev @babel/plugin-proposal-decorators

# Biblioteca para selecionar fotos no dispositivo
$ expo install expo-image-picker

```

✔️ Notas:

Ao entrar no index do componente Input e PasswordInput o <InputText> ficou acusando o erro Types of property 'accessibilityRole' are incompatible.

Eu havia tirado o erro, modificando a interface conforme abaixo nos index dos component Input e PasswordInput:

```javascript

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
  accessibilityRole?: undefined;
}
```
Fui informado, que isso ocorre por conta de incompatibilidade entre a tipagem que o Styled Components gera e a que o TextInput espera. O correto é alterar o formato:

```javascript
export const InputText = styled.TextInput<Props>``;
```

Para:

```javascript
import { TextInput } from 'react-native';

export const InputText = styled(TextInput)<Props>``;
```

Fazendo essas alterações, funcionou corretamente.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org)

---


## 🧑 Autor

<img style="border-radius: 75px;" src="https://glaulher.github.io/assets/img/sample/avatar.jpeg" width="150px;" alt=""/>
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