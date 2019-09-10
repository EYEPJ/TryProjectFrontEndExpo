import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
// let img = '';
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Clothes For Shape"
  };
  constructor(props) {
    super(props);
    this.state = {
      image: ""
    };
  }

 async componentWillMount() {
    // let receiveImage = await this.props.navigation.getParam("imageUri","non");
    // console.log(receiveImage);
  }

  render() {
    let receiveImage =  this.props.navigation.getParam("imageUri","non");
    console.log(receiveImage);
    
    return (
      <View style={styles.container}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: receiveImage ? receiveImage : '' }}
        ></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  }
});
