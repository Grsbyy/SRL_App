import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('planner.db');

const TaskPrioritization = ({ navigation }) => {
  const [mondayTask, setMondayTask] = useState('');
  const [tuesdayTask, setTuesdayTask] = useState('');
  const [wednesdayTask, setWednesdayTask] = useState('');
  const [thursdayTask, setThursdayTask] = useState('');
  const [fridayTask, setFridayTask] = useState('');
  const [saturdayTask, setSaturdayTask] = useState('');
  const [sundayTask, setSundayTask] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists tasks (id integer primary key not null, day text, task text);'
      );
    });
  }, []);

  const saveTask = (day, task) => {
    db.transaction(
      (tx) => {
        tx.executeSql('insert into tasks (day, task) values (?, ?)', [day, task]);
        tx.executeSql('select * from tasks', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  const forceUpdate = () => {
    // Force a re-render to update the UI after saving task
    // You may need to optimize this, as it's not ideal to force a re-render like this
    setMondayTask('');
    setTuesdayTask('');
    setWednesdayTask('');
    setThursdayTask('');
    setFridayTask('');
    setSaturdayTask('');
    setSundayTask('');
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>Weekly Planner</Text>
        <View style={styles.dayContainer}>
          <Text style={styles.dayLabel}>Monday</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#FF5733' }]}
            onPress={() => navigateToScreen('Plan')}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.task}>{mondayTask}</Text>
          <TouchableOpacity
            onPress={() => saveTask('Monday', mondayTask)}
            style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
        {/* Repeat the same structure for other days */}
        {/* Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday */}
        <View style={styles.dayContainer}>
          <Text style={styles.dayLabel}>Tuesday</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#FF5733' }]}
            onPress={() => navigateToScreen('Plan')}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.task}>{tuesdayTask}</Text>
          <TouchableOpacity
            onPress={() => saveTask('Tuesday', tuesdayTask)}
            style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
        {/* Wednesday */}
        <View style={styles.dayContainer}>
          <Text style={styles.dayLabel}>Wednesday</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#FF5733' }]}
            onPress={() => navigateToScreen('Plan')}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.task}>{wednesdayTask}</Text>
          <TouchableOpacity
            onPress={() => saveTask('Wednesday', wednesdayTask)}
            style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
        {/* Thursday */}
        <View style={styles.dayContainer}>
          <Text style={styles.dayLabel}>Thursday</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#FF5733' }]}
            onPress={() => navigateToScreen('Plan')}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.task}>{thursdayTask}</Text>
          <TouchableOpacity
            onPress={() => saveTask('Thursday', thursdayTask)}
            style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
        {/* Friday */}
        <View style={styles.dayContainer}>
          <Text style={styles.dayLabel}>Friday</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#FF5733' }]}
            onPress={() => navigateToScreen('Plan')}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.task}>{fridayTask}</Text>
          <TouchableOpacity
            onPress={() => saveTask('Friday', fridayTask)}
            style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
        {/* Saturday */}
        <View style={styles.dayContainer}>
          <Text style={styles.dayLabel}>Saturday</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#FF5733' }]}
            onPress={() => navigateToScreen('Plan')}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.task}>{saturdayTask}</Text>
          <TouchableOpacity
            onPress={() => saveTask('Saturday', saturdayTask)}
            style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
        {/* Sunday */}
        <View style={styles.dayContainer}>
          <Text style={styles.dayLabel}>Sunday</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#FF5733' }]}
            onPress={() => navigateToScreen('Plan')}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.task}>{sundayTask}</Text>
          <TouchableOpacity
            onPress={() => saveTask('Sunday', sundayTask)}
            style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
        {/* Buttons for Plan, Act, Reflect */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToScreen('Plan')}>
            <MaterialCommunityIcons name="calendar-check" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToScreen('Act')}>
            <MaterialCommunityIcons name="book-open" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToScreen('Reflect')}>
            <MaterialCommunityIcons name="chart-line" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f0f0f0', // Background color for the entire screen
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  task: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  applyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  applyText: {
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center', // Center the buttons horizontally
    width: '100%',
    paddingHorizontal: 20, // Adjust as needed
    paddingBottom: 10,
    paddingVertical: 10,
    backgroundColor: '#007bff', // Change to desired color
    borderRadius: 10, // Add border radius for a rounded look
  },
});

export default TaskPrioritization;
