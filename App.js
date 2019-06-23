import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './Screen/HomeScreen' ;
import ProfileScreen from './Screen/ProfileScreen' ;
import SelectGenderScreen from './Screen/SelectGenderScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  Gender:{screen: SelectGenderScreen}
});

const App = createAppContainer(MainNavigator);

export default App;