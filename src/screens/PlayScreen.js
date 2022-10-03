import React, { memo,useState,useEffect,useRef } from 'react';
import { Surface, Text,BottomNavigation,Headline,ActivityIndicator,Colors } from 'react-native-paper';
import { StyleSheet,View,ScrollView,Image,TouchableOpacity,ImageBackground,Alert} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Base_URL,PostDataWithToken ,GetDataWithToken} from '../../Apis/ApiHelper';
import { StoreData,GetStoreDate } from '../../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import { useToast } from 'react-native-paper-toast';
import moment from "moment";
//
import BackgroundHome from '../components/BackgroundHome';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import TextInput from '../components/TextInput';
import { Col, Row, Grid } from "react-native-paper-grid";
import RBSheet from "react-native-raw-bottom-sheet";
import { useFocusEffect } from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';


const PlayScreen = ({ navigation },props) => {
    //
    const toaster                             = useToast();
    const [bids_number, setBidNumber]         = useState(0);
    const [loading, setLoding]                = useState(true);
    const [bid_amount, setBidAmount]          = useState({ value: '', error: '' });
    const [TokenValue, setToken]              = useState({ tokens: '', langs: '' });

    const [select_number, setSelectNumber]    = useState(0);
    const [totalDuration, setTotalDuration]   = useState(0);
    const [disable_touch, setDisableTouch]    = useState(false);
    const [wallet_amount, setWalletAmount]    = useState(0);
    const [btn_disable, setBtndisable]        = useState(false);
    const [current_slot_time, setCurrentSlot] = useState("");
    const refRBSheet = useRef();
     useEffect(() => {
        // TimerStart();
        // setTotalDuration(200);
     },[props]);

  //  useEffect(() => {

  //  (async function() {
        
  //   let Tokendata={
  //     tokens: await AsyncStorage.getItem('Token'),
  //     langs:'en'
  //   }
  //   // console.log(Tokendata.tokens);
  //   setToken(Tokendata);
  //   GetDashboard(Tokendata);
  //   })();
  //   // this.GetDashboard(Tokendata);
  // },[props
   useFocusEffect(
     //
    React.useCallback(() => {

          (async function() {
                
            let Tokendata={
              tokens: await AsyncStorage.getItem('Token'),
              langs:'en'
            }
            // console.log(Tokendata.tokens);
            await setToken(Tokendata);
            await GetDashboard(Tokendata);
            // setTotalDuration(0)
           
          })();
      
    },[props])
  );
  const onFinished = (Tokendata) =>{
    // alert(11)
     GetDashboard(Tokendata);
  }

  function GetDashboard(Tokendata){
    //
    let Endpoints = 'user/get-bid-number';
    //console.log("endpoints:"+Endpoints);
    GetDataWithToken(Endpoints,Tokendata,'').then((response) =>{
        // console.log('token type='+JSON.stringify(response));
       response = JSON.parse(JSON.stringify(response));
       // response = JSON.parse(response.data);
        // console.log('response='+response);
       if(response.data){

         if(response.data.wallet_amount){
            setWalletAmount(response.data.wallet_amount);
         }

         if(response.data.bids_number_data){
             setBidNumber(response.data.bids_number_data.setting_value);
             setLoding(false)
             let current_date = moment().utcOffset('+05:30').format('YYYY-MM-DD');
             //
            let slot_end           = current_date+' '+response.data.current_slot.end_time+":00";
            let slot_date_endtime  = moment(slot_end, ["YYYY-MM-DD hh.mm.ss"]).utcOffset('+05:30').format("YYYY-MM-DD HH:mm:ss");
              // TimerStart(slot_date_endtime);//

                let date = 
      moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD HH:mm:ss');
    // Getting the current date-time
    // You can set your own date-time
    // let expirydate = '2021-11-23 04:00:45';
    
    let diffr = 
      moment
        .duration(moment(slot_date_endtime)
        .diff(moment(date)));
     // console.log('date diff',diffr);
    // Difference of the expiry date-time
    let hours   = parseInt(diffr.asHours());
    let minutes = parseInt(diffr.minutes());
    let seconds = parseInt(diffr.seconds());

    if(hours<0){
      hours = hours*-1;
    } 
    if(minutes<0){
      minutes = minutes*-1;
    }  
    if(seconds<0){
      seconds = seconds*-1;
    }
    // Converting in seconds
    let d = hours * 60 * 60 + minutes * 60 + seconds;
    if(d<0){
      // d = -1*d;
      // setTotalDuration(d);
    }
      // setTotalDuration(d);

      // useEffect(() => {  setTotalDuration(d) })
        setTotalDuration(d);
        // console.log('time',d);
         }
         if(response.data.current_bid.id){
           // alert("in bid")
           setDisableTouch(true);
         }

       }
       
   });

  }
 const  TimerStart = (expirydate) => {
     // alert('start');
     // body...
    // console.log(expirydate)
     let date = 
      moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD HH:mm:ss');
    // Getting the current date-time
    // You can set your own date-time
    // let expirydate = '2021-11-23 04:00:45';
    
    let diffr = 
      moment
        .duration(moment(expirydate)
        .diff(moment(date)));
     // console.log('date diff',diffr);
    // Difference of the expiry date-time
    let hours   = parseInt(diffr.asHours());
    let minutes = parseInt(diffr.minutes());
    let seconds = parseInt(diffr.seconds());

    if(hours<0){
      hours = hours*-1;
    } 
    if(minutes<0){
      minutes = minutes*-1;
    }  
    if(seconds<0){
      seconds = seconds*-1;
    }
    // Converting in seconds
    let d = hours * 60 * 60 + minutes * 60 + seconds;
    if(d<0){
      // d = -1*d;
      setTotalDuration(d);
    }
      setTotalDuration(d);
    console.log('time',d);
    // Settign up the duration of countdown
    
   }
  const onSelectNumber =(numberselect) =>{
    // body...
    // alert(disable_touch)
    // console.log("select number=="+numberselect);
    if(disable_touch==true){
      Alert.alert('Error','Already Bid On This Slot,Please Bid On Next Slot');
    }
    else{
          setSelectNumber(numberselect);
          setBidAmount({ value: '', error: '' });
          refRBSheet.current.open();
    }

  }


  const BidConfirmPressed = () => {
    // console.log(TokenValue);

    const bid_amountError   = nameValidator(bid_amount.value,"Enter Bid Amount"); 
    // const bid_amountError   = nameValidator(bid_amount.value,"Last name required");  
    if (bid_amountError) {
      setBidAmount({ ...bid_amount, error: bid_amountError });
      return;
    }
    else{
        if(bid_amount.value>=10)
        {
          let PostRequest ={
            bid_amount:bid_amount.value,
            bid_number:select_number,
          } 
          setBtndisable(true);
          // console.log(JSON.stringify(PostRequest));
        //
        PostDataWithToken('user/bid-on-game',PostRequest,TokenValue).then((response) =>{
             // console.log("server reponse"+JSON.stringify(response));
            if(response.success){
              // console.log(response);
              toaster.show({
                  message: response.message,
                  position: 'bottom',
                  duration: 6000,
                  type: 'success',
                });

              refRBSheet.current.close()
              setBtndisable(false);
              setDisableTouch(true);
              //
                // navigation.dispatch(
                //    StackActions.replace('MyplayScreen')
                // );
              //            
            } 
            else{
                //
                let msg_error = "";
                let error_msg =  response.data.data.map(x=>msg_error=x+"\n");
                toaster.show({ message: response.message, duration: 10000,type:"error" });
                 refRBSheet.current.close()
                 setBtndisable(false);
                 navigation.navigate('PaymentScreen')
            }
               //console.log("new:"+this.state.Screentype);
          }).catch((error) => {
            //return error.data;
            console.log(error);
          });
        }
        else{
          Alert.alert('Error','Bid Amount More Than Rs.10');
        }
  
      }
    }
  function BidNumberBox() {
    // body...
    var Box  = [];
    for (let i = 1; i <=bids_number ; i++) {

   
      Box.push(
              
                 <View style={styles.contain_row} key={"bid_box"+i}>
                  <TouchableOpacity onPress={()=>onSelectNumber(i)}>
                    <Surface style={styles.surface}>
                      <View
                      style={{
                      width: 0,
                      height: 0,
                      backgroundColor: 'transparent',
                      borderStyle: 'solid',
                      borderRightWidth: 20,
                      borderTopWidth: 20,
                      borderRightColor: 'transparent',
                      borderTopColor: '#5fd49f',
                      position: 'absolute',
                      top:0,
                      right:0,
                      transform: [{rotate: '90deg'}],
                      }}
                      />
                    <Text>{i}</Text>
                    </Surface>
                    </TouchableOpacity>
                  </View>
             
                  
        )


    }
     return Box;
  }
  

return (
  <View style={styles.container}>
      <Header title="Home" backpress="false">Login Template</Header>
        <ImageBackground source={require('../assets/dashboard.png')} style={styles.image}>
         <Text style={styles.title_count_doc}>
          Next Slot Start Time:
        </Text>
         {totalDuration>0 && <CountDown
          until={totalDuration}
          size={20}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: '#1CC625'}}
          timeLabelStyle={{color: '#FFF',fontSize:12}}
          timeToShow={['H','M', 'S']}
          onFinish={() => onFinished(TokenValue)}
          onPress={() => console.log('test count press')}
          timeLabels={{h:'Hours',m: 'MM', s: 'SS'}}
          id={"counter_id1"}
          running="false"
          />}
      
          
          </ImageBackground>
         

        { loading ==true && <ActivityIndicator animating={true} style={styles.loadingarea} />}
         <ScrollView style={{position:"relative"}}>
         <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
         
           {BidNumberBox()}
          
          </View>
       </ScrollView> 

      <RBSheet
        ref={refRBSheet}
        height={heightPercentageToDP(50)}
        openDuration={10}
          animationType ={'slide'}
          customStyles={{
            container: {
              borderTopLeftRadius:10,
              borderTopRightRadius:10,
            }
          }}
      >
      <BackgroundHome>
        
          <View style={{flex:1, borderTopWidth:0,padding:3}}>
          <View style={{borderBottomWidth:0,borderColor:'#b8b8b8',padding:15}}>
           <View><Ionicons name="close" onPress={() => refRBSheet.current.close()} style={{textAlign: 'right',height:20}} /></View>
            <Headline>Confirm Bid To Number</Headline>
          </View>
            <View style={{borderTopWidth:1.5,borderColor:'#b8b8b8'}}>
            <Headline>You have select number:{select_number}</Headline>
            <Headline>Total Amount:{wallet_amount}</Headline>
            <TextInput
              label="Enter Bid Amount"
              returnKeyType="next"
              value={bid_amount.value}
              onChangeText={text => setBidAmount({ value: text, error: '' })}
              error={!!bid_amount.error}
              errorText={bid_amount.error}
              keyboardType="phone-pad"
            />
             <Button mode="contained" onPress={BidConfirmPressed} disabled={btn_disable} loading={btn_disable}>
                 Confirm Bid
              </Button>

          </View>
          </View>

          </BackgroundHome>
        </RBSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding:0

  },
  title_count_doc:{
     textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color:'#fff'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
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
  contain_row:{
    padding:6,
    width:"25%"

  },
  loadingarea:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default memo(PlayScreen);
