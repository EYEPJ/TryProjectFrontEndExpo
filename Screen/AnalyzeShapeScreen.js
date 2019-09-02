//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
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

// create a component
class MyClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.navigation.state.params.user,
            shoulderA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            shoulderB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            chestA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            chestB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            waistA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            waistB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            hipA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            hipB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            legA: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
            legB: {
                top: 0,
                left: 0,
                topTransition: 0,
                leftTransition: 0,
                leftPosition: 0,
                topPosition: 0,
            },
        };
    }


    analyzeShape = () => {
        axios.post('http://localhost:8000/analyzeShape/', {
            shoulder: this.state.shoulderB.leftPosition-this.state.shoulderA.leftPosition,
            chest: this.state.chestB.leftPosition-this.state.chestA.leftPosition,
            waist: this.state.waistB.leftPosition-this.state.waistA.leftPosition,
            hip: this.state.hipB.leftPosition-this.state.hipA.leftPosition,
            leg: this.state.legB.leftPosition-this.state.legA.leftPosition
        }).then(res => {
            console.log(res.data);
        })
    }

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
        console.log(this.state.legA.leftPosition)
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
            <View>
            <Button title="Press Me" onPress={() => {
                this.analyzeShape

                }}/>
                <View>
                    <Svg height="100%" width="100%">
                        <Line x1={this.state.shoulderA.leftPosition} 
                        y1={this.state.shoulderA.topPosition}  
                        x2={this.state.shoulderB.leftPosition} 
                        y2={this.state.shoulderB.topPosition} 
                        stroke="red" 
                        strokeWidth="2"/>

                        <Line x1={this.state.chestA.leftPosition} 
                        y1={this.state.chestA.topPosition}  
                        x2={this.state.chestB.leftPosition} 
                        y2={this.state.chestB.topPosition} 
                        stroke="red" 
                        strokeWidth="2"/>

                        <Line x1={this.state.waistA.leftPosition} 
                        y1={this.state.waistA.topPosition}  
                        x2={this.state.waistB.leftPosition} 
                        y2={this.state.waistB.topPosition} 
                        stroke="red" 
                        strokeWidth="2"/>

                        <Line x1={this.state.hipA.leftPosition} 
                        y1={this.state.hipA.topPosition}  
                        x2={this.state.hipB.leftPosition} 
                        y2={this.state.hipB.topPosition} 
                        stroke="red" 
                        strokeWidth="2"/>

                        <Line x1={this.state.legA.leftPosition} 
                        y1={this.state.legA.topPosition}  
                        x2={this.state.legB.leftPosition} 
                        y2={this.state.legB.topPosition} 
                        stroke="red" 
                        strokeWidth="2"/>
                    </Svg>
                </View>
                <ShoulderPointA pointPosition = {this.setShoulderA}></ShoulderPointA>
                <ShoulderPointB pointPosition = {this.setShoulderB}></ShoulderPointB>
                <ChestPointA pointPosition = {this.setChestA}></ChestPointA>
                <ChestPointB pointPosition = {this.setChestB}></ChestPointB>
                <WaistPointA pointPosition = {this.setWaistA}></WaistPointA>
                <WaistPointB pointPosition = {this.setWaistB}></WaistPointB>
                <HipPointA pointPosition = {this.setHipA}></HipPointA>
                <HipPointB pointPosition = {this.setHipB}></HipPointB>
                <LegPointA pointPosition = {this.setLegA}></LegPointA>
                <LegPointB pointPosition = {this.setLegB}></LegPointB>
                
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
export default MyClass;
