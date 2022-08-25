import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';

import { Friend } from './Friend';

interface Props {
  follow: () => void;
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  }[];
}

export function FriendLit({ data, follow }: Props) {
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

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Friend key={String(item.id)} data={item} follow={follow} />
        )}
      />
    </View>
  );
}
