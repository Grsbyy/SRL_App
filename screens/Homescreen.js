import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Homescreen = ({ navigation }) => {
  const [quotes] = useState([
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger."
  ]);
  const [randomQuote, setRandomQuote] = useState('');

  // Generate random quote on component mount
  useEffect(() => {
    generateRandomQuote();
  }, []);

  // Function to generate random quote
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>Hello User</Text>
        <Text style={styles.quote}>{randomQuote}</Text>
        <Text style={styles.explanation}>
          Self-Regulated Learning is the process by which learners take control of their own learning process. 
          This involves setting goals, managing time effectively, monitoring progress, and adapting learning strategies based on feedback.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-check" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Reflect')}>
          <MaterialCommunityIcons name="chart-line" size={40} color="white" />
        </TouchableOpacity>
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
    backgroundColor: '#f0f0f0', // Background color for the entire screen
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  explanation: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the buttons horizontally
    width: '100%',
    paddingHorizontal: 20, // Adjust as needed
    paddingBottom: 10,
    paddingVertical: 10,
    backgroundColor: '#007bff', // Change to desired color
    borderRadius: 10, // Add border radius for a rounded look
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35, // Add spacing between buttons
  },
});

export default Homescreen;
