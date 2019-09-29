import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './Screen/MainScreen' ;
import GenderScreen from './Screen/GenderScreen';
import LogInScreen from './Screen/LogInScreen';
import ShapeScreen from './Screen/ShapeScreen';
import CameraScreen from './Screen/CameraScreen';
import AnalyzeShapeScreen from './Screen/AnalyzeShapeScreen';
import FittingRoom from './Screen/FittingRoom';
import GuestGenderScreen from './Screen/GuestGenderScreen';
import GuestShapeScreen from './Screen/GuestShapeScreen'
import GuestMainScreen from './Screen/GuestMainScreen'

const MainNavigator = createStackNavigator({
  //AnalyzeShapeScreen: {screen: AnalyzeShapeScreen},
  LogInScreen: {screen: LogInScreen},
  SelectGender: {screen: GenderScreen},
  SelectShape: {screen: ShapeScreen},
  MainScreen: {screen: MainScreen}, 
  Camera:{screen:CameraScreen},
  AnalyzeShapeScreen: {screen: AnalyzeShapeScreen},
  FittingRoomScreen: {screen: FittingRoom},
  GuestGenderScreen: {screen: GuestGenderScreen},
  GuestShapeScreen: {screen: GuestShapeScreen},
  GuestMainScreen: {screen:GuestMainScreen},
});

const App = createAppContainer(MainNavigator);

export default App;