import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons,Feather} from '@expo/vector-icons'
import {Thumbnail } from  'native-base';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    formCam:null
  };

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
          <Camera style={{ flex: 1 }} type={this.state.camType} ref={ref => this.camera = ref}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>

              <View style={{
                  position:'absolute',
                  height:100,
                  width:'100%',
                  bottom : 0,
                  flexDirection:'row',
                  
              }}>
        
                  <View style={{flex:1, justifyContent: 'center' ,alignItems:'center'}}>
                    <Feather onPress={() => this.takephoto()} name="circle" size={70} color={'#fff'}/> 
                  </View>
                  
              </View>

            </View>
          </Camera>
        </View>
      )
    }
    }
    async takephoto(){
        if(this.camera){
            let photo = await this.camera.takePictureAsync();
            this.setState({formCam: photo.uri})
    }
}
}

  
