import * as React from 'react';
import { StyleSheet,View,ScrollView,Image,TouchableOpacity} from 'react-native';
import { DataTable } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";


const DataTableWin = (props) => {
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
      Box.push(
        <DataTable.Row key={'bid_number'+key}>
        <DataTable.Cell>{bid.bid_number}</DataTable.Cell>
        <DataTable.Cell numeric> Rs. {bid.bid_amount}</DataTable.Cell>
        <DataTable.Cell numeric>{moment(bid.created_at).format("DD-MM-YYYY")}</DataTable.Cell>
      </DataTable.Row>
      )
    });
    return Box;
}


  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Chosse Number</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
        <DataTable.Title numeric>Date</DataTable.Title>
      </DataTable.Header>
 
      <ScrollView>
       {RowTableshow()}
     </ScrollView>

  

     
    </DataTable>
  );
}

export default DataTableWin;