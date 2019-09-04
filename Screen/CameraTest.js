import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Analize Your Shape By Picture',
  }
  state = {
    image: null,
    
  };

  componentDidMount(){
    this.takePicture()
  }


  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    if(uri!=''){
      this.setState({ image: uri }); 
      this.props.navigation.navigate('Profile',{imageUri:this.state.uri})
    }
    this.setState({ image: uri });
  };
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
}

  render() {
    return (

      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <View style={styles.row}>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 21,
  },
  row: { flexDirection: 'row' },
  image: { width: '100%', height: '100%', backgroundColor: 'gray' },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
