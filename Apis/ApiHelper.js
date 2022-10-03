/*
* Api helper File
* Use for all Api.
**/
import axios from 'axios';
import { StoreData,GetStoreDate } from '../store/Store';

//
const MainUrl         = "https://administrator.khelopaomoneymoney.in/api/";
//
export const Base_URL = "https://administrator.khelopaomoneymoney.in/";
//
//Post Data Functions.
export function PostData(url,data) {
  // body..
 //
  var headers = {
            'Content-Type': 'application/json',
            'X-localization':'en'
        }
  return axios.post(MainUrl+url,data,{headers: headers}).then((response) => {
        //console.log(res);
        //console.log(res.data);
        return response.data;
      }).catch((error) => {
      		//return error.data;
            //console.log(error.response);
            let errorStatus = JSON.parse(JSON.stringify(error.response));
            //console.log(errorStatus.data);
            return errorStatus;
      });
}
//Get Data Functions.
export function GetData(url,data) {
	// body...
 
  var headers = {
            'Content-Type': 'application/json',
            //'Authorization':'Bearer '+Token,
            //'X-localization':'en'
        }
        //console.log("headers="+JSON.stringify(headers));
  return axios.get(MainUrl+url,data,{headers: headers}).then(res => {
        //console.log(res);
        //console.log(res.data);
        return res.data
      }).catch((error) => {
            let errorStatus = JSON.parse(JSON.stringify(error.response));
            //console.log(errorStatus.data);
            return errorStatus;
      });
}
//Post Data with token
//Post Data Functions.
export function PostDataWithToken(url,data,tokendata) {
  // body..
 //
  var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tokendata.tokens,
            'X-localization':tokendata.langs
        }
  return axios.post(MainUrl+url,data,{headers: headers}).then((response) => {
        //console.log(res);
        //console.log(res.data);
        return response.data;
      }).catch((error) => {
          //return error.data;
            //console.log(error.response);
            let errorStatus = JSON.parse(JSON.stringify(error.response));
            //console.log(errorStatus.data);
            return errorStatus;
      });
}

//Post Data Functions.
export function PostImageDataWithToken(url,data,tokendata) {
  // body..
 //
  var headers = {
            'Content-Type': 'multipart/form-data;',
            'Authorization': 'Bearer '+tokendata.tokens,
            'X-localization':tokendata.langs
        }
  return axios.post(MainUrl+url,data,{headers: headers}).then((response) => {
        //console.log(res);
        //console.log(res.data);
        return response.data;
      }).catch((error) => {
          //return error.data;
            //console.log(error.response);
            let errorStatus = JSON.parse(JSON.stringify(error.response));
            //console.log(errorStatus.data);
            return errorStatus;
      });
}
//Get Data with token Functions.
export function GetDataWithToken(url,tokendata,data) {

let config = {
  headers: {
  	'Authorization': 'Bearer '+tokendata.tokens,
  	'X-localization':tokendata.langs
  },
  params: {},
}
   
    //console.log("headers="+JSON.stringify(headers));
  	return axios.get(MainUrl+url,config).then(res => {
        //console.log(res);
        //console.log(res.data);
        return res.data
      }).catch((error) => {
            let errorStatus = JSON.parse(JSON.stringify(error.response));
            //console.log(errorStatus.data);
            return errorStatus;
      });
  
}


