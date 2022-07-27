import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { startAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
  // beforeEach irá limpar o storage para os testes.
  beforeEach(async () => {
    const userCollectionKey = '@gofinances:user';
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it('shold be able to sign in with Google account existing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'google-token',
      },
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: `userInfo.id`,
            email: `userInfo@email.com`,
            name: `userInfo.given_name`,
            photo: `userInfo.picture`,
            locale: `userInfo.locale`,
            verified_email: `userInfo.verified_email`,
          }),
      }),
    ) as jest.Mock;

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe(`userInfo@email.com`);
  });

  it('user should not connect if cancel authentication with Google', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
      params: {
        access_token: 'google-token',
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});

/*

// Essa lib foi instalada para realizar o mock do fetch.
import fetchMock from 'jest-fetch-mock';

import { renderHook } from '@testing-library/react-hooks';
import { startAsync } from 'expo-auth-session';
import { useAuth, AuthProvider } from './auth';

// Realizamos o mock do Expo Auth Session pois queremos controlar o retorno dele.
jest.mock('expo-auth-session');

// Coloque no início do arquivo para habilitar o mock do fetch.
fetchMock.enableMocks();

it('should be able to sign in with Google account existing', async () => {
  // Primeiro, nós precisamos do Token. Então, vamos mockar a função de startAsync.
  const googleMocked = startAsync as jest.Mock;
  googleMocked.mockReturnValueOnce({
    type: 'success',
    params: {
      access_token: 'any_token',
    },
  });

  // Agora que temos o Token, vamos mockar a requisição http dos dados de profile do usuário.
  fetchMock.mockResponseOnce(
    JSON.stringify({
      id: 'any_id',
      email: 'rodrigo.goncalves@rocketseat.team',
      name: 'Rodrigo',
      photo: 'any_photo.png',
    }),
  );

  const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
    wrapper: AuthProvider,
  });

  // Executamos a função assíncrona de login com o Google, é agora que os nossos dois mocks anteriores vão entrar em ação.
  result.current.signInWithGoogle();

  // Aqui aguardamos o próximo update (rerender) do contexto, pois a função signInWithGoogle é assíncrona. Quando ocorrer o update (rerender), teremos os dados atualizados do usuário no estado user.
  await waitForNextUpdate();

  // Você até pode usar esse console.log para visualizar os dados.
  // eslint-disable-next-line no-console
  console.log('USER PROFILE =>', result.current.user);

  expect(result.current.user.email).toBe('rodrigo.goncalves@rocketseat.team');
});

*/
