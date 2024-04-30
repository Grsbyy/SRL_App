import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as SQLite from 'expo-sqlite';
import { LinearGradient } from 'expo-linear-gradient';

const db = SQLite.openDatabase('goals.db');

const GoalSetting = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [goalText, setGoalText] = useState('');
  const [goalType, setGoalType] = useState('Long Term');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [completedGoals, setCompletedGoals] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, type TEXT, completed INTEGER DEFAULT 1);'
      );
    });
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM goals;', [], (_, { rows }) => {
        setGoals(rows['_array']);
      });
    });
  };

  const addGoal = () => {
    if (goalText.trim() === '') {
      return;
    }
    if (editingGoal) {
      db.transaction(
        (tx) => {
          tx.executeSql('UPDATE goals SET text = ?, type = ? WHERE id = ?;', [goalText, goalType, editingGoal.id]);
        },
        null,
        fetchGoals
      );
      setEditingGoal(null);
    } else {
      db.transaction(
        (tx) => {
          tx.executeSql('INSERT INTO goals (text, type) VALUES (?, ?);', [goalText, goalType]);
        },
        null,
        fetchGoals
      );
    }
    setGoalText(''); // Clear the text input after adding/editing a goal
    setModalVisible(false);
  };

  const removeGoal = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM goals WHERE id = ?;', [id]);
      },
      null,
      fetchGoals
    );
  };

    const toggleCompletion = (id) => {
      setCompletedGoals((prevCompletedGoals) => {
        if (prevCompletedGoals.includes(id)) {
          return prevCompletedGoals.filter((goalId) => goalId !== id);
        } else {
          return [...prevCompletedGoals, id];
        }
      });
    };

  const editGoal = (goal) => {
    setEditingGoal(goal);
    setGoalText(goal.text);
    setGoalType(goal.type);
    setModalVisible(true);
  };

  const renderGoals = () => {
    return goals.map((goal) => (
      <View key={goal.id} style={styles.goalItem}>
        <TouchableOpacity onPress={() => removeGoal(goal.id)}>
          <MaterialCommunityIcons name="close" size={24} color="#DF3E6E" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => editGoal(goal)}>
          <Text style={[styles.goalText, completedGoals.includes(goal.id) && styles.completedGoal]}>
            {goal.text}
          </Text>
          <Text style={styles.goalType}>{goal.type}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editGoal(goal)}>
          <AntDesign name="edit" size={24} color="grey" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCompletion(goal.id)}>
          <MaterialCommunityIcons
            name={completedGoals.includes(goal.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={completedGoals.includes(goal.id) ? '#7455F7' : '#7455F7'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    ));
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>My Goals</Text>
        {goals.length === 0 ? <Text>No goals set yet</Text> : renderGoals()}
      </ScrollView>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          setGoalText(''); // Clear the text input when plus button is pressed
          setModalVisible(true);
        }}
      >
       <LinearGradient colors={['#633ef7', '#b63ef7']}  start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.addButtonGradient}>
          <MaterialCommunityIcons name="plus" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.goalTextInput}
              placeholder="Enter your goal"
              value={goalText}
              onChangeText={(text) => setGoalText(text)}
            />
            <Picker
              selectedValue={goalType}
              style={styles.goalTypePicker}
              onValueChange={(itemValue, itemIndex) => setGoalType(itemValue)}
            >
              <Picker.Item label="Long Term" value="Long Term" />
              <Picker.Item label="Short Term" value="Short Term" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButtonAdd} onPress={addGoal}>
                <Text style={styles.modalButtonText}>{editingGoal ? 'Edit Goal' : 'Add Goal'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    width: '100%', // Make the content width 100%
    paddingBottom: 160, 
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  plusButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: '#8a5dfb',
    borderRadius: 50,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingVertical: 10,
    backgroundColor: '#8a5dfb',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  goalTextInput: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
  },
  goalTypePicker: {
    backgroundColor: 'white',
    marginBottom: 20,
    width: '80%',
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  modalButtonAdd: {
    backgroundColor: '#7455F7',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#9D9D9D',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    width: '100%', // Make the goal item width 100%
    borderRadius: 5,
  },
  goalText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10, // Add some margin between text and icons
    color: 'black', // Default color for goal text
  },
  goalType: {
    fontWeight: 'bold',
    color: 'gray',
  },
  icon: {
    marginHorizontal: 5, // Add margin to icons
  },
  completedGoal: {
    textDecorationLine: 'line-through',
    color: '#7455F7', // Change color of completed goal text
    fontWeight: 'bold',
  },
  doneLabel: {
    color: 'green',
    marginLeft: 10,
  },
});


export default GoalSetting;
