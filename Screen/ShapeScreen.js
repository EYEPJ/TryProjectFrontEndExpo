import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import axios from 'axios'

class SelectShapeOptionScreen extends React.Component {
  static navigationOptions = {
    title: 'สวัสดี',
  };

  state = {
      shapes: []
  }

  componentDidMount() {
    axios.get('http://3.92.192.76:8000/womanShape/')
      .then(res => {
        const shapes = res.data;
        this.setState({ shapes });
      })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        { this.state.shapes.map(shape => 
            <Image source={{uri: ''+shape.shapePictureUrl+''}} style = {{ width: 200, height: 200 }}/>)
        }
      </View>
    )
  }
}

export default SelectShapeOptionScreen