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
import ApiKeys from "../Screen/ApiKeys";
import * as ImagePicker from "expo-image-picker";
import Draggable from 'react-native-draggable';
import * as Animatable from "react-native-animatable";
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
import ShowAndHide from '../Components/ShowAndHide';



class ShapeScreen extends React.Component {
    static navigationOptions = {
      header: null
    };

    constructor(props) {
      super(props);
      this.state = {
        image: null,
        url: null,
        data: [],
        user: this.props.navigation.state.params.user,
        loading: false,
        analyze: false,
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(ApiKeys.FirebaseConfig);
      }
    }
    

    Camera
    takePicture = async () => {
      console.log('test')
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
      this.setState({loading: true})
      this.state.user.shapeId = shapeId;
      if(await this.checkUserIsExist(this.state.user.fbId)){
        axios.post('http://3.92.192.76:8000/updateUserBodyPictureUrl/', {
          fbId: this.state.user.fbId,
          url: shapePictureUrl,
          shapeId: shapeId,
        }).then(
          this.props.navigation.navigate('MainScreen', {
            fbId: this.state.user.fbId,
            picture: shapePictureUrl
        })
      );
      }else{
        this.createUser(shapePictureUrl)
      }
      this.setState({loading: false})
    }
  
    getShape = async () => {
      this.setState({
        loading: true
      })
      let resp
      if(this.state.user.gender === 'male'){
        resp = await axios.get('http://3.92.192.76:8000/menShape/')
      }else{
        resp = await axios.get('http://3.92.192.76:8000/womanShape/')
      } 
      let data = resp.data.map(value => {
        return value
      })
      this.setState({ data })
      this.setState({
        loading: false,
        analyze: true
      })
    }


  checkUserIsExist = async (fbId) => {
    resp = await axios.post('http://3.92.192.76:8000/checkUserIsExist/',{
      fbId: fbId
    });
    return await resp.data.result 
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
            fbId: this.state.user.fbId,
            picture: shapePictureUrl,
          });
        });
    };


    componentDidMount () {
      this.getShape()
    }
  
    render() {
      const {navigate} = this.props.navigation; 
      // console.log('test' , this.state.data) 
    return(


      
      <View style={{flex: 1, flexDirection: 'column'}}>
          
        <View style={{flex:0.55,  backgroundColor: '#EBEBEB'}}></View>
        
        <View style={{flex: 1.2, backgroundColor: '#EBEBEB', alignItems:'center', flexDirection:'row'}}>
          
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{left: '50%', top:'10%'}}>
              <Image source={require('../Image/backButton.png')} style={styles.backButton}/>
            </TouchableOpacity>
          </View>
      
          <View style={{flex: 10}}>
            <Text style={styles.headerText}>Select Your Shape</Text>
          </View>
      
          <View style={{flex: 1}}>
          
          </View>

        </View>

        <View style={{flex: 15}}>
            
          {ShowAndHide(this.state.analyze)(
            <Draggable renderShape={null} x={'65%'} y={'70%'} pressDrag={() => {this.props.navigation.navigate('Camera',{
              user: this.state.user
            })}}>
              <Image source={require('../Image/analyze.png')} style={styles.analyzeButton}/>
            </Draggable>
          )}
         
          <ScrollView style={styles.ImageBackgroundStyle}>
            <View style={styles.container}>
            

            {
              this.state.data.map((v,index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => this.setUserinfo(v.id,v.shapePictureUrl)}>
                    <Animatable.View animation="bounceIn">
                      <Card
                        key={index} picture={v.shapePictureUrl} name={v.shapeName}>
                      </Card>
                    </Animatable.View>
                  </TouchableOpacity>
                )
              })
            }
            
            </View>
          </ScrollView>
          {ShowAndHide(this.state.loading)(
            <View style={{position: 'absolute', top: '40%', left: '45%'}}>
              <MaterialIndicator color='black' trackWidth='2'/>
            </View>
          )}
        </View>
      </View>


        );
    }
}

export default ShapeScreen

const styles = StyleSheet.create({
  ImageBackgroundStyle: {
    backgroundColor: '#EBEBEB',
    alignItems: 'center',

  },
  header:{
    fontSize: 15,
    fontWeight: 330,
    letterSpacing: 0.5,
    color: 'black',
    top: 3,
    textAlign:'center',
    marginTop: 50,
    fontFamily: 'Cochin',
  },
  container: {
      flex: 1,
      borderRadius: 10,
      flexDirection: 'row',
      flexWrap:'wrap',
      width: '90%',
      justifyContent: 'flex-between',
      alignItems: 'flex-start',
  },
  backButton:{
    width:11.56,
    height:17.44,
   },
   selectBodyShapeText:{
     width: 216,
     height: 20,
     top: '70%',
     left: '25%',
     position: 'absolute',
   },
   analyzeButton:{
    width: 124.5,
    height: 124.5,
    position: 'absolute',
   },
   headerText:{
    alignSelf: 'center',
    top:'10%',
    fontSize: 15,
    fontWeight: 330,
    letterSpacing: 0.5,
    color: 'black',
   }
}
);