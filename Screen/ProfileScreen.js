import React from 'react';
import { Button } from 'react-native'
    
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'PJ',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      />
    );
  }
}

export default ProfileScreen