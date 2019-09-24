import React from 'react';
import Card from '../Components/Card'
import CameraCard from '../Components/CameraCard'
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
import {FontAwesome,Feather} from '@expo/vector-icons'


class ShapeScreen extends React.Component {
    static navigationOptions = {
      title: 'Select Your Shape',
    };
    state = {
      data: [],
      user: this.props.navigation.state.params.user
    }
    
    setUserinfo = async (shapeId,shapePictureUrl) => {
      this.state.user.shape = shapeId;
      await this.createUser(shapePictureUrl);
      this.props.navigation.navigate('MainScreen');
    }
  
    getShape = async () => {
      let resp
      if(this.state.user.gender === 'male'){
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

    createUser = (shapePictureUrl) => {
      axios.post("http://3.92.192.76:8000/createUser/", {
          fbId: this.state.user.fbId,
          userName: this.state.user.name,
          userProfile: this.state.user.profilePic,
          userBodyPictureUrl: shapePictureUrl,
          userGender: this.state.user.gender,
          shapeId: this.state.user.shape,
      })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    };


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

      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Camera', {
        user: this.state.user
      })}>
                <CameraCard style={styles.cardStyle}>
                </CameraCard>
              </TouchableOpacity>
        {
          this.state.data.map((v,index) => {
            return (
              <TouchableOpacity key={index} onPress={() => this.setUserinfo(v.id,v.shapePictureUrl)}>
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

export default ShapeScreen

const styles = StyleSheet.create({
  ImageBackgroundStyle: {
      flex:1,
      width: '100%',
      height: '700%',
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
      flexWrap:'wrap',
      width: '95%',
      height:'auto',
      alignItems: 'center'
      
  },
}
);