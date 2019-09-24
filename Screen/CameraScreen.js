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
      url: null,
      user: this.props.navigation.state.params.user
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
      this.state.user.bodyPicture = URL;
      this.props.navigation.navigate("AnalyzeShapeScreen", { user: this.state.user });
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = await firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return await ref.put(blob);
  };

  render() {
    return (
      <View/>
    );
  }
}


