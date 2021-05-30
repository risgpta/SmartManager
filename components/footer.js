import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {UtilsContext} from '../contexts/userUtil';

export default function Footer({navigation}) {
  return (
    <View>
      <Text style={styles.textStyle2}>&#169; risgpta | 2021 &#174;</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle2: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
