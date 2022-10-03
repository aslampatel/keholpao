import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export  const StoreData = async (key,value) => {
  try {
    //console.log("added key:"+key+"val=:"+value);
    await AsyncStorage.setItem(key,value);
    return true;
  } catch (e) {
    // saving error
  }
}


export const GetStoreDate = async (key) => {
  let value="";
  try {
     value = await AsyncStorage.getItem(key);
    if(value !== null) {
      // value previously stored
      
    }
  } catch(e) {
    // error reading value
  }
  return value;
}