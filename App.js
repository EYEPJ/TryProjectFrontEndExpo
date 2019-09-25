import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './Screen/MainScreen' ;
import GenderScreen from './Screen/GenderScreen';
import LogInScreen from './Screen/LogInScreen';
import ShapeScreen from './Screen/ShapeScreen';
import CameraScreen from './Screen/CameraScreen';
import AnalyzeShapeScreen from './Screen/AnalyzeShapeScreen';

const MainNavigator = createStackNavigator({
  LogInScreen: {screen: LogInScreen},
  SelectGender: {screen: GenderScreen},
  SelectShape: {screen: ShapeScreen},
  MainScreen: {screen: MainScreen}, 
  Camera:{screen:CameraScreen},
  AnalyzeShapeScreen: {screen: AnalyzeShapeScreen},
});

const App = createAppContainer(MainNavigator);

export default App;