import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Calendar } from 'react-native-calendars';

const db = SQLite.openDatabase('calendar.db');

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    createTable();
    fetchEvents();
  }, []);

  useEffect(() => {
    markDatesWithEvents();
  }, [events]);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, title TEXT, notes TEXT);'
      );
    });
  };

  const fetchEvents = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM events;',
        [],
        (_, { rows }) => {
          const fetchedEvents = rows._array;
          setEvents(fetchedEvents);
          markDatesWithEvents(fetchedEvents);
        }
      );
    });
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAddEvent = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO events (date, title, notes) VALUES (?, ?, ?);',
        [selectedDate, title, notes],
        (_, { insertId }) => {
          const newEvent = { id: insertId, date: selectedDate, title, notes };
          setEvents([...events, newEvent]);
          setTitle('');
          setNotes('');
          markDatesWithEvents([...events, newEvent]);
        }
      );
    });
  };

  const markDatesWithEvents = (eventsArray = []) => {
    const markedDatesObj = {};

    // Iterate through eventsArray or events and mark their corresponding dates
    (eventsArray.length ? eventsArray : events).forEach(event => {
      markedDatesObj[event.date] = { customStyles: { container: { backgroundColor: 'blue', borderRadius: 15 }, text: { color: 'white' } } };
    });

    setMarkedDates(markedDatesObj);
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        current={selectedDate}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={'custom'}
        style={{ marginBottom: 20 }}
        renderDot={(date, today, marking) => {
          return (
            <View style={{ backgroundColor: marking.selected ? 'blue' : marking.marked ? 'blue' : 'transparent', width: 30, height: 30, borderRadius: 15 }}></View>
          );
        }}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {selectedDate}
          </Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
            placeholder="Title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
            placeholder="Notes"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={text => setNotes(text)}
          />
          <TouchableOpacity
            style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
            onPress={handleAddEvent}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Add Event</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20 }}>
            {events
              .filter(event => event.date === selectedDate)
              .map(event => (
                <View key={event.id} style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>
                  <Text>{event.notes}</Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
