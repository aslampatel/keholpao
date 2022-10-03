import * as React from 'react';
import { StyleSheet,View,ScrollView,Image,TouchableOpacity} from 'react-native';
import { DataTable,ActivityIndicator,Colors,Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";


const DataTableList = (props) => {
  const [page, setPage] = React.useState([]);
  const [bid_list_data, setBidList] = React.useState([]);
  const [loading, setLoding] = React.useState(true);

  React.useEffect(() => {
    setPage(0);
    setBidList(props.bid_list)
    // setTimeout({})
    // setLoding(false);
    // setTimeout(() => {setLoding(false)}, 3000)
    // console.log(props.bid_list);
           
  }, [props]);

  React.useEffect(() => {

    // setTimeout({})
    //setLoding(false);
    // setTimeout(() => {setLoding(false)}, 3000)
    // console.log(props.bid_list);
           
  }, []);

function RowTableshow() {
  // body...

      var Box  = [];
      let slot_date_endtime;
      let slot_date_time;
      bid_list_data.map((bid, key) => {
      // console.log(bid.slot);
      if(loading ==true){
        setLoding(false);
      }

      if(bid.slot){
        //
        let date_slot  = moment(bid.created_at).format("DD-MM-YYYY");
        let slot_start = date_slot+' '+bid.slot.start_time+":00";
        // var timeString     = dateToFormat.toLocaleString('en-US', options);
        // console.log(timeString);
        slot_date_time    = moment(slot_start, ["DD-MM-YYYY HH.mm"]).format("hh:mm");
        // let date_slot      = moment(bid.created_at).format("DD-MM-YYYY");
        let slot_end          = date_slot+' '+bid.slot.end_time+":00";
        slot_date_endtime = moment(slot_end, ["DD-MM-YYYY HH.mm"]).format("hh:mm a");
      }
      else{
        slot_date_endtime ="-";
        slot_date_time    ="=";
      }

      // console.log(number); // "02:00 pm"
      Box.push(
        <DataTable.Row key={'bid_list'+key}>
        <DataTable.Cell style={{flex: .8}}>{bid.bid_number}</DataTable.Cell>
        <DataTable.Cell style={{flex: 1}}>{slot_date_time +'-'+slot_date_endtime}</DataTable.Cell>
        <DataTable.Cell numeric> Rs. {bid.bid_amount}</DataTable.Cell>
        <DataTable.Cell numeric>{moment(bid.created_at).format("DD-MM-YYYY")}</DataTable.Cell>
        {bid.open_number == 1 && bid.is_winner == 1 && <DataTable.Cell numeric><Text style={{color: 'green'}}>Win</Text></DataTable.Cell>}
        {bid.open_number == 1 && bid.is_winner == 0 && <DataTable.Cell numeric><Text style={{color: 'red'}}>Loss</Text></DataTable.Cell>}
        {bid.open_number == 0 && bid.is_winner == 0 && <DataTable.Cell numeric><Text style={{color: 'green'}}>Not Declear</Text></DataTable.Cell>}
      </DataTable.Row>
      )
    });
    return Box;
}


  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Choose Number</DataTable.Title>
        <DataTable.Title >Slot Time</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
        <DataTable.Title numeric>Date</DataTable.Title>
        <DataTable.Title numeric>Result</DataTable.Title>
      </DataTable.Header>
 
     <ScrollView>
       { loading ==true && <ActivityIndicator animating={true} />}
     {RowTableshow()}
     </ScrollView>
  
     
    </DataTable>
  );
}

export default DataTableList;