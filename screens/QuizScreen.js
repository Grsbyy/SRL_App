import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

const QuizPrio = ({ navigation }) => {
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
        'CREATE TABLE IF NOT EXISTS quiz (id INTEGER PRIMARY KEY AUTOINCREMENT, givenDate TEXT, dueDate TEXT, title TEXT, rating INTEGER, desc TEXT, subj TEXT, len INTEGER, completed INTEGER DEFAULT 1);'
      );
    });
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM quiz',
        [],
        (_, { rows: { _array } }) => {
          // Sort tasks based on the algorithm
          const sortedTasks = _array.map(quiz => ({
            ...quiz,
            prioritizationScore: calculatePrioritizationScore(quiz)
          })).sort((a, b) => a.prioritizationScore - b.prioritizationScore);

          setTasks(sortedTasks);
        }
      );
    });
  };
  
  // Function to calculate the score for a task based on the algorithm
  const calculatePrioritizationScore = (quiz) => {
    const currentDate = new Date();
    const dueDate = new Date(quiz.dueDate);
    const givenDate = new Date(quiz.givenDate);
    const taskLength = parseFloat(quiz.len);
    const taskDifficulty = parseInt(quiz.rating);

    let prioritizationScore = ((dueDate - new Date() ) / (1000 * 60 * 60)) + (10 - taskDifficulty);
    return prioritizationScore;
  };
  

  const addTasks = () => {
    if (!dueDate || !title || !rating || !len) {
      Alert.alert('Incomplete Entry', 'Please Make Sure to Input Due date, and Task Name to submit.');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO quiz (givenDate, dueDate, title, rating, desc, subj, len ) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
        'UPDATE quiz SET givenDate=?, dueDate=?, title=?, rating=?, desc=?, subj=?, len=? WHERE id=?',
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
        'DELETE FROM quiz WHERE id=?',
        [id],
        () => fetchTasks()
      );
    });
  };

  const toggleCompletion = (id) => {
    setCompletedTask((prevCompletedTask) => {
      if (prevCompletedTask.includes(id)) {
        return prevCompletedTask.filter((quizId) => quizId !== id);
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

  const viewTask = (quiz) => {
    Alert.alert(
      `Task Entry - Due Date: ${quiz.dueDate} - ${quiz.title}`,
      `Title: ${quiz.title}\nDescription: ${quiz.desc}\nSubject: ${quiz.subj}\nDate Task was Given: ${quiz.givenDate}\nTask Difficulty: ${quiz.rating}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>YOUR QUIZZES</Text>
      
      <View style={styles.tasksContainer}>
        <ScrollView style={[styles.diariesContainer, , { paddingBottom: 100 }]}>
        {tasks.map(quiz => (
          <TouchableOpacity
            key={quiz.id}
            style={styles.diaryItem}>
            <View>
              {new Date(quiz.dueDate) - new Date() < 0 && <Text>Task is due</Text>}
              <Text>{quiz.dueDate}</Text>
              <Text style={[styles.goalText, completedTask.includes(quiz.id) && styles.completedGoal, (new Date(quiz.dueDate) - new Date() < 0) && styles.goalTextDue]}>
                {quiz.title}
              </Text>
            </View>
            <TouchableOpacity key={quiz.id} onPress={() => {
              setSelectedTask(quiz);
              setgivenDate(quiz.givenDate);
              setdueDate(quiz.dueDate);
              setTitle(quiz.title);
              setRating(quiz.rating);
              setdesc(quiz.desc);
              setsubj(quiz.subj);
              setLen(quiz.len);
              setEditModalVisible(true);
            }} 
            style={styles.editButton}>
              <MaterialCommunityIcons name="pencil" size={24} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => viewTask(quiz)}>
              <AntDesign name="eye" size={24} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTask(quiz.id)}>
              <MaterialCommunityIcons name="delete" size={24} color="#DF3E6E" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => toggleCompletion(quiz.id)}>
              <MaterialCommunityIcons
                name={completedTask.includes(quiz.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color={completedTask.includes(quiz.id) ? '#7455F7' : '#7455F7'}
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
            <Text style={styles.modalHeader}>Edit Quiz Entry</Text>
            <TouchableOpacity onPress={showDueDatePicker}>
              <Text style={styles.datePickerText}>{dueDate ? dueDate : 'Date of Quiz'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDueDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDueDate}
              onCancel={hideDueDatePicker}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Quiz Name"
              value={title}
              onChangeText={(text) => setTitle(text)}
              maxLength={20}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Quiz Description"
              value={desc}
              onChangeText={(text) => setdesc(text)}
  
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Quiz Subject"
              value={subj}
              onChangeText={(text) => setsubj(text)}
            />
            <Text style={styles.label}>Quiz Difficulty Rating</Text>
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
            <Text style={styles.modalHeader}>Add Quiz Entry</Text>
            <TouchableOpacity onPress={showDueDatePicker}>
              <Text style={styles.datePickerText}>{dueDate ? dueDate : 'Date of the Quiz'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDueDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDueDate}
              onCancel={hideDueDatePicker}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Quiz Name"
              value={title}
              onChangeText={(text) => setTitle(text)}
              maxLength={20}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Quiz Description"
              value={desc}
              onChangeText={(text) => setdesc(text)}
  
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Quiz Subject"
              value={subj}
              onChangeText={(text) => setsubj(text)}
            />
        
            <Text style={styles.label}>Quiz Difficulty Rating</Text>
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
        <MaterialCommunityIcons name="plus" size={24} color="white" />
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
    bottom: 100,
    right: 20,
    backgroundColor: '#8a5dfb',
    borderRadius: 30,
    width: 60,
    height: 60,
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



export default QuizPrio;
