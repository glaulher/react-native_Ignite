import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import lodash from 'lodash';

interface Props {
  follow: () => void;
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  };
}

function FriendComponent({ data, follow }: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>
        {data.name} - Likes: {data.likes}
      </Text>

      <TouchableOpacity onPress={follow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>

      <Text>Online em: {data.online}</Text>
    </View>
  );
}

export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.data, nextProps.data);
});
