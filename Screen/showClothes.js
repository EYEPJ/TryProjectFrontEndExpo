import React from "react";
import { Text, View, Image } from "react-native";
import axios from "axios";
class ShowClothes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clothes: undefined
    };
  }
  componentWillMount(){
      this.getAllClothes()
  }

  getAllClothes = async () => {
    resp = await axios.get("http://3.92.192.76:8000/clothesManagement/");
    let clothes = await resp.data.map(value => {
      return value;
    });
    this.setState({ clothes });
    console.log(this.state.clothes)
  };

  render() {
    return (
      <View style={{display:"flex",flexWrap:'wrap',flexDirection:"row"}}>
        {this.state.clothes !== undefined
          ? this.state.clothes.map((data,index) => (
            <View key={index}>
              <Image 
                  style={{ width: 80, height: 100 }}
                  source={{ uri:data.clothePictureUrl }}></Image>
            </View>
            ))
          : console.log("pjpj")}
      </View>
    )
  }
}

export default ShowClothes;
