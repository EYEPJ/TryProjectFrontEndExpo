import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Platform, Image  } from 'react-native'
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { BlendShape } from 'expo/build/AR';
import Gestures from 'react-native-easy-gestures';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   
        ModalVisibleStatus: false,
        clothes: [],
        top_in: "",
        top_out: "",
        buttom: "",
        shoe: ""
    };
  }

  ShowModalFunction(visible) {
    console.log(visible)
    this.setState({ModalVisibleStatus: visible});
    console.log('status:'+this.state.ModalVisibleStatus)
    console.log(this.state.top_in)
    
  }
  getAllClothes = async () => {
      resp = await axios.get('http://3.92.192.76:8000/clothesManagement/');
      let clothes = await resp.data.map( value => {
        return value
      })
      this.setState({clothes})
      console.log(this.state.clothes)
      console.log('status in get:'+this.state.ModalVisibleStatus)
      
  }

 render() {
   return (

      <View style={{flex: 1, flexDirection: 'row'}}>
        <Modal
          isVisible={this.state.ModalVisibleStatus}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          hasBackdrop={false}>
            <ScrollView style={{width: '90%', height:'100%', backgroundColor: 'white'}}>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
              {
                this.state.clothes.map((v, index) => {
                  return(
                    <TouchableOpacity onPress={() => {
                      this.ShowModalFunction(!this.state.ModalVisibleStatus)
                      this.setState({top_in: v.clothePictureUrl})
                    }}>
                    <View style={styles.item} >
                      <Image style={{width: 80, height: 100}} source={{uri : v.clothePictureUrl}}></Image>
                    </View>
                    </TouchableOpacity>
                  )
                })
              }
          </View>
          </ScrollView>
        </Modal>
        <View style={styles.clothesArea}>
          <Text>A</Text>
        </View>
        <View style={styles.tryArea}>
          <TouchableOpacity onPress={() => {
            this.getAllClothes()
            this.ShowModalFunction(true)
            }}>
            <View style={{backgroundColor: 'green', width: 50, height: 50,}}></View>
          </TouchableOpacity>

          <Gestures rotatable={true} scalable={true}>
            <Image source={{uri: this.state.top_in}} style={{width: '50%', height: '50%'}}/>
          </Gestures>
          
          
        </View>
        <View style={styles.optionArea}>
          <Text>A</Text>
        </View>
        

        
         

      </View>

           
   );
 }
}

const styles = StyleSheet.create({

MainContainer :{
flex:1,
justifyContent: 'center',
alignItems: 'center',
marginTop: (Platform.OS == 'ios') ? 20 : 0
},
clothesBar: {
  backgroundColor: 'pink',
  marginLeft: -19,
  marginTop: -30,
  height: '100%',
  width: '95%',
  flexDirection: 'row',
  flexWrap: 'wrap',
},

TextStyle:{
  fontSize: 20, 
  marginBottom: 20, 
  color: "#fff",
  padding: 20,
  textAlign: 'center'

},
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

item: {
  width: 130, 
  height: 150, 
  backgroundColor:'pink', 
  marginBottom:10, 
  marginLeft:10, 
  justifyContent: 'center',
  alignItems: 'center'
}
});