import React, {useState, useContext, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useQuery} from 'react-query';
import {checkUsernameApi} from '../Api';
import {UtilsContext} from '../contexts/userUtil';

const CheckUsernameModal = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const {setUserData, setUserId} = useContext(UtilsContext);

  const {data, error, isLoading, isError, refetch} = useQuery(
    [
      'CheckUsernameQuery',
      {
        username: props.username,
      },
    ],
    () =>
      checkUsernameApi({
        username: props.username,
      }),
    {
      refetchOnWindowFocus: true,
      enabled: true, // turned off by default, manual refetch is needed
    },
  );

  useEffect(() => {
    console.log(data);
    if (data) console.log(data.available);
  });

  const [username, onChangeUsername] = useState(null);
  const [password, onChangePassword] = useState(null);

  if (isLoading)
    return (
      <View>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );

  if (isError)
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );

  return (
    <View style={{marginTop: 20}}>
      {data ? (
        data.available === 'true' ? (
          <Text style={{color: 'green'}}>available</Text>
        ) : (
          <Text style={{color: 'red'}}>exists already</Text>
        )
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    flexDirection: 'row',
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
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 18,
    textAlign: 'center',
    color: '#2196F3',
    fontWeight: 'normal',
    fontSize: 15,
  },
  input: {
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default CheckUsernameModal;
