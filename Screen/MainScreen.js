import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Platform, Image, ImageBackground, TouchableHighlight, Linking,  } from 'react-native'
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { BlendShape } from 'expo/build/AR';
import Gestures from 'react-native-easy-gestures';
import ShowAndHide from '../Components/ShowAndHide';
import Images from '../Components/Images';
import TouchableScale from 'react-native-touchable-scale';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import * as Animatable from "react-native-animatable";


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {   

        clothesLoading: false,

        pictureBody: null,

        modalGender: false,
        modalPlace: false,
        modalEvent: false,

        clothes: [],
        places: [],
        events: [],
        favorite: [],

        top: {
          image: " ",
          name: " ",
          detail: " ",
          brand: " ",
          link: " ",
          id: " ",
          categoryId: " ",
        },
        jacket: {
          image: " ",
          name: " ",
          detail: " ",
          brand: " ",
          link: " ",
          id: " ",
          categoryId: " ",
        },
        bottom: {
          image: " ",
          name: " ",
          detail: " ",
          brand: " ",
          link: " ",
          id: " ",
          categoryId: " ",
        },
        dress: {
          image: " ",
          name: " ",
          detail: " ",
          brand: " ",
          link: " ",
          id: " ",
          categoryId: " ",
        },

        clothesListStatus: false,
        filterModalStatus: false,
        hamburgerModalStatus: false,
        clothesDetailStatus: false,
        favoriteStatus: false,

        clothesListShowStatus: false,

        topList: false,
        bottomList: false,
        jacketList: false,
        shoesList: false,


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
        },

        topStatus: false,
        jacketStatus: false,
        bottomStatus: false,
        dressStatus: false,

        shapeAnalyzeButtonText: 'All Body Shape',
        shapeAnalyzeButtonColor: '#EBEBEB',
        shapeAnalyzeButtonTextColor: '#313131',
        shapeAnalyzeButtonStatus: false,

        genderFilterButtonValue: '%',
        eventsFilterButtonValue: '%',
        placesFilterButtonValue: '%',
        shapeFilterButtonValue: '%',

        clotheDetailImage: " ",
        clotheDetailName: " ",
        clotheDetailBrand: " ",
        clotheDetail: " ", 
        clotheDetailLink: " ",
        clotheDetailId: " ",   
        clotheDetailCategoryId: " ", 
        
        topImageAnimation: "bounceIn",

    };
  }

  onPressShapeAnalyzeButton = async () => {
    await this.setState({shapeAnalyzeButtonStatus: !this.state.shapeAnalyzeButtonStatus})
    if(this.state.shapeAnalyzeButtonStatus === true){
      this.setState({
        shapeAnalyzeButtonText: 'Your Body Shape',
        shapeAnalyzeButtonColor: 'black',
        shapeAnalyzeButtonTextColor: '#EBEBEB'})
    }else{
      this.setState({
        shapeAnalyzeButtonText: 'All Body Shape',
        shapeAnalyzeButtonColor: '#EBEBEB',
        shapeAnalyzeButtonTextColor: '#313131'})
    }
    
  }


  async componentDidMount(){
    this.getAllEvent()
    this.getAllPlace()
    await this.getUser(this.props.navigation.state.params.fbId)
    this.getShapeName()
  }

  // async componentDidUpdate(prevProps, prevState){
  //   console.log('prev: '+ prevState.user.userBodyPictureUrl)
  //   console.log('now: '+ this.state.user.userBodyPictureUrl)
  //   // if(prevState.user.userName == this.state.user.userName){
      
  //   // }
  // }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextState.user.userBodyPictureUrl != this.state.user.userBodyPictureUrl){
  //     console.log('next: '+ nextState.user.userBodyPictureUrl)
  //     console.log('this: '+ this.state.user.userBodyPictureUrl)
  //     return true
  //   }
  // }

  // componentDidUpdate(){
  //   this.getUser(this.props.navigation.state.params.fbId)
  // }




  getShapeName = async () => {
    await this.getUser(this.props.navigation.state.params.fbId)
    resp = await axios.post('http://3.92.192.76:8000/getShapeName/', {
      shapeId: this.state.user.shapeId
    })
    this.setState({
      shapeName: resp.data.result,
    })

  }

  getUser = async (fbId) => {
    resp = await axios.post('http://3.92.192.76:8000/getUser/', {
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

  goToAnalyze = () =>{
    this.props.navigation.navigate('SelectShape',{
      user:{
        fbId: this.state.user.fbId,
        name: this.state.user.userName,
        profilePic: this.state.user.userBodyPictureUrl,
        gender: this.state.user.userGender,
        bodyPicture: this.state.user.userBodyPictureUrl,
        shapeId: this.state.user.shapeId,
    }})
    this.setState({
      hamburgerModalStatus: false
    })
  }

  getAllPlace = async () => {
    resp = await axios.get('http://3.92.192.76:8000/getAllPlace/');
    let places = await resp.data.map( value => {
      return value
    })
    this.setState({places})
  }

  getAllEvent = async () => {
    resp = await axios.get('http://3.92.192.76:8000/getAllEvent/');
    let events = await resp.data.map( value => {
      return value
    })
    this.setState({events})
  }

  getFavorite = async () => {
    this.setState({clothesLoading: true})
    resp = await axios.post('http://3.92.192.76:8000/getFavoriteByUserId/',{
      id: this.state.user.fbId,
    });

    let favorite = await resp.data.map( value => {  
      return value
    })
    this.setState({favorite})
    this.setState({clothesLoading: false})
  }


  getAllClothes = async (category) => {
      this.setState({clothesListStatus: true, clothesLoading: true})

      this.setState({clothes: []})

      resp = await axios.post('http://3.92.192.76:8000/getClothesByCategory/',{
        categoryId: category,
        shapeId: this.state.shapeAnalyzeButtonStatus == true ? this.state.user.shapeId : '%' ,
        eventId: this.state.eventsFilterButtonValue,
        placeId: this.state.placesFilterButtonValue,
        gender: this.state.genderFilterButtonValue,
      });

      let clothes = await resp.data.map( value => {
        return value
      })
      await this.setState({clothes})
      this.setState({clothesLoading: false})
  }

  getBrandName = async (clotheBrand) => {  
    resp = await axios.post('http://3.92.192.76:8000/getBrandName/',{
      id: clotheBrand,
    });
    return await resp.data[0].brandName
    
  }

  chooseThisOne = (categoryId, clothePicUrl, clotheName, clotheDetail, clotheBrandId, clotheLink, id) => {
    if(categoryId === 8){
      this.setState({
        top: {
          image: clothePicUrl,
          name: clotheName,
          detail: clotheDetail,
          brand: clotheBrandId,
          link: clotheLink,
          id: id,
          categoryId: categoryId,
        },
        topStatus: true,
      })
    }
    else if(categoryId === 3){
      this.setState({
        dress: {
          image: clothePicUrl,
          name: clotheName,
          detail: clotheDetail,
          brand: clotheBrandId,
          link: clotheLink,
          id: id,
          categoryId: categoryId,
        },
        dressStatus: true,
      })
    }
    else if(categoryId === 5){
      this.setState({
        bottom: {
          image: clothePicUrl,
          name: clotheName,
          detail: clotheDetail,
          brand: clotheBrandId,
          link: clotheLink,
          id: id,
          categoryId: categoryId,
        },
        bottomStatus: true,
      })
    }
    else if(categoryId === 7){
      this.setState({
        jacket: {
          image: clothePicUrl,
          name: clotheName,
          detail: clotheDetail,
          brand: clotheBrandId,
          link: clotheLink,
          id: id,
          categoryId: categoryId,
        },
        jacketStatus: true,
      })
    }
    this.setState({clothesListStatus: false})
  }

  addFavorite = async (clotheId) => {  
    resp = await axios.post('http://3.92.192.76:8000/addFavorite/',{
      user: this.state.user.fbId,
      clothe: clotheId
    });
  }

  showFavorite = () => {
    setTimeout(() => {
      this.setState({favoriteStatus: true})
    }, 500);
  }

  deleteFav = (clotheId) => {
    this.setState({clothesLoading: true})
    axios.post('http://3.92.192.76:8000/deleteFavorite/',{
      userId: this.state.user.fbId,
      clotheId: clotheId
    }).then(resp => {
      this.getFavorite()
    })
  }


  
  render() {
    return (
      //new
      <View style={{flex: 1, flexDirection: 'column'}}>

        <View style={styles.navBar}>
          <TouchableScale onPress={() => {
            this.setState({hamburgerModalStatus: !this.state.hamburgerModalStatus})
            this.getShapeName()
          }} style={styles.hamburgerBar}>
            <Image source={require('../Image/hamburgerBar.png')} style={styles.hamburgerBar}/>
          </TouchableScale>

          <Text style={styles.pageName}>Fitting Room</Text>
          
          <TouchableScale onPress={() => this.setState({filterModalStatus: !this.state.filterModalStatus})} style={styles.filter}>
            <Image source={require('../Image/filter.png')} style={styles.filter}/>
          </TouchableScale>
        </View>
        
        <Animatable.View style={styles.pictureArea} delay={2000} useNativeDriver={true} animation="fadeIn">
          <ImageBackground source={{uri:this.props.navigation.state.params.picture == null ? this.state.user.userBodyPictureUrl : this.props.navigation.state.params.picture}} style={styles.backgroundBodyShape}>

            {/* Clothes */}
            <Modal
              isVisible={this.state.clothesListStatus}
              onBackdropPress={() => this.setState({ clothesListStatus: false })}
              hasBackdrop={true}
              style={styles.clothesListModal}>
              <View style={styles.clothesList}>
                <ScrollView style={{alignItems: 'center'}}>      
                  <View style={styles.clothesScroll}>
                    {
                      this.state.clothes.map((clothe, index) => {
                        return(
                          <TouchableScale onPress={() => {this.chooseThisOne(clothe.categoryId, clothe.clothePictureUrl, clothe.clotheName, clothe.clotheDrescription, clothe.clotheBrand, clothe.clotheLinkToBuy, clothe.id)}}>
                            <Animatable.Image delay={2000} useNativeDriver={true} animation="fadeIn" style={styles.clotheImage} source={{uri:clothe.clothePictureUrl}}/>
                          </TouchableScale>
                        )
                      })
                    }
                  </View>
                </ScrollView>
                {ShowAndHide(this.state.clothesLoading)(
                  <View style={styles.loadingScreen}>
                    <MaterialIndicator color='#5A5A5A'/>
                  </View>
                )}
              </View>
            </Modal>

            {/* ClotheDetail */}
            <Modal
              isVisible={this.state.clothesDetailStatus}
              onBackdropPress={() => this.setState({ clothesDetailStatus: false })}
              hasBackdrop={true}
              style={styles.clothesListModal}>
              <View style={styles.clotheDetail}>
                <ScrollView>      
                  <Animatable.View delay={3000} useNativeDriver={true} animation="fadeIn" style={styles.clotheDetailScroll}>

                    <View style={{flexDirection: 'column', alignItems: 'center', flex: '50%', paddingTop: 20, paddingLeft: 10}}>
                      <Animatable.Image delay={3500} useNativeDriver={true} animation="fadeIn" style={styles.clotheImageForDetail} source={{uri:this.state.clotheDetailImage}}/>
                    </View>

                    <View style={{flexDirection: 'column', flex: '50%', justifyContent: 'center', marginLeft: 30,}}>
                      <Text style={styles.detailTitle}>{this.state.clotheDetailName}</Text>
                      <Text style={styles.detailBrand}>{this.state.clotheDetailBrand}</Text>
                      <Text style={styles.detailInformation}>{this.state.clotheDetail}</Text>  
                      <TouchableScale style={styles.moreDetailButton} onPress={() => {
                        this.addFavorite(this.state.clotheDetailId)
                      }}>
                        <Text style={styles.moreDetailText}>Add to Favorite</Text>
                      </TouchableScale>

                      <TouchableScale style={styles.moreDetailButton} onPress={() => {
                        Linking.openURL(this.state.clotheDetailLink);
                      }}>
                        <Text style={styles.moreDetailText}>More Detail ></Text>
                      </TouchableScale>
                    </View>
                  </Animatable.View>

                  <Animatable.View delay={3000} useNativeDriver={true} animation="fadeIn" style={{flexDirection: 'row'}}>
                    
                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', marginTop: '4.7%'}}>
                      <TouchableScale style={styles.takeOffButton} onPress={() => {
                        if(this.state.clotheDetailCategoryId === 8){
                          this.setState({
                            topStatus: false,
                          })
                        }
                        else if(this.state.clotheDetailCategoryId === 5){
                          this.setState({
                            bottomStatus: false,
                          })
                        }
                        else if(this.state.clotheDetailCategoryId === 3){
                          this.setState({
                            dressStatus: false,
                          })
                        }
                        else if(this.state.clotheDetailCategoryId === 7){
                          this.setState({
                            jacketStatus: false,
                          })
                        }
                        this.setState({clothesDetailStatus: false,})
                      }}>
                        <Text style={styles.takeOffText}>Take Off</Text>
                      </TouchableScale>
                    </View>

                  </Animatable.View>

                </ScrollView>
                {ShowAndHide(this.state.clothesLoading)(
                  <View style={styles.loadingScreenDetail}>
                    <MaterialIndicator color='#5A5A5A'/>
                  </View>
                )}
              </View>
            </Modal>

            {/* Filter */}
            <Modal
              isVisible={this.state.filterModalStatus}
              onBackdropPress={() => this.setState({ filterModalStatus: false })}
              hasBackdrop={true}
              style={styles.filterModal}
              animationIn={'slideInRight'}
              animationOut={'slideOutRight'}>
              <View style={styles.filterView}>
                <View style={styles.filterBody}>
                  <View style={styles.filterHeader}>
                    <Text style={styles.filterHeaderText}>Filters</Text>
                  </View>
                  <View style={styles.filterDetail}>

                    <ScrollView>
                      <Text style={styles.filterTopic}>Shape</Text>
                      <View style={{alignItems:'center', paddingLeft: 4, paddingRight: 4}}>
                        <TouchableScale style={[styles.shapeButton,{backgroundColor: this.state.shapeAnalyzeButtonColor}]} onPress={() => {
                          this.onPressShapeAnalyzeButton()
                        }}>
                          <Text style={[styles.shapeButtonText,{color: this.state.shapeAnalyzeButtonTextColor}]}>{this.state.shapeAnalyzeButtonText}</Text>
                        </TouchableScale>
                      </View>

                      <Text style={styles.filterTopic}>Gender</Text>
                        <View style={{flexDirection: 'row', paddingLeft: 4, paddingRight: 4}} >
                          <TouchableScale style={[styles.genderButton,{backgroundColor: '#EBEBEB'}]} onPress={() => this.setState({ genderFilterButtonValue: '%'})}>
                            <Text style={[styles.shapeButtonText,{color: '#313131'}]}>All Gender</Text>
                              {
                                this.state.genderFilterButtonValue === '%' && (
                                  <View style={styles.selected}>
                                    <Text style={[styles.shapeButtonText,{color: '#EBEBEB'}]}>All Gender</Text>
                                  </View>
                                )
                              }
                          </TouchableScale>

                          <TouchableScale style={[styles.genderButton,{backgroundColor: '#EBEBEB'}]} onPress={() => this.setState({ genderFilterButtonValue: 'm'})}>
                            <Text style={[styles.shapeButtonText,{color: '#313131'}]}>Male</Text>
                              {
                                this.state.genderFilterButtonValue === 'm' && (
                                  <View style={styles.selected}>
                                    <Text style={[styles.shapeButtonText,{color: '#EBEBEB'}]}>Male</Text>
                                  </View>
                                )
                              }
                          </TouchableScale>

                          <TouchableScale style={[styles.genderButton,{backgroundColor: '#EBEBEB'}]} onPress={() => this.setState({ genderFilterButtonValue: 'w'})}>
                            <Text style={[styles.shapeButtonText,{color: '#313131'}]}>Female</Text>
                              {
                                this.state.genderFilterButtonValue === 'w' && (
                                  <View style={styles.selected}>
                                    <Text style={[styles.shapeButtonText,{color: '#EBEBEB'}]}>Female</Text>
                                  </View>
                                )
                              }
                          </TouchableScale>
                        </View>
                        
                      <Text style={styles.filterTopic}>Event</Text>
                        <View style={{flexDirection: 'row', paddingLeft: 4, paddingRight: 4, flexWrap: 'wrap'}} >
                          <TouchableScale style={[styles.genderButton,{backgroundColor: '#EBEBEB', marginBottom: 6}]} onPress={() => this.setState({ eventsFilterButtonValue: '%'})}>
                            <Text style={[styles.shapeButtonText,{color: '#313131'}]}>All Events</Text>
                              {
                                this.state.eventsFilterButtonValue === '%' && (
                                  <View style={styles.selected}>
                                    <Text style={[styles.shapeButtonText,{color: '#EBEBEB'}]}>All Events</Text>
                                  </View>
                                )
                              }
                          </TouchableScale>
                          {
                            this.state.events.map((event, index) => {
                              return(
                                <TouchableScale style={[styles.genderButton,{backgroundColor: '#EBEBEB', marginBottom: 6}]} onPress={() => this.setState({ eventsFilterButtonValue: event.id})}>
                                  <Text style={[styles.shapeButtonText,{color: '#313131'}]}>{event.event}</Text>
                                    {
                                      this.state.eventsFilterButtonValue === event.id && (
                                        <View style={styles.selected}>
                                          <Text style={[styles.shapeButtonText,{color: '#EBEBEB'}]}>{event.event}</Text>
                                        </View>
                                      )
                                    }
                                </TouchableScale>
                              )
                            })
                          }
                        </View>

                        <Text style={styles.filterTopic}>Place</Text>
                          <View style={{flexDirection: 'row', paddingLeft: 4, paddingRight: 4, flexWrap: 'wrap'}} >
                            <TouchableScale style={[styles.genderButton,{backgroundColor: '#EBEBEB', marginBottom: 6}]} onPress={() => this.setState({ placesFilterButtonValue: '%'})}>
                              <Text style={[styles.shapeButtonText,{color: '#313131'}]}>All Places</Text>
                                {
                                  this.state.placesFilterButtonValue === '%' && (
                                    <View style={styles.selected}>
                                      <Text style={[styles.shapeButtonText,{color: '#EBEBEB'}]}>All Places</Text>
                                    </View>
                                  )
                                }
                            </TouchableScale>
                            {
                              this.state.places.map((place, index) => {
                                return(
                                  <TouchableScale style={[styles.genderButton,{backgroundColor: '#EBEBEB', marginBottom: 6}]} onPress={() => this.setState({ placesFilterButtonValue: place.id})}>
                                    <Text style={[styles.shapeButtonText,{color: '#313131'}]}>{place.place}</Text>
                                      {
                                        this.state.placesFilterButtonValue === place.id && (
                                          <View style={styles.selected}>
                                            <Text style={[styles.shapeButtonText,{color: '#EBEBEB'}]}>{place.place}</Text>
                                          </View>
                                        )
                                      }
                                  </TouchableScale>
                                )
                              })
                            }
                          </View>
                    </ScrollView>
                  </View>
                </View>      
              </View>
            </Modal>


            {/* hamburger */}
            <Modal
              isVisible={this.state.hamburgerModalStatus}
              onBackdropPress={() => this.setState({ hamburgerModalStatus: false })}
              hasBackdrop={true}
              style={styles.hamburgerModal}
              animationIn={'slideInLeft'}
              animationOut={'slideOutLeft'}>
              <View style={styles.hamburgerView}>
                <View style={styles.hamburgerBody}>
                  
                  <View style={styles.userInformation}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={{uri:this.state.user.userProfile}} style={styles.userProfile}></Image>
                      <View style={{justifyContent: 'center', marginLeft: 15, marginBottom: 15}}>
                        <Text style={{fontSize: 17, fontWeight: 700, letterSpacing: 0, color: '#313131'}}>{this.state.user.userName}</Text>
                        <Text style={{fontSize: 12, fontWeight: 400, letterSpacing: 0, color: '#383737'}}>Your Shape: {this.state.shapeName}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.option}>
                    
                    <TouchableHighlight style={styles.eachOption} underlayColor={'#EBEBEB'} onPress={() => this.goToAnalyze()}>
                      <View style={{flexDirection: 'row'}}>
                        <Image style={{width: 20, height: 20}} source={require('../Image/photo-camera.png')}/>
                        <Text style={[styles.optionText,{marginLeft: 10}]}>Analyze Your Body</Text>
                      </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.eachOption} underlayColor={'#EBEBEB'} onPress={() => {
                        this.setState({hamburgerModalStatus: false})
                        this.showFavorite()
                        this.getFavorite()
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Image style={{width: 18, height: 18}} source={require('../Image/heart-2.png')}/>
                        <Text style={[styles.optionText,{marginLeft: 10}]}>Favorite</Text>
                      </View>
                    </TouchableHighlight>

                  </View>

                  <View style={{flex: 1}}>
                    <TouchableHighlight style={styles.eachOption} underlayColor={'#EBEBEB'} onPress={() => {
                      this.setState({ hamburgerModalStatus: false })
                      this.props.navigation.navigate('LogInScreen')
                      }}>
                      <Text style={[styles.optionText]}>Log Out</Text>
                    </TouchableHighlight>
                  </View>

                </View>
              </View>
            </Modal>

            {/* Favorite */}
            <Modal
              isVisible={this.state.favoriteStatus}
              onBackdropPress={() => this.setState({ favoriteStatus: false })}
              hasBackdrop={true}
              style={styles.clothesListModal}
              animationIn={'slideInRight'}
              animationOut={'slideOutRight'}>
              <View style={styles.favoriteModal}>

                <View style={styles.navBar}>
                  <TouchableScale onPress={() => this.setState({favoriteStatus: false})} style={styles.hamburgerBar}>
                    <Image source={require('../Image/backButton.png')} style={styles.backButton}/>
                  </TouchableScale>

                  <Text style={styles.pageName}>Favorite</Text>
            
                  <TouchableScale style={styles.filter}>
                   
                  </TouchableScale>
                </View>
                
                <View style={{flex: 10}}>  
                  <ScrollView>      
                    <View style={styles.favScroll}>
                      {
                        this.state.favorite.map((clothe, index) => {
                          return(
                            <Animatable.View delay={1000} useNativeDriver={true} animation="fadeInDown" style={{width: '100%', height: 125, flexDirection:'row', backgroundColor: '#FAFAFA', marginBottom: 4}}>
                                
                                <TouchableScale onPress={() => {this.chooseThisOne(clothe.categoryId, clothe.clothePictureUrl, clothe.clotheName, clothe.clotheDrescription, clothe.clotheBrand, clothe.clotheLinkToBuy, clothe.id)
                                  this.setState({favoriteStatus: false})}}
                                  style={{justifyContent:'center', alignItems: 'center', marginLeft: 12}}>
                                    <Animatable.Image delay={1000} useNativeDriver={true} animation="fadeIn" style={styles.clotheImageForFav} source={{uri:clothe.clothePictureUrl}}/>
                                </TouchableScale>
                              
                                <View style={{flexDirection: 'column', flex: 2, paddingLeft: 30, justifyContent:'center'}}>
                                  <Text style={styles.detailTitle}>{clothe.clotheName}</Text>
                                  <Text style={styles.detailBrand}>{clothe.brandName}</Text>
                                  <Text style={styles.detailInformation}>{clothe.clotheDrescription}</Text>  

                                  <TouchableScale style={styles.moreDetailButton} onPress={() => {
                                    Linking.openURL(clothe.clotheLinkToBuy);
                                  }}>
                                    <Text style={styles.moreDetailText}>More Detail ></Text>
                                  </TouchableScale>
                                </View>
                                  
                                <View style={{flexDirection: 'column'}}>
                                  <TouchableScale style={styles.moreDetailButton} onPress={() => {
                                    this.deleteFav(clothe.id)
                                  }} style={{width: 10, height: 10, left: -10, top: 10}}>
                                    <Image style={{width: 10, height: 10, left: -10, top: 10}}  source={require('../Image/delete.png')}/>
                                  </TouchableScale>
                                </View>
                            
                            </Animatable.View>
                          )
                        })
                      }
                    </View>

                    
                    
                  </ScrollView>
                </View>
                {ShowAndHide(this.state.clothesLoading)(
                  <View style={styles.loadingFavScreen}>
                    <MaterialIndicator color='#5A5A5A'/>
                  </View>
                )}
              </View>
            </Modal>
            

            {ShowAndHide(this.state.dressStatus)(
              <Gestures rotatable={true} scalable={true}>
                <TouchableOpacity activeOpacity={0.8} onPress={ async () => {
                  this.setState({clothesDetailStatus: true})
                  this.setState({clothesLoading: true})
                  this.setState({
                    clotheDetailImage: this.state.dress.image,
                    clotheDetailLink: this.state.dress.link,
                    clotheDetailId: this.state.dress.id,
                  })
                  clotheBrandName =  await this.getBrandName(this.state.dress.brand)
                  this.setState({
                    clotheDetailName: this.state.dress.name,
                    clotheDetailBrand: clotheBrandName,
                    clotheDetail: this.state.dress.detail, 
                    clotheDetailCategoryId: this.state.dress.categoryId,
                  })
                  this.setState({clothesLoading: false})
                }}>
                  <Animatable.Image delay={1000} animation={this.state.topImageAnimation} source={{uri: this.state.dress.image}} style={{width: 300, height: 300}}/>
                </TouchableOpacity>
              </Gestures>
            )}

            {ShowAndHide(this.state.bottomStatus)(
              <Gestures rotatable={true} scalable={true}>
                <TouchableOpacity activeOpacity={0.8} onPress={ async () => {
                  this.setState({clothesDetailStatus: true})
                  this.setState({clothesLoading: true})
                  this.setState({
                    clotheDetailImage: this.state.bottom.image,
                    clotheDetailLink: this.state.bottom.link,
                    clotheDetailId: this.state.bottom.id,
                  })
                  clotheBrandName =  await this.getBrandName(this.state.bottom.brand)
                  this.setState({
                    clotheDetailName: this.state.bottom.name,
                    clotheDetailBrand: clotheBrandName,
                    clotheDetail: this.state.bottom.detail, 
                    clotheDetailCategoryId: this.state.bottom.categoryId,
                  })
                  this.setState({clothesLoading: false})
                }}>
                  <Animatable.Image delay={1000} animation={this.state.topImageAnimation} source={{uri: this.state.bottom.image}} style={{width: 300, height: 300}}/>
                </TouchableOpacity>
              </Gestures>
            )}

            {ShowAndHide(this.state.topStatus)(
              <Gestures rotatable={true} scalable={true}>
                <TouchableOpacity activeOpacity={0.8} onPress={ async () => {
                  this.setState({clothesDetailStatus: true})
                  this.setState({clothesLoading: true})
                  this.setState({
                    clotheDetailImage: this.state.top.image,
                    clotheDetailLink: this.state.top.link,
                    clotheDetailId: this.state.top.id,
                  })
                  clotheBrandName =  await this.getBrandName(this.state.top.brand)
                  this.setState({
                    clotheDetailName: this.state.top.name,
                    clotheDetailBrand: clotheBrandName,
                    clotheDetail: this.state.top.detail, 
                    clotheDetailCategoryId: this.state.top.categoryId,
                  })
                  this.setState({clothesLoading: false})
                  
                }}>
                  <Animatable.Image delay={1000} animation={this.state.topImageAnimation} source={{uri: this.state.top.image}} style={{width: 300, height: 300}}/>
                </TouchableOpacity>
              </Gestures>
              
            )}

            {ShowAndHide(this.state.jacketStatus)(
              <Gestures rotatable={true} scalable={true}>
                <TouchableOpacity activeOpacity={0.8} onPress={ async () => {
                  this.setState({clothesDetailStatus: true})
                  this.setState({clothesLoading: true})
                  this.setState({
                    clotheDetailImage: this.state.jacket.image,
                    clotheDetailLink: this.state.jacket.link,
                    clotheDetailId: this.state.jacket.id,
                  })
                  clotheBrandName =  await this.getBrandName(this.state.jacket.brand)
                  this.setState({
                    clotheDetailName: this.state.jacket.name,
                    clotheDetailBrand: clotheBrandName,
                    clotheDetail: this.state.jacket.detail, 
                    clotheDetailCategoryId: this.state.jacket.categoryId,
                  })
                  this.setState({clothesLoading: false})
                  
                }}>
                  <Animatable.Image delay={1000} animation={this.state.topImageAnimation} source={{uri: this.state.jacket.image}} style={{width: 300, height: 300}}/>
                </TouchableOpacity>
              </Gestures>
              
            )}


        

            <View style={styles.categoryBar}>

              <TouchableScale onPress={() => {
                this.getAllClothes(8)
              }}>
                <View style={styles.eachCategory}>
                  <Text style={styles.eachCategoryText}>Top</Text>
                </View>
              </TouchableScale>

              <TouchableScale onPress={() => {
                this.getAllClothes(7)
              }}>
                <View style={styles.eachCategory}>
                  <Text style={styles.eachCategoryText}>Jacket</Text>
                </View>
              </TouchableScale>

              <TouchableScale onPress={() => {
                this.getAllClothes(5)
              }}>
                <View style={styles.eachCategory}>
                  <Text style={styles.eachCategoryText}>Bottom</Text>
                </View>
              </TouchableScale>

              <TouchableScale onPress={() => {
                this.getAllClothes(3)
              }}>
                <View style={styles.eachCategory}>
                  <Text style={styles.eachCategoryText}>Dress</Text>
                </View>
              </TouchableScale>

            </View> 

          </ImageBackground>
        </Animatable.View>
      </View>



      /////////////////////////////
      // Old
      // <View style={{flex: 1, flexDirection: 'column'}}>

      //   <View style={styles.navBar}>
      //     <Image source={{uri:this.state.user.userProfile}} style={styles.profilePic}></Image>
      //     <Text style={styles.userName}>{this.state.user.userName}</Text>
      //     <Text style={styles.shapeName}>Shape: {this.state.shapeName}</Text>
      //     <TouchableOpacity onPress={() => {
      //       this.goToAnalyze()
      //     }} 
      //       style={styles.analyze}>
      //       <Text style={{textAlign: 'center'}}>Analyze</Text>
      //     </TouchableOpacity>
      //     <Text style={styles.save}>Saved</Text>
      //     <TouchableOpacity onPress={() => {this.props.navigation.navigate('LogInScreen')}} style={styles.logOut}>
      //       <Text style={{textAlign: 'center'}}>Logout</Text>
      //     </TouchableOpacity>
      //   </View>


    
      //   <View style={{flex: 9, flexDirection: 'column'}}>


      //   <View style={styles.filterBar}>
      //   <TouchableOpacity onPress={() => {
      //     this.setState({
      //       filterShapeStatus: !this.state.filterShapeStatus
      //     })
      //     if(this.state.filterShapeStatus === true){
      //       this.setState({
      //         filterShapeShow: 'Your Shape!'
      //       })
      //     }else{
      //       this.setState({
      //         filterShapeShow: 'All'
      //       })
      //     }
      //     }}  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //     <View>
      //      <Text>{this.state.filterShapeShow}</Text>
      //     </View>
      //   </TouchableOpacity>


      //   <TouchableOpacity onPress={() => {
      //     this.setState({
      //       modalGender: true
      //     })}}  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //     <View>
      //       <Text>Gender</Text>
      //     </View>
      //   </TouchableOpacity>
                                                                                          
      //   <TouchableOpacity onPress={() => {
      //     this.setState({
      //     modalPlace: true
      //     })}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //     <View>
      //       <Text>Place</Text>
      //     </View>
      //   </TouchableOpacity>
                
      //   <TouchableOpacity onPress={() => {
      //     this.setState({
      //     modalEvent: true
      //     })}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
      //     <View>
      //       <Text>Event</Text>
      //     </View>
      //   </TouchableOpacity>
      // </View>

      //   <View style={styles.pictureArea}>
      //     <ImageBackground source={{uri:this.props.navigation.state.params.picture == null ? this.state.user.userBodyPictureUrl : this.props.navigation.state.params.picture}} style={{width: '100%', height: '100%'}}>
        
            

            // {ShowAndHide(this.state.shoesStatus)(
            //   <Gestures rotatable={true} scalable={true}>
            //     <Image source={{uri: this.state.shoes}} style={{width: 300, height: 300}}/>
            //   </Gestures>
            // )}

            // {ShowAndHide(this.state.bottomStatus)(
            //   <Gestures rotatable={true} scalable={true}>
            //     <Image source={{uri: this.state.bottom}} style={{width: 300, height: 300}}/>
            //   </Gestures>
            // )}

            // {ShowAndHide(this.state.topStatus)(
            //   <Gestures rotatable={true} scalable={true}>
            //     <Image source={{uri: this.state.top}} style={{width: 300, height: 300}}/>
            //   </Gestures>
            // )}


            // {ShowAndHide(this.state.jacketStatus)(
            //   <Gestures rotatable={true} scalable={true}>
            //     <Image source={{uri: this.state.jacket}} style={{width: 300, height: 300}}/>
            //   </Gestures>
            // )}
      //     </ImageBackground>
      //     </View>

      //     <View style={styles.categoryBar}>

      //       <TouchableOpacity onPress={() => {
      //         this.getAllClothes(5)
      //         this.setState({
      //           clothesListStatus: true,
      //         })
      //       }}
      //         style={styles.eachCategory}>
      //           <View style={styles.toCenter}>
      //             <Image source={this.state.clothesBar.top} style={styles.eachClothBar}></Image>
      //           </View>
      //       </TouchableOpacity>

            
            
      //       <TouchableOpacity onPress={() => {
      //         this.getAllClothes(7)
      //         this.setState({
      //           clothesListStatus: true,
      //         })}}
      //         style={styles.eachCategory}>
      //           <View style={styles.toCenter}>
      //           <Image source={this.state.clothesBar.jacket} style={styles.eachClothBar}></Image>
      //           </View>
      //       </TouchableOpacity>



      //       <TouchableOpacity onPress={() => {
      //         this.getAllClothes(8)
      //         this.setState({
      //           clothesListStatus: true,
      //         })}}
      //         style={styles.eachCategory}>
      //           <View style={styles.toCenter}>
      //           <Image source={this.state.clothesBar.bottom} style={styles.eachClothBar}></Image>
      //           </View>
      //       </TouchableOpacity>
          


      //       <TouchableOpacity onPress={() => {
      //         this.getAllClothes(3)
      //         this.componentDidMount
      //         this.setState({
      //           clothesListStatus: true,
      //         })}}
      //         style={styles.eachCategory}>
      //           <View style={styles.toCenter}>
      //           <Image source={this.state.clothesBar.shoes} style={styles.eachClothBar}></Image>
      //           </View>
      //       </TouchableOpacity>

      //     </View>
      //   </View>

      //   {/* Modal Area */}

      //   {/* Modal Gender */}
      //   <Modal
      //     isVisible={this.state.modalGender}
      //     animationIn="slideInUp"
      //     animationOut="slideOutDown"
      //     hasBackdrop={false}
      //     style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}>      
      //     <View style={{flexDirection: 'column', backgroundColor: 'white', width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
            
      //       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //         <TouchableOpacity onPress={()=>{
      //           this.setState({
      //             filterGender: '%',
      //             modalGender: false
      //           })}}>
      //             <Text>All</Text>
      //         </TouchableOpacity>
      //       </View>

      //       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //         <TouchableOpacity onPress={()=>{
      //           this.setState({
      //             filterGender: 'm',
      //             modalGender: false
      //           })}}>
      //             <Text>Man</Text>
      //         </TouchableOpacity>
      //       </View>
      
      //       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //         <TouchableOpacity onPress={()=>{
      //           this.setState({
      //           filterGender: 'w',
      //           modalGender: false
      //           })}}>
      //             <Text>Woman</Text>
      //         </TouchableOpacity>
      //       </View>
      //      </View>
      //   </Modal>

      //   {/* Place Modal */}

      //   <Modal
      //     isVisible={this.state.modalPlace}
      //     animationIn="slideInUp"
      //     animationOut="slideOutDown"
      //     hasBackdrop={false}
      //     style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}>
      //     <View style={{backgroundColor: 'white', width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>   
      //       <ScrollView>
      //         <View style={{flexDirection: 'column'}}>
      //           <TouchableOpacity onPress={() => {
      //             this.setState({
      //               filterPlace: '%',
      //               modalPlace: false
      //             })}}>
      //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 80}}>
      //               <Text>All</Text>
      //             </View>
      //           </TouchableOpacity>
      //           {
      //             this.state.places.map((v, index) => {
      //               return(
      //                 <TouchableOpacity key={index} onPress={() => {
      //                   this.setState({
      //                     filterPlace: v.id,
      //                     modalPlace: false
      //                   })}}>
      //                   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 80}}>
      //                     <Text key={index}>{v.place}</Text>
      //                   </View>
      //                 </TouchableOpacity>
      //               )
      //             })
      //             }
      //           </View>
      //     </ScrollView>
      //     </View>
      //   </Modal>

       
       
      // {/* Event Modal */}
      // <Modal
      //     isVisible={this.state.modalEvent}
      //     animationIn="slideInUp"
      //     animationOut="slideOutDown"
      //     hasBackdrop={false}
      //     style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}>
      //     <View style={{backgroundColor: 'white', width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>   
      //       <ScrollView>
      //         <View style={{flexDirection: 'column'}}>
      //           <TouchableOpacity onPress={() => {
      //             this.setState({
      //               filterEvent: '%',
      //               modalEvent: false
      //             })}}>
      //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 80}}>
      //               <Text>All</Text>
      //             </View>
      //           </TouchableOpacity>
      //           {
      //             this.state.events.map((v, index) => {
      //               return(
      //                 <TouchableOpacity key={index} onPress={() => {
      //                   this.setState({
      //                     filterEvent: v.id,
      //                     modalEvent: false
      //                   })}}>
      //                   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 80}}>
      //                     <Text key={index}>{v.event}</Text>
      //                   </View>
      //                 </TouchableOpacity>
      //               )
      //             })
      //             }
      //           </View>
      //     </ScrollView>
      //     </View>
      //   </Modal>



        // <Modal
        //   isVisible={this.state.clothesListStatus}
        //   onBackdropPress={() => this.setState({ clothesListStatus: false })}
        //   hasBackdrop={true}
        //   style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}>
        //   <View style={{backgroundColor: 'white', width: '100%', height: 700, justifyContent: 'center', alignItems: 'center'}}>   
        //     <ScrollView style={{backgroundColor: 'white', alignItems: 'center'}}>
        //         <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, alignItems: 'center'}}>
        //           {
        //             this.state.clothes.map((v, index) => {
        //               return(
        //                 <TouchableOpacity key={index} onPress={() => {
        //                   this.setState({
        //                     clothesListStatus: false,
        //                     topList: false,
        //                     bottomList: false,
        //                     jacketList: false,
        //                     shoesList: false,
        //                   })
        //                   if(v.categoryId === 3){
        //                     this.setState({
        //                       shoes: v.clothePictureUrl,
        //                       shoesStatus: true
        //                     })
        //                   }else if(v.categoryId === 5){
        //                     this.setState({
        //                       top: v.clothePictureUrl,
        //                       topStatus: true
        //                     })
        //                   }else if(v.categoryId === 7){
        //                     this.setState({
        //                       jacket: v.clothePictureUrl,
        //                       jacketStatus: true
        //                     })
        //                   }else if(v.categoryId === 8){
        //                     this.setState({
        //                       bottom: v.clothePictureUrl,
        //                       bottomStatus: true
        //                     })
        //                   }
        //                 }}>
        //                   <View style={styles.item}>
        //                     <Image key={index} style={styles.imageStyle} source={{uri : v.clothePictureUrl}}/>
        //                   </View>
        //                 </TouchableOpacity>
        //               )
        //             })
        //           }
        //           </View>
        //         </ScrollView>
        //   </View>
        // </Modal>


      //   {/* Modal End */}
        
      // </View>
     
   );
 }
}

const styles = StyleSheet.create({
navBar:{
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  marginBottom: '1.7%',

},
pictureArea:{
  flex: 10,
  backgroundColor: '#EBEBEB',
  
},
hamburgerBar:{
  width: 26,
  height: 16,
  marginLeft: '3%'
},
filter:{
  width:  17.15,
  height: 15.07,
  marginRight: '3%'
},
pageName:{
  fontSize: 15,
  fontWeight: 330,
  letterSpacing: 0.5,
  color: 'black',
  top: 3,
},
backgroundBodyShape:{
  width: '100%',
  height: '100%',
  justifyContent: 'center',
},
categoryBar:{
  position: 'absolute',
  width: 60,
  height: 300,
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  left: '4%',
  backgroundColor: '',
  top: '45%'
},
eachCategory:{
  width: 60,
  height: 60,
  backgroundColor: 'black',
  opacity: 0.7,
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
},
eachCategoryText:{
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: 0.5,
  color: 'white',
},
clothesListModal:{
  margin: 0,
  justifyContent: 'flex-end',
},
clothesList:{
  width: '100%',
  height: '70%',
  backgroundColor: 'white',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
},
clothesScroll:{
  width: 357,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
},
clotheImage:{
  width: 115,
  height: 115,
  margin: 2,
},
loadingScreen:{
  width: '100%',
  height: '100%',
  position: 'absolute',
  justifyContent: 'center',
},
filterModal:{
  margin: 0,
  flexDirection: 'column',
  alignItems: 'flex-end',
},
filterView:{
  width: '80%',
  height: '100%',
  backgroundColor: 'white',
  flexDirection: 'column',
},
filterBody:{
  flex: 1,
  flexDirection: 'column',
},
filterHeader:{
  flex:1,
  justifyContent: 'flex-end',
  paddingBottom: 2,
  paddingLeft: 4,
},
filterDetail:{
  flex: 10,
},
filterHeaderText:{
  fontSize: 27,
  fontWeight: 700,
  letterSpacing: 1,
  color: '#313131'
},
filterShape:{
  flex: 1.5,
},
filterTopic:{
  fontSize: 15,
  fontWeight: 500,
  letterSpacing: 1,
  color: '#313131',
  paddingLeft: 4,
  marginTop: 20,
  marginBottom: 10,
},
shapeButton:{
  width: '97%',
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
},
shapeButtonText:{
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: 1,
},
genderButton:{
  width: '31%',
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 3,
  marginRight: 3,
},
selected:{
  width:'100%',
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 3,
  marginRight: 3,
  position: 'absolute',
  backgroundColor: 'black' 
},
hamburgerModal:{
  margin: 0,
  flexDirection: 'column',
  alignItems: 'flex-start',
},
hamburgerView:{
  width: '70%',
  height: '100%',
  backgroundColor: 'white',
  flexDirection: 'column',
},
hamburgerBody:{
  flex: 1,
  flexDirection: 'column',
  backgroundColor: 'white',
},
userInformation:{
  flex:2.4,
  alignItems: 'flex-end',
  paddingBottom: 2,
  flexDirection: 'row',
  justifyContent: 'center',
  borderBottomWidth: 0.3,
  borderBottomColor: '#313131',
  borderBottomStartRadius: 20,
  borderBottomEndRadius: 20,
},
userProfile:{
  width: 60,
  height: 60,
  borderRadius: 60/2,
  marginLeft: -19,
  marginBottom: 15,
},
option:{
  flex: 10,
  alignItems: 'center',
  paddingTop: 5,
},
optionText:{
  fontSize: 15,
  fontWeight: 225,
  letterSpacing: 0,
  color: '#313131',
},
eachOption:{
  width: '100%',
  height: 40,
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 25,
  backgroundColor: 'white',
},
clotheDetail:{
  width: '100%',
  height: '35%',
  backgroundColor: 'white',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
},
clotheDetailScroll:{
  flexDirection: 'row'
},
clotheImageForDetail:{
  width: 150,
  height: 150,
},
loadingScreenDetail:{
  width: '100%',
  height: '100%',
  position: 'absolute',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
},
takeOffButton:{
  width: 200,
  height: 30,
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',  
},
takeOffText:{
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: 1,
  color: 'white',
},
moreDetailButton:{
  width: 100,
  height: 20,
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 4,
},
detailTitle:{
  fontSize: 17,
  fontWeight: 700,
  letterSpacing: 1,
  color: 'black',
  marginBottom: 4,
},
detailInformation:{
  fontSize: 10,
  fontWeight: 400,
  letterSpacing: 0.5,
  color: '#313131',
  marginBottom: 4,
},
detailBrand:{
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: 0.5,
  color: 'black',
  marginBottom: 4,
},
moreDetailText:{
  fontSize: 10,
  fontWeight: 400,
  letterSpacing: 0.5,
  color: 'white',
},
favoriteModal:{
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
},
backButton:{
  width:11.56,
  height:17.44,
},
favList:{

},
favScroll:{
  
},
clotheImageForFav:{
  width: 120,
  height: 120,

},
loadingFavScreen:{
  backgroundColor: 'white',
  top: '-55%'
}



// MainContainer :{
//   flex:1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   //marginTop: (Platform.OS == 'ios') ? 20 : 0,
//   flexDirection: 'column',
// },
// clothesBar: {
//   backgroundColor: 'white',
//   marginLeft: -19,
//   marginTop: -30,
//   height: '100%',
//   width: '95%',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
// },

// TextStyle:{
//   fontSize: 20, 
//   marginBottom: 20, 
//   color: "#fff",
//   padding: 20,
//   textAlign: 'center'

// },
// clothesArea: {
//   flex: 2,
//   backgroundColor: 'red'
// },

// tryArea: {
// flex: 5,
// backgroundColor: 'blue'
// },

// optionArea: {
// flex: 1,
// backgroundColor: 'white'
// },

// item: {
//   width: 114, 
//   height: 125, 
//   backgroundColor:'#F5F5F5', 
//   marginBottom:10, 
//   marginLeft:10, 
//   alignItems: 'center',
//   borderRadius: 10
// },
// imageStyle:{
//   width: 80,
//   height: 100, 
// },
// navBar:{
//   flex: 1.5,
//   backgroundColor: 'white',
// },
// filterBar:{
//   flex: 1,
//   backgroundColor: '#F9F9F9',
//   flexDirection: 'row',
// },
// pictureArea:{
//   flex: 20,
//   backgroundColor: '#F3F3F3',
// },
// categoryBar:{
//   flex: 2,
//   backgroundColor: '#F9F9F9',
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center'
// },
// eachCategory:{
//   flex: 1,
//   width: '50%',
//   height: '50%',

// },
// clothesList:{
//   flex: 16,
// },
// eachClothBar:{
//   width: 35,
//   height: 35,
// },
// toCenter:{
//   justifyContent: 'center',
//   alignItems: 'center'
// },
// bottomModal: {
//   justifyContent: 'flex-end',
//   margin: 0,
// },
// profilePic:{
//   width: 60,
//   height: 60,
//   borderRadius: 60/2,
//   top: '35%',
//   left: '2%',
//   position: "absolute"
// },
// userName:{
//   position: "absolute",
//   top: '38%',
//   left: '20%',
//   fontWeight: '700',
//   fontSize: 16
// },
// shapeName:{
//   position: "absolute",
//   top: '53%',
//   left: '20%',
//   fontWeight: '500',
//   fontSize: 13
// },
// analyze:{
//   position: "absolute",
//   top: '70%',
//   left: '20%',
//   fontWeight: '100',
//   borderColor: '#E9E9E9',
//   borderWidth: 1,
//   borderRadius: 4,
//   width: '25%',
//   textAlign: 'center',
// },
// logOut:{
//   position: "absolute",
//   top: '70%',
//   left: '72%',
//   fontWeight: '100',
//   borderColor: '#E9E9E9',
//   width: '25%',
//   textAlign: 'center',
//   borderWidth: 1,
//   borderRadius: 4,
// },
// save:{
//   position: "absolute",
//   top: '70%',
//   left: '46%',
//   fontWeight: '100',
//   borderColor: '#E9E9E9',
//   width: '25%',
//   textAlign: 'center',
//   borderWidth: 1,
//   borderRadius: 4,
// }
});