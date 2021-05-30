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
  Button,
} from 'react-native';
import {useQuery} from 'react-query';
import {updateTaskApi} from '../Api';
import {UtilsContext} from '../contexts/userUtil';

const UpdateTask_type3Modal = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const [status, setStatus] = useState(-1);

  const [afterUpdateTasks, setAfterUpdateTask] = useState([]);

  const {setUserData, setUserId, userTasks, userId, userTaskId} =
    useContext(UtilsContext);

  const {data, error, isLoading, isError, refetch} = useQuery(
    [
      'UpdateTaskQuery',
      {
        task_id: userTaskId,
        actual_payload: {
          userId: userId,
          Tasks: [...afterUpdateTasks],
        },
      },
    ],
    () =>
      updateTaskApi({
        task_id: userTaskId,
        actual_payload: {
          userId: userId,
          Tasks: [...afterUpdateTasks],
        },
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
    console.log('userTasks', userTasks);
    console.log('task---', props.taskId);
    console.log('status====', status);
    if (modalVisible && userTasks && userTasks.length) {
      let task_array = [];
      let new_task;

      task_array = userTasks.filter(task => {
        console.log('check', task._id, props.taskId);
        console.log(task._id != props.taskId);
        if (task._id == props.taskId) {
          task.taskStatus = status;
          new_task = task;
        }
        return task._id != props.taskId;
      });
      setAfterUpdateTask([...task_array, new_task]);
    }
  }, [modalVisible, status]);

  const [taskName, onChangeTaskName] = useState(null);
  const [tagName, onChangeTagName] = useState(null);
  const [taskPriority, onChangeTaskPriority] = useState(null);

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
    <View>
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
            <Pressable
              style={[
                styles.button,
                styles.box1,
                status === 0 ? styles.boxSelected : '',
              ]}
              onPress={() => setStatus(0)}>
              <Text>Pending</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                styles.box2,
                status === 1 ? styles.boxSelected : '',
              ]}
              onPress={() => setStatus(1)}>
              <Text>In progress</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                styles.box3,
                status === 2 ? styles.boxSelected : '',
              ]}
              onPress={() => setStatus(2)}>
              <Text>Completed</Text>
            </Pressable>
            {status === -1 ? (
              <Text></Text>
            ) : (
              <Pressable style={styles.button2} onPress={() => handleLogin()}>
                <Text style={styles.buttonText2}>Change!</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Change Status</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
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
    padding: 5,
    borderRadius: 8,
    width: 100,
    borderColor: '#000000',
    borderWidth: 1,
    marginTop: 7,
  },
  button2: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 5,
    borderRadius: 8,
    width: 100,
    borderColor: '#000000',
    borderWidth: 1,
    marginTop: 30,
  },
  buttonText: {
    color: '#2196F3',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonText2: {
    color: '#2196F3',
    fontSize: 15,
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
  boxSelected: {
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
});

export default UpdateTask_type3Modal;
