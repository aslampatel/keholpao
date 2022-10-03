import React, {Fragment, memo, useState,useEffect }from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { StoreData,GetStoreDate } from '../../store/Store';
import Background from '../components/Background';

const Logout =({ navigation },props)=> {

  //
  useEffect(() => {

  	StoreData('AuthTrue','false');

  	AsyncStorage.removeItem('AuthTrue');
    AsyncStorage.clear();
    	(async function() {
  			await AsyncStorage.removeItem('AuthTrue');
		//AsyncStorage.setItem('Login',JSON.stringify(false));
			await AsyncStorage.clear();
    	})();
		//

		// navigation.dispatch(
		//               StackActions.replace('LoginScreen')
		//               );
		navigation.dispatch(StackActions.replace('LoginScreen'));
  
  },[]);

 	return (
    <Background>
     </Background>

 		)
}


export default Logout;