import {createStackNavigator, createAppContainer} from 'react-navigation';
import ProfileScreen from './Screen/ProfileScreen' ;
import SelectGenderScreen from './Screen/SelectGenderScreen';
import IndexScreen from './Screen/IndexScreen';
import SelectShapeOptionScreen from './Screen/SelectShapeOptionScreen';
import ShapeScreen from './Screen/ShapeScreen';
import SkinColorScreen from './Screen/SkinColorScreen';

const MainNavigator = createStackNavigator({
  Index: {screen: IndexScreen},
  Gender: {screen: SelectGenderScreen},
  SelectShape: {screen: ShapeScreen},
  Profile: {screen: ProfileScreen},
  SelectSkin: {screen: SkinColorScreen}
});

const App = createAppContainer(MainNavigator);

export default App;