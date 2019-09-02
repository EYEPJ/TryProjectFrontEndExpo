import React from 'react'
import { StyleSheet, Text, View, PanResponder } from 'react-native'

export default class App extends React.Component {
  state = {
    top: 0,
    left: 0,
    topTransition: 0,
    leftTransition: 0,
  }

  componentWillMount() {
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
      top: top + topTransition,
      left: left + leftTransition,
    }

    return (
      <View {...this.panResponder.panHandlers} style={[styles.box, style]}>
        <Text>Point</Text>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    backgroundColor: 'salmon',
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})