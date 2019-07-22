//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

// create a component
class SkinColorScreen extends Component {

    state = {
        data: [],
        user: this.props.navigation.state.params.user
    }


        
    setUserinfo = (skinId) => {
        console.log(skinId)
        this.state.user.skin = skinId;
        this.createUser();
        this.props.navigation.navigate('Profile', {
          user: this.state.user
        });
        console.log(this.state.user)
    }

    createUser = () => {
        axios.post('http://localhost:8000/createUser/', {
            fbId: this.state.user.fbId,
            userName: this.state.user.name,
            userProfile: this.state.user.profilePic,
            userBodyPictureUrl: "",
            userGender: this.state.user.gender,
            shapeId: this.state.user.shape,
            skinColorId: this.state.user.skin
        }).then(res => {
            console.log(res);
            console.log(res.data);
      })
    }
        
    componentDidMount() {
        axios.get('http://3.92.192.76:8000/skinColorManagement/')
            .then(res => {
        const data = res.data;
        console.log(data)
        this.setState({ data });
        console.log('test', data)
      })
  }


    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.data.map((v,index) => {
                        return (
                            <TouchableOpacity onPress={() => this.setUserinfo(v.id)}> 
                                <View style={{width: 50, height: 50, backgroundColor:v.skinColorCode}}></View>  
                            </TouchableOpacity>
                        )
          })
        }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SkinColorScreen;
