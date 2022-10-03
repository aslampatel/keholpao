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
import { PostData } from '../../Apis/ApiHelper';
import { StoreData,GetStoreDate } from '../../store/Store';
import { useToast } from 'react-native-paper-toast';
import { StackActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/FontAwesome5';



import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';


const RegisterScreen = ({ navigation },props) => {
  const [first_name, setFName] = useState({ value: '', error: '' });
  const [last_name, setLName] = useState({ value: '', error: '' });
  const [mobile_number, setMobileNumber] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [device_toekn, setDeviceToekn] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const toaster = useToast();
  //
  useEffect(() => {

   (async function() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log(await messaging().getToken());
      setDeviceToekn(await messaging().getToken());
      // console.log('Authorization status:', authStatus);
    }
  })();
},[]);
  const _onSignUpPressed = () => {

    const firstError  = nameValidator(first_name.value,"First name required");  
    const lastError   = nameValidator(last_name.value,"Last name required");  
    const mobile_numberError  = nameValidator(mobile_number.value,"Mobile Number required");  
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if ( passwordError || firstError || lastError || mobile_numberError) {
      setFName({ ...first_name, error: firstError });
      setLName({ ...last_name, error: lastError });
      setMobileNumber({ ...mobile_number, error: mobile_numberError });
      // setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    else{

        let PostRequest ={
          first_name:first_name.value,
          last_name:last_name.value,
          mobile_number:mobile_number.value,
          // email:email.value,
          password:password.value,
          device_toekn:device_toekn,
          device_type:"android"
        } 
    
         // console.log(JSON.stringify(PostRequest));
        //
        PostData('user/register',PostRequest).then((response) =>{
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
                navigation.dispatch(
                 StackActions.replace('LoginScreen')
                );
              //            
            } 
            else{
                //
                let msg_error = "";
                let error_msg =  response.data.data.map(x=>msg_error=x+"\n");
              toaster.show({ message: error_msg, duration: 10000,type:"error" })
            }
               //console.log("new:"+this.state.Screentype);
          }).catch((error) => {
            //return error.data;
            console.log(error);
          });

    }

    // navigation.navigate('Dashboard');
  };

  return (
    <ScrollView>
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />
      <View style={{ flexDirection: 'row'}}>
        <View style={styles.contain_row}>
        <TextInput
          label="First Name"
          returnKeyType="next"
          value={first_name.value}
          onChangeText={text => setFName({ value: text, error: '' })}
          error={!!first_name.error}
          errorText={first_name.error}
        />
        </View>
        <View style={styles.contain_row}>
        <TextInput
          label="Last Name"
          returnKeyType="next"
          value={last_name.value}
          onChangeText={text => setLName({ value: text, error: '' })}
          error={!!last_name.error}
          errorText={last_name.error}
        />
        </View>
      </View>

      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={mobile_number.value}
        onChangeText={text => setMobileNumber({ value: text, error: '' })}
        error={!!mobile_number.error}
        errorText={mobile_number.error}
        keyboardType="phone-pad"
        maxLength={10}
      />

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
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={hidePass ? true : false}
        right={<Input.Icon name={() => <Icon name={hidePass ? 'eye-slash' : 'eye'} size={15} color="grey"/>} onPress={() => setHidePass(!hidePass)} /> }
      />
    
      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
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

export default memo(RegisterScreen);
