import React from 'react';
import { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null)
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return
    }
    setSelectedImage({ localUri: pickerResult.uri })
  }

  // Использование expo-sharing для обмена изображением
  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Обмен недоступен на вашей платформе`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };
  //

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.btn}>
          <Text style={styles.btnText}>Поделиться этой фотографией</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.instructions}>Чтобы поделиться фотографией с телефона с другом, просто нажмите кнопку ниже!</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.btn}>

        <Text style={styles.btnText}>Выбери Фото</Text>

      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    paddingBottom: 10
  },
  btn: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10
  },
  btnText: {
    fontSize: 30,
    color: '#fff',

  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});