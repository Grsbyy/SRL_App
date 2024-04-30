import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const GWACalc = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const [selectedGrade, setSelectedGrade] = useState('Grade 7');
  const [grades, setGrades] = useState({
    'Grade 7': {
      'Integrated Science': 1.0,
      'Mathematics': 1.0,
      'Computer Science': 1.0,
      'English': 1.0,
      'Filipino': 1.0,
      'Social Science': 1.0,
      'PEHM': 1.0,
      'Values Education': 1.0,
      'AdTech': 1.0,
    },
    'Grade 8': {
      'Integrated Science 2': 1.0,
      'Mathematics': 1.0,
      'Computer Science': 1.0,
      'English': 1.0,
      'Filipino': 1.0,
      'Social Science': 1.0,
      'PEHM': 1.0,
      'Values Education': 1.0,
      'AdTech': 1.0,
      'Earth Science': 1.0,
    },
    'Grade 9': {
      'Biology': 1.0,
      'Chemistry': 1.0,
      'Physics': 1.0,
      'Mathematics 3': 1.0,
      'English': 1.0,
      'Filipino': 1.0,
      'Social Science': 1.0,
      'Computer Science': 1.0,
      'Statistics': 1.0,
      'PEHM': 1.0,
    },
    'Grade 10': {
      'Biology': 1.0,
      'Chemistry': 1.0,
      'Physics': 1.0,
      'Mathematics 4': 1.0,
      'English 4': 1.0,
      'Filipino': 1.0,
      'Social Science': 1.0,
      'Computer Science': 1.0,
      'PEHM': 1.0,
      'Research': 1.0,
    },
    'PSHS SYP': {
      'Research SYP': 2.0,
      'Core Subject': 1.0,
      'Elective': 1.0,
      'Mathematics SYP': 1.0,
      'English SYP': 1.0,
      'Filipino': 1.0,
      'Social Science': 1.0,
    },
  });

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
  };

  const handleGradeInput = (subject, grade) => {
    const updatedGrades = { ...grades };
    updatedGrades[selectedGrade][subject] = parseFloat(grade) || 0;
    setGrades(updatedGrades);
  };

  const calculateGWA = () => {
    const selectedGradeData = grades[selectedGrade];
    let totalGradePoints = 0;
    let totalUnits = 0;

    // Iterate through each subject
    Object.entries(selectedGradeData).forEach(([subject, grade]) => {
      const units = getSubjectUnits(subject);
      totalGradePoints += grade * units; // Add product of grade and units to totalGradePoints
      totalUnits += units; // Add units to totalUnits
    });

    // Calculate GWA
    const gwa = totalGradePoints / totalUnits;

    // Check if GWA is NaN (no grades entered)
    return isNaN(gwa) ? "No grades entered" : gwa.toFixed(2);
  };


  const getSubjectUnits = (subject) => {
    const unitsMap = {
      'Integrated Science': 1.7,
      'Integrated Science 2': 2, 
      'Mathematics': 1.7,
      'Mathematics 3': 1.0, 
      'Mathematics 4': 1.3, 
      'Mathematics SYP':1.0, 
      'Computer Science': 1.0,
      'English': 1.3,
      'English 3': 1.0,
      'English 4': 1.0, 
      'English SYP': 1.0,
      'Filipino': 1.0,
      'Social Science': 1.0,
      'PEHM': 1.0,
      'Values Education': 0.7,
      'AdTech': 1.0,
      'Earth Science': 0.7,
      'Biology': 1.0,
      'Chemistry': 1.0,
      'Physics': 1.0,
      'Statistics': 1.0,
      'Research': 1.0,
      'Research SYP': 2.0, 
      'Core Subject': 1.7,
      'Elective': 1.7,
    };
    return unitsMap[subject] || 0;
  };

  const getLowestGrades = (gradeData) => {
    const products = Object.entries(gradeData).map(([subject, grade]) => {
      return {
        subject,
        product: (5.0 - grade) * getSubjectUnits(subject)
      };
    });
    products.sort((a, b) => a.product - b.product);
    return products.slice(0, 3).map(item => item.subject);
  };

  return (
    <LinearGradient colors={['#373856', '#121327']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.container} >

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gradePickerContainer}>
          <Text style={styles.label}>Choose Grade:</Text>
          <Picker
            dropdownIconColor={'white'}
            style={{color:'rgba(255,255,255,0.9)'}}
            selectedValue={selectedGrade}
            onValueChange={(itemValue, itemIndex) => handleGradeChange(itemValue)}>
            {Object.keys(grades).map((grade, index) => (
              <Picker.Item key={index} label={grade} value={grade} />
            ))}
          </Picker>
        </View>
        {Object.entries(grades[selectedGrade]).map(([subject, grade], index) => (
          <View key={index} style={styles.subjectContainer}>
            <Text style={styles.subjectLabel}>{subject} ({getSubjectUnits(subject)} {getSubjectUnits(subject) === 1 || getSubjectUnits(subject) === 1.0 ? 'Unit' : 'Units'})</Text>
            <Picker
              style={styles.gradeInput}
              dropdownIconColor={'white'}
              selectedValue={grade}
              onValueChange={(itemValue, itemIndex) => handleGradeInput(subject, itemValue)}>
              <Picker.Item label="1.0" value={1.0} />
              <Picker.Item label="1.25" value={1.25} />
              <Picker.Item label="1.50" value={1.50} />
              <Picker.Item label="1.75" value={1.75} />
              <Picker.Item label="2.0" value={2.0} />
              <Picker.Item label="2.25" value={2.25} />
              <Picker.Item label="2.50" value={2.50} />
              <Picker.Item label="2.75" value={2.75} />
              <Picker.Item label="3.0" value={3.0} />
              <Picker.Item label="4.0" value={4.0} />
              <Picker.Item label="5.0" value={5.0} />
            </Picker>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={() => {
            const gwa = calculateGWA();
            const lowestSubjects = getLowestGrades(grades[selectedGrade]);
            if (gwa <= 1.50) {
              Alert.alert(
                "GWA Result", 
                `Congratulations! Your GWA is: ${gwa}. You are part of the Director's List!`,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            } else {
              Alert.alert(
                "GWA Result", 
                `Your GWA is: ${gwa}. \nConsider improving grades in: ${lowestSubjects.join(', ')} to be part of the Director's List.`,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }
          }}>
            <Text style={styles.calculateButtonText}>Calculate GWA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  gradePickerContainer: {
    width: 300,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold', 
    color: 'rgba(255,255,255,0.9)'
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    width: '100%'
  },
  subjectLabel: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  gradeInput: {
    flex: 1,
    height: 40,
    color: 'white'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  calculateButton: {
    backgroundColor: '#353766',
    padding: 10,
    borderRadius: 5,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    backgroundColor: '#8a5dfb',
    borderRadius: 5,
    padding: 5,
  },
  navigationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
  },
});

export default GWACalc;
