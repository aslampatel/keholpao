import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { emailValidator,nameValidator } from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { Navigation } from '../types';
import { PostData } from '../../Apis/ApiHelper';


const ForgotPasswordScreen = ({ navigation },Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
 const [mobile_number, setMobileNumber] = useState({ value: '', error: '' });
 const [btn_disable, setBtndisable]     = useState(false);
  const _onSendPressed = () => {

  


   const mobile_numberError  = nameValidator(mobile_number.value,"Mobile Number required");  

    if (mobile_numberError) {
      // setEmail({ ...email, error: emailError });
      setMobileNumber({ ...mobile_number, error: mobile_numberError });;
      return;
    }
    else{
      setBtndisable(true);
      let PostRequest ={
      mobile_number:mobile_number.value,

    } 
    
     // console.log(JSON.stringify(PostRequest));
    //
    PostData('user/forgot-password',PostRequest).then((response) =>{
             console.log("server reponse"+JSON.stringify(response));
            if(response.success){
              //console.log(response);
              response = JSON.parse(JSON.stringify(response));
              //console.log(response.data.user.profile_image);
              //
              toaster.show({
                message: response.message,
                position: 'bottom',
                duration: 1500,
                type: 'success',
                });
              //

              navigation.navigate('LoginScreen');
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
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

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

      <Button mode="contained" onPress={_onSendPressed} style={styles.button} disabled={btn_disable} loading={btn_disable}>
        Send Reset Password
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
