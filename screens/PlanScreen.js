import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Plan = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [showSettingsButton, setShowSettingsButton] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      setShowSettingsButton(value <= 0);
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, []);
  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <LinearGradient colors={['#373856', '#121327']} start={{x: 1, y: 0}} end={{x: 1, y: 1}} style={styles.container} >
      <View style={styles.header}>
          <TouchableOpacity onPress={toggleCollapse}>
            <Text style={styles.title}>Plan</Text>
          </TouchableOpacity>
          {!isCollapsed && (
            <TouchableOpacity onPress={toggleCollapse}>
              <Text style={styles.explanation}>
                The Plan phase of Self-Regulated Learning involves setting goals, organizing tasks, and prioritizing activities to achieve desired outcomes.
              </Text>
            </TouchableOpacity>
          )}     
          
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}>
      
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToScreen('TaskPrioritization')}>
            <LinearGradient colors={['#633ef7', '#b63ef7']}  start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.iconContainer}>
              <FontAwesome5 name='tasks' size={25} color='#fff'></FontAwesome5>
            </LinearGradient>
            <Text style={[styles.buttonText, {color: '#af80ed'}]}>Task Prioritization</Text>
            <Text style={styles.buttonExplanation}>Prioritize tasks based on deadlines, difficulty, and importance.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigateToScreen('QuizPrio')}>
            <LinearGradient colors={['#f071bb', '#e8647e']}  start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.iconContainer}>
              <MaterialIcons name='draw' size={25} color='#fff'></MaterialIcons>
            </LinearGradient>
            <Text style={[styles.buttonText, {color: '#db6385'}]}>Quiz Prioritization</Text>
            <Text style={styles.buttonExplanation}>Prioritize quizzes based on date and difficulty.</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigateToScreen('GoalSetting')}>
            <LinearGradient colors={['#e67850', '#e3a452']}  start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.iconContainer}>
              <FontAwesome5 name='trophy' size={25} color='#fff'></FontAwesome5>
            </LinearGradient>
            <Text style={[styles.buttonText, {color: '#dba825'}]} >Goal Setting</Text>
            <Text style={styles.buttonExplanation}>Set short-term and long-term goals to guide your learning journey.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToScreen('WPlanner')}>
            <LinearGradient colors={['#4868db', '#6de391']}  start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.iconContainer}>
              <FontAwesome5 name='calendar-week' size={25} color='#fff'></FontAwesome5>
            </LinearGradient>
            <Text style={[styles.buttonText, {color: '#5dba9e'}]}>Weekly Planner</Text>
            <Text style={styles.buttonExplanation}>Organizing tasks and assignments for each week to effectively manage time.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.settingsButton}>
        <Entypo name="home" size={20} color="rgba(255, 255, 255, 0.8)" paddingRight={10} paddingTop={10} />
      </TouchableOpacity>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-month" size={30} color="#f071bb" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open-page-variant" size={30} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Reflect')}>
          <FontAwesome5 name="feather-alt" size={25} color="#A9A9A9" />
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
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 20
  },
  explanation: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'left',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: -10

  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40
  },
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 100,
    width: 320, 
    marginTop: 20, 
    
  },
  scrollContainer: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 30,
    backgroundColor: '#353766',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center'
  },
  buttonText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  buttonExplanation: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
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

export default Plan;
