import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './Screen/HomeScreen' ;
import ProfileScreen from './Screen/ProfileScreen' ;
import SelectGenderScreen from './Screen/SelectGenderScreen';
import MaleShapeScreen from './Screen/MaleShapeScreen';
import FemaleShapeScreen from './Screen/FemaleShapeScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  Gender:{screen: SelectGenderScreen},
  MaleShape:{screen: MaleShapeScreen},
  FemaleShape :{screen: FemaleShapeScreen},
});

const App = createAppContainer(MainNavigator);

export default App;