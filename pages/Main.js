import React, {useState, useEffect, useContext} from 'react';
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
import {useQuery} from 'react-query';
import {loginApi} from '../Api';
import Footer from '../components/footer';
import LoginModal from '../components/loginModal';
import SignupModal from '../components/signupModal';
import {UtilsContext} from '../contexts/userUtil';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './home';
import Profile from './profile';
import CustomModal from '../components/modal';
import CommonModal from '../components/commonModal';
import {LocalNotification} from '../LocalPushController';

const Stack = createStackNavigator();

const Main = ({navigation}) => {
  const {userData} = useContext(UtilsContext);

  useEffect(() => {
    //FirebaseApp.initializeApp();
  });

  const handleButtonPress = () => {
    LocalNotification();
  };

  if (userData)
    return (
      <View style={styles.containerHome}>
        <View>
          <CommonModal />
          <Button onPress={() => navigation.goBack()} title="Go back" />
        </View>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={{flex: 0.3}}>
        <SignupModal />
        <LoginModal />
        <View style={{marginTop: 20}}>
          <Button
            title={'Local Push Notification'}
            onPress={handleButtonPress}
          />
        </View>
      </View>
      <View>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 60,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  containerHome: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
    marginRight: 80,
    marginTop: 10,
    width: '100%',
  },
  subcontainer1: {
    alignItems: 'center',
    marginTop: 150,
  },
  subcontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  lowcontainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle1: {
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
  },
  textStyle11: {
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
  },
  textStyle2: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    width: 200,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
