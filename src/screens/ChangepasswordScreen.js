import React, { memo, useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';
import { Base_URL,PostDataWithToken ,GetDataWithToken} from '../../Apis/ApiHelper';
import { StoreData,GetStoreDate } from '../../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-paper-toast';
import { StackActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/FontAwesome5';



import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';


const ChangepasswordScreen = ({ navigation },props) => {

  //const [first_name, setFName]           = useState({ value: '', error: '' });
  //const [last_name, setLName]            = useState({ value: '', error: '' });
  const [mobile_number, setMobileNumber] = useState({ value: '', error: '' });
  // const [email, setEmail]                = useState({ value: '', error: '' });
  const [password, setPassword]          = useState({ value: '', error: '' });
  const [oldpassword, setOldPassword]    = useState({ value: '', error: '' });
  const [confirmpassword, setConfirmPassword]    = useState({ value: '', error: '' });
  const [device_toekn, setDeviceToekn]   = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [hideOldPass, setHideOldPass] = useState(true);
  const [hideConfPass, setHideConfPass] = useState(true);
    const [TokenValue, setToken] = useState({ tokens: '', langs: '' });
  const toaster = useToast();
  //
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
  const _onSignUpPressed = () => {
 
    const passwordError = passwordValidator(password.value);
    const passwordOldError = passwordValidator(oldpassword.value);
    const passwordConfError = passwordValidator(confirmpassword.value);

    if ( passwordError || passwordConfError || passwordOldError) {
      // setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setOldPassword({ ...oldpassword, error: passwordOldError });
      setConfirmPassword({ ...confirmpassword, error: passwordConfError });
      return;
    }
    else{

        let PostRequest ={
          password:password.value,
          confirm_password:confirmpassword.value,
          old_password:oldpassword.value,
        } 
         // console.log(JSON.stringify(PostRequest));
        //
        PostDataWithToken('user/change-password',PostRequest,TokenValue).then((response) =>{
             console.log("server reponse"+JSON.stringify(response));
            if(response.success){
              // console.log(response);
              toaster.show({
                  message: response.message,
                  position: 'bottom',
                  duration: 2500,
                  type: 'success',
                });
              //
                navigation.navigate('HomeScreen');
              //            
            } 
            else{
                //
                let msg_error = "";
                // let error_msg =  response.data.map(x=>msg_error=x+"\n");x
                toaster.show({ message: response.data.message, duration: 10000,type:"error" })
            }
               //console.log("new:"+this.state.Screentype);
          }).catch((error) => {
            //return error.data;
            console.log(error);
                // toaster.show({ message: error.message, duration: 10000,type:"error" })
          });

    }

    // navigation.navigate('Dashboard');
  };

  return (
    <ScrollView>
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />




     {/* <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      /> */}

      <TextInput
        label="Old Password"
        returnKeyType="done"
        value={oldpassword.value}
        onChangeText={text => setOldPassword({ value: text, error: '' })}
        error={!!oldpassword.error}
        errorText={oldpassword.error}
        secureTextEntry={hideOldPass ? true : false}
        right={<Input.Icon name={() => <Icon name={hideOldPass ? 'eye-slash' : 'eye'} size={15} color="grey"/>} onPress={() => setHideOldPass(!hideOldPass)} /> }
      /> 

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={hidePass ? true : false}
        right={<Input.Icon name={() => <Icon name={hidePass ? 'eye-slash' : 'eye'} size={15} color="grey"/>} onPress={() => setHidePass(!hidePass)} /> }
      />

      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmpassword.value}
        onChangeText={text => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmpassword.error}
        errorText={confirmpassword.error}
        secureTextEntry={hideConfPass ? true : false}
        right={<Input.Icon name={() => <Icon name={hideConfPass ? 'eye-slash' : 'eye'} size={15} color="grey"/>} onPress={() => setHideConfPass(!hideConfPass)} /> }
      />


    
      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Change Password
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
  contain_row:{
    padding:2,
    flex:1,
    width:"90%"

  }
});

export default memo(ChangepasswordScreen);
