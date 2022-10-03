import React, { memo,useState,useEffect,useRef } from 'react';
import { Surface, Text,BottomNavigation,Headline,ActivityIndicator,Colors } from 'react-native-paper';
import { SafeAreaView,KeyboardAvoidingView,StyleSheet,View,ScrollView,Image,TouchableOpacity} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Base_URL,PostDataWithToken ,GetDataWithToken} from '../../Apis/ApiHelper';
import { StoreData,GetStoreDate } from '../../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import { useToast } from 'react-native-paper-toast';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { StackActions } from '@react-navigation/native';
import DropDown from "react-native-paper-dropdown";

//
import BackgroundHome from '../components/BackgroundHome';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import TextInput from '../components/TextInput';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';



const WithdrwalScreen = ({ navigation },props) => {

    const toaster = useToast();
    const [amount, setAmount]     = useState({ value: '', error: '' });
    const [UpiId, setUpiId]       = useState({ value: '', error: '' });
    const [TokenValue, setToken]  = useState({ tokens: '', langs: '' });
    const [showDropDown, setShowDropDown] = useState(false);
    const [upi_type, setUpiType]          = useState("paytm");

    const [select_number, setSelectNumber] = useState(0);
    const UpiList = [
      {
        label: "Paytm",
        value: "paytm",
      },
      {
        label: "Upi",
        value: "upi",
      },
    ];
    const refRBSheet = useRef();
   useEffect(() => {

   (async function() {
        
    let Tokendata={
      tokens: await AsyncStorage.getItem('Token'),
      langs:'en'
    }
    // console.log(Tokendata.tokens);
    setToken(Tokendata);
    // GetDashboard(Tokendata);
    })();
    // this.GetDashboard(Tokendata);
  },[props]);

  
  const AmountConfirmPressed = () => {
    // console.log(TokenValue);

    const bid_amountError   = nameValidator(amount.value,"Enter Amount"); 
    // const bid_upiError   = nameValidator(UpiId.value,"Enter  Upi Id/ phone number"); 
    // const bid_amountError   = nameValidator(bid_amount.value,"Last name required");  
    if (bid_amountError) {
      setAmount({ ...amount, error: bid_amountError });
      // setUpiId({ ...UpiId, error: bid_upiError });
      return;
    }
    else{

         let PostRequest ={
          amount:amount.value,
          // upi_id:UpiId.value,
          // upi_type:upi_type,
          status:"D",
          type:"withdrawal"
        } 
    
         console.log(JSON.stringify(PostRequest));
        //
        PostDataWithToken('user/withdraw-amount',PostRequest,TokenValue).then((response) =>{
             console.log("server reponse"+JSON.stringify(response));
            if(response.success){
              // console.log(response);
               toaster.show({
                message: response.message,
                position: 'bottom',
                duration: 1500,
                type: 'success',
                });
               navigation.dispatch(StackActions.replace('MyplayScreen'));
              // paytmPay(order_id,mid,response.data,amount_get,callback_url,isStaging,true);
                     
            } 
            else{
                //
                 toaster.show({ message: response.data.message, duration: 6000,type:"error" })
             
            }
               //console.log("new:"+this.state.Screentype);
          }).catch((error) => {
            //return error.data;
             toaster.show({ message: error.data.message, duration: 6000,type:"error" })
              console.log(error);
          });
      }
    }



const wallet_recharage=(amount,status,type)=>{


        let PostRequest ={
          amount:amount,
          status:status,
          type:type
        } 
    
         console.log(JSON.stringify(PostRequest));
        //
        PostDataWithToken('user/wallet-recharage',PostRequest,TokenValue).then((response) =>{
             // console.log("server reponse"+JSON.stringify(response));
            if(response.success){
              // console.log(response);
               navigation.dispatch(StackActions.replace('HomeScreen'));
              // paytmPay(order_id,mid,response.data,amount_get,callback_url,isStaging,true);
                     
            } 
            else{
                //
                let msg_error = "";
                let error_msg =  response.data.data.map(x=>msg_error=x+"\n");
                 toaster.show({ message: error_msg, duration: 10000,type:"error" });
             
            }
               //console.log("new:"+this.state.Screentype);
          }).catch((error) => {
            //return error.data;
            console.log(error);
          });

}
  

return (
<View style={styles.container}>
  <SafeAreaView>
  <KeyboardAvoidingView  keyboardVerticalOffset={10}>
  <ScrollView>
    <Header title="Withdrwal Payment" backpress="false">Login Template</Header>
 
      <Image source={require('../assets/dashboard.png')} style={styles.image} />

      <View style={{borderTopWidth:1.5,borderColor:'#b8b8b8' ,padding:10}}>
        <TextInput
          label="Enter Amount"
          returnKeyType="next"
          value={amount.value}
          onChangeText={text => setAmount({ value: text, error: '' })}
          error={!!amount.error}
          errorText={amount.error}
          keyboardType="phone-pad"
        />


         <Button mode="contained" onPress={AmountConfirmPressed}>
             Withdrwal Amount
          </Button>

        </View>
      </ScrollView>
  </KeyboardAvoidingView> 
  </SafeAreaView>
  </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding:0

  },
  bottomnav:{
    flex: 1,
    height:hp(5),

  },
  surface: {
    padding: 1,
    height: 60,
    width:80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: '#c9c7cd'
  },
   image: {
    width: '100%',
    height: 175,
    marginBottom: 12,
  },
});

export default memo(WithdrwalScreen);
