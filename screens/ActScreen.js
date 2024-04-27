import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal } from 'react-native';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PlanScreen = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [showSettingsButton, setShowSettingsButton] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      setShowSettingsButton(value <= 0);
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  const toggleModal = (content) => {
    setModalContent(content);
    setModalVisible(!modalVisible);
  }

  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };



  return (
    <LinearGradient colors={['#373856', '#121327']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.container} >
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleCollapse}>
            <Text style={styles.title}>ACT</Text>
          </TouchableOpacity>
          {!isCollapsed && (
            <TouchableOpacity onPress={toggleCollapse}>
              <Text style={styles.explanation}>
                The Act phase involves implementing academic strategies, tracking performance, and engaging in actions aimed at achieving learning goals.{"\n"}
                Students in this phase actively apply study techniques such as summarizing, organizing, and reviewing material. They monitor their progress by assessing their performance and adjusting strategies accordingly. {"\n"}
                This phase emphasizes the importance of taking proactive steps towards learning objectives, fostering autonomy and effectiveness in academic pursuits.
            </Text>
            </TouchableOpacity>
          )}
          
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.taskPrioritizationButton]}
            onPress={() => toggleModal('Employing various methods such as note-taking, mnemonic devices, and concept mapping to enhance learning and comprehension.')}>
            <Text style={styles.buttonText}>Academic Strategies</Text>
            <Text style={styles.buttonExplanation}>Employing various methods such as note-taking, mnemonic devices, and concept mapping to enhance learning and comprehension.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToScreen('ASSurvey')}>
            <Text style={styles.buttonText}>Know Suitable Academic Strategies For You</Text>
            <Text style={styles.buttonExplanation}>Assessing individual learning preferences and strengths to identify the most effective study techniques tailored to personal needs.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToScreen('GWACalc')}>
            <Text style={styles.buttonText}>GWA Calculator</Text>
            <Text style={styles.buttonExplanation}>Utilizing a tool to track and calculate General Weighted Average (GWA) based on grades earned in courses, providing insight into academic performance.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToScreen('Other')}>
            <Text style={styles.buttonText}>Other Study Techniques</Text>
            <Text style={styles.buttonExplanation}>Exploring additional methods such as Pomodor and Feynman Techniques to optimize retention and understanding of course material.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=> setModalVisible(false)}
        >

        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity onPress={()=> setModalVisible(false)}>
              <View style={styles.closeModalButton}>
                <Text style={{fontSize:18, color:'white'}}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
  
      </Modal>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-month" size={30} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open-page-variant" size={30} color="#7455F7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Reflect')}>
          <FontAwesome5 name="feather-alt" size={25} color="#A9A9A9" />
        </TouchableOpacity>
      </View>

      {showSettingsButton && (
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.settingsButton}>
          <Entypo name="home" size={25} color="grey" />
        </TouchableOpacity>
      )}
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
  },
  explanation: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'left',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 10
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7455F7',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  taskPrioritizationButton: {
    marginBottom: 20,
  },
  buttonExplanation: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer:{
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#24253a',
    width: '100%',
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
    borderRadius: 20,
    elevation: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 200
    
  },
  modalText:{
    fontSize: 20,
    marginTop: 40,
    marginHorizontal: 20,
    color: 'rgba(255, 255, 255, 0.7)'

  },
  closeModalButton: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40,
    marginRight: 20

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

export default PlanScreen;
