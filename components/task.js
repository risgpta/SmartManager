import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
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
import UpdateTask_type2Modal from './updateTask_type2Modal';
import UpdateTask_type3Modal from './updateTask_type3Modal';

export default function Task(props) {
  const [change, setChange] = useState(false);

  useEffect(() => {
    console.log('task!---', props.id);
  });
  return (
    <View
      style={
        props.taskStatus === 0
          ? [styles.lowcontainer, styles.box1]
          : props.taskStatus === 1
          ? [styles.lowcontainer, styles.box2]
          : [styles.lowcontainer, styles.box3]
      }
      key={props.key}>
      <View style={styles.container}>
        <Text style={styles.textStyle2}>{props.taskName}</Text>
      </View>
      <View style={[styles.container]}>
        {props.taskPriority <= 2 ? (
          <Text style={[styles.textStylep1, styles.textStyle22]}>
            Priority: {props.taskPriority}
          </Text>
        ) : props.taskPriority <= 6 ? (
          <Text style={[styles.textStylep2, styles.textStyle22]}>
            Priority: {props.taskPriority}
          </Text>
        ) : (
          <Text style={[styles.textStylep3, styles.textStyle22]}>
            Priority: {props.taskPriority}
          </Text>
        )}
        <View style={{marginLeft: 40, marginTop: 5}}>
          <Text style={styles.textStyle3}>{props.tagName}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.textStyle4}>
          Created on{' '}
          {moment
            .parseZone(props.time)
            .utcOffset('+05:30')
            .format('hh : mm, DD MMM YY')}
        </Text>
      </View>
      <TouchableOpacity onPress={() => setChange(!change)}>
        <View style={styles.container}>
          <View style={styles.box}></View>
          <View style={styles.box}></View>
          <View style={styles.box}></View>
        </View>
      </TouchableOpacity>
      <View>
        {change ? (
          <View>
            <UpdateTask_type2Modal taskId={props.id} />
            <UpdateTask_type3Modal taskId={props.id} />
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lowcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b3daff',
    padding: 5,
    borderRadius: 8,
    width: 350,
    margin: 7,
    backgroundColor: '#cceeff',
    shadowColor: '#000000',
  },
  box: {
    height: 6,
    width: 6,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    borderRadius: 3,
    backgroundColor: '#666666',
  },
  textStyle2: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003d99',
  },
  textStyle22: {
    fontSize: 15,
    fontWeight: '300',
    color: '#000000',
    marginTop: 5,
  },
  textStylep1: {
    fontSize: 16,
    fontWeight: '600',
    //color: 'red',
  },
  textStylep2: {
    fontSize: 16,
    fontWeight: '600',
    //color: 'yellow',
  },
  textStylep3: {
    fontSize: 16,
    fontWeight: '600',
    //color: 'green',
  },
  textStyle3: {
    fontSize: 15,
    fontWeight: '300',
    padding: 5,
    backgroundColor: '#b3daff',
    color: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'blue',
    marginRight: 0,
    textAlign: 'center',
  },
  textStyle4: {
    fontSize: 12,
  },
  container: {
    flexDirection: 'row',
    marginTop: 5,
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
