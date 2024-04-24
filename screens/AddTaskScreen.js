import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const AddTask = ({ navigation }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [difficulty, setDifficulty] = useState(5); //5 is the default difficulty
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [taskImpact, setTaskImpact] = useState('F.A.'); //Formative Ass. is the default task impact
    const [dueDate, setDueDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Function to add a task
    const handleAddTask = () => {

    };

    // Function to navigate to respective screens
    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    // Function to handle opening the DateTimePickerModal
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Function to handle selecting a date from the DateTimePickerModal
    const handleConfirmDate = (selectedDate) => {
        setDueDate(selectedDate.toDateString());
        hideDatePicker();
    };

    //Function to handle closing the DateTimePickerModal
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>ADD TASK</Text>
            <TextInput 
                style={styles.taskNameStyle}
                placeholder='Task Name'
                value={taskName}
                onChangeText={setTaskName}
            />
            <TextInput 
                style={styles.taskDescriptionStyle}
                placeholder='Task Description'
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline
            />
            <TextInput 
                style={styles.dueDateStyle}
                placeholder='Due Date'
                value={dueDate}
                onChangeText={setDueDate}
            />
            <Slider
                style={styles.sliderStyle}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={difficulty}
                onChangeValue={setDifficulty}
            />
            <Picker
                style={styles.pickerStyle}
                selectedValue={selectedSubject}
                onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}
            >
                <Picker.Item label="Select Subject" value={null}/>
                <Picker.Item label="Mathematics" value={1} />
                {/* Add more subjects here */}
            </Picker>

            <View style={styles.assessmentWrapperStyle}>
                <TouchableOpacity
                    style={{ marginRight: 20, backgroundColor: taskImpact === 'FA' ? 'blue' : 'gray', padding: 10 }}
                    onPress={() => setTaskImpact('FA')}
                >
                    <Text style={{ color: 'white' }}>FA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: taskImpact === 'AA' ? 'blue' : 'gray', padding: 10 }}
                    onPress={() => setTaskImpact('AA')}
                >
                    <Text style={{ color: 'white' }}>AA</Text>
                </TouchableOpacity>
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />

            <TouchableOpacity
                style={styles.addTaskButtonStyle}
                onPress = {showDatePicker}
            > 
                <Text style={{ color: 'white' }}> {dueDate} </Text>
            </TouchableOpacity>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        paddingBottom: 20,
        textAlign: 'center'
    },
    taskNameStyle: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
    },
    taskDescriptionStyle: {
        marginBottom: 20, 
        padding: 10, 
        borderWidth: 1,
    },
    dueDateStyle: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
    },
    sliderStyle: {
        marginBottom: 20,
    },
    pickerStyle: {
        marginBottom: 20,
    },
    assessmentWrapperStyle: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    addTaskButtonStyle: {
        backgroundColor: '#1CA7EC',
        padding: 10,
        alignItems: 'center',
    },
});

export default AddTask;