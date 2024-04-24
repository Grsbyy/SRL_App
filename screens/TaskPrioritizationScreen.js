import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Platform, ScrollView, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TaskItem from './components/TaskItem';
import AddTaskModal from './components/AddTaskModal';
import * as SQLite from 'expo-sqlite';

// Open or Create the SQLite Database
const db = SQLite.openDatabase('tasks.db');

const TaskPrioritization = ({ navigation }) => {

  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

  useEffect(() => {
    // Create tasks table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)'
      );
    });

    // Calls the function, loadTasks, which loads tasks from the database when the component mounts
    loadTasks();
  }, []);

  // Function to load tasks from the database
  const loadTasks = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tasks', [], (_, { rows }) => {
        setTaskItems(rows._array);
      });
    });
  };

  // Function to add a task
  const handleAddTask = () => {
    if (task.trim() === '') return;
    db.transaction(tx => {
      tx.executeSql('INSERT INTO tasks (text) VALUES (?)', [task], (_, { insertId }) => {
        const newTaskItems = [...taskItems, { id: insertId, text: task }];
        setTaskItems([...taskItems, { id: insertId, text: task }]);
        setTask('');
      });
    });
  };

  // Function to remove a task
  const completeTask = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM tasks WHERE id = ?', [id], () => {
        setTaskItems(taskItems.filter(task => task.id !== id));
      });
    });
  };

  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <ScrollView style={styles.itemsScroll}>
          {taskItems.map(({ id, text }) => (
            <TouchableOpacity key={id} onPress={() => completeTask(id)}>
              <TaskItem text={text} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType='slide'
        transparent={false}
        visible={addTaskModalVisible}
        onRequestClose={() => setAddTaskModalVisible(false)}>
        <AddTaskModal></AddTaskModal>
      </Modal>

      <View style={styles.addTaskWrapper}>
        <TouchableOpacity onPress={() => setAddTaskModalVisible(true)}>
          <View style={styles.addTaskButton}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#E8EAED', // Background color for the entire screen
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
  tasksWrapper: {
    paddingHorizontal: 10,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemsScroll: {
    marginTop: 30,
    marginBottom: '50%',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addTaskWrapper:{
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addTaskButton: {
    width: 60,
    height: 60,
    backgroundColor: '#1CA7EC',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: 'white',
  },

});

export default TaskPrioritization;
