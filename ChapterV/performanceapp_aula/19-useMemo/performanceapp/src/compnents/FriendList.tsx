import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import { Friend } from './Friend';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
}

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

  // const totalLikes = data.reduce((likes, friend) => {
  //   return likes + friend.likes;
  // }, 0);

  return (
    <View>
      <Text>Total de likes: {totalLikes}</Text>

      {data.map(friend => (
        <Friend key={String(friend.id)} data={friend} />
      ))}
    </View>
  );
}
