import React from 'react'
import { StyleSheet, Text, View, PanResponder, } from 'react-native'

export default class App extends React.Component {
  state = {
    top: 0,
    left: 0,
    topTransition: 0,
    leftTransition: 0,
  }

  componentWillMount() {
    
    this.setState({
      top: this.props.top,
      left: this.props.left,
    })

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        return true
      },
      onPanResponderMove: (e, gestureState) => {
        const { dy, dx } = gestureState

        this.setState({
          topTransition: dy,
          leftTransition: dx,
        })
        this.getStateOfPoint()
      },
      onPanResponderRelease: (e, gestureState) => {
        const { top, left } = this.state
        const { dy, dx } = gestureState

        this.setState({
          top: top + dy,
          left: left + dx,
          topTransition: 0,
          leftTransition: 0,
        }) 
      }
    })
  }

  getStateOfPoint = () => {
      this.props.pointPosition(this.state)
  }


  render() {
    const { top, left, topTransition, leftTransition } = this.state
    const style = {
      top: this.props.top,
      left: this.props.left,
    }
  

    return (
      <View {...this.panResponder.panHandlers} style={[styles.box, style]}>
        {/* <Image source={require('../Image/selectedButton.png')} ></Image> */}
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    backgroundColor: '#FCB828',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100/2,
  },
})