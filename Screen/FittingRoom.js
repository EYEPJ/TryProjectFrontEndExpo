import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import ShowClothes from "./showClothes";
class FittingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStyle: {
        width: "50%",
        height: "100%",
        backgroundColor: "white",
        position: "absolute",
        zIndex: 10,

        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      },
      isShow: false
    };
  }

  toggle = () => {
    const isShow = this.state.isShow;
    this.setState({ isShow: !isShow });
  };

  render() {
    return (
      <View>
        <Button title="SHOW" onPress={this.toggle}></Button>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%"
          }}
        >
          {this.state.isShow ? (
            <View style={this.state.showStyle}>
              <ShowClothes type="test" />
            </View>
          ) : (
            <View />
          )}
          <View style={{ width: "100%", zIndex: 5 }}>
            <Text>View 2</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default FittingRoom;

