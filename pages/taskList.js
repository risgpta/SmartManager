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

const TaskList = props => {
  useEffect(() => {
    console.log(props.tasks);
  });
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {props.tasks.map(task => (
        <View>
          <Task
            key={task._id}
            id={task._id}
            taskName={task.taskName}
            taskStatus={task.taskStatus}
            tagName={task.tagName}
            taskPriority={task.taskPriority}
            time={task.creationTime}
          />
        </View>
      ))}
      <View style={styles.subcontainer1}>
        <Text style={styles.textStyle2}>....</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    width: '100%',
  },
  subcontainer1: {
    alignItems: 'center',
    marginTop: 60,
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
  },
  textStyle2: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2196F3',
    margin: 30,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskList;
