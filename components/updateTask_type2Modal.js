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
import {updateTaskApi2} from '../Api';
import {UtilsContext} from '../contexts/userUtil';

const UpdateTask_type2Modal = props => {
  const [modalRemoveVisible, setmodalRemoveVisible] = useState(false);

  const [afterRemoveTasks, setAfterRemoveTask] = useState([]);

  const [deletedTask, setDeletedTask] = useState(null);

  const {setUserData, setUserId, userTasks, userId, userTaskId} =
    useContext(UtilsContext);

  const {data, error, isLoading, isError, refetch} = useQuery(
    [
      'Update2TaskQuery',
      {
        task_id: userTaskId,
        actual_payload: {
          userId: userId,
          Tasks: [...afterRemoveTasks],
        },
      },
    ],
    () =>
      updateTaskApi2({
        task_id: userTaskId,
        actual_payload: {
          taskData: {
            userId: userId,
            Tasks: [...afterRemoveTasks],
          },
          historyTaskData: {
            userId: userId,
            Tasks: [deletedTask],
          },
        },
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    },
  );

  const handleLogin = () => {
    setmodalRemoveVisible(!modalRemoveVisible);
    refetch();
  };

  useEffect(() => {
    console.log('userTasks', userTasks);
    console.log('task---', props.taskId);
    if (modalRemoveVisible && userTasks && userTasks.length) {
      setAfterRemoveTask(
        userTasks.filter(task => {
          console.log('check', task._id, props.taskId);
          console.log(task._id != props.taskId);
          setDeletedTask(task);
          return task._id != props.taskId;
        }),
      );
      //   console.log(
      //     'new tasks',
      //     userTasks.filter(task => task._id != props.taskId),
      //   );
    }
  }, [modalRemoveVisible]);

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
        visible={modalRemoveVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setmodalRemoveVisible(!modalRemoveVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Do you really want to remove this task?</Text>
            <Pressable style={styles.button} onPress={() => handleLogin()}>
              <Text style={styles.buttonText}>Remove</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setmodalRemoveVisible(true)}>
        <Text style={styles.buttonText}>Remove</Text>
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
  buttonText: {
    color: '#2196F3',
    fontSize: 13,
    fontWeight: '600',
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

export default UpdateTask_type2Modal;
