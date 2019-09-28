import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Platform, Image, ImageBackground  } from 'react-native'
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { BlendShape } from 'expo/build/AR';
import Gestures from 'react-native-easy-gestures';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ShowAndHide from '../Components/ShowAndHide';
import Images from '../Components/Images'


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {   
        modalGender: false,
        modalPlace: false,
        modalEvent: false,

        clothes: [],
        places: [],
        events: [],

        top_in: "",
        top_out: "",
        bottom: "",
        shoe: "",

        clothesListStatus: false,
        clothesListShowStatus: false,

        topList: false,
        bottomList: false,
        jacketList: false,
        shoesList: false,

        filterShape: '%',
        filterEvent: 1,
        filterPlace: 1,
        filterGender: '%',

        filterShapeStatus: false,
        filterShapeShow: 'All',

        filterGenderStatus: 'All',

        user: {

        },

        clothesBar:{
          top: Images.clothesBar.unSelectTop,
          jacket: Images.clothesBar.unSelectJacket,
          bottom: Images.clothesBar.unSelectBottom,
          shoes: Images.clothesBar.unSelectShoes,
        }
    };
  }
  componentDidMount(){
    this.getAllEvent()
    this.getAllPlace()
    this.getUser(this.props.navigation.state.params.fbId)
  }

  getUser = async (fbId) => {
    resp = await axios.post('http://localhost:8000/getUser/', {
      fbId: fbId
    });

    let user = await resp.data.map( value => {
      return value
    })

    await this.setState({
      user: {
        fbId: user[0].fbId,
        userName: user[0].userName,
        userProfile: user[0].userProfile,
        userBodyPictureUrl: user[0].userBodyPictureUrl,
        userGender: user[0].userGender,
        shapeId: user[0].shapeId,
      }
    })

    console.log(this.state.user)
  }

  ShowModalFunction(visible) {
    console.log(visible)
    this.setState({ModalVisibleStatus: visible});
    console.log('status:'+this.state.ModalVisibleStatus)
    console.log(this.state.top_in)
  }

  getAllPlace = async () => {
    resp = await axios.get('http://localhost:8000/getAllPlace/');
    let places = await resp.data.map( value => {
      return value
    })
    this.setState({places})
  }


  getAllEvent = async () => {
    resp = await axios.get('http://localhost:8000/getAllEvent/');
    let events = await resp.data.map( value => {
      return value
    })
    this.setState({events})
}


  getAllClothes = async (category) => {

      if(this.state.filterShapeStatus === true){
        this.setState({
          filterShape: this.state.user.shapeId
        })
      }else{
        this.setState({
          filterShape: '%'
        })
      }

      resp = await axios.post('http://localhost:8000/getClothesByCategory/',{
        categoryId: category,
        shapeId: this.state.filterShape,
        eventId: this.state.filterEvent,
        placeId: this.state.filterPlace,
        gender: this.state.filterGender,
      });
      
      let clothes = await resp.data.map( value => {
        return value
      })
      this.setState({clothes})
  }

  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
      
      {/* Nav Bar */}

        <View style={styles.navBar}>

        </View>

      {/* End NavBar */}

      {/* filter */}
     




      
        <View style={{flex: 9, flexDirection: 'column'}}>


        <View style={styles.filterBar}>
        <TouchableOpacity onPress={() => {
          this.setState({
            filterShapeStatus: !this.state.filterShapeStatus
          })
          if(this.state.filterShapeStatus === false){
            this.setState({
              filterShapeShow: 'Your Shape!'
            })
          }else{
            this.setState({
              filterShapeShow: 'All'
            })
          }
          }}  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
           <Text>{this.state.filterShapeShow}</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          this.setState({
            modalGender: true
          })}}  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Text>Gender</Text>
          </View>
        </TouchableOpacity>
                                                                                          
        <TouchableOpacity onPress={() => {
          this.setState({
          modalPlace: true
          })}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Text>Place</Text>
          </View>
        </TouchableOpacity>
                
        <TouchableOpacity onPress={() => {
          this.setState({
          modalEvent: true
          })}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
          <View>
            <Text>Event</Text>
          </View>
        </TouchableOpacity>
      </View>


      
          <View style={styles.pictureArea}>
          <ImageBackground source={{uri:this.state.user.userBodyPictureUrl}} style={{width: '100%', height: '100%'}}>
          {ShowAndHide(this.state.clothesListStatus)(
            <View style={styles.clothesList}>
              <ScrollView style={{backgroundColor: 'white'}}>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                  {
                    this.state.clothes.map((v, index) => {
                      return(
                        <TouchableOpacity key={index} onPress={() => {
                          this.setState({
                            clothesListStatus: false,
                            topList: false,
                            bottomList: false,
                            jacketList: false,
                            shoesList: false,
                          })
                          this.setState({top_in: v.clothePictureUrl})
                        }}>
                          <View style={styles.item} >
                            <Image key={index} style={{width: 80, height: 100}} source={{uri : v.clothePictureUrl}}></Image>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                  </View>
                </ScrollView>
            </View>
          )}
          </ImageBackground>
          </View>

          
          



          <View style={styles.categoryBar}>

            <TouchableOpacity onPress={() => {
              this.getAllClothes(5)
              if(this.state.topList === false){
                this.setState({
                clothesListStatus: true,
                topList: true,
                jacketList: false,
                bottomList: false,
                shoesList: false,
              })
              }else{
                this.setState({
                clothesListStatus: false,
                topList: false
              })
              }
            }}
              style={styles.eachCategory}>
                <View style={styles.toCenter}>
                  <Image source={this.state.clothesBar.top} style={styles.eachClothBar}></Image>
                </View>
            </TouchableOpacity>

            
            
            <TouchableOpacity onPress={() => {
              this.getAllClothes(7)
              if(this.state.jacketList === false){
                this.setState({
                clothesListStatus: true,
                topList: false,
                jacketList: true,
                bottomList: false,
                shoesList: false,
              })
              }else{
                this.setState({
                clothesListStatus: false,
                jacketList: false
              })
              }
            }}
              style={styles.eachCategory}>
                <View style={styles.toCenter}>
                <Image source={this.state.clothesBar.jacket} style={styles.eachClothBar}></Image>
                </View>
            </TouchableOpacity>



            <TouchableOpacity onPress={() => {
              this.getAllClothes(8)
              if(this.state.bottomList === false){
                this.setState({
                clothesListStatus: true,
                topList: false,
                jacketList: false,
                bottomList: true,
                shoesList: false,
              })
              }else{
                this.setState({
                clothesListStatus: false,
                bottomList: false
              })
              }
            }
            }
              style={styles.eachCategory}>
                <View style={styles.toCenter}>
                <Image source={this.state.clothesBar.bottom} style={styles.eachClothBar}></Image>
                </View>
            </TouchableOpacity>
          


            <TouchableOpacity onPress={() => {
              this.getAllClothes(3)
              if(this.state.shoesList === false){
                this.setState({
                clothesListStatus: true,
                topList: false,
                jacketList: false,
                bottomList: false,
                shoesList: true,
              })
              }else{
                this.setState({
                clothesListStatus: false,
                shoesList: false
              })
              }
            }}
              style={styles.eachCategory}>
                <View style={styles.toCenter}>
                <Image source={this.state.clothesBar.shoes} style={styles.eachClothBar}></Image>
                </View>
            </TouchableOpacity>

          </View>
        </View>

        {/* Modal Area */}

        {/* Modal Gender */}
        <Modal
          isVisible={this.state.modalGender}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          hasBackdrop={false}
          style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}>      
          <View style={{flexDirection: 'column', backgroundColor: 'white', width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
            
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=>{
                this.setState({
                  filterGender: '%',
                  modalGender: false
                })}}>
                  <Text>All</Text>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=>{
                this.setState({
                  filterGender: 'm',
                  modalGender: false
                })}}>
                  <Text>Man</Text>
              </TouchableOpacity>
            </View>
      
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=>{
                this.setState({
                filterGender: 'w',
                modalGender: false
                })}}>
                  <Text>Woman</Text>
              </TouchableOpacity>
            </View>
           </View>
        </Modal>

        {/* Place Modal */}
        <Modal
          isVisible={this.state.modalPlace}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          hasBackdrop={false}>
            <ScrollView style={{width: '90%', height:'20%', backgroundColor: 'white', }}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                {
                  this.state.places.map((v, index) => {
                    return(
                      <TouchableOpacity key={index} onPress={() => {
                        this.setState({
                          modalPlace: false
                        })
                      }}>
                        <View><Text key={index}>{v.place}</Text></View>
                      </TouchableOpacity>
                    )
                  })
                }
          </View>
          </ScrollView>
        </Modal>

       
       
      {/* Event Modal */}
        <Modal
          isVisible={this.state.modalEvent}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          hasBackdrop={false}>
            <ScrollView style={{backgroundColor: 'white',}}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                {
                  this.state.events.map((v, index) => {
                    return(
                      <TouchableOpacity key={index} onPress={() => {
                        this.setState({
                          modalEvent: false
                        })
                      }}>
                        <View><Text key={index}>{v.event}</Text></View>
                      </TouchableOpacity>
                    )
                  })
                }
          </View>
          </ScrollView>
        </Modal>

        {/* Modal End */}
        
      </View>
    



      // <View style={{flex: 1, flexDirection: 'row'}}>
      //   <Modal
      //     isVisible={this.state.ModalVisibleStatus}
      //     animationIn="slideInLeft"
      //     animationOut="slideOutLeft"
      //     hasBackdrop={false}>
      //       <ScrollView style={{width: '90%', height:'100%', backgroundColor: 'white'}}>
      //       <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
      //         {
      //           this.state.clothes.map((v, index) => {
      //             return(
      //               <TouchableOpacity onPress={() => {
      //                 this.ShowModalFunction(!this.state.ModalVisibleStatus)
      //                 this.setState({top_in: v.clothePictureUrl})
      //               }}>
      //               <View style={styles.item} >
      //                 <Image style={{width: 80, height: 100}} source={{uri : v.clothePictureUrl}}></Image>
      //               </View>
      //               </TouchableOpacity>
      //             )
      //           })
      //         }
      //     </View>
      //     </ScrollView>
      //   </Modal>
      //   <View style={styles.clothesArea}>
      //     <Text>A</Text>
      //   </View>
      //   <View style={styles.tryArea}>
      //     <TouchableOpacity onPress={() => {
      //       this.getAllClothes()
      //       this.ShowModalFunction(true)
      //       }}>
      //       <View style={{backgroundColor: 'green', width: 50, height: 50,}}></View>
      //     </TouchableOpacity>

      //     <Gestures rotatable={true} scalable={true}>
      //       <Image source={{uri: this.state.top_in}} style={{width: 50, height: 50}}/>
      //     </Gestures>
          
          
      //   </View>
      //   <View style={styles.optionArea}>
      //     <Text>A</Text>
      //   </View>
      // </View>

           
   );
 }
}

const styles = StyleSheet.create({
MainContainer :{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  //marginTop: (Platform.OS == 'ios') ? 20 : 0,
  flexDirection: 'column',
},
clothesBar: {
  backgroundColor: 'white',
  marginLeft: -19,
  marginTop: -30,
  height: '100%',
  width: '95%',
  flexDirection: 'row',
  flexWrap: 'wrap',
},

TextStyle:{
  fontSize: 20, 
  marginBottom: 20, 
  color: "#fff",
  padding: 20,
  textAlign: 'center'

},
clothesArea: {
  flex: 2,
  backgroundColor: 'red'
},

tryArea: {
flex: 5,
backgroundColor: 'blue'
},

optionArea: {
flex: 1,
backgroundColor: 'white'
},

item: {
  width: 130, 
  height: 150, 
  backgroundColor:'pink', 
  marginBottom:10, 
  marginLeft:10, 
  justifyContent: 'center',
  alignItems: 'center'
},
imageStyle:{
  width: '100%',
  height:'250',
  alignItems: 'center'
},
navBar:{
  flex: 1,
  backgroundColor: 'white',
},
filterBar:{
  flex: 1,
  backgroundColor: '#F9F9F9',
  flexDirection: 'row',
},
pictureArea:{
  flex: 20,
  backgroundColor: '#F3F3F3',
},
categoryBar:{
  flex: 2,
  backgroundColor: '#F9F9F9',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
},
eachCategory:{
  flex: 1,
  width: '50%',
  height: '50%',

},
clothesList:{
  flex: 16,
},
eachClothBar:{
  width: 35,
  height: 35,
},
toCenter:{
  justifyContent: 'center',
  alignItems: 'center'
},
bottomModal: {
  justifyContent: 'flex-end',
  margin: 0,
},
});