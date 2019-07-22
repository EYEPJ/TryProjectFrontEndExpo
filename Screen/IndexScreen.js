import React from 'react';
import { Button,View,Alert } from 'react-native';
import FBLoginButton from '../Components/FBLoginButton';
import { Facebook } from 'expo';

class Index extends React.Component {
  // static navigationOptions = {
  //   title: 'สวัสดี',
  // }

  logIn = async () => {
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('2859742107375302', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        this.props.navigation.navigate('SelectShape');
      } else {
        Alert.alert('Something is wrong !');
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button title="Sign in with Facebook" onPress={this.logIn}/>
        <Button title="Guest Mode" onPress={() => navigate('Gender')}/>
      </View>
    );
  }
}

export default Index
