import React from 'react';
import {StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';
import firebase from 'react-native-firebase';
import Botton from 'react-native-button';


class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome PJ',
    };
    render() {
      const {navigate} = this.props.navigation;
     return(
  
       <View style={styles.Container}>
       <View style={styles.top}>
         <Text style={styles.header}>Select Your Genger</Text>
         </View>
         <View style={styles.styleButton}> 
         <TouchableOpacity style={styles.genderContainer} onPress={() => navigate('FemaleShape')}>
              <Image 
              source={require('../Image/female.png')}
              style={styles.imageStyle}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genderContainer} onPress={() => navigate('MaleShape')}>
              <Image
              source={require('../Image/male.png') }
              style={styles.imageStyle}/>
              </TouchableOpacity>
          </View>
              </View>
     );
   }
  }

  export default LoginScreen

const styles = StyleSheet.create({
  Container
  });
