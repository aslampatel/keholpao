import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

// type Props = React.ComponentProps<typeof PaperButton>;

const Button = (props) => (
  <PaperButton
    style={[
      styles.button,
      props.mode === 'outlined' && { backgroundColor: theme.colors.surface },
      props.style,
    ]}
    labelStyle={styles.text}
    mode={props.mode}
    {...props}
  >
    {props.children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
