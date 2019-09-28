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
import Images from '../Components/Images'

// create a component
class MyClass extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            
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


    analyzeShape = () => {
        axios.post('http://3.92.192.76:8000/analyzeShape/', {
            shoulder: this.state.shoulderB.leftPosition-this.state.shoulderA.leftPosition,
            chest: this.state.chestB.leftPosition-this.state.chestA.leftPosition,
            waist: this.state.waistB.leftPosition-this.state.waistA.leftPosition,
            hip: this.state.hipB.leftPosition-this.state.hipA.leftPosition,
            leg: this.state.legB.leftPosition-this.state.legA.leftPosition
        }).then(res => {
            this.createUser(res.data);
        })
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
                
                <View style={styles.navbar}>
                    {/* <View style={styles.finishButton}> */}
                    <TouchableOpacity onPress={() => this.analyzeShape()}>
                        <Image source={require('../Image/doneButton.png')} style={styles.finishButton}></Image>
                    </TouchableOpacity>
                    
                    {/* </View> */}
                </View>
               
               
                <View style={styles.pictureArea}>
                    <ImageBackground source={{uri:this.state.user.bodyPicture}} style={{width: '100%', height: '100%'}}>
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
                            <TouchableOpacity onPress={() => {
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
                            </TouchableOpacity>
                        </View>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableOpacity onPress={() => {
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
                            </TouchableOpacity>
                        </View>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableOpacity onPress={() => {
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
                            </TouchableOpacity>
                        </View>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableOpacity onPress={() => {
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
                            </TouchableOpacity>
                        </View>

                        <View style={styles.analyzeBarGrid}>
                            <TouchableOpacity onPress={() => {
                                
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
                                
                            </TouchableOpacity>
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
        flex: 7,
        backgroundColor: '#EAEAEA'
    },
    analyzeBar:{
        flex: 2,
        backgroundColor: '#F3F3F3',
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
        color: '#E6E6E6',
        fontSize: 11.5,
        fontWeight: '300',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -0.2, height: 0.2},
        textShadowRadius: -2

    },
    toCenter:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneStyle:{
        color: 'blue'
    }
});

//make this component available to the app
export default MyClass;
