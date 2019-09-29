import React from 'react';
import Card from '../Components/Card'
import CameraCard from '../Components/CameraCard'
import axios from 'axios'
import {
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
 Image,
 ImageBackground,
 ScrollView
} from 'react-native';
import {FontAwesome,Feather} from '@expo/vector-icons';
import * as firebase from "firebase";
import ApiKeys from "./ApiKeys";
import * as ImagePicker from "expo-image-picker";



class ShapeScreen extends React.Component {
    static navigationOptions = {
      title: 'Select Your Shape',
    };

    constructor(props) {
      super(props);
      this.state = {
        image: null,
        url: null,
        data: [],
        user: this.props.navigation.state.params.user
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(ApiKeys.FirebaseConfig);
      }
    }
    

    //Camera
    takePicture = async () => {
      let result = await ImagePicker.launchCameraAsync({});
      if (result.uri) {
        let split = result.uri.split("/");
        let name = split[split.length - 1];
        await this.uploadImage(result.uri, name)
        let URL  = await firebase.storage().ref().child("images/" + name).getDownloadURL()
        this.state.user.bodyPicture = URL;
        this.props.navigation.navigate("AnalyzeShapeScreen", { user: this.state.user });
      }
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

    //
    
    setUserinfo = async (shapeId,shapePictureUrl) => {
      this.state.user.shapeId = shapeId;
      this.state.user.userBodyPictureUrl = shapePictureUrl;
      this.props.navigation.navigate('GuestMainScreen',{
        user: this.state.user
      });
    }
  
    getShape = async () => {
      let resp
      if(this.state.user.userGender === 'male'){
        resp = await axios.get('http://3.92.192.76:8000/menShape/')
      }else{
        resp = await axios.get('http://3.92.192.76:8000/womanShape/')
      }  
      console.log('shape is serving....')
      console.log(resp.data)
      let data = resp.data.map(value => {
        return value
      })
      console.log('test', data)
      this.setState({ data })
    }

    createUser(shapePictureUrl){
      axios.post("http://3.92.192.76:8000/createUser/", {
          fbId: this.state.user.fbId,
          userName: this.state.user.name,
          userProfile: this.state.user.profilePic,
          userBodyPictureUrl: shapePictureUrl,
          userGender: this.state.user.gender,
          shapeId: this.state.user.shapeId,
      })
        .then(res => {
          console.log('test ja')
          this.props.navigation.navigate('MainScreen',{
            fbId: this.state.user.fbId
          });
        });
    };


    componentDidMount () {
       this.getShape()
      console.log(this.state.user);

    }
  
    render() {
      const {navigate} = this.props.navigation; 
      // console.log('test' , this.state.data) 
    return(
      <ScrollView>
      <ImageBackground
      source={require('../Image/bg.png')}
      style={styles.ImageBackgroundStyle}>

      <View style={styles.container}>
        {
          this.state.data.map((v,index) => {
            return (
              <TouchableOpacity key={index} onPress={() => this.setUserinfo(v.id,v.shapePictureUrl)}>
                <Card style={styles.cardStyle} 
                  key={index} picture={v.shapePictureUrl} name={v.shapeName}>
                </Card>
              </TouchableOpacity>
            )
          })
        }
      
      </View>
        </ImageBackground>
        </ScrollView>

        );
    }
}

export default ShapeScreen

const styles = StyleSheet.create({
  ImageBackgroundStyle: {
      flex:1,
      width: '100%',
      height: '700%',
  },
  header:{
      fontSize: 23,
      textAlign:'center',
      color:'#949494',
      marginTop: 50
  },
  container: {
      flex: 1,
      marginTop: 20,
      margin:10,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      flexDirection: 'row',
      flexWrap:'wrap',
      width: '95%',
      height:'auto',
      alignItems: 'center'
      
  },
}
);