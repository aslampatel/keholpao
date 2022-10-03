import React, { memo, useState,useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View ,ScrollView} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator ,nameValidator} from '../core/utils';
import { TextInput as Input } from 'react-native-paper';
import { Navigation } from '../types';
import { PostData } from '../../Apis/ApiHelper';
import { StoreData,GetStoreDate } from '../../store/Store';
import { useToast } from 'react-native-paper-toast';
import { StackActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/FontAwesome5';


const LoginScreen = ({ navigation },props) => {
  const [email, setEmail]                = useState({ value: '', error: '' });
  const [password, setPassword]          = useState({ value: '', error: '' });
  const [device_toekn, setDeviceToekn]   = useState("");
  const [mobile_number, setMobileNumber] = useState({ value: '', error: '' });
  const [btn_disable, setBtndisable]     = useState(false);
   const [hidePass, setHidePass] = useState(true);
  // const [btn_disable, setMobileNumber] = useState(false);
  const toaster = useToast();

  useEffect(() => {
    // Update the document title using the browser API
    // console.log("in useEffect");
       GetStoreDate('AuthTrue').then((response) =>{
         // console.log('store data ='+JSON.stringify(response));
         if(response =="true"){
           //
            // navigation.dispatch(StackActions.replace('HomeScreen'));
            // this.props.navigation.navigate("QuizList");
         }
       },[props]);
    //document.title = `You clicked ${count} times`;
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


  const _onLoginPressed = () => {
    // const emailError     = emailValidator(email.value);
    const passwordError       = passwordValidator(password.value);
    const mobile_numberError  = nameValidator(mobile_number.value,"Mobile Number required");  

    if (mobile_numberError || passwordError) {
      // setEmail({ ...email, error: emailError });
      setMobileNumber({ ...mobile_number, error: mobile_numberError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    else{
      setBtndisable(true);
      let PostRequest ={
      mobile_number:mobile_number.value,
      password:password.value,
      device_token:device_toekn,
      device_type:"android"
    } 
    
     console.log(JSON.stringify(PostRequest));
    //
    PostData('user/login',PostRequest).then((response) =>{
             console.log("server reponse"+JSON.stringify(response));
            if(response.success){
              //console.log(response);
              response = JSON.parse(JSON.stringify(response));
              //console.log(response.data.user.profile_image);
              StoreData('Token',response.data.token);
              StoreData('User',JSON.stringify(response.data.user));
              StoreData('avatar',response.data.user.avatar);
              //global.FirstName = response.data.user.first_name;
              //global.LastName = response.data.user.last_name;
              StoreData('Token_type',response.data.token_type);
              StoreData('Lang','en');
              StoreData('AuthTrue','true');
              //
              toaster.show({
                message: response.message,
                position: 'bottom',
                duration: 1500,
                type: 'success',
                });
              //

                navigation.dispatch(
                StackActions.replace('HomeScreen', {
                   user: 'jane',
                  })
                );
              
              //            
            } 
            else{
                //
                setBtndisable(false);
                 toaster.show({ message: response.data.message, duration: 6000,type:"error" })
            }
               //console.log("new:"+this.state.Screentype);
    }).catch((error) => {
          //return error.data;
        console.log(error);
            
      });
    }

    // navigation.navigate('HomeScreen');
  };

  return (
   <ScrollView> 
    <Background>
      { /*<BackButton goBack={() => navigation.navigate('HomeScreen')} /> */ }

      <Logo />

     
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

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed} disabled={btn_disable} loading={btn_disable}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
