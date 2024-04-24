import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import astronaut1 from './Images/gifs/astronaut1.gif';
import astronaut2 from './Images/gifs/astronaut2.gif';
import astronaut3 from './Images/gifs/astronaut3.gif';

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

  const welcomeGifs = [astronaut1, astronaut2, astronaut3];

  const [randomQuote, setRandomQuote] = useState('');
  const [randomGif, setRandomGif] = useState(''); 

  // Generate random quote on component mount
  useEffect(() => {
    generateRandomQuote();
    generateRandomGif();
  }, []);

  // Function to generate random quote
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  // Function to get a random gif
  const generateRandomGif = () => {
    const gifIndex = Math.floor(Math.random() * welcomeGifs.length);
    setRandomGif(welcomeGifs[gifIndex])
  }

  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>Hello User</Text>
        <Text style={styles.quote}>{randomQuote}</Text>
    
      </View>

        <Image
          source={randomGif}
          style={styles.gif}
          resizeMode='contain'
        />

      <View style={styles.explanationWrapper}>
        <Text style={styles.explanationHeader}>What is Self-Regulated Learning?</Text>
        <Text style={styles.explanation}>
          Self-Regulated Learning is the process by which learners take control of their own learning process. 
          This involves setting goals, managing time effectively, monitoring progress, and adapting learning strategies based on feedback.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-check" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Reflect')}>
          <MaterialCommunityIcons name="chart-line" size={35} color="white" />
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
    backgroundColor: '#8a5dfb', // Background color for the entire screen
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
    marginTop: 20,
    color: '#fff',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  explanationWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20, 
    marginBottom: 10
  },
  explanationHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292971',
    textAlign: 'center',
    marginTop: 20
  },
  explanation: {
    fontSize: 16,
    textAlign: 'justify',
    margin: 20,
    color: '#5C5D7E',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the buttons horizontally
    width: '100%',
    paddingHorizontal: 20, // Adjust as needed
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
    paddingVertical: 10,

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25, // Add spacing between buttons
  },

  gif: {
    flex: 1,
    marginBottom: 50,
    width: '100%',
    height: '100%',
  }
});

export default Homescreen;
