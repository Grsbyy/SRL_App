import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Octicons, Entypo, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('diary.db');

const ReflectScreen = ({ navigation }) => {
  const [diaries, setDiaries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editmodalVisible, setEditModalVisible] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(1);
  const [howDayWent, setHowDayWent] = useState('');
  const [whatIDidToday, setWhatIDidToday] = useState('');
  const [others, setOthers] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showSettingsButton, setShowSettingsButton] = useState(true);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS diary (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, title TEXT, rating INTEGER, howDayWent TEXT, whatIDidToday TEXT, others TEXT);'
      );
    });
    fetchDiaries();
  }, []);

  const fetchDiaries = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM diary ORDER BY date DESC', // Sort by date in descending order
        [],
        (_, { rows: { _array } }) => {
          // Sort the diary entries in ascending order by date
          const sortedDiaries = _array.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          setDiaries(sortedDiaries);
        }
      );
    });
  };
  

  const addDiary = () => {
    if (!date || !title || !rating) {
      Alert.alert('Incomplete Entry', 'Please input date, title, and day rating to submit.');
      return;
    }
    if (diaries.some(diary => diary.date === date)) {
      Alert.alert('Duplicate Date', 'A diary entry already exists for this date. Please select a different date.');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO diary (date, title, rating, howDayWent, whatIDidToday, others) VALUES (?, ?, ?, ?, ?, ?)',
        [date, title, rating, howDayWent, whatIDidToday, others],
        () => {
          fetchDiaries();
          setModalVisible(false);
          resetInputs();
        }
      );
    });
  };
  
  const editDiary = () => {
    if (!date || !title || !rating) {
      Alert.alert('Incomplete Entry', 'Please input date, title, and day rating to submit.');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE diary SET date=?, title=?, rating=?, howDayWent=?, whatIDidToday=?, others=? WHERE id=?',
        [date, title, rating, howDayWent, whatIDidToday, others, selectedDiary.id],
        () => {
          fetchDiaries();
          setEditModalVisible(false);
          setSelectedDiary(null);
         
        }
      );
    });
  };

  const removeDiary = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM diary WHERE id=?',
        [id],
        () => fetchDiaries()
      );
    });
  };

  const resetInputs = () => {
    setDate('');
    setTitle('');
    setRating(1);
    setHowDayWent('');
    setWhatIDidToday('');
    setOthers('');
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

  const viewDiary = (diary) => {
    Alert.alert(
      `Diary Entry - ${diary.date}`,
      `Title: ${diary.title}\nRating: ${diary.rating}\nHow the day went: ${diary.howDayWent}\nWhat I did today: ${diary.whatIDidToday}\nOthers: ${diary.others}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <LinearGradient colors={['#373856', '#121327']} start={{x: 1, y: 0}} end={{x: 1, y: 1}} style={styles.container} >
      <Text style={styles.header}>Reflect</Text>
      
      <ScrollView style={styles.diariesContainer}>
        {diaries.map(diary => (
          
          <TouchableOpacity     
            key={diary.id}
            style={styles.diaryItem}
            onPress={() => viewDiary(diary)}>
            <View style={{width:'60%'}}>
              <Text style={styles.diaryDate}>{diary.date}</Text>
              <Text style={styles.diaryTitle}>{diary.title}</Text>
            </View>

          <TouchableOpacity 
          key={`edit_${diary.id}`}
          onPress={() => {
            setSelectedDiary(diary);
            setDate(diary.date);
            setTitle(diary.title);
            setRating(diary.rating);
            setHowDayWent(diary.howDayWent);
            setWhatIDidToday(diary.whatIDidToday);
            setOthers(diary.others);
            setEditModalVisible(true);
          }} style={styles.editButton}>
            <Feather name="edit-2" size={20} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity 
            key={`delete_${diary.id}`}
            onPress={() => removeDiary(diary.id)}
            style={{marginLeft: -50}}>
            <Octicons name="trash" size={20} color="#DF3E6E" />
          </TouchableOpacity>    
        </TouchableOpacity>

          
        ))}
        <View style={{paddingBottom: 200}}></View>
      </ScrollView>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={editmodalVisible}
        onRequestClose={() => setEditModalVisible(false)}>

        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Edit Diary Entry</Text>
              <View style={styles.diaryImportant}>
                <TextInput
                  style={styles.titleInput}
                  placeholder="Title"
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                  maxLength={20}
                />
                <TouchableOpacity onPress={showDatePicker} style={styles.dateIcon}>
                <Entypo name='calendar' size={20} color='rgba(255,255,255,0.8)'/>
              </TouchableOpacity>
              </View>
              
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
              />
              
              <Text style={styles.label}>Rating of the Day</Text>
              <Picker
                selectedValue={rating}
                style={{ height: 40, width: 200, color:'white' }}
                onValueChange={(itemValue, itemIndex) => setRating(itemValue)}>
                <Picker.Item label="1 - Very Good" value={1} style={{color:'grey'}}/>
                <Picker.Item label="2 - Good " value={2} style={{color:'grey'}}/>
                <Picker.Item label="3 - Okay" value={3} style={{color:'grey'}}/>
                <Picker.Item label="4 - Bad" value={4} style={{color:'grey'}}/>
                <Picker.Item label="5 - Very Bad" value={5} style={{color:'grey'}}/>
              </Picker>
              <TextInput
                style={styles.bigInput}
                placeholder="How the day went by?"
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                value={howDayWent}
                onChangeText={(text) => setHowDayWent(text)}
              />
              <TextInput
                style={styles.bigInput}
                placeholder="What I did today?"
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                value={whatIDidToday}
                onChangeText={(text) => setWhatIDidToday(text)}
              />
              <TextInput
                style={styles.bigInput}
                placeholder="Others"
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                value={others}
                onChangeText={(text) => setOthers(text)}
              />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setEditModalVisible(false)}>
                  <Text style={[styles.buttonText, {color:'#9a7de8'}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={editDiary}>
                  <Text style={styles.buttonText}>Apply Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        
      </Modal>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>

        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Add Diary Entry</Text>
              <View style={styles.diaryImportant}>
                <TextInput
                  style={styles.titleInput}
                  placeholder="Title"
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                  maxLength={20}
                />
                <TouchableOpacity onPress={showDatePicker} style={styles.dateIcon}>
                  <Entypo name='calendar' size={20} color='rgba(255,255,255,0.8)'/>
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
              />

              <Text style={styles.label}>Rating of the Day</Text>
              <Picker
                selectedValue={rating}
                dropdownIconColor={'white'}
                style={{ height: 40, width: 300, alignSelf: 'flex-start', color:'white' }}
                onValueChange={(itemValue, itemIndex) => setRating(itemValue)}>
                <Picker.Item label="1 - Very Good" value={1} style={{color:'grey'}}/>
                <Picker.Item label="2 - Good " value={2} style={{color:'grey'}}/>
                <Picker.Item label="3 - Okay" value={3} style={{color:'grey'}}/>
                <Picker.Item label="4 - Bad" value={4} style={{color:'grey'}}/>
                <Picker.Item label="5 - Very Bad" value={5} style={{color:'grey'}}/>
              </Picker>
              <TextInput
                style={styles.bigInput}
                placeholder="How the day went by?"
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                multiline={true}
                value={howDayWent}
                onChangeText={(text) => setHowDayWent(text)}
              />
              <TextInput
                style={styles.bigInput}
                placeholder="What I did today?"
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                multiline={true}
                value={whatIDidToday}
                onChangeText={(text) => setWhatIDidToday(text)}
              />
              <TextInput
                style={styles.bigInput}
                placeholder="Others"
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                multiline={true}
                value={others}
                onChangeText={(text) => setOthers(text)}
              />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={[{color:'#9a7de8', fontWeight:'bold'}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={addDiary}>
                  <Text style={[{color:'white', fontWeight:'bold'}]}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        
      </Modal>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
          setSelectedDiary(null);
          resetInputs();
        }}>
        <LinearGradient colors={['#633ef7', '#b63ef7']}  start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.addButtonGradient}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </LinearGradient>
        
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.settingsButton}>
        <Entypo name="home" size={20} color="rgba(255, 255, 255, 0.8)" paddingRight={10} paddingTop={10} />
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-month" size={30} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open-page-variant" size={30} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Reflect')}>
          <FontAwesome5 name="feather-alt" size={25} color="#844ef2" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    backgroundColor: '#F8F6FF'
  },
  header: {
    paddingLeft: 30, 
    paddingRight: 20,
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 20
  },
  diariesContainer: {
    flex: 1,
    width: '100%',
  },
  diaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#353766',
    marginBottom: 10
  },
  diaryDate:{
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 'bold',
    fontSize: 14,
  },
  diaryTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  settingsButton: {
    position: 'absolute',
    marginTop: 40,
    right: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
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
    backgroundColor: '#2f2d30',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    width: '100%'
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#9a7de8'
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
  diaryImportant:{
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  titleInput: {
    borderRadius: 15,
    width: '100%',
    color: 'white',
    textAlign: 'left',
    backgroundColor: '#242326',
    paddingHorizontal: 20,
    height: 50,
  },
  dateIcon:{
    position: 'absolute',
    right: 20
  },
  label: {
    alignSelf: 'flex-start',
    color: '#8461c9',
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 0,
  },
  ratingPicker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  bigInput: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    width: 300,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#242326',
    color: 'white',
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
    borderRadius: 10,
    paddingVertical: 10,
    width: '45%',

  },
  cancelButton: {
    borderWidth: 2,
    borderColor: '#9a7de8'
  },
  submitButton: {
    backgroundColor: '#9a7de8',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    marginRight: 10,
  },  
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#373856',
    paddingVertical: 5,
    position: 'absolute',
    bottom: 0,
    height: 70,
    paddingBottom: 20
  },
  bottomButton: {
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    width: '30%',
  },
});



export default ReflectScreen;
