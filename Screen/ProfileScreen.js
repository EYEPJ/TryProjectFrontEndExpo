import React from 'react';
import { Button, View, Text, StyleSheet,  } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
    
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'PJ',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.clothesArea}>
          <Text>{this.props.navigation.state.params.user.name}</Text>
        </View>
        <View style={styles.tryArea}>
          <TouchableOpacity>
            <View style={{backgroundColor: 'green', width: 50, height: 50,}}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.optionArea}>
          <Text>{this.props.navigation.state.params.user.name}</Text>
        </View>
      </View>
    );
  }
}

export default ProfileScreen

const styles = StyleSheet.create({
  clothesArea: {
      flex: 2,
      backgroundColor: 'red'
  },
  tryArea: {
    flex: 5,
    backgroundColor: 'blue'
  },
  optionArea: {
    flex: 1,
    backgroundColor: 'white'
  },
}
);