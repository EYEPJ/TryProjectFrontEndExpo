import {createStackNavigator, createAppContainer} from 'react-navigation';
import ProfileScreen from './Screen/ProfileScreen' ;
import SelectGenderScreen from './Screen/SelectGenderScreen';
import MaleShapeScreen from './Screen/MaleShapeScreen';
import FemaleShapeScreen from './Screen/FemaleShapeScreen';
import IndexScreen from './Screen/IndexScreen';
import SelectShapeOptionScreen from './Screen/SelectShapeOptionScreen';
import ShapeScreen from './Screen/ShapeScreen';

const MainNavigator = createStackNavigator({
  //Profile: {screen: ProfileScreen},
  Index: {screen: IndexScreen},
  Gender: {screen: SelectGenderScreen},
  Shape: {screen: SelectShapeOptionScreen},
  SelectShape: {screen: ShapeScreen},
  MaleShape:{screen: MaleShapeScreen},
  FemaleShape :{screen: FemaleShapeScreen},
});

const App = createAppContainer(MainNavigator);

export default App;