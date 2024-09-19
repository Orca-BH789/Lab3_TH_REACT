import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';


const ContactThumbnail = ({ name, avatar, textColor, onPress }) => {
  const colorStyle = {
    color: textColor,
  };
 
  const ImageComponent = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <ImageComponent onPress={onPress}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.avatar}
        />
      </ImageComponent>
      {name !== '' && <Text style={[styles.name, colorStyle]}>{name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 30,
    marginHorizontal: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },
  name: {
    fontSize: 21,
    marginTop: 14,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  phoneSection: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default ContactThumbnail;

