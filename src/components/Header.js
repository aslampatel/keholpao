// import React, { memo } from 'react';
// import { StyleSheet, Text } from 'react-native';
// import { theme } from '../core/theme';


// const Header = (props) => (
//   <Text style={styles.header}>{props.children}</Text>
// );

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 26,
//     color: theme.colors.primary,
//     fontWeight: 'bold',
//     paddingVertical: 14,
//   },
// });

// export default memo(Header);

import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet,} from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = (props) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={styles.headercolor}>
      {props.backpress=='true' && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={props.title} titleStyle={styles.headerTitle}/>
    
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
	headercolor:{
		backgroundColor:"#9b00ea",
		
	},
	headerTitle:{
		color:"#ffffff"
	}
})


export default memo(Header);
