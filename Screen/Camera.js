import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as firebase from "firebase";
import ApiKeys from "../Screen/ApiKeys";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";
import Bouncy from 'react-native-bouncy-touchable';
import TouchableScale from 'react-native-touchable-scale';

export default class CameraExample extends React.Component {

    static navigationOptions = {
        header: null
    }

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      //url: null,
      user: this.props.navigation.state.params.user,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  takePicture = async () => {
    let photo = await this.camera.takePictureAsync();
    this.props.navigation.navigate('PictureConfirmScreen',{user: this.state.user, url: photo})
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
            <View style={{flex:0.5,  backgroundColor: '#EBEBEB'}}></View>
            <View style={{ flex: 10, }}>
                <Camera style={{ flex: 1, }} type={this.state.type} ref={ref => {this.camera = ref;}}>
                    <View style={{ flex: 1, backgroundColor: 'transparent',}}>
                      <TouchableScale activeScale={0.95} onPress={() => {this.props.navigation.goBack()}} style={styles.close}>
                        <Image source={require('../Image/close.png')} style={styles.close}/>
                      </TouchableScale>
                      <Image source={require('../Image/shapeModel.png')} style={styles.shapeModel}/>
                    </View>
                </Camera>
            </View>
            

            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>

                <Image source={require('../Image/takePicButtonOut.png')} style={styles.takePicButtonOut}></Image>
                
                <TouchableScale activeScale={0.95} onPress={() => {this.takePicture()}} style={{width:65, height:65}}>
                    <Image source={require('../Image/takePicButtonIn.png')} style={styles.takePicButtonIn}></Image>
                </TouchableScale>

                <TouchableScale activeScale={0.8} onPress={() => {this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  })}} style={{width:25, height:25, position:'absolute', left: '75%'}}>
                    <Image source={require('../Image/recycle.png')} style={styles.flipCamera}></Image>
                </TouchableScale>
      
                
            </View>
            
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    takePicButtonOut:{
        width: 73,
        height: 73,
        position: "absolute"
    },
    takePicButtonIn:{
        width: 65,
        height: 65,
        position: "absolute",
    },
    close:{
      width: 18.09,
      height: 17.17,
      top: '3%',
      left: '87%'
    },
    flipCamera:{
      width: 25,
      height: 25,
      position: "absolute",
    },
    shapeModel:{
      width: '80%',
      height: '80%',
      position: "absolute",
      alignSelf: 'center',
      top: '10%'
    }
})