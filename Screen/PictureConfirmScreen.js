import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as firebase from "firebase";
import ApiKeys from "./ApiKeys";
import * as ImagePicker from "expo-image-picker";
import TouchableScale from 'react-native-touchable-scale';
import ShowAndHide from '../Components/ShowAndHide';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default class CameraExample extends React.Component {

    static navigationOptions = {
        header: null
    }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      loading: false
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {

  }

  confirmPicture = async () => {
      this.setState({loading: true})
      picture = this.props.navigation.state.params.url.uri
      let split = picture.split("/");
      let name = split[split.length - 1];
      await this.uploadImage(picture, name)
      let URL  = await firebase.storage().ref().child("images/" + name).getDownloadURL()
      this.state.user.bodyPicture = URL;
      this.props.navigation.navigate('AnalyzeShapeScreen', {user: this.state.user, picture:  picture});
      this.setState({loading: false})
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = await firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return await ref.put(blob);
  };

  render() {
      return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 10, backgroundColor:'red' }}>

              
              <ImageBackground source={{uri: this.props.navigation.state.params.url.uri}} style={{width:'100%', height:'100%'}}>
                {ShowAndHide(this.state.loading)(
                  <MaterialIndicator color='#EA4C56' trackWidth='2' size={50}/>
                )}
              </ImageBackground>
            </View>
            

            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>
                
                <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{alignItems: 'center', flex:1}}>
                  <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                    <Text style={styles.cancel}>CANCEL</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this.confirmPicture()}} style={{alignItems: 'center', flex:2, backgroundColor:'black'}}>
                <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={styles.use}>CONFIRM</Text>
                  </View>
                </TouchableOpacity>
                
            </View>
            
        </View>
      );
    }
}


const styles = StyleSheet.create({
    cancel:{
      fontSize: 14,
      color:'#313131',
    },
    use:{
      fontSize: 14,
      color:'white',
    }
})