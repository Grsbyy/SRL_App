import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

// Open or create the SQLite database
const db = SQLite.openDatabase('WeeklyPlanner.db');

const WPlanner = ({ navigation }) => {
  const [mondayTask, setMondayTask] = useState('');
  const [tuesdayTask, setTuesdayTask] = useState('');
  const [wednesdayTask, setWednesdayTask] = useState('');
  const [thursdayTask, setThursdayTask] = useState('');
  const [fridayTask, setFridayTask] = useState('');
  const [saturdayTask, setSaturdayTask] = useState('');
  const [sundayTask, setSundayTask] = useState('');
  const [editDay, setEditDay] = useState('');
  const [editTask, setEditTask] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Function to initialize the database table
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS planner_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, day TEXT, task TEXT);'
      );
    });
    refreshTasks();
  }, []);

  // Function to handle saving task to database
  const saveTask = (day, task) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT OR REPLACE INTO planner_tasks (day, task) VALUES (?, ?)',
          [day, task],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              console.log(`Task saved for ${day}`);
            } else {
              console.log(`Failed to save task for ${day}.`);
            }
          }
        );
      },
      null,
      refreshTasks
    );
  };

  // Function to handle refreshing tasks
  const refreshTasks = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM planner_tasks',
        [],
        (_, { rows }) => {
          const tasks = rows._array;
          tasks.forEach(task => {
            switch (task.day) {
              case 'Monday':
                setMondayTask(task.task);
                break;
              case 'Tuesday':
                setTuesdayTask(task.task);
                break;
              case 'Wednesday':
                setWednesdayTask(task.task);
                break;
              case 'Thursday':
                setThursdayTask(task.task);
                break;
              case 'Friday':
                setFridayTask(task.task);
                break;
              case 'Saturday':
                setSaturdayTask(task.task);
                break;
              case 'Sunday':
                setSundayTask(task.task);
                break;
            }
          });
        }
      );
    });
  };

  // Function to handle clearing tasks from database
  const clearTasks = () => {
    db.transaction(
      tx => {
        tx.executeSql('DELETE FROM planner_tasks', [], () => console.log('Tasks cleared from database'));
      },
      null,
      refreshTasks
    );
  };

  // Function to handle opening the edit modal
  const openEditModal = (day, task) => {
    setEditDay(day);
    setEditTask(task);
    setModalVisible(true);
  };

  // Function to handle applying changes in the edit modal
  const applyChanges = () => {
    saveTask(editDay, editTask);
    setModalVisible(false);
  };

  // Function to handle canceling changes in the edit modal
  const cancelChanges = () => {
    setModalVisible(false);
  };

  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.dayContainer}>
          <Text style={[styles.dayLabel, { borderColor: '#FF5733' }]}>Monday</Text>
          <TouchableOpacity onPress={() => openEditModal('Monday', mondayTask)}>
          <FontAwesome name="pencil-square-o" size={30} color="#008000" />
          </TouchableOpacity>
          <TextInput
            style={styles.taskInput}
            multiline
            value={mondayTask}
            onChangeText={text => setMondayTask(text)}
            onBlur={() => saveTask('Monday', mondayTask)}
          />
        </View>

        <View style={styles.dayContainer}>
          <Text style={[styles.dayLabel, { borderColor: '#FF5733' }]}>Tuesday</Text>
          <TouchableOpacity onPress={() => openEditModal('Tuesday', tuesdayTask)}>
            <FontAwesome name="pencil-square-o" size={30} color="#008000" />
          </TouchableOpacity>
          <TextInput
            style={styles.taskInput}
            multiline
            value={tuesdayTask}
            onChangeText={text => setTuesdayTask(text)}
            onBlur={() => saveTask('Tuesday', tuesdayTask)}
          />
        </View>

        <View style={styles.dayContainer}>
          <Text style={[styles.dayLabel, { borderColor: '#FF5733' }]}>Wednesday</Text>
          <TouchableOpacity onPress={() => openEditModal('Wednesday', wednesdayTask)}>
            <FontAwesome name="pencil-square-o" size={30} color="#008000" />
          </TouchableOpacity>
          <TextInput
            style={styles.taskInput}
            multiline
            value={wednesdayTask}
            onChangeText={text => setWednesdayTask(text)}
            onBlur={() => saveTask('Wednesday', wednesdayTask)}
          />
        </View>

        <View style={styles.dayContainer}>
          <Text style={[styles.dayLabel, { borderColor: '#FF5733' }]}>Thursday</Text>
          <TouchableOpacity onPress={() => openEditModal('Thursday', thursdayTask)}>
            <FontAwesome name="pencil-square-o" size={30} color="#008000" />
          </TouchableOpacity>
          <TextInput
            style={styles.taskInput}
            multiline
            value={thursdayTask}
            onChangeText={text => setThursdayTask(text)}
            onBlur={() => saveTask('Thursday', thursdayTask)}
          />
        </View>

        <View style={styles.dayContainer}>
          <Text style={[styles.dayLabel, { borderColor: '#FF5733' }]}>Friday</Text>
          <TouchableOpacity onPress={() => openEditModal('Friday', fridayTask)}>
             <FontAwesome name="pencil-square-o" size={30} color="#008000" />
          </TouchableOpacity>
          <TextInput
            style={styles.taskInput}
            multiline
            value={fridayTask}
            onChangeText={text => setFridayTask(text)}
            onBlur={() => saveTask('Friday', fridayTask)}
          />
        </View>

        <View style={styles.dayContainer}>
          <Text style={[styles.dayLabel, { borderColor: '#FF5733' }]}>Saturday</Text>
          <TouchableOpacity onPress={() => openEditModal('Saturday', saturdayTask)}>
            <FontAwesome name="pencil-square-o" size={30} color="#008000" />
          </TouchableOpacity>
          <TextInput
            style={styles.taskInput}
            multiline
            value={saturdayTask}
            onChangeText={text => setSaturdayTask(text)}
            onBlur={() => saveTask('Saturday', saturdayTask)}
          />
        </View>

        <View style={styles.dayContainer}>
          <Text style={[styles.dayLabel, { borderColor: '#FF5733' }]}>Sunday</Text>
          <TouchableOpacity onPress={() => openEditModal('Sunday', sundayTask)}>
            <FontAwesome name="pencil-square-o" size={30} color="#008000" />
          </TouchableOpacity>
          <TextInput
            style={styles.taskInput}
            multiline
            value={sundayTask}
            onChangeText={text => setSundayTask(text)}
            onBlur={() => saveTask('Sunday', sundayTask)}
          />
        </View>
        
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalDay}>{editDay}</Text>
            <TextInput
              style={styles.modalTaskInput}
              multiline
              value={editTask}
              onChangeText={text => setEditTask(text)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.applyButton} onPress={applyChanges}>
                <Text style={styles.buttonText}>Apply Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelChanges}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Background color for the entire screen
    paddingBottom: 70, 
  },
  content: {
    flex: 1,
    width: '100%',
    marginBottom: 30,
  },
  dayContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  dayLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalDay: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTaskInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35, // Add spacing between buttons
  },
});

export default WPlanner;
