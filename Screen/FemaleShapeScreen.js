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
    ScrollView,
    
} from 'react-native';

class FemaleShapeScreen extends React.Component {
    static navigationOptions = {
        title: 'Female',
    };
    state = {
        data: []
      }
    
    
      getShape = async () => {
        const resp = await axios.get('http://3.92.192.76:8000/womanShape/')
        console.log('shape is serving....')
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
        return(
            <ScrollView>
            <ImageBackground
            source={require('../Image/bg.png')}
            style={styles.ImageBackgroundStyle}>
            <Text style={styles.header}>Select Your Shape </Text>
            <View style={styles.container}>
              {
                this.state.data.map((v,index) => {
                  return <Card style={styles.cardStyle} 
                  key={index} picture={v.shapePictureUrl} name={v.shapeName}></Card>
                })
              }
      
            </View>
              
              </ImageBackground>
              </ScrollView>
      
              );
          }
      }
      
      export default FemaleShapeScreen
      
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