import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';

const ReflectScreen = ({ navigation }) => {
  const [diaries, setDiaries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(1); // Initialize rating state
  const [howDayWent, setHowDayWent] = useState('');
  const [whatIDidToday, setWhatIDidToday] = useState('');
  const [others, setOthers] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showSettingsButton, setShowSettingsButton] = useState(true);

  const addDiary = () => {
    if (!date || !title || !rating) {
      Alert.alert('Incomplete Entry', 'Please input date, title, and day rating to submit.');
      return;
    }
    if (diaries.some(diary => diary.date === date)) {
      Alert.alert('Duplicate Date', 'A diary entry already exists for this date. Please select a different date.');
      return;
    }
    const newDiary = {
      date,
      title,
      rating,
      howDayWent,
      whatIDidToday,
      others
    };
    setDiaries([...diaries, newDiary].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setModalVisible(false);
  };

  const removeDiary = (index) => {
    const updatedDiaries = [...diaries];
    updatedDiaries.splice(index, 1);
    setDiaries(updatedDiaries);
  };

  const editDiary = () => {
    const updatedDiaries = diaries.map(diary => diary.date === selectedDiary.date ? {
      date,
      title,
      rating,
      howDayWent,
      whatIDidToday,
      others
    } : diary);
    setDiaries(updatedDiaries);
    setSelectedDiary(null);
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate.toDateString());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REFLECT</Text>
      
      <ScrollView style={styles.diariesContainer}>
        {diaries.map((diary, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDiary(diary)}
            style={styles.diaryItem}>
            <Text>{diary.date} - {diary.title}</Text>
            <TouchableOpacity onPress={() => editDiary()} style={styles.editButton}>
              <MaterialCommunityIcons name="pencil" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeDiary(index)}>
              <MaterialCommunityIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>{selectedDiary ? 'Edit Diary Entry' : 'Add Diary Entry'}</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.datePickerText}>{date ? date : 'Select Date'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text style={styles.label}>Rating of the Day</Text>
            <Picker
              selectedValue={rating}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRating(itemValue)}>
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
            </Picker>
            <TextInput
              style={styles.bigInput}
              placeholder="How the day went by?"
              value={howDayWent}
              onChangeText={(text) => setHowDayWent(text)}
            />
            <TextInput
              style={styles.bigInput}
              placeholder="What I did today?"
              value={whatIDidToday}
              onChangeText={(text) => setWhatIDidToday(text)}
            />
            <TextInput
              style={styles.bigInput}
              placeholder="Others"
              value={others}
              onChangeText={(text) => setOthers(text)}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={selectedDiary ? editDiary : addDiary}>
                <Text style={styles.buttonText}>{selectedDiary ? 'Edit' : 'Submit'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>
      
      <View style={styles.navButtonsContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-check" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateToScreen('Reflect')}>
          <MaterialCommunityIcons name="chart-line" size={40} color="white" />
    
        </TouchableOpacity>

        {showSettingsButton && (
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.settingsButton}>
          <AntDesign name="setting" size={30} color="black" />
        </TouchableOpacity>
      )}
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
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10, 
  },
  diariesContainer: {
    flex: 1,
    width: '100%',
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
    top: -625,
    right: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'blue',
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
  },
  datePickerText: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    width: '100%',
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
    backgroundColor: 'red',
  },
  submitButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#007bff',
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
});

export default ReflectScreen;
