  import React, { useState, useEffect } from 'react';
  import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  import { LinearGradient } from 'expo-linear-gradient';


  import astronaut1 from './Images/gifs/astronaut1.gif';
  import astronaut2 from './Images/gifs/astronaut2.gif';
  import astronaut3 from './Images/gifs/astronaut3.gif';

  const Homescreen = ({ navigation }) => {

    const [quotes] = useState([
      "The only way to do great work is to love what you do. \n- Steve Jobs",
      "Success is not final, failure is not fatal: It is the courage to continue that counts. \n- Winston Churchill",
      "Believe you can and you're halfway there. \n- Theodore Roosevelt",
      "Your limitation—it's only your imagination.",
      "Push yourself, because no one else is going to do it for you.",
      "Great things never come from comfort zones.",
      "Dream it. Wish it. Do it.",
      "Success doesn’t just find you. You have to go out and get it.",
      "The harder you work for something, the greater you’ll feel when you achieve it.",
      "Dream bigger. Do bigger.",
      "Climb mountains not so the world can see you, but so you can see the world.",
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
      "The only way to achieve the impossible is to believe it is possible.",
      "Success is not about being the best, it's about being better than you were yesterday.",
      "Opportunities don't happen, you create them.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
      "Be fearless in the pursuit of what sets your soul on fire.",
      "Make each day your masterpiece.",
      "Strive for progress, not perfection.",
      "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
      "Every accomplishment starts with the decision to try.",
      "The only place where success comes before work is in the dictionary.",
      "Embrace the journey and let go of the outcome.",
      "Success is the sum of small efforts, repeated day in and day out.",
      "Make today so awesome that yesterday gets jealous.",
      "Difficult roads often lead to beautiful destinations.",
      "Success is not for the chosen few, but for the few who choose.",
      "Believe in your dreams, they were given to you for a reason.",
      "Every expert was once a beginner.",
      "Success is the result of preparation, hard work, and learning from failure.",
      "Keep your eyes on the stars and your feet on the ground. \n- Theodore Roosevelt",
      "Be the change you wish to see in the world. \n- Mahatma Gandhi",
      "The only limit to our realization of tomorrow will be our doubts of today. \n- Franklin D. Roosevelt",
      "Life is 10% what happens to us and 90% how we react to it. \n- Charles R. Swindoll",
      "The future belongs to those who believe in the beauty of their dreams. \n- Eleanor Roosevelt"
    ]);

    const welcomeGifs = [astronaut1, astronaut2, astronaut3];

    const [randomQuote, setRandomQuote] = useState('');
    const [randomGif, setRandomGif] = useState(''); 
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

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
      <LinearGradient colors={['#373856', '#121327']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.container} >

        <Text style={styles.quote}>{randomQuote}</Text>

        
        <TouchableOpacity onPress={() => navigateToScreen('Plan')}>
          <Image
            source={randomGif}
            style={styles.gif}
            resizeMode='contain'
          />
        </TouchableOpacity>

        <Modal
          animationType='fade'
           visible={modalVisible}
           onRequestClose={toggleModal}
           transparent={true}
        >


        
          <LinearGradient colors={['rgba(20,20,20,0.98)', 'rgba(20,20,20,0.95)']} start={{x: 0, y: 0}} end={{x: 0, y: 1}} style={styles.explanationModal}>
            <Text style={styles.explanation}>
              Self-Regulated Learning is the process by which learners take control of their own learning process. {'\n\n'}
              This involves setting goals, managing time effectively, monitoring progress, and adapting learning strategies based on feedback.
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <View style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </Modal>
        
        <TouchableOpacity style={styles.explanationButton} onPress={toggleModal}>
          <LinearGradient colors={['#7335de', '#9223db']}  start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.explanationWrapper}>
            <Text style={styles.explanationHeader}>What is Self-Regulated Learning?</Text>
          </LinearGradient>
        
        </TouchableOpacity>


        
      </LinearGradient>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 60,
    },
    gif: {
      height: "60%",
      aspectRatio: 1,
      alignSelf: 'center',
      marginTop: 30
      
    },
    quote: {
      fontSize: 30,
      paddingHorizontal: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'left',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    explanationButton: {
      position: 'absolute',
      bottom: 40,
    },
    explanationWrapper: {
      backgroundColor: '#fff',
      borderRadius: 20, 
      paddingVertical: 20,
      paddingHorizontal: 40
    },
    explanationHeader: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
    explanationModal: {
      borderRadius: 10, 
      paddingVertical: 20,
      paddingHorizontal: 20,
      elevation: 10,
      width: '90%',
      alignSelf: 'center',
      position: 'absolute',
      bottom:150
    },
    explanation: {
      fontSize: 20,
      textAlign: 'left',
      color: 'rgba(255, 255, 255, 0.9)',
      marginTop: 20
    },
    closeButton: {
      marginTop: 10,
      alignSelf: 'flex-end',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#7335de',

    },
    closeText: {
      color: 'rgba(255,255,255,0.7)'
    },
  });

  export default Homescreen;
