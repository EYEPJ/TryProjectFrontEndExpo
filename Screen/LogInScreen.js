import React from 'react';
import { Text,View,Alert,ImageBackground,StyleSheet,TouchableOpacity,Image} from 'react-native';
import * as Facebook from 'expo-facebook'
import axios from 'axios';

class LogInScreen extends React.Component {

  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
};

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
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
        const userInfo = await response.json();
        console.log(userInfo)
        this.setState(
          {
            user:{
              fbId: userInfo.id,
              name: userInfo.name,
              profilePic: userInfo.picture.data.url,
              gender: ' ',
              bodyPicture: ' ',
              shapeId: ' '
            }
          }
        )
        
        //checkVar = await this.checkUserIsExist('userInfo.id')
        //console.log(await this.checkUserIsExist('userInfo.id').result)
        console.log(userInfo.id)
        if(await this.checkUserIsExist(userInfo.id)){
          this.props.navigation.navigate('MainScreen', {
            user: this.state.user
          });
        } else{
          this.props.navigation.navigate('SelectGender', {
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
      <ImageBackground
      source={require('../Image/loginscreen.png')}
      style={styles.ImageBackgroundStyle}>
      <View style={styles.container}>
        <Text style={styles.logoStyles}> TRY </Text>
        <View style = {styles.lineStyle} />
        <Text style={styles.text}>Virtual Fitting Room</Text>
      <View>
      <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={this.logIn}>
      <Image
            source={{
              uri:
                'https://aboutreact.com/wp-content/uploads/2018/08/facebook.png.png',
            }}
            style={styles.ImageIconStyle}/>
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}> Login Using Facebook </Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.GuestStyle} onPress={() => navigate('Gender', {
        user: this.state.user
      })}>
          <Text style={styles.TextGusetStyle}> Login With Guest Mode </Text>
        </TouchableOpacity>
        
      </View>
      </View>
      </ImageBackground> 
    );
  }
}

export default LogInScreen

const styles = StyleSheet.create({
  ImageBackgroundStyle: {
      width: '100%',
      marginTop: 0,
      height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    marginTop:200,
    marginBottom:200,
    borderRadius: 10,

},
logoStyles:{
    fontSize:50,
    fontWeight:'500',
    color:'#fff'
},
lineStyle:{
  backgroundColor: '#fff',
    width: 58,
    height: 1,
    margin: 2
  
},
text:{
  color:'#fff',
  margin:5
},
  imageStyle:{
    width: '120%',
      height: '50%'
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
    marginBottom:30,
    marginTop:30

  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    marginLeft:10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
    textAlign:'center'  
  },
  TextGusetStyle: {
    color: '#fff',
    marginLeft: 30,
    textAlign:'center'  
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
    margin: 2
  },
  GuestStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
});
