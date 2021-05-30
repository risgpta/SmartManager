import React, {useContext} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {UtilsContext} from '../contexts/userUtil';

const Profile = ({navigation}) => {
  const {userData, userId, setUserTaskId, userTaskId, setUserTasks} =
    useContext(UtilsContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.subcontainer}>Name:</Text>
        <Text style={styles.subcontainer2}>{userData.name}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.subcontainer}>Username:</Text>
        <Text style={styles.subcontainer2}>{userData.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  subcontainer: {
    alignItems: 'center',
    margin: 10,
    fontSize: 17,
  },
  subcontainer2: {
    alignItems: 'center',
    margin: 10,
    fontSize: 17,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  textStyle1: {
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
  },
  textStyle2: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2196F3',
    textAlign: 'center',
  },
  main: {
    //backgroundColor: '#cce6ff',
    height: '100%',
    width: '100%',
    flex: 1,
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
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  box: {
    height: 20,
    width: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 1,
  },
  box1: {
    backgroundColor: '#ff9999',
    borderWidth: 1,
  },
  box2: {
    backgroundColor: '#99ddff',
    borderWidth: 1,
  },
  box3: {
    backgroundColor: '#80ffaa',
    borderWidth: 1,
  },
});

export default Profile;
