import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './Screen/MainScreen' ;
import GenderScreen from './Screen/GenderScreen';
import LogInScreen from './Screen/LogInScreen';
import ShapeScreen from './Screen/ShapeScreen';
import CameraScreen from './Screen/CameraScreen';
import AnalyzeShapeScreen from './Screen/AnalyzeShapeScreen';
import FittingRoom from './Screen/FittingRoom';
import test from './Screen/test';
import Camera from './Screen/Camera';
import PictureConfirmScreen from './Screen/PictureConfirmScreen';
import GuestGenderScreen from './Screen/GuestGenderScreen';
import GuestMainScreen from './Screen/GuestMainScreen';
import GuestShapeScreen from './Screen/GuestShapeScreen';

const MainNavigator = createStackNavigator({
  // test: {screen: test}
  
  LogInScreen: {screen: LogInScreen},
  SelectGender: {screen: GenderScreen},
  SelectShape: {screen: ShapeScreen},
  Camera: {screen: Camera},
  PictureConfirmScreen: {screen: PictureConfirmScreen},
  AnalyzeShapeScreen: {screen: AnalyzeShapeScreen},
  MainScreen: {screen: MainScreen}, 
  // Camera:{screen:CameraScreen},
  // FittingRoomScreen: {screen: FittingRoom},
  GuestGenderScreen: {screen: GuestGenderScreen},
  GuestShapeScreen: {screen: GuestShapeScreen},
  GuestMainScreen: {screen:GuestMainScreen},
});

const App = createAppContainer(MainNavigator);

export default App;