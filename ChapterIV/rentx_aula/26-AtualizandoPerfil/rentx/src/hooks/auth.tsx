import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';

import { Alert } from 'react-native';
import api from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/model/User';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// contexto da aplicação do login
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  // requisição para api
  /* eslint-disable no-param-reassign */
  // eslint-disable-next-line consistent-return
  async function signIn({ email, password }: SignInCredentials) {
    try {
      // busca o usuário na api
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      // armazena o token caso o usuário exista
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Cadastra o usuário no banco local
      await database.write(async () => {
        const userCollection = database.get<ModelUser>('users');
        const dataUser = await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
        // eslint-disable-next-line no-underscore-dangle
        const userData = dataUser._raw as unknown as User;
        setData(userData);
      });
    } catch (error) {
      // throw new Error(error);
      Alert.alert('Erro', 'Erro na senha ou no e-mail, tente novamente');
    }

    // await database.write(async () => {
    //   const userCollection = database.get<ModelUser>('users');
    //   await userCollection
    //     .create(newUser => {
    //       newUser.user_id = user.id;
    //       newUser.name = user.name;
    //       newUser.email = user.email;
    //       newUser.driver_license = user.driver_license;
    //       newUser.avatar = user.avatar;
    //       newUser.token = token;
    //     })
    //     .then(userData => {
    //       // eslint-disable-next-line no-underscore-dangle
    //       setData(userData._raw as unknown as User);
    //     })
    //     .catch(() => {
    //       Alert.alert(
    //         'Erro na autenticação',
    //         'Não foi possível realizar o login!',
    //       );
    //     });
    // });
  }

  async function signOut() {
    try {
      // Deleta o usuário no banco local
      await database.write(async () => {
        const userCollection = database.get<ModelUser>('users');
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });
      setData({} as User);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function updateUser(user: User) {
    try {
      // Atualiza o usuário no banco local
      await database.write(async () => {
        const userCollection = database.get<ModelUser>('users');
        const userSelected = await userCollection.find(user.id);
        await userSelected.update(userData => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      // Busca se o usuário está logado
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();

      // atualiza o data com as informações do usuário
      if (response.length > 0) {
        // eslint-disable-next-line no-underscore-dangle
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.common.Authorization = `Bearer ${userData.token}`;

        setData(userData);
      }
    }
    loadUserData();
  });

  // evita redenrizações desnecessárias, apenas quando há a mudança.
  const contextValue = useMemo(() => {
    return {
      user: data,
      signIn,
      signOut,
      updateUser,
    };
  }, [data, signIn]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
