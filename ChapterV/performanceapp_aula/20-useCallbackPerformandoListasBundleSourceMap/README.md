<p align="center" >
  <img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="100" />
</p>

<h1 align="center"> 
  🚀useCallback Performando Listas Bundle SourceMap🚀
</h1>

<p align="center" >
  <img alt="Repository size" src="https://img.shields.io/badge/Mobile-react--native-blue?style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/npm/types/typescript?style=for-the-badge">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/glaulher/react-native_Ignite?style=for-the-badge">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" />
</p>

---

## 📋 Sobre

<img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="22" /> useCallback Performando Listas Bundle SourceMap, Chapter 05, Ignite (Rocketseat) - React Native.

---

## 📂 Como rodar este projeto

Para clonar e executar este aplicativo, você precisará de [Git](https://git-scm.com), [NodeJs](https://nodejs.org/en/) e [Android Studio](https://developer.android.com/studio) Instalado em seu computador.

### 🌀 Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/glaulher/react-native_Ignite.git

# Acesse a pasta do projeto no terminal/cmd
$ cd react-native_Ignite/ChapterV/performanceapp_aula/20-useCallbackPerformandoListasBundleSourceMap/performanceapp

```

### 🎲 Rodando a Aplicação

```bash
# Instale as dependências
$ yarn install ou npm install

# Execute o projeto
$ yarn start
```

### ⏬ Pacotes para o App

```bash
$ expo init performanceapp  

$ yarn add json-server -D

$ npm install -g react-devtools

$ yarn add lodash

// biblioteca para testar o react-native-bundle-visualizer
$ yarn add -D @types/lodash 

$ yarn add --dev react-native-bundle-visualizer

```

✔️ Notas:

Otimizações no react-native:

- memo é para componentes que retornam dados puro, componentes mais simples.
</br>
Ex.

```javascript
import React, { memo } from 'react';
...

function FriendComponent({ data }: Props) {
  return (
    <Text>
      {data.name} - Likes: {data.likes}
    </Text>
  );
}

export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
});

```

- useMemo é para componentes que realizam calculos complexos, não deve ser usado e componentes simples.
</br>
Ex.

```javascript
import React, { useMemo } from 'react';
...

export function FriendLit({ data }: Props) {
  const totalLikes = useMemo(() => {
    /*
    return data.reduce(( acumulador, item_pecorrido => {
      return acumulador + item_pecorrido;
    }, valor_em_que_o_acumulador_inicia);
       */
    return data.reduce((likes, friend) => {
      return likes + friend.likes;
    }, 0);
  }, [data]);

 ...
}

```
 - Prop drilling é um estágio do desenvolvimento que acontece quando precisamos obter dados que estão em várias camadas na árvore de componente react. Pai => Filho(Pai) => Filho(Pai) => Filho etc. 

 Em casos de Prop drilling, podemos usar o useCallback evitando render desnecessários. O useCallback vai garantir que o endereço alocado na memória pela função não mude.

Ex.
```javascript
 const handleFollow = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('follow user');
  }, []);

```
Devemos evitar a realização de cálculos dentro do jsx(na estrutura da interface), temos que tratar os dados em seu carregamento.

Ex. formatando data no momento em que se obtem os dados e não dentro do jsx.
```javascript
 const handleSearch = async () => {
    const response = await fetch(`http://192.168.1.109:3333/friends?q=${name}`);
    const data = await response.json();

    const formattedData = data.map((item: Data) => {
      return {
        id: item.id,
        name: item.name,
        likes: item.likes,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
    });

    setFriends(formattedData);
  };


```
- Evitar o uso de index e item no map para utilização do id, pois o index do array muda ao ser manipulado.

Ex. para ser evitado

```javascript
 
data.map((item, index)=>(
  <Friend
  key={String(index)}
  data={item}
  follow={follow}
  >
))

// maneira correta

{
  data.map(friend => (
        <Friend key={String(friend.id)} data={friend} follow={follow} />
      ))
}

```
Utilizar map, apenas para busca de poucos dados em lista, para listas grandes, utilizar a Flatlist que é mais performático.

Ex.

```javascript
 
return (
    <View>
      <Text>Total de likes: {totalLikes}</Text>

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Friend key={String(item.id)} data={item} follow={follow} />
        )}
      />
    </View>
  );

```


---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Detox](https://github.com/wix/Detox)
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