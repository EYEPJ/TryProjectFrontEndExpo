import React from 'react';
import {
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
 Image
} from 'react-native';
import Bouncy from 'react-native-bouncy-touchable';
import { NavigationActions } from 'react-navigation';
import TouchableScale from 'react-native-touchable-scale';
import * as Animatable from "react-native-animatable";


class GenderScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
    };
  }

  setGender = async (gender) => {
    this.state.user.gender = gender

    this.props.navigation.navigate('SelectShape', {
      user: this.state.user});
  }

  // setGender = async (gender) => {
  //   await this.setState(
  //     {
  //       user:{
  //         fbId: this.state.tempUser.fbId,
  //         name: this.state.tempUser.name,
  //         profilePic: this.state.tempUser.profilePic,
  //         gender: gender
  //       }
  //     }
  //   )

  //   this.props.navigation.navigate('SelectShape', {
  //     user: this.state.user
  //   });
  // }

  

  render() {
    const {navigate} = this.props.navigation;

    
   return(

    <View style={{flex:1, flexDirection:'column'}}>
    <View style={{flex:0.55,  backgroundColor: '#EBEBEB'}}></View>
    <View style={{flex: 1.2, backgroundColor: '#EBEBEB', alignItems:'center', flexDirection:'row'}}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('LogInScreen')}} style={{left: '50%', top:'10%'}}>
          <Image source={require('../Image/backButton.png')} style={styles.backButton}/>
        </TouchableOpacity>
      </View>
      <View style={{flex: 10}}>
        <Text style={styles.headerText}>Select Your Gender</Text>
      </View>
      <View style={{flex: 1}}>
        
      </View>

      
      
    </View>

    <View style={styles.Container}>
      
        <TouchableScale style={styles.genderFemale} onPress={() => {
          this.setGender('female')
        }}>
              <Animatable.Image 
              delay={500} useNativeDriver={true} animation="fadeIn"
              source={require('../Image/female.png')}
              style={styles.imageStyle}/>
          </TouchableScale>

          <TouchableScale style={styles.genderMale} onPress={() => {
          this.setGender('male')
        }}>
              <Animatable.Image
              delay={500} useNativeDriver={true} animation="fadeIn"
              source={require('../Image/male.png') }
              style={styles.imageStyle}/>
          </TouchableScale>
        
      </View>
      </View>
   );
 }
}

export default GenderScreen

const styles = StyleSheet.create({
  Container: {
    flex:15,
    flexDirection: 'row',
    backgroundColor: '#EBEBEB',
    justifyContent:'center',
    alignItems:'center',
  },
  top:{
    alignItems:'center',
    marginBottom:30,
    marginTop:200
  },
  header:{
    fontSize: 23,
    padding:50,
    paddingLeft:40,
    paddingRight:40,
    color:'#949494',
  },
  bottonText:{
    fontSize:20,
    fontWeight:'500',
    color:'#8B8B8B',
    textAlign:'center'
 },
 bottonClick:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
   marginTop:40
  },
  botton:{
   width:200,
   backgroundColor:'#F9F9F9',
   borderRadius: 25,
   marginVertical:10,
   paddingVertical:12
  },
  imageStyle:{
    width: 135,
    height: 185,
  },
  styleButton:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
 },
  genderFemale:{
   marginRight:20,

  },
  genderMale:{
    marginLeft:20,
   },
   backButton:{
    width:11.56,
    height:17.44,
   },
   headerText:{
    alignSelf: 'center',
    top:'10%',
    fontSize: 15,
    fontWeight: 330,
    letterSpacing: 0.5,
    color: 'black',
   }
  
    



});
