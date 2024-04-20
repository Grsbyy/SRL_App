import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('reflections.db');

const ReflectScreen = ({ navigation }) => {
  const [reflections, setReflections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reflectionText, setReflectionText] = useState('');

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS reflections (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)'
      );
      tx.executeSql('SELECT * FROM reflections', [], (_, { rows }) => {
        setReflections(rows._array);
      });
    });
  };

  const addReflection = () => {
    if (reflectionText.trim() === '') {
      Alert.alert('Error', 'Please enter reflection text.');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO reflections (text) VALUES (?)',
        [reflectionText],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            fetchReflections();
            setModalVisible(false);
            setReflectionText('');
          }
        }
      );
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Reflections</Text>
      {/* Reflections list */}
      <FlatList
        data={reflections}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.text}</Text>
          </View>
        )}
        style={{ marginBottom: 20 }}
      />
      {/* Add Reflection button */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ fontSize: 18, color: 'blue', marginBottom: 20 }}>Add Reflection</Text>
      </TouchableOpacity>

      {/* Reflection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Add Reflection</Text>
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="Enter your reflection here..."
              value={reflectionText}
              onChangeText={text => setReflectionText(text)}
              style={{ marginBottom: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, minHeight: 100 }}
            />
            <TouchableOpacity onPress={addReflection}>
              <Text style={{ color: 'blue' }}>Add Reflection</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Settings Icon */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 20, right: 20 }}
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialCommunityIcons name="setting" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ReflectScreen;
