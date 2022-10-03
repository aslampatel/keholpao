import React, { memo,useState, useEffect} from 'react';
import { Surface, Text,BottomNavigation,Title,ActivityIndicator,Colors} from 'react-native-paper';
import { StyleSheet,View,ScrollView,Image} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Tabs,TabScreen,useTabIndex,useTabNavigation } from 'react-native-paper-tabs';
import { Base_URL,PostDataWithToken ,GetDataWithToken} from '../../Apis/ApiHelper';
import { StoreData,GetStoreDate } from '../../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
import BackgroundHome from '../components/BackgroundHome';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import DataTableList from '../components/DataTableList';
import DataTableWin from '../components/DataTableWin';
import DataTableWallet from '../components/DataTableWallet';
import { Col, Row, Grid } from "react-native-paper-grid";
import { useFocusEffect } from '@react-navigation/native';


function ExploreWitHookExamples() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{ flex:1 }}>
      <Title>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button  mode="contained" onPress={() => goTo(1)}>Go to Flights</Button>
    </View>
  );
}

const MyplayScreen = ({ navigation },props) => {
    const [TokenValue, setToken] = useState({ tokens: '', langs: '' });
     const [play_list, setPlayList] = useState([]);
     const [play_list_win, setPlayListWin] = useState([]);
     const [wallet_list, setWalletList] = useState([]);
     const [wallet_amount, setWalletAmount] = useState(0);
     const [loading, setLoding] = useState(true);

 // React.useEffect(() => {
 //   (async function() {
        
 //    let Tokendata={
 //      tokens: await AsyncStorage.getItem('Token'),
 //      langs:'en'
 //    }
 //    // console.log(Tokendata.tokens);
 //    setToken(Tokendata);
 //    GetDashboard(Tokendata);
 //    })();
 //    // this.GetDashboard(Tokendata);
 //  },[props]);

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

   function GetDashboard(Tokendata){
    //
    let Endpoints = 'user/my-play-list';
    // console.log("endpoints:"+Endpoints);
    GetDataWithToken(Endpoints,Tokendata,'').then((response) =>{
        // console.log('token type='+JSON.stringify(response));
       response = JSON.parse(JSON.stringify(response));
       setLoding(false);
       // response = JSON.parse(response.data);
        // console.log('response='+response);
       if(response.data){
         // setLoding(false);
         if(response.data.play_list){
             setPlayList(response.data.play_list);
             setPlayListWin(response.data.play_win);
             setWalletList(response.data.wallet_list);
             setWalletAmount(response.data.wallet_amount);
             
             // setLoding(false)
             // console.log( response.data.play_list)
         }
          // console.log('response='+JSON.stringify(response.data.course));

       }
       
   });

  }

return (
<View style={styles.container}>

    <Header title="My Play" backpress="false">Login Template</Header>
      
       <Tabs showTextLabel="true" style={styles.tabbg} iconPosition="top">
        <TabScreen label="My Play List" icon="compass">
          <View>
         
            <DataTableList bid_list={play_list} />
          </View>
        </TabScreen>
        <TabScreen label="Win Bid" icon="currency-inr">
         <DataTableWin bid_list={play_list_win} />
        </TabScreen>
        <TabScreen label="Wallet" icon="currency-inr">
        <View>
        <View style={{ padding:10 }}>
          
           <Title>Total Wallet Amount:Rs.{wallet_amount}</Title>
          <Button mode="contained" onPress={()=>navigation.navigate('PaymentScreen')}>
            Add Amount in wallet
          </Button>
          <Button mode="contained" onPress={()=>navigation.navigate('WithdrwalScreen')}>
            Withdrawal Amount from wallet
          </Button>
          </View>
           <DataTableWallet bid_list={wallet_list} />
           </View>
        </TabScreen>
      </Tabs>

  
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
  tabbg:{
    backgroundColor:"#fff",
    color:"red"
  },
  headerTitle:{
    color:"#fff"
  }
});

export default memo(MyplayScreen);
