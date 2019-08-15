import React from 'react';
import { Button,View,Alert,Text } from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {

      },
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
        console.log('Test')
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),gender`);
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        //console.log((await response.json()));
        const userInfo = await response.json();
        console.log(userInfo)
        this.setState(
          {
            user:{
              fbId: userInfo.id,
              name: userInfo.name,
              profilePic: userInfo.picture.data.url,
              gender: userInfo.gender,
            }
          }
        )
        
        //checkVar = await this.checkUserIsExist('userInfo.id')
        //console.log(await this.checkUserIsExist('userInfo.id').result)
        console.log(userInfo.id)
        if(await this.checkUserIsExist(userInfo.id)){
          this.props.navigation.navigate('Profile', {
            user: this.state.user
          });
        } else{
          this.props.navigation.navigate('SelectShape', {
            user: this.state.user
          });
        }
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
