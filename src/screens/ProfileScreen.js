import React, { memo, useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';
import { StoreData,GetStoreDate } from '../../store/Store';
import { useToast } from 'react-native-paper-toast';
import { StackActions } from '@react-navigation/native';
import { DataTable,ActivityIndicator,Colors} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Base_URL,PostDataWithToken ,GetDataWithToken} from '../../Apis/ApiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';


const ProfileScreen = ({ navigation },props) => {
  const [first_name, setFName]              = useState({ value: '', error: '' });
  const [last_name, setLName]               = useState({ value: '', error: '' });
  const [mobile_number, setMobileNumber]    = useState({ value: '', error: '' });
  const [email, setEmail]                   = useState({ value: '', error: '' });
  const [password, setPassword]             = useState({ value: '', error: '' });
  const [device_toekn, setDeviceToekn]      = useState("");
  const [UserProfile, setUserProfile]       = useState([]);
  const [WalletAmount, setWalletAmount]     = useState(0);
  const [TokenValue, setToken]              = useState({ tokens: '', langs: '' });
  const [loading, setLoding]                = useState(true);
  const [pay_type, setPayType]              = useState("");
  const toaster = useToast();
  //

 useFocusEffect(
    React.useCallback(() => {

          (async function() {
                
            let Tokendata={
              tokens: await AsyncStorage.getItem('Token'),
              langs:'en'
            }
            // console.log(Tokendata.tokens);
            setToken(Tokendata);
            GetDashboard(Tokendata);
          })();
      
    }, [])
  );
  const logout = () =>{

     navigation.navigate('Logout');
  }
  const Changepassword = () =>{
     navigation.navigate('ChangepasswordScreen');
  }
  const UpdatePaymentKyc = () =>{
     navigation.navigate('KycupdateScreen');
  }

   function GetDashboard(Tokendata){
    //
    let Endpoints = 'user/user-profile';
    // console.log("endpoints:"+Endpoints);
    GetDataWithToken(Endpoints,Tokendata,'').then((response) =>{
        console.log('token type='+JSON.stringify(response));
       response = JSON.parse(JSON.stringify(response));
       // response = JSON.parse(response.data);
        // console.log('response='+response);
       if(response.data){
        //  console.log(response.data.profile)
         setLoding(false);
         setUserProfile(response.data.profile);
         setWalletAmount(response.data.wallet_amount);
         setPayType(response.data.profile.pay_type);
         
          // console.log('response='+JSON.stringify(response.data.course));

       }
       
   });

  }

  const RowTableshow = () =>{

    var Box  = [];
    if(pay_type == 'bank'){
      Box.push(
        <DataTable.Row key={'bid_wallet'}>
        <DataTable.Cell style={styles.header}>{UserProfile.pay_type}</DataTable.Cell>
        <DataTable.Cell style={styles.header}>{UserProfile.account_name}</DataTable.Cell>
        <DataTable.Cell style={styles.header}>{UserProfile.bank_name}</DataTable.Cell>
        <DataTable.Cell style={styles.header}>{UserProfile.ifsc_code}</DataTable.Cell>
        <DataTable.Cell style={styles.header}>{UserProfile.account_number}</DataTable.Cell>
      </DataTable.Row>
        
      )
    }
    else {
      Box.push(
        <DataTable.Row key={'bid_wallet'}>
        <DataTable.Cell style={styles.header}>{UserProfile.pay_type}</DataTable.Cell>
        <DataTable.Cell style={styles.header}>{UserProfile.account_number}</DataTable.Cell>
      </DataTable.Row>
      )
    }
  
    return Box;

  }

  return (
    <ScrollView>
    <Background>
      

      <Logo />
      <View style={{ flexDirection: 'row'}}>
         <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>{UserProfile.first_name+' '+UserProfile.last_name}</DataTable.Title>
          </DataTable.Header>
      </DataTable>
      </View>

      
       <View style={{ flexDirection: 'row'}}>
         <DataTable>
          <DataTable.Header>
            <DataTable.Title>Mobile Number</DataTable.Title>
            <DataTable.Title>{UserProfile.mobile_number}</DataTable.Title>
          </DataTable.Header>
      </DataTable>
      </View>

      

      <View style={{ flexDirection: 'row'}}>
         <DataTable>
          <DataTable.Header>
            <DataTable.Title>Amount</DataTable.Title>
            <DataTable.Title>Rs.{WalletAmount}</DataTable.Title>
          </DataTable.Header>
      </DataTable>
      </View>
      <View>
        <Text>Account Details</Text>
    <View style={{ flexDirection: 'row'}}>
    <ScrollView horizontal>
    <DataTable>
      {pay_type == 'bank' &&
       <DataTable.Header>
        <DataTable.Title style={styles.header}>Type</DataTable.Title>
        <DataTable.Title style={styles.header}>Name</DataTable.Title>
        <DataTable.Title style={styles.header}>Bank Name</DataTable.Title>
        <DataTable.Title style={styles.header}>IFSC</DataTable.Title>
        <DataTable.Title style={styles.header}>Account Number</DataTable.Title>
      </DataTable.Header>
      }
      {pay_type != 'bank' &&
       <DataTable.Header>
        <DataTable.Title style={styles.header}>Type</DataTable.Title>
        <DataTable.Title style={styles.header}>Account Number</DataTable.Title>
      </DataTable.Header>
      }
       { loading ==true && <ActivityIndicator animating={true} />}
        {RowTableshow()}
    </DataTable>
    </ScrollView>
    </View>

      </View>
      <Button mode="contained" onPress={UpdatePaymentKyc}>
       Update Payment Details
      </Button>
      <Button mode="contained" onPress={Changepassword}>
       Change Password
      </Button>
      <Button mode="contained" onPress={logout}>
       Logout
      </Button>
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  header:{
    paddingLeft:16,
    // width:120
  },
  contain_row:{
    padding:2,
    flex:1,
    width:"90%"

  }
});

export default memo(ProfileScreen);
