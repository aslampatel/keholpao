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



const KycupdateScreen = ({ navigation },props) => {

    const toaster                             = useToast();
    const [amount, setAmount]                 = useState({ value: '', error: '' });
    const [UpiId, setUpiId]                   = useState({ value: '', error: '' });
    const [TokenValue, setToken]              = useState({ tokens: '', langs: '' });
    const [showDropDown, setShowDropDown]     = useState(false);
    const [pay_type, setUpiType]              = useState("paytm");
    const [account_name, setAccountName]      = useState({ value: '', error: '' });
    const [bank_name, setBankName]            = useState({ value: '', error: '' });
    const [ifsc_code, setIfscCode]            = useState({ value: '', error: '' });
    const [account_number, setAccountNumber]  = useState({ value: '', error: '' });
    const [select_number, setSelectNumber]    = useState(0);
    const [account_lable, setAccountLable]    = useState('Enter Upi Id or Phone Number');
    //
    const UpiList = [
      {
        label: "Paytm",
        value: "paytm",
      },
      {
        label: "Upi",
        value: "upi",
      },
      {
        label: "Bank",
        value: "bank",
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
    // const bid_amountError          = nameValidator(amount.value,"Enter Amount"); 
    const account_numberError       = nameValidator(account_number.value,"Enter "+account_lable); 
    const ifsc_code_numberError     = nameValidator(ifsc_code.value,"Enter IFSC Code");
    const bank_name_numberError     = nameValidator(bank_name.value,"Enter Bank Name");
    const account_name_numberError  = nameValidator(account_name.value,"Enter Account Holder Name");
    // const bid_amountError   = nameValidator(bid_amount.value,"Last name required");  
    if(pay_type == 'bank' &&  (account_numberError || ifsc_code_numberError || bank_name_numberError || account_name_numberError)) {
        setAccountNumber({ ...account_number, error: account_numberError });
        setIfscCode({ ...ifsc_code, error: ifsc_code_numberError });
        setBankName({ ...bank_name, error: bank_name_numberError });
        setAccountName({ ...account_name, error: account_name_numberError });
        return;
    }
    else if(pay_type != '' && account_numberError){
        // console.log('error')
        setAccountNumber({ ...account_number, error: account_numberError });
        return;
    }
    else{

         let PostRequest ={
          pay_type:pay_type,
          account_number:account_number.value,
          ifsc_code:ifsc_code.value,
          bank_name:bank_name.value,
          account_name:account_name.value,
        } 
    
        //  console.log(JSON.stringify(PostRequest));
        //
        PostDataWithToken('user/update-kyc-details',PostRequest,TokenValue).then((response) =>{
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
const selectPaytype = (pay_type_select) =>{

    setUpiType(pay_type_select);
    if(pay_type_select == 'bank'){
        setAccountLable('Enter Bank Number');

    }
    else{
        setAccountLable('Enter Upi Id or Phone Number');
    }

}
  

return (
<View style={styles.container}>
  <SafeAreaView>
  <KeyboardAvoidingView  keyboardVerticalOffset={10}>
  <ScrollView>
    <Header title="Payment Information update" backpress="false">Login Template</Header>
 
      <Image source={require('../assets/dashboard.png')} style={styles.image} />

      <View style={{borderTopWidth:1.5,borderColor:'#b8b8b8' ,padding:10}}>
        
        <DropDown
        label={"Select Upi"}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={pay_type}
        setValue={(text)=>{ selectPaytype(text) }}
        list={UpiList}
        />
{ pay_type == 'bank' && 
        <View>
        <TextInput
          label="Enter Account Holder Name"
          returnKeyType="next"
          value={account_name.value}
          onChangeText={text => setAccountName({ value: text, error: '' })}
          error={!!account_name.error}
          errorText={account_name.error}
        />
        <TextInput
          label="Enter Bank Name"
          returnKeyType="next"
          value={bank_name.value}
          onChangeText={text => setBankName({ value: text, error: '' })}
          error={!!bank_name.error}
          errorText={bank_name.error}
        />
        <TextInput
          label="Enter IFSC Code"
          returnKeyType="next"
          value={ifsc_code.value}
          onChangeText={text => setIfscCode({ value: text, error: '' })}
          error={!!ifsc_code.error}
          errorText={ifsc_code.error}
        />
    </View>    
}
        <TextInput
          label={account_lable}
          returnKeyType="next"
          value={account_number.value}
          onChangeText={text => setAccountNumber({ value: text, error: '' })}
          error={!!account_number.error}
          errorText={account_number.error}
        />


    
         <Button mode="contained" onPress={AmountConfirmPressed}>
             Update Payment Information
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

export default memo(KycupdateScreen);
