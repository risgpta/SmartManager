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
import {signupApi} from '../Api';
import {UtilsContext} from '../contexts/userUtil';
import CheckUsernameModal from './checkUsernameModal';

const SignupModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const {setUserData, setUserId} = useContext(UtilsContext);

  const {data, error, isLoading, isError, refetch} = useQuery(
    [
      'SignupQuery',
      {
        name: name,
        username: username,
        password: password,
      },
    ],
    () =>
      signupApi({
        name: name,
        username: username,
        password: password,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    },
  );

  const handleLogin = () => {
    setModalVisible(!modalVisible);
    refetch();
  };

  useEffect(() => {
    if (data) {
      setUserData(data);
      setUserId(data._id);
    }
  });

  const [name, onChangeName] = useState(null);
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
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.label}>
              <Text style={styles.modalText}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Enter Name"
              />
            </View>
            <View style={styles.label}>
              <Text style={styles.modalText}>Username</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Enter username"
              />
              {username ? (
                <CheckUsernameModal username={username} />
              ) : (
                <Text></Text>
              )}
            </View>
            <View style={styles.label}>
              <Text style={styles.modalText}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Enter password"
                secureTextEntry={true}
              />
            </View>
            <Pressable style={styles.button} onPress={() => handleLogin()}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    width: 200,
    borderColor: '#000000',
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    color: '#2196F3',
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
    fontSize: 17,
    width: 120,
  },
  input: {
    height: 40,
    margin: 12,
    width: 150,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default SignupModal;
