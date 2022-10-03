import React, { memo,useState,useEffect,useRef }  from 'react';
import { Surface, Text,BottomNavigation,Title,Modal, Portal,DataTable } from 'react-native-paper';
import { StyleSheet,View,ScrollView,Image,ImageBackground} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {FlatListSlider} from 'react-native-flatlist-slider';

import { Base_URL,PostDataWithToken ,GetDataWithToken} from '../../Apis/ApiHelper';
import { StoreData,GetStoreDate } from '../../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useToast } from 'react-native-paper-toast';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { StackActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
//
import BackgroundHome from '../components/BackgroundHome';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import Preview from '../components/Preview';
import { Col, Row, Grid } from "react-native-paper-grid";
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({ navigation },props) => {


const [Windashboard, setDashboardWin]  = React.useState([]);
const [visible, setVisible]      = React.useState(true);
const [TokenValue, setToken]     = React.useState({ tokens: '', langs: '' });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const _onLoginPressed = () =>{

     navigation.navigate('PlayScreen');
  } 



  useEffect(() => {

  (async function() {
                
            let Tokendata={
              tokens: await AsyncStorage.getItem('Token'),
              langs:'en'
            }
            // console.log(Tokendata.tokens);
            await setToken(Tokendata);
            await GetDashboard(Tokendata);
          })();
  
  },[]);

 

   function GetDashboard(Tokendata){
    //
    let Endpoints = 'user/dashboard';
    // console.log("endpoints:"+Endpoints);
    GetDataWithToken(Endpoints,Tokendata,'').then((response) =>{
       console.log('token type='+JSON.stringify(response));
       response = JSON.parse(JSON.stringify(response));
       // response = JSON.parse(response.data);
        // console.log('response='+response);
       if(response.data){
         setDashboardWin(response.data.play_win)
         let objectLength = Object.keys(Windashboard).length
         // alert(objectLength)
          // console.log('response='+JSON.stringify(response.data.course));

       }
       
   });

  }


return (
 <ScrollView>
<View style={styles.container}>
    <Header title="Home" backpress="false">Login Template</Header>
 
     <Image source={require('../assets/250x250px.png')} style={styles.image} />
       {/*<FlatListSlider
        data={images}
        width={200}
        timer={2000}
        imageKey={'banner'}
        component={<Preview />}
        indicator={false}
        local
        onPress={item => alert(JSON.stringify(item))}
        contentContainerStyle={{paddingHorizontal: 16}}
      />
      */}
      <Portal>
      <Modal visible={visible} dismissable={false} onDismiss={hideModal} contentContainerStyle={containerStyle}>
     
      <View style={{alignItems: 'flex-end'}}>
           <Icon name='times-circle' size={25} color="grey" onPress={hideModal}/>
      </View>
      <View>
        {Windashboard != null  && Object.keys(Windashboard).length >0 && <View>
          <Title>Your Last Bid Win</Title>
         <DataTable>
            <DataTable.Header>
            <DataTable.Title>Choose Number</DataTable.Title>
            <DataTable.Title >Slot Time</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
            <DataTable.Title numeric>Date</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row key={'bid_list'}>
              <DataTable.Cell style={{flex: .8}}>{Windashboard.bid_number}</DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>{  moment(Windashboard.slot.start_time, ["HH.mm"]).format("hh:mm")+"-"+moment(Windashboard.slot.end_time, ["HH.mm"]).format("hh:mm")}</DataTable.Cell>
              <DataTable.Cell numeric> Rs. {Windashboard.bid_amount*10}</DataTable.Cell>
              <DataTable.Cell numeric>{moment(Windashboard.created_at).format("DD-MM-YYYY")}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          </View>
        }
        </View>
        {Windashboard ==null && <Image source={require('../assets/250x250px.png')} style={styles.popupimage} />}
        
      </Modal>
      </Portal>
        
        <View style={{padding:10}}>
        <Button mode="contained" onPress={_onLoginPressed}>Let's Play</Button>  
        </View>

  
  </View>
   </ScrollView>
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
    position:'relative',
    height:400,
    marginTop:1,
    width:'100%'
  },
  popupimage: {
    position:'relative',
    height:400,
    marginTop:1,
    width:'100%'
  },
});

export default memo(HomeScreen);
