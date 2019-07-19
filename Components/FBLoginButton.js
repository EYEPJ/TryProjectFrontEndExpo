import React, { Component } from 'react';
import { Button, Alert } from 'react-native';
import { Facebook } from 'expo';

class FBLoginButton extends Component {

  constructor(props){
    super(props);
    this.logIn = this.logIn.bind(this);
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
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        
      } else {
        Alert.alert('Something is wrong !');
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  a1 = () => {
    this.props.navigation.navigate('SelectShape')
  }

  render() {
   // const navigate = this.props.navigation;
    return (
      <Button title="Sign in with Facebook" onPress={() => this.props.navigation.navigate('SelectShape')}/>
    )
  }
}

export default FBLoginButton