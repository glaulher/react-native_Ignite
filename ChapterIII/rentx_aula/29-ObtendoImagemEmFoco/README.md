<p align="center" >
  <img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="100" />
</p>

<h1 align="center"> 
  🚀Obtendo Imagem Em Foco🚀
</h1>

<p align="center" >
  <img alt="Repository size" src="https://img.shields.io/badge/Mobile-react--native-blue?style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/npm/types/typescript?style=for-the-badge">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/glaulher/react-native_Ignite?style=for-the-badge">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" />
</p>

---

## 📋 Sobre

<img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="22" /> Obtendo Imagem Em Foco, Chapter 03, Ignite (Rocketseat) - React Native.

---

## 📂 Como rodar este projeto

Para clonar e executar este aplicativo, você precisará de [Git](https://git-scm.com), [NodeJs](https://nodejs.org/en/) e [Android Studio](https://developer.android.com/studio) Instalado em seu computador.

### 🌀 Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/glaulher/react-native_Ignite.git

# Acesse a pasta do projeto no terminal/cmd
$ cd react-native_Ignite/ChapterIII/rentx_aula/29-ObtendoImagemEmFoco/rentx/
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

```
---
✔️ Notas:

- Para as animações é necessário editar o babel.config.js e adicionar o plugin.

exemplo:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};

```

Usando useRef, é possível acessar diretamente um elemento dentro da árvore de elementos através da referência dele.

```javascript
export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });
  
return (
    <Container>
      ...
      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );

```
Método para mostrar 2 itens ao mesmo tempo no slide:

```javascript
const [imageIndex, setImageIndex] = useState([0, 1]);

const indexChanged = useRef((info: ChangeImageProps) => {
  if (info.changed[0].isViewable) {
    setImageIndex(data => {
      const imageIndexDraft = data.map(item => item);
      imageIndexDraft.push(info.changed[0].index!)

      return imageIndexDraft;
    });
  } else {
    setImageIndex(data => {
      const imageIndexDraft = data.filter(item => item !== info.changed[0].index!);

      return imageIndexDraft;
    });
  }
})
<SliderBullet
  key={item.id}
  isFirst={index === 0}
  active={imageIndex.includes(index)}
/>
export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width/2}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: 100%;
  height: 132px;
`;
```


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