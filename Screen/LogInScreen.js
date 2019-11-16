import React from 'react';
import { Text,View,Alert,ImageBackground,StyleSheet,TouchableOpacity,Image} from 'react-native';
import * as Facebook from 'expo-facebook'
import axios from 'axios';
import Bouncy from 'react-native-bouncy-touchable';
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
import TouchableScale from 'react-native-touchable-scale';
import * as Animatable from "react-native-animatable";


class LogInScreen extends React.Component {

  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
};

  constructor(props) {
    super(props);
    this.state = {
      user: {

      },
      loading: false,
      buttonArea: true
    };
  }

  checkUserIsExist = async (fbId) => {
    resp = await axios.post('http://3.92.192.76:8000/checkUserIsExist/',{
      fbId: fbId
    });
    //console.log(resp.data)
    return await resp.data.result
  }


  logIn = async () => {
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('2859742107375302', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        this.setState({loading: true, buttonArea: false})
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
        const userInfo = await response.json();
        this.setState(
          {
            user:{
              fbId: userInfo.id,
              name: userInfo.name,
              profilePic: userInfo.picture.data.url,
              gender: ' ',
              bodyPicture: ' ',
              shapeId: ' ',
            }
          }
        )
        
        //checkVar = await this.checkUserIsExist('userInfo.id')
        //console.log(await this.checkUserIsExist('userInfo.id').result)
        //console.log(this.state.user.fbId)
        if(await this.checkUserIsExist(userInfo.id)){
          this.props.navigation.navigate('MainScreen', {
            fbId: this.state.user.fbId
          });
        } else{
          this.props.navigation.navigate('SelectGender', {
            user: this.state.user
          });
        }
      } else {
        Alert.alert('Something is wrong !');
      }
      this.setState({loading: false, buttonArea: true})
    } catch ({ message }) {
      this.setState({loading: false, buttonArea: true})
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    
    return (
        <Animatable.View delay={500} useNativeDriver={true} animation="fadeIn" style={{flex: 1}}>

          <View style={{flex: 2}}>
            <Image source={require('../Image/IMG_1868.png')} style={{width: '100%', height: '100%',}}/>
          </View>
          
          <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>


            <Image source={require('../Image/logo-bw-shadow.png')} style={{width: '70%', height: '70%', position: 'absolute', top: '-35%'}}/>

            {ShowAndHide(this.state.loading)(
              <MaterialIndicator color='black' trackWidth='2'/>
            )}
            
            {ShowAndHide(this.state.buttonArea)(
              <Animatable.View delay={2000} useNativeDriver={true} animation="fadeIn">

              <TouchableScale onPress={this.logIn} style={{width: 320, height: 35, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', marginTop: 35}}>
                <Text style={{fontSize: 14, fontWeight: 350, letterSpacing: 1, color: 'white', fontFamily: 'Cochin'}}>Sign In with Facebook</Text>
              </TouchableScale>

              <TouchableScale onPress={() => navigate('GuestGenderScreen', {
                user:{
                  userName: "Guest Mode",
                  userProfile: "../Image/guestProfile.png",
                  userBodyPictureUrl: " ",
                  userGender: " ",
                  shapeId: " ",
                }
              })} style={{justifyContent: 'center', alignItems: 'center', marginTop: 14}}>
                <Text style={{fontSize: 12, fontWeight: 350, letterSpacing: 1, color: '#313131', textDecorationLine: 'underline', fontFamily: 'Cochin'}}>Guest Mode</Text>
              </TouchableScale>

              </Animatable.View>
            )}

          </View>

        </Animatable.View>
          // <View>

          //   <View style={{flex: 1}}>
          //     <Image source={require('../Image/IMG_1868.png')} style={{width:'100%', height:'50%'}}/>
          //   </View>

          //   <View style={{flex: 1}}>

          //     <Bouncy onPress={this.logIn} style={{top: '55%', alignItems: 'center'}}>
          //       <Image source={require('../Image/loginWithFBButton.png')} style={{width: 230,  height: 45}}/>
          //     </Bouncy>

          //     <Bouncy onPress={() => navigate('GuestGenderScreen', {
          //       user:{
          //         userName: "Guest Mode",
          //         userProfile: "../Image/guestProfile.png",
          //         userBodyPictureUrl: " ",
          //         userGender: " ",
          //         shapeId: " ",
          //       }
          //     })} style={{top: '57%', alignItems: 'center'}}>
          //       <Image source={require('../Image/loginWithGuest.png')} style={{width: 230,  height: 45}}/>
          //     </Bouncy>

          //     {ShowAndHide(this.state.loading)(
          //       <MaterialIndicator color='#EA4C56' trackWidth='2' size={50}/>
          //     )}

          //   </View>
 
          // </View>
          
      // </ImageBackground> 

    );
  }
}

export default LogInScreen

const styles = StyleSheet.create({
//   ImageBackgroundStyle: {
//       width: '100%',
//       marginTop: 0,
//       height: '100%'
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 50,
//     marginTop:200,
//     marginBottom:200,
//     borderRadius: 10,

// },
// logoStyles:{
//     fontSize:50,
//     fontWeight:'500',
//     color:'#fff'
// },
// lineStyle:{
//   backgroundColor: '#fff',
//     width: 58,
//     height: 1,
//     margin: 2
  
// },
// text:{
//   color:'#fff',
//   margin:5
// },
//   imageStyle:{
//     width: '120%',
//       height: '50%'
//   },
//   FacebookStyle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#485a96',
//     borderWidth: 0.5,
//     borderColor: '#fff',
//     height: 40,
//     width: 220,
//     borderRadius: 5,
//     margin: 5,
//     marginBottom:30,
//     marginTop:30

//   },
//   ImageIconStyle: {
//     padding: 10,
//     margin: 5,
//     marginLeft:10,
//     height: 25,
//     width: 25,
//     resizeMode: 'stretch',
//   },
//   TextStyle: {
//     color: '#fff',
//     marginBottom: 4,
//     marginLeft: 10,
//     textAlign:'center'  
//   },
//   TextGusetStyle: {
//     color: '#fff',
//     marginLeft: 30,
//     textAlign:'center'  
//   },
//   SeparatorLine: {
//     backgroundColor: '#fff',
//     width: 1,
//     height: 40,
//     margin: 2
//   },
//   GuestStyle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#dc4e41',
//     borderWidth: 0.5,
//     borderColor: '#fff',
//     height: 40,
//     width: 220,
//     borderRadius: 5,
//     margin: 5,
//   },
});
