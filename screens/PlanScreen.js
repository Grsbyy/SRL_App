import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PlanScreen = ({ navigation }) => {
  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PLAN</Text>
        <Text style={styles.explanation}>
          The Plan phase of Self-Regulated Learning involves setting goals, organizing tasks, and prioritizing activities to achieve desired outcomes.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.taskPrioritizationButton]}
          onPress={() => navigateToScreen('TaskPrioritization')}>
          <Text style={styles.buttonText}>Task Prioritization</Text>
          <Text style={styles.buttonExplanation}>Prioritize tasks based on deadlines, difficulty, and importance.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('GoalSetting')}>
          <Text style={styles.buttonText}>Goal Setting</Text>
          <Text style={styles.buttonExplanation}>Set short-term and long-term goals to guide your learning journey.</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.settingsButton}>
        <AntDesign name="setting" size={30} color="black" />
      </TouchableOpacity>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-check" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Reflect')}>
          <MaterialCommunityIcons name="chart-line" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  explanation: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'justify',
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
    width: 320, 
    
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskPrioritizationButton: {
    marginBottom: 20,
  },
  buttonExplanation: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 5,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  bottomButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    width: '30%',
  },
});

export default PlanScreen;
