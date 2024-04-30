import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('task.db');

const TaskPrioritization = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editmodalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [givenDate, setgivenDate] = useState('');
  const [dueDate, setdueDate] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(1);
  const [desc, setdesc] = useState('');
  const [subj, setsubj] = useState('');
  const [len, setLen] = useState('');

  const [editingTask, setEditingTask] = useState(null);
  const [completedTask, setCompletedTask] = useState([]);
  const [isGivenDatePickerVisible, setGivenDatePickerVisibility] = useState(false);
  const [isDueDatePickerVisible, setDueDatePickerVisibility] = useState(false);
  const [showSettingsButton, setShowSettingsButton] = useState(true);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, givenDate TEXT, dueDate TEXT, title TEXT, rating INTEGER, desc TEXT, subj TEXT, len INTEGER, completed INTEGER DEFAULT 1);'
      );
    });
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM task',
        [],
        (_, { rows: { _array } }) => {
          // Sort tasks based on the algorithm
          const sortedTasks = _array.map(task => ({
            ...task,
            prioritizationScore: calculatePrioritizationScore(task)
          })).sort((a, b) => a.prioritizationScore - b.prioritizationScore);

          setTasks(sortedTasks);
        }
      );
    });
  };
  
  // Function to calculate the score for a task based on the algorithm
  const calculatePrioritizationScore = (task) => {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);
    const givenDate = new Date(task.givenDate);
    const taskLength = parseFloat(task.len);
    const taskDifficulty = parseInt(task.rating);

    let prioritizationScore = ((dueDate - new Date() ) / (1000 * 60 * 60)) + (24 - taskLength) + (10 - taskDifficulty);
    return prioritizationScore;
  };
  

  const addTasks = () => {
    if (!dueDate || !title || !rating || !len) {
      Alert.alert('Incomplete Entry', 'Please Make Sure to Input Due date, and Task Name to submit.');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO task (givenDate, dueDate, title, rating, desc, subj, len ) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [givenDate, dueDate, title, rating, desc, subj, len ],
        () => {
          fetchTasks();
          setModalVisible(false);
          resetInputs();
        }
      );
    });
  };
  
  const editTask = () => {
    if (!dueDate || !title || !rating || !len) {
      Alert.alert('Incomplete Entry', 'Please Make Sure to Input Due date, and Task Name to submit.');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE task SET givenDate=?, dueDate=?, title=?, rating=?, desc=?, subj=?, len=? WHERE id=?',
        [givenDate, dueDate, title, rating, desc, subj, len , selectedTask.id],
        () => {
          fetchTasks();
          setEditModalVisible(false);
          setSelectedTask(null);
         
        }
      );
    });
  };

  const removeTask = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM task WHERE id=?',
        [id],
        () => fetchTasks()
      );
    });
  };

  const toggleCompletion = (id) => {
    setCompletedTask((prevCompletedTask) => {
      if (prevCompletedTask.includes(id)) {
        return prevCompletedTask.filter((taskId) => taskId !== id);
      } else {
        return [...prevCompletedTask, id];
      }
    });
  };
  const resetInputs = () => {
    setgivenDate('');
    setdueDate(''),
    setTitle('');
    setRating(1);
    setdesc('');
    setsubj('');
    setLen(1);
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const showGivenDatePicker = () => {
    setGivenDatePickerVisibility(true);
  };

  const hideGivenDatePicker = () => {
    setGivenDatePickerVisibility(false);
  };

  const showDueDatePicker = () => {
    setDueDatePickerVisibility(true);
  };

  const hideDueDatePicker = () => {
    setDueDatePickerVisibility(false);
  };

  const handleConfirmGivenDate = (selectedGivenDate) => {
    setgivenDate(selectedGivenDate.toDateString());
    hideGivenDatePicker();
  };

  const handleConfirmDueDate = (selectedDueDate) => {
    setdueDate(selectedDueDate.toDateString());
    hideDueDatePicker();
  };

  const viewTask = (task) => {
    Alert.alert(
      `Task Entry - Due Date: ${task.dueDate} - ${task.title}`,
      `Title: ${task.title}\nDescription: ${task.desc}\nSubject: ${task.subj}\nDate Task was Given: ${task.givenDate}\nTask Difficulty: ${task.rating}\nTask Length: ${task.len}hrs`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>YOUR TASKS</Text>
      
      <View style={styles.tasksContainer}>
        <ScrollView style={[styles.diariesContainer, , { paddingBottom: 10 }]}>
        {tasks.map(task => (
          <TouchableOpacity
            key={task.id}
            style={styles.diaryItem}>
            <View>
              {new Date(task.dueDate) - new Date() < 0 && <Text>Task is due</Text>}
              <Text>{task.dueDate}</Text>
              <Text style={[styles.goalText, completedTask.includes(task.id) && styles.completedGoal, (new Date(task.dueDate) - new Date() < 0) && styles.goalTextDue]}>
                {task.title}
              </Text>
            </View>
            <TouchableOpacity key={task.id} onPress={() => {
              setSelectedTask(task);
              setgivenDate(task.givenDate);
              setdueDate(task.dueDate);
              setTitle(task.title);
              setRating(task.rating);
              setdesc(task.desc);
              setsubj(task.subj);
              setLen(task.len);
              setEditModalVisible(true);
            }} 
            style={styles.editButton}>
              <MaterialCommunityIcons name="pencil" size={24} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => viewTask(task)}>
              <AntDesign name="eye" size={24} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTask(task.id)}>
              <MaterialCommunityIcons name="delete" size={24} color="#DF3E6E" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => toggleCompletion(task.id)}>
              <MaterialCommunityIcons
                name={completedTask.includes(task.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color={completedTask.includes(task.id) ? '#7455F7' : '#7455F7'}
                style={styles.icon}
                />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={editmodalVisible}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Edit Task Entry</Text>
            <TouchableOpacity onPress={showDueDatePicker}>
              <Text style={styles.datePickerText}>{dueDate ? dueDate : 'Date Task is Due'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDueDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDueDate}
              onCancel={hideDueDatePicker}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Task Name"
              value={title}
              onChangeText={(text) => setTitle(text)}
              maxLength={20}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Task Description"
              value={desc}
              onChangeText={(text) => setdesc(text)}
  
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Task Subject"
              value={subj}
              onChangeText={(text) => setsubj(text)}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Estimated Task Length in Hours"
              value={len}
              onChangeText={setLen}
              keyboardType='numeric'
            />
            <Text style={styles.label}>Task Difficulty Rating</Text>
            <Picker
              selectedValue={rating}
              style={{ height: 40, width: 200 }}
              onValueChange={(itemValue, itemIndex) => setRating(itemValue)}>
              <Picker.Item label="1 - Very Easy" value={1} />
              <Picker.Item label="2 - Easy " value={2} />
              <Picker.Item label="3 - Okay" value={3} />
              <Picker.Item label="4 - Hard" value={4} />
              <Picker.Item label="5 - Very Hard" value={5} />
            </Picker>
          
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={editTask}>
                <Text style={styles.buttonText}>Apply Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Add Task Entry</Text>
            <TouchableOpacity onPress={showDueDatePicker}>
              <Text style={styles.datePickerText}>{dueDate ? dueDate : 'Date Task is Due'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDueDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDueDate}
              onCancel={hideDueDatePicker}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Task Name"
              value={title}
              onChangeText={(text) => setTitle(text)}
              maxLength={20}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Task Description"
              value={desc}
              onChangeText={(text) => setdesc(text)}
  
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Task Subject"
              value={subj}
              onChangeText={(text) => setsubj(text)}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Estimated Task Length in Hours"
              value={len}
              onChangeText={setLen}
              keyboardType='numeric'
            />
            <Text style={styles.label}>Task Difficulty Rating</Text>
            <Picker
              selectedValue={rating}
              style={{ height: 40, width: 200 }}
              onValueChange={(itemValue, itemIndex) => setRating(itemValue)}>
              <Picker.Item label="1 - Very Easy" value={1} />
              <Picker.Item label="2 - Easy " value={2} />
              <Picker.Item label="3 - Okay" value={3} />
              <Picker.Item label="4 - Hard" value={4} />
              <Picker.Item label="5 - Very Hard" value={5} />
            </Picker>
          
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={addTasks}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
          setSelectedTask(null);
          resetInputs();
        }}>
        <LinearGradient colors={['#633ef7', '#b63ef7']}  start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.addButtonGradient}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10, 
    color: '#7455F7',
  },
  diariesContainer: {
    flex: 1,
    width: "100%",
    
    
  },
  completedGoal: {
    textDecorationLine: 'line-through',
    color: '#7455F7', // Change color of completed goal text
    fontWeight: 'bold',
  },
  goalText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10, // Add some margin between text and icons
    color: 'black', // Default color for goal text
    fontWeight: 'bold',
  },
  goalTextDue: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10, // Add some margin between text and icons
    color: 'red', // Default color for goal text
    fontWeight: 'bold',
  },
  diaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  
  settingsButton: {
    position: 'absolute',
    top: -620,
    right: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: '#7455F7',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonGradient:{
    height: '100%',
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#7455F7',
  },
  datePickerText: {
    borderWidth: 1,
    borderColor: '#7455F7',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
    color: 'grey',
    backgroundColor: '#F6F5FB'
  },
  titleInput: {
    backgroundColor: '#F6F5FB',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    width: 300,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 0,
  },
  ratingPicker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  bigInput: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    width: '45%',

  },
  cancelButton: {
    borderWidth: 2,
    borderColor: '#7455F7',
  },
  submitButton: {
    backgroundColor: '#7455F7',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextCancel:{
    color: '#7455F7',
    fontWeight: 'bold',
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#8a5dfb',
    borderRadius: 10,
    paddingVertical: 10, 
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
  },
  editButton: {
    marginRight: 10,
  },  
  tasksContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 60, // Adjust this value as needed
    position: 'relative',
  },
});



export default TaskPrioritization;
