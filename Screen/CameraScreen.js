import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import ApiKeys from "../Screen/ApiKeys";
export default class App extends React.Component {
  static navigationOptions = {
    title: "Analize Your Shape By Picture"
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: null
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    this.takePicture();
  }

  takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({});
    if (result.uri) {
      let split = result.uri.split("/");
      let name = split[split.length - 1];
      await this.uploadImage(result.uri, name)
      let URL  = await firebase.storage().ref().child("images/" + name).getDownloadURL()
      this.props.navigation.navigate("Test", { imageUri: URL });
      
    }
  };
  // takePicture = async () => {
  //   let result = await ImagePicker.launchCameraAsync({});
  //   if (result.uri) {
  //     let split = result.uri.split("/");
  //     let name = split[split.length - 1];
  //     // console.log("this is log ",name,name.length,name[name.length-1]);
  //     this.uploadImage(result.uri, name).then(() => {
  //       firebase
  //         .storage()
  //         .ref()
  //         .child("images/" + name)
  //         .getDownloadURL()
  //         .then(function(url) {
  //           if (url) {
  //             this.setState(url);
  //           }
  //         });
  //     });
  //   }
  //   if (result.uri != "") {
  //     // console.log(this.state);

  //     this.setState({ image: result.uri });
  //     this.props.navigation.navigate("Test", { imageUri: this.state.result });
  //   }
  //   this.setState({ image: result });
  // };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.result }} />
        <View style={styles.row}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 21
  },
  row: { flexDirection: "row" },
  image: { width: "100%", height: "100%", backgroundColor: "gray" },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: "#dddddd"
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  }
});
