//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button ,ImageBackground, Image} from 'react-native';
import ShoulderPointA from '../Components/Point';
import ShoulderPointB from '../Components/Point';
import ChestPointA from '../Components/Point';
import ChestPointB from '../Components/Point';
import WaistPointA from '../Components/Point';
import WaistPointB from '../Components/Point';
import HipPointA from '../Components/Point';
import HipPointB from '../Components/Point';
import LegPointA from '../Components/Point';
import LegPointB from '../Components/Point';
import Svg,{Line} from 'react-native-svg';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShowAndHide from '../Components/ShowAndHide';
import { LinearGradient } from 'expo-linear-gradient';
import Images from '../Components/Images';
import TouchableScale from 'react-native-touchable-scale';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';


// create a component
class MyClass extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {

            loading: false,
            useButton: true,
            
            user: this.props.navigation.state.params.user,

            shoulderStatus: true,
            chestStatus: false,
            waistStatus: false,
            hipStatus: false,
            legStatus: false,

            button:{
                shoulder: Images.analyzeButton.select,
                chest: Images.analyzeButton.unSelect,
                waist: Images.analyzeButton.unSelect,
                hip: Images.analyzeButton.unSelect,
                leg: Images.analyzeButton.unSelect
            },

            shoulderA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 90,
                topPosition: 300,
            },
            shoulderB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 290,
                topPosition: 300,
            },
            chestA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 90,
                topPosition: 300,
            },
            chestB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 290,
                topPosition: 300,
            },
            waistA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 90,
                topPosition: 300,
            },
            waistB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 290,
                topPosition: 300,
            },
            hipA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 90,
                topPosition: 300,
            },
            hipB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 290,
                topPosition: 300,
            },
            legA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 90,
                topPosition: 300,
            },
            legB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 290,
                topPosition: 300,
            },
        };
    }

    checkUserIsExist = async (fbId) => {
        resp = await axios.post('http://3.92.192.76:8000/checkUserIsExist/',{
          fbId: fbId
        });
        return await resp.data.result
        
      }

    analyzeShape = async () => {
        this.setState({loading: true, useButton:false})
        axios.post('http://3.92.192.76:8000/analyzeShape/', {
            shoulder: this.state.shoulderB.leftPosition-this.state.shoulderA.leftPosition,
            chest: this.state.chestB.leftPosition-this.state.chestA.leftPosition,
            waist: this.state.waistB.leftPosition-this.state.waistA.leftPosition,
            hip: this.state.hipB.leftPosition-this.state.hipA.leftPosition,
            leg: this.state.legB.leftPosition-this.state.legA.leftPosition,
            gender: this.state.user.gender
        }).then(async res => {
            if(await this.checkUserIsExist(this.state.user.fbId)){
                console.log('update')
                this.updateBodyPicture()
            }else{
                console.log('first time')
                this.createUser(res.data)
            }
            this.setState({loading: false, useButton:true})
        })
    }

    updateBodyPicture = () =>{
        axios.post('http://3.92.192.76:8000/updateUserBodyPictureUrl/', {
            fbId: this.state.user.fbId,
            url: this.state.user.bodyPicture,
        }).then(
            this.props.navigation.navigate('MainScreen', {
                fbId: this.state.user.fbId,
                picture: this.props.navigation.state.params.picture
            })
        );
    }

    createUser = (shapeId) => {
        axios.post("http://3.92.192.76:8000/createUser/", {
            fbId: this.state.user.fbId,
            userName: this.state.user.name,
            userProfile: this.state.user.profilePic,
            userBodyPictureUrl: this.state.user.bodyPicture,
            userGender: this.state.user.gender,
            shapeId: shapeId,
        }).then(
            this.props.navigation.navigate('MainScreen', {
                fbId: this.state.user.fbId
            })
        );
        
    };

    setShoulderA = (position) => {
        this.setState({
            shoulderA:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
    }

    setShoulderB = (position) => {
        this.setState({
            shoulderB:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
    }

    setChestA = (position) => {
        this.setState({
            chestA:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
    }

    setChestB = (position) => {
        this.setState({
            chestB:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
    }

    setWaistA = (position) => {
        this.setState({
            waistA:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
    }

    setWaistB = (position) => {
        this.setState({
            waistB:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
    }

    setHipA = (position) => {
        this.setState({
            hipA:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
    }

    setHipB = (position) => {
        this.setState({
            hipB:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
    }

    setLegA = (position) => {
        this.setState({
            legA:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
        // console.log(this.state.legA.leftPosition)
        console.log(this.state.legA.left)
        console.log(this.state.legA.top)
    }

    setLegB = (position) => {
        this.setState({
            legB:{
                top: position.top,
                left: position.left,
                topTransition: position.topTransition,
                leftTransition: position.leftTransition,
                leftPosition: position.leftTransition+position.left,
                topPosition: position.topTransition+position.top,
            }
        })
        console.log(this.state.legB.leftPosition)
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
            
            <View style={{flex:0.55,  backgroundColor: '#EBEBEB'}}></View>
        
            <View style={{flex: 1, backgroundColor: '#EBEBEB', alignItems:'center', flexDirection:'row'}}>
          
                <View style={{flex: 1, top: '1.5%'}}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{left: '50%'}}>
                        <Image source={require('../Image/backButton.png')} style={styles.backButton}/>
                    </TouchableOpacity>
                </View>
      
                <View style={{flex: 10}}>
                    <Text style={styles.headerText}>Analyze Your Body</Text>
                </View>
      
                <View style={{flex: 1, top: '1.5%', left: '-20%'}}>
                    {ShowAndHide(this.state.useButton)(
                        <TouchableOpacity onPress={() => {this.analyzeShape()}} style={{}}>
                            <Image source={require('../Image/yes.png')} style={styles.yesButton}/>
                        </TouchableOpacity>
                    )}

                    {ShowAndHide(this.state.loading)(
                        <UIActivityIndicator color='#5A5A5A' trackWidth='1' size={20}/>
                    )}
                    
                </View>

            </View>
            
                 
               
               
                <View style={styles.pictureArea}>
                    <ImageBackground source={{uri:this.props.navigation.state.params.picture}} style={{width: '100%', height: '100%'}}>
                    {ShowAndHide(this.state.shoulderStatus)(
                        <View>
                            <View>
                                <Svg height="100%" width="100%">
                                    <Line x1={this.state.shoulderA.leftPosition+10} 
                                        y1={this.state.shoulderA.topPosition+10}  
                                        x2={this.state.shoulderB.leftPosition+10} 
                                        y2={this.state.shoulderB.topPosition+10} 
                                        stroke="#949494" 
                                        strokeWidth="1"
                                        strokeDasharray="2"
                                        />
                                </Svg>
                            </View>
                            <ShoulderPointA top = {this.state.shoulderA.topPosition} left = {this.state.shoulderA.leftPosition} pointPosition = {this.setShoulderA}></ShoulderPointA>
                            <ShoulderPointB top = {this.state.shoulderB.topPosition} left = {this.state.shoulderB.leftPosition} pointPosition = {this.setShoulderB}></ShoulderPointB>
                        </View>
                    )}

                    {ShowAndHide(this.state.chestStatus)(
                        <View>
                            <View>
                                <Svg height="100%" width="100%">
                                    <Line x1={this.state.chestA.leftPosition+10} 
                                          y1={this.state.chestA.topPosition+10}  
                                          x2={this.state.chestB.leftPosition+10} 
                                          y2={this.state.chestB.topPosition+10} 
                                          stroke="#949494" 
                                          strokeWidth="1"
                                          strokeDasharray="2"/>
                                </Svg>
                            </View>
                            <ChestPointA top = {this.state.chestA.topPosition} left = {this.state.chestA.leftPosition} pointPosition = {this.setChestA}></ChestPointA>
                            <ChestPointB top = {this.state.chestB.topPosition} left = {this.state.chestB.leftPosition} pointPosition = {this.setChestB}></ChestPointB>
                        </View>
                    )}
                    
                    {ShowAndHide(this.state.waistStatus)(
                        <View>
                            <View>
                                <Svg height="100%" width="100%">
                                    <Line x1={this.state.waistA.leftPosition+10} 
                                          y1={this.state.waistA.topPosition+10}  
                                          x2={this.state.waistB.leftPosition+10} 
                                          y2={this.state.waistB.topPosition+10} 
                                          stroke="#949494" 
                                          strokeWidth="1"
                                          strokeDasharray="2"/>
                                </Svg>
                            </View>
                            <WaistPointA top = {this.state.waistA.topPosition} left = {this.state.waistA.leftPosition} pointPosition = {this.setWaistA}></WaistPointA>
                            <WaistPointB top = {this.state.waistB.topPosition} left = {this.state.waistB.leftPosition} pointPosition = {this.setWaistB}></WaistPointB>
                        </View>
                    )}

                    {ShowAndHide(this.state.hipStatus)(
                        <View>
                            <View>
                                <Svg height="100%" width="100%">
                                    <Line x1={this.state.hipA.leftPosition+10} 
                                          y1={this.state.hipA.topPosition+10}  
                                          x2={this.state.hipB.leftPosition+10} 
                                          y2={this.state.hipB.topPosition+10} 
                                          stroke="#949494" 
                                          strokeWidth="1"
                                          strokeDasharray="2"/>
                                </Svg>
                            </View>
                            <HipPointA top = {this.state.hipA.topPosition} left = {this.state.hipA.leftPosition} pointPosition = {this.setHipA}></HipPointA>
                            <HipPointB top = {this.state.hipB.topPosition} left = {this.state.hipB.leftPosition} pointPosition = {this.setHipB}></HipPointB>
                        </View>
                    )}

                    {ShowAndHide(this.state.legStatus)(
                        <View>
                            <View>
                                <Svg height="100%" width="100%">
                                    <Line x1={this.state.legA.leftPosition+10} 
                                          y1={this.state.legA.topPosition+10}  
                                          x2={this.state.legB.leftPosition+10} 
                                          y2={this.state.legB.topPosition+10} 
                                          stroke="#949494" 
                                          strokeWidth="1"
                                          strokeDasharray="2"/>
                                </Svg>
                            </View>
                            <LegPointA top = {this.state.legA.topPosition} left = {this.state.legA.leftPosition} pointPosition = {this.setLegA}></LegPointA>
                            <LegPointB top = {this.state.legB.topPosition} left = {this.state.legB.leftPosition} pointPosition = {this.setLegB}></LegPointB>
                        </View>
                    )}
                    

                    {/* <Image source={{uri: this.state.user.bodyPicture}} style={{width: '100%', height: '100%'}}></Image> */}
                    </ImageBackground>
                </View>


                <View style={styles.analyzeBar}>
                    <View style={{flex: 1, flexDirection: 'row'}}>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableScale onPress={() => {
                                this.setState({
                                    shoulderStatus: true,
                                    chestStatus: false,
                                    waistStatus: false,
                                    hipStatus: false,
                                    legStatus: false,
                                    
                                    button:{
                                        shoulder: Images.analyzeButton.select,
                                        chest: Images.analyzeButton.unSelect,
                                        waist: Images.analyzeButton.unSelect,
                                        hip: Images.analyzeButton.unSelect,
                                        leg: Images.analyzeButton.unSelect
                                    },
                                })
                            }}>
                                <View style={styles.toCenter}>
                                    <Image source={this.state.button.shoulder}  style={styles.circle}></Image>
                                    <Text style={styles.buttonText}>Shoulder</Text>
                                </View>
                            </TouchableScale>
                        </View>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableScale onPress={() => {
                                this.setState({
                                    shoulderStatus: false,
                                    chestStatus: true,
                                    waistStatus: false,
                                    hipStatus: false,
                                    legStatus: false,
                                    
                                    button:{
                                        shoulder: Images.analyzeButton.unSelect,
                                        chest: Images.analyzeButton.select,
                                        waist: Images.analyzeButton.unSelect,
                                        hip: Images.analyzeButton.unSelect,
                                        leg: Images.analyzeButton.unSelect
                                    },
                                })
                            }}>
                                <View style={styles.toCenter}>
                                    <Image source={this.state.button.chest}  style={styles.circle}></Image>
                                    <Text style={styles.buttonText}>Chest</Text>
                                </View>
                            </TouchableScale>
                        </View>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableScale onPress={() => {
                                this.setState({
                                    shoulderStatus: false,
                                    chestStatus: false,
                                    waistStatus: true,
                                    hipStatus: false,
                                    legStatus: false,

                                    button:{
                                        shoulder: Images.analyzeButton.unSelect,
                                        chest: Images.analyzeButton.unSelect,
                                        waist: Images.analyzeButton.select,
                                        hip: Images.analyzeButton.unSelect,
                                        leg: Images.analyzeButton.unSelect
                                    },
                                })
                            }}>
                                <View style={styles.toCenter}>
                                    <Image source={this.state.button.waist}  style={styles.circle}></Image>
                                    <Text style={styles.buttonText}>Waist</Text>
                                </View>
                            </TouchableScale>
                        </View>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableScale onPress={() => {
                                this.setState({
                                    shoulderStatus: false,
                                    chestStatus: false,
                                    waistStatus: false,
                                    hipStatus: true,
                                    legStatus: false,
                                    
                                    button:{
                                        shoulder: Images.analyzeButton.unSelect,
                                        chest: Images.analyzeButton.unSelect,
                                        waist: Images.analyzeButton.unSelect,
                                        hip: Images.analyzeButton.select,
                                        leg: Images.analyzeButton.unSelect
                                    },
                                })
                            }}>
                                <View style={styles.toCenter}>
                                    <Image source={this.state.button.hip}  style={styles.circle}></Image>
                                    <Text style={styles.buttonText}>Hip</Text>
                                </View>
                            </TouchableScale>
                        </View>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableScale onPress={() => {
                                
                                this.setState({
                                    shoulderStatus: false,
                                    chestStatus: false,
                                    waistStatus: false,
                                    hipStatus: false,
                                    legStatus: true,

                                    button:{
                                        shoulder: Images.analyzeButton.unSelect,
                                        chest: Images.analyzeButton.unSelect,
                                        waist: Images.analyzeButton.unSelect,
                                        hip: Images.analyzeButton.unSelect,
                                        leg: Images.analyzeButton.select
                                    },
                                })
                            }}>
                                <View style={styles.toCenter}>
                                    <Image source={this.state.button.leg}  style={styles.circle}></Image>
                                    <Text style={styles.buttonText}>Leg</Text>
                                </View>
                                
                            </TouchableScale>
                        </View>
                        
                    </View>
                </View>
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
    navbar:{
        flex: 1,
        backgroundColor: 'white'
    },
    pictureArea:{
        flex: 10,
        backgroundColor: '#EAEAEA'
    },
    analyzeBar:{
        flex: 3,
        backgroundColor: '#EBEBEB',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    circle: {
        width: 60,
        height: 60,
    },
    analyzeBarGrid:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    finishButton: {
        // width: 30,
        // height: 30,
        // borderRadius: 100/2,
        // backgroundColor: 'red',
        //position: 'absolute',
        top: '10%',
        left: '84%',
        aspectRatio: 0.45,
        resizeMode: 'contain',
    },
    buttonText:{
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        color: '#ADADAD',
        fontSize: 11.5,
        fontWeight: '500',
    },
    toCenter:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneStyle:{
        color: 'blue'
    },
    headerText:{
        fontSize: 17,
        color:'#313131',
        alignSelf: 'center',
        top:'10%'
    },
    backButton:{
        width:11.56,
        height:17.44,
    },
    yesButton:{
        width:18.91,
        height:13.47,
    }
});

//make this component available to the app
export default MyClass;
