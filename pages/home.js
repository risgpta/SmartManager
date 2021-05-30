import React, {useContext, useEffect, useState} from 'react';
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
import {useQuery} from 'react-query';
import {getTasksApi} from '../Api';
import Task from '../components/task';
import TaskList from './taskList';
import CreateTaskModal from '../components/createTaskModal';
import UpdateTaskModal from '../components/updateTaskModal';

const Home = ({navigation}) => {
  const {userData, userId, setUserTaskId, userTaskId, setUserTasks} =
    useContext(UtilsContext);

  const [tasks, setTasks] = useState([]);
  const [taskshow, setTaskshow] = useState(false);

  const {data, error, isLoading, isError, refetch} = useQuery(
    [
      'GetTasksQuery',
      {
        userId: userId,
      },
    ],
    () =>
      getTasksApi({
        userId: userId,
      }),
    {
      refetchOnWindowFocus: true,
      enabled: true,
    },
  );

  useEffect(() => {
    console.log(userId);
    console.log(data);
    if (data && data.length && data[0].Tasks) {
      setTasks(data[0].Tasks);
      setUserTaskId(data[0]._id);
      setUserTasks(data[0].Tasks);
    }
  });

  if (taskshow)
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.subcontainer}>
            <Button
              title="Tasks"
              onPress={() => {
                setTaskshow(!taskshow);
                refetch();
              }}
            />
          </View>
          {tasks.length ? (
            <TaskList tasks={tasks} />
          ) : (
            <Text>NO TASKS YET!</Text>
          )}
        </View>
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <View>
        <Text style={styles.textStyle1}>Welcome {userData.name}!</Text>
        <Text style={styles.textStyle2}>HAVE A LOOK AT YOUR TASKS</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <Text>Pending</Text>
        <View style={[styles.box, styles.box1]}></View>
        <Text>In progress</Text>
        <View style={[styles.box, styles.box2]}></View>
        <Text>Completed</Text>
        <View style={[styles.box, styles.box3]}></View>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Text style={{alignItems: 'center'}}>Priority Order (0 - 9) </Text>
        <Text style={{alignItems: 'center'}}>0 means highest priority</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Button title="Tasks" onPress={() => setTaskshow(!taskshow)} />
        </View>
        {userTaskId ? <UpdateTaskModal /> : <CreateTaskModal />}
        {tasks.length ? <TaskList tasks={tasks} /> : <Text>NO TASKS YET!</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  subcontainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  lowcontainer: {
    marginTop: 100,
    //justifyContent: 'center',
    //alignItems: 'center',
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

export default Home;
