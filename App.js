import React, { useEffect } from 'react';
import { Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

// import App from './src';
import { theme } from './src/core/theme';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// import Login from './src/screens/Login';
// import {
//   HomeScreen,
//   LoginScreen,
//   RegisterScreen,
//   ForgotPasswordScreen,
//   PlayScreen,
//   Dashboard,
//   MyplayScreen,
//   PaymentScreen,
//   ProfileScreen,
//   WithdrwalScreen,
//   Logout
// } from './src/screens';
import HomeScreen  from './src/screens/HomeScreen';
import LoginScreen  from './src/screens/LoginScreen';
import RegisterScreen  from './src/screens/RegisterScreen';
import ForgotPasswordScreen  from './src/screens/ForgotPasswordScreen';
import Dashboard  from './src/screens/Dashboard';
import PlayScreen  from './src/screens/PlayScreen';
import MyplayScreen  from './src/screens/MyplayScreen';
import PaymentScreen  from './src/screens/PaymentScreen';
import ProfileScreen  from './src/screens/ProfileScreen';
import WithdrwalScreen  from './src/screens/WithdrwalScreen';
import ChangepasswordScreen  from './src/screens/ChangepasswordScreen';
import KycupdateScreen  from './src/screens/KycupdateScreen';
import Logout  from './src/screens/Logout';

const Stack = createStackNavigator();
const Tab   = createBottomTabNavigator();
//
function Home() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#9b00ea',
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}  />
        <Tab.Screen
          name="PlayScreen"
          component={PlayScreen}
          options={{
            tabBarLabel: 'Play Game',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="play-circle"
                color={color}
                size={size}
              />
            ),
          }} />
          <Tab.Screen
          name="MyplayScreen"
          component={MyplayScreen}
          options={{
            tabBarLabel: 'My Play',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="game-controller"
                color={color}
                size={size}
              />
            ),
          }} /> 
          <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'MY Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="people-circle-outline"
                color={color}
                size={size}
              />
            ),
          }} />
      </Tab.Navigator>
  );
}



// const AppContainer = NavigationContainer(MainNavigator);

const App = () => {

 useEffect(() => {

  (async function() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log(await messaging().getToken());
      // console.log('Authorization status:', authStatus);
    }
  })();
  //
    const unsubscribe = messaging().onMessage(async remoteMessage => {
       console.log('A new FCM message arrived!:', JSON.stringify(remoteMessage));
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
 return (
  <Provider theme={theme}>
    <NavigationContainer>

     <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
  
        <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{headerShown: false}} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen options={{headerShown: false}} name="Dashboard" component={Dashboard} />
        <Stack.Screen options={{headerShown: false}} name="PlayScreen" component={PlayScreen} />
        <Stack.Screen options={{headerShown: false}} name="MyplayScreen" component={MyplayScreen} />
        <Stack.Screen options={{headerShown: false}} name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen options={{headerShown: false}} name="WithdrwalScreen" component={WithdrwalScreen} />
        <Stack.Screen options={{headerShown: false}} name="ChangepasswordScreen" component={ChangepasswordScreen} />
        <Stack.Screen options={{headerShown: false}} name="KycupdateScreen" component={KycupdateScreen} />
        <Stack.Screen options={{headerShown: false}} name="Logout" component={Logout} />
       

      </Stack.Navigator>

       

    </NavigationContainer>
  </Provider>
);
}
export default App;