import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
  
  const [image, setImage] = useState(null);

  const downloadResumable = FileSystem.createDownloadResumable(
    'http://121.138.83.4/images/1615430873.071627/0',
    FileSystem.documentDirectory + '0.png',
    {}
  );
  
  const download = async () => {
    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      setImage(uri);
      const result = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      console.log(result);
      
    } catch (e) {
      console.error(e);
    } 
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={download}>
        <Text>Go</Text>
      </TouchableOpacity>
        <Image
          style={{ width: 300, height: 400 }}
          source={{
            uri: image,
          }}
        />
      
      <StatusBar style="auto" />
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
});
