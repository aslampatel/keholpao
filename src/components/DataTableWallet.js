import * as React from 'react';
import { StyleSheet,View,ScrollView,Image,TouchableOpacity} from 'react-native';
import { DataTable } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";


const DataTableWallet = (props) => {
  const [page, setPage] = React.useState([]);
  const [bid_list_data, setBidList] = React.useState([]);

  React.useEffect(() => {
    setPage(0);
     setBidList(props.bid_list)
    // console.log(bid_list_data);
           
  }, [props]);

function RowTableshow() {
  // body...
   var Box  = [];
    bid_list_data.map((bid, key) => {
      let status= "Debit";
      if(bid.status=='C'){
        status = "Credit"
      }
      Box.push(
        <DataTable.Row key={'bid_wallet'+key}>
        <DataTable.Cell>{status}</DataTable.Cell>
        <DataTable.Cell> Rs. {bid.amount}</DataTable.Cell>
        <DataTable.Cell>{moment(bid.created_at).format("DD-MM-YYYY")}</DataTable.Cell>
      </DataTable.Row>
      )
    });
    return Box;
}


  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Amount Type</DataTable.Title>
        <DataTable.Title>Amount</DataTable.Title>
        <DataTable.Title>Date</DataTable.Title>
      </DataTable.Header>
     <ScrollView>
     {RowTableshow()}
     </ScrollView>

  

     
    </DataTable>
  );
}

export default DataTableWallet;