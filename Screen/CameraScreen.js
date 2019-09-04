import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons,Feather} from '@expo/vector-icons'
import {Thumbnail } from  'native-base';
import ApiKeys from '../Screen/ApiKeys';

export default class CameraExample extends React.Component {
  constructor(prop){
    super(prop);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      formCam:null
    };
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
  }
  

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 5 }} type={this.state.camType} ref={ref => this.camera = ref}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              </View>

              <View style={{
                  position:'absolute',
                  height:100,
                  width:'100%',
                  bottom : 0,
                  flexDirection:'row',
                  
              }}>
                </View>
          </Camera>
        
                  <View style={{flex:1, justifyContent: 'center' ,alignItems:'center'}}>
                    <Feather onPress={() => this.takephoto()} name="circle" size={70} color={'#fff'}/> 
                  </View>
                  
              </View>

      )
    }
    }
    async takephoto(){
        if(this.camera){
            let photo = await this.camera.takePictureAsync();
            /*if(photo.uri){
              this.uploadImage(photo.uri,"Try").then(()=>{
                firebase.storage().ref().child("images/" + "Try").getDownloadURL().then(function(URL){
                    console.log(URL);
                    
                })
                })
            }*/
            if(photo.uri!=''){
              this.setState({formCam: photo.uri}) 
              this.props.navigation.navigate('Profile',{imageUri:this.state.formCam})
            }
            
    }
}
    uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
}
}

  
