<p align="center" >
  <img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="100" />
</p>

<h1 align="center"> 
  🚀Verificando A Conexão🚀
</h1>

<p align="center" >
  <img alt="Repository size" src="https://img.shields.io/badge/Mobile-react--native-blue?style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/npm/types/typescript?style=for-the-badge">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/glaulher/react-native_Ignite?style=for-the-badge">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" />
</p>

---

## 📋 Sobre

<img align="center" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width="22" /> Sincronizando Usuário e fix, Chapter 04, Ignite (Rocketseat) - React Native.

---

## 📂 Como rodar este projeto

Para clonar e executar este aplicativo, você precisará de [Git](https://git-scm.com), [NodeJs](https://nodejs.org/en/) e [Android Studio](https://developer.android.com/studio) Instalado em seu computador.

### 🌀 Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/glaulher/react-native_Ignite.git

# Acesse a pasta do projeto no terminal/cmd
$ cd react-native_Ignite/ChapterIV/rentx_aula/30-SincronizandoUsuarioEfix/rentx/
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

# Biblioteca para verificar se há internet
$ expo install @react-native-community/netinfo

```

✔️ Notas:

Dica de Renato Mazzei de Campos

Correção de dois pontos no back-end:

No pull, os carros que haviam sido atualizados também estavam sendo retornados como criados. O erro de duplicidade entre criado e atualizado já havia sido corrigido, porém essa situação ainda persistia. Praticamente a mesma correção que foi feita no método listByUpdated do CarsRepository também foi aplicada para o listByCreated, no caso retornando somente os registros onde a data de criação é igual a data de atualização, ficando assim:

```javascript
  async listByCreated(lastPulledVersion: number): Promise<Car[]> {
    const cars = await this.repository
      .createQueryBuilder()
      .where("created_at >= :lastPulledVersion AND updated_at = created_at",
        { lastPulledVersion })
      .getMany();

    return cars;
  }
  ```
No push das informações do usuário, como no momento do sign-in os dados são criados e no sign-out os dados são removidos permanentemente, se tentarmos sincronizar os dados sem fazer nenhuma alteração, estava retornando erro devido ao servidor só tratar atualização (updated). Então também alterei o controller SyncUserController para tratar ambas as situações (created e updated), e priorizar uma delas:

```javascript
class SyncUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { created, updated } = request.body;

    const userChange = created.length > 0 ? created : updated;

    const { user_id, name, driver_license, avatar } = userChange[0];

    console.log("PUSH DO USUÁRIO")
    console.log(userChange[0]);

    const syncUserUseCase = container.resolve(SyncUserUseCase);
    const user = await syncUserUseCase.execute({
      id: user_id,
      name: name,
      driver_license: driver_license,
      avatar: avatar
    });

    return response.status(201).json(user);
  }
}
```
Problema de sincronização concorrente do Watermelon é devido ao método "synchronize" estar sendo chamado mais de uma vez sem necessariamente ter terminado a primeira execução. Se você está chamando o processo dentro de um useEffect, ele pode acabar sendo executado várias vezes se alguma dependência mudar, como por exemplo, a propriedade isConnected do objeto retornado pelo useNetInfo. Se a conexão oscilar rapidamente e alternar os valores como true -> false -> true em questão de milésimos de segundo, a sincronização vai ser chamada duas vezes. Caso você queira garantir que durante a primeira execução, nenhuma outra irá ser acionada, causando esse alerta, você pode usar o hook useRef para armazenar/setar uma flag indicando que já existe um processo em andamento e tratar isso previamente, liberando somente quando o processo for concluído (sucesso ou erro), algo assim:

```javascript
  const netInfo = useNetInfo();
  const synchronizing = useRef(false);

  useEffect(() => {
    const syncChanges = async () => {
      if (netInfo.isConnected && !synchronizing.current) {
        synchronizing.current = true;
        try {
          await synchronize(...); //Watermelon
        }
        catch (err) {
          console.log(err);
        }
        finally {
          synchronizing.current = false;
        }
      }
    }

    syncChanges();
  }, [netInfo.isConnected]);
  
  ```

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