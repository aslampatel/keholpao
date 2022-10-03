import React, { memo,useState,useEffect,useRef } from 'react';
import { Surface, Text,BottomNavigation,Headline,ActivityIndicator,Colors } from 'react-native-paper';
import { StyleSheet,View,ScrollView,Image,TouchableOpacity,Alert} from 'react-native';
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
import RNUpiPayment from 'react-native-upi-pay';
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


const PaymentScreen = ({ navigation },props) => {

    const toaster = useToast();
    const [amount, setAmount]    = useState({ value: '', error: '' });
    const [TokenValue, setToken] = useState({ tokens: '', langs: '' });

    const [select_number, setSelectNumber] = useState(0);
    const [btn_disable, setBtndisable]     = useState(false);
    const [messagedata, setMessage]        = useState("");
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

  
  // const AmountConfirmPressed = () => {
  //   // console.log(TokenValue);

  //   const bid_amountError   = nameValidator(amount.value,"Enter Amount"); 
  //   // const bid_amountError   = nameValidator(bid_amount.value,"Last name required");  
  //   if (bid_amountError) {
  //     setAmount({ ...amount, error: bid_amountError });
  //     return;
  //   }
  //   else{
  //      if(amount.value>=10){

  //        setBtndisable(true);
       
  //       let mid           = "veUJqX93074856055567";
  //       let order_id      = makeid();
  //       let merchant_key  = "TK4SY1o1YD9iFvKz";
  //       // let callback_url  = "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=";
  //       let callback_url  = "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID="
  //       let website_name  = "DEFAULT";
  //       let stagin_type   = "live";
  //       //=============================================
  //       // let mid           = "EpwyLR78050565007964";
  //       // let order_id      = makeid();
  //       // let merchant_key  = "gEg5GbAcxEXb9LpI";
  //       // let callback_url  = "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=";
  //       // // let callback_url  = "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID="
  //       // let website_name  = "WEBSTAGING";
  //       // let stagin_type   = "stagin";
  //       //====================================================
  //       let amount_get    = amount.value;
  //       let isStaging     = false

  //       let PostRequest ={
  //         mid:mid,
  //         order_id:order_id,
  //         merchant_key:merchant_key,
  //         callback_url:callback_url,
  //         website_name:website_name,
  //         stagin_type:stagin_type,
  //         amount:amount_get,
  //       } 
  //        // console.log(JSON.stringify(PostRequest));
  //       //
  //       PostDataWithToken('user/paytm-checksum',PostRequest,TokenValue).then((response) =>{
  //            //console.log("server reponse"+JSON.stringify(response));//
  //             setBtndisable(false);
  //           if(response.success){
  //             // console.log(response.data);
  //             paytmPay(order_id,mid,response.data,amount_get,callback_url,isStaging,true);
                     
  //           } 
  //           else{
  //               //
  //               let msg_error = "";
  //               let error_msg =  response.data.data.map(x=>msg_error=x+"\n");
  //               toaster.show({ message: error_msg, duration: 10000,type:"error" });
             
  //           }
  //              //console.log("new:"+this.state.Screentype);
  //         }).catch((error) => {
  //           //return error.data;
  //           // console.log(error);
  //           setBtndisable(false);
  //         });
  //     }
  //     else{
  //         Alert.alert('Error','Amount More Than Rs.10');
  //     }
  //    }
  //   }

  const AmountConfirmPressed = () => {
    // console.log(TokenValue);

    const bid_amountError   = nameValidator(amount.value,"Enter Amount"); 
    // const bid_amountError   = nameValidator(bid_amount.value,"Last name required");  
    if (bid_amountError) {
      setAmount({ ...amount, error: bid_amountError });
      return;
    }
    else{
       if(amount.value>=10){

          setBtndisable(true);
          let order_id      = makeid();
        //====================================================
          let amount_get    = amount.value;
          RNUpiPayment.initializePayment({
            vpa: 'q794116214@ybl',//your upi address like 12345464896@okhdfcbank
            payeeName: 'Khelopaomoneymoney',   			// payee name 
            amount: amount.value,				//amount
            transactionNote:'khelopaomoneymoney',//note of transaction
            transactionRef: order_id	//some refs to aknowledge the transaction
          },successCallback,failureCallback);
         // console.log(JSON.stringify(PostRequest));
      }
      else{
          Alert.alert('Error','Amount More Than Rs.10');
      }
     }
    }

    const failureCallback = (data) =>{
      
      console.log('failure data==',data);
      setBtndisable(false);
      // in case no action take
      // in case no action taken
    }
  const  successCallback = (data) =>{
      console.log(data['txnId']);
      setMessage("Succccessfull payment");
      // AmountToWallet(data['txnId']);
      wallet_recharage(amount.value,"c","deposite");
    }
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //==================================
  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}   

 const paytmPay = (orderId,mid,tranxToken,amount,callbackUrl,isStaging,appInvokeRestricted) =>{

   AllInOneSDKManager.startTransaction(
     orderId,
     mid,
     tranxToken,
     amount,
     callbackUrl,
     isStaging,
     appInvokeRestricted,
   )
   .then((result) => {
    console.log("result", result); 
    // handle result ..
      if(result.STATUS =='TXN_SUCCESS'){
        wallet_recharage(amount,"c","deposite");
      }
   })
   .catch((err) => {
    // handle error ..
   });
}

const wallet_recharage=(amount,status,type)=>{

        let PostRequest ={
          amount:amount,
          status:status,
          type:type
        } 
         // console.log(JSON.stringify(PostRequest));
        PostDataWithToken('user/wallet-recharage',PostRequest,TokenValue).then((response) =>{
             // console.log("server reponse"+JSON.stringify(response));
            if(response.success){
              // console.log(response);
              setBtndisable(false);
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
    <Header title="Payment" backpress="false">Login Template</Header>
 
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
          maxLength={10}
          minLength={1}
        />
         <Button mode="contained" onPress={AmountConfirmPressed} disabled={btn_disable} loading={btn_disable}>
             Add Amount
          </Button>

        </View>
      


  
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

export default memo(PaymentScreen);
