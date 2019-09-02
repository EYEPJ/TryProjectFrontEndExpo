import {createStackNavigator, createAppContainer} from 'react-navigation';
import ProfileScreen from './Screen/ProfileScreen' ;
import SelectGenderScreen from './Screen/SelectGenderScreen';
import IndexScreen from './Screen/IndexScreen';
import SelectShapeOptionScreen from './Screen/SelectShapeOptionScreen';
import ShapeScreen from './Screen/ShapeScreen';
import SkinColorScreen from './Screen/SkinColorScreen';
import CameraScreen from './Screen/CameraScreen';
import AnalyzeShapeScreen from './Screen/AnalyzeShapeScreen';


const MainNavigator = createStackNavigator({
  AnalyzeShapeScreen: {screen: AnalyzeShapeScreen},
  Index: {screen: IndexScreen},
  Gender: {screen: SelectGenderScreen},
  Shape: {screen: SelectShapeOptionScreen},
  SelectShape: {screen: ShapeScreen},
  Profile: {screen: ProfileScreen}, 
  SelectSkin: {screen: SkinColorScreen},
  Camera:{screen:CameraScreen},
<<<<<<< Updated upstream
  Test:{screen:TestScreen}
=======
>>>>>>> Stashed changes
});

const App = createAppContainer(MainNavigator);

export default App;