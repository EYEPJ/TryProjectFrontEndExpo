import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Platform, Image  } from 'react-native'
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { BlendShape } from 'expo/build/AR';
import Gestures from 'react-native-easy-gestures';


export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   
        image:""
    };
  }

  componentDidMount(){
    let recievImage = this.props.navigation.getParam('imageUri','non')
    this.setState({
      image: recievImage
    })
  }

  
 render() {
   return (

                    
                    <View style={styles.imageStyle}>
                      <Image source={{uri:this.state.image}}/>
                    </View>
   
   );
 }
}

const styles = StyleSheet.create({

imageStyle:{
  width: '100%',
  height:'250',
  alignItems: 'center'
}
});