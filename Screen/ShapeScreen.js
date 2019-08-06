import React from 'react';
import Card from '../Components/Card'
import axios from 'axios'
import {
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
 Image,
 ImageBackground,
 ScrollView
} from 'react-native';
import ProfileScreen from './ProfileScreen';

class MaleShapeScreen extends React.Component {
    static navigationOptions = {
      title: 'Male',
    };
    state = {
      data: [],
      user: this.props.navigation.state.params.user
    }
    
    setUserinfo = (shapeId) => {
      console.log(shapeId)
      this.state.user.shape = shapeId;
      this.props.navigation.navigate('SelectSkin', {
        user: this.state.user
      });
      console.log(this.state.user)
    }
  
    getShape = async () => {
      let resp
      if(this.state.user.gender === 'เพศชาย'){
        resp = await axios.get('http://3.92.192.76:8000/menShape/')
      }else{
        resp = await axios.get('http://3.92.192.76:8000/womanShape/')
      }  
      console.log('shape is serving....')
      console.log(resp.data)
      let data = resp.data.map(value => {
        return value
      })
      console.log('test', data)
      this.setState({ data })
    }


    componentDidMount () {
       this.getShape()
      console.log('serving done!');
    }
  
    render() {
      const {navigate} = this.props.navigation;
      // console.log('test' , this.state.data) 
    return(
      <ScrollView>
      <ImageBackground
      source={require('../Image/bg.png')}
      style={styles.ImageBackgroundStyle}>
      <Text style={styles.header}>Select Your Shape </Text>
      <View style={styles.container}>
        {
          this.state.data.map((v,index) => {
            return (
              <TouchableOpacity onPress={() => this.setUserinfo(v.id)}>
                <Card style={styles.cardStyle} 
                  key={index} picture={v.shapePictureUrl} name={v.shapeName}>
                </Card>
              </TouchableOpacity>
            )
          })
        }

      </View>
        
        </ImageBackground>
        </ScrollView>

        );
    }
}

export default MaleShapeScreen

const styles = StyleSheet.create({
  ImageBackgroundStyle: {
      width: '100%',
      marginTop: 0,
      height: 6000
  },
  header:{
      fontSize: 23,
      textAlign:'center',
      color:'#949494',
      marginTop: 50
  },
  container: {
      flex: 1,
      marginTop: 20,
      margin:10,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      flexDirection: 'row',
      flexWrap:'wrap'
  },
}
);