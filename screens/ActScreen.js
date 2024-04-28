import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal } from 'react-native';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Act = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [showSettingsButton, setShowSettingsButton] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalColor, setModalColor] = useState([])
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

  const toggleModal = (content, color) => {
    setModalContent(content);
    setModalColor(color)
    setModalVisible(!modalVisible);
  }

  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };



  return (
    <LinearGradient colors={['#373856', '#121327']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.container} >
      <View style={styles.header}>
          <TouchableOpacity onPress={toggleCollapse}>
            <Text style={styles.title}>Act</Text>
          </TouchableOpacity>
          {!isCollapsed && (
            <TouchableOpacity onPress={toggleCollapse}>
              <Text style={styles.explanation}>
                The Act phase involves implementing academic strategies, tracking performance, and engaging in actions aimed at achieving learning goals.{"\n\n"}
                Students in this phase actively apply study techniques such as summarizing, organizing, and reviewing material. They monitor their progress by assessing their performance and adjusting strategies accordingly. {"\n\n"}
                This phase emphasizes the importance of taking proactive steps towards learning objectives, fostering autonomy and effectiveness in academic pursuits.
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

          <LinearGradient colors={['#633ef7', '#b63ef7']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.button}>
            <TouchableOpacity style={styles.infoButton} onPress={() => toggleModal('Employing various methods such as note-taking, mnemonic devices, and concept mapping to enhance learning and comprehension.', ['#633ef7', '#b63ef7'])}>
                <MaterialCommunityIcons name='information-outline' size={17} color='rgba(255,255,255,0.8)'></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
              onPress={() => navigateToScreen('AcadStrat')}>           
              <Text style={styles.buttonText}>Academic Strategies</Text>
            </TouchableOpacity>           
          </LinearGradient>   

          <LinearGradient colors={['#f071bb', '#e8647e']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.button}>
            <TouchableOpacity style={styles.infoButton} onPress={() => toggleModal('Exploring additional methods such as Pomodor and Feynman Techniques to optimize retention and understanding of course material.', ['#f071bb', '#e8647e'])}>
                <MaterialCommunityIcons name='information-outline' size={17} color='rgba(255,255,255,0.8)'></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
              onPress={() => navigateToScreen('Other')}>           
              <Text style={styles.buttonText}>Other Study Techniques</Text>
            </TouchableOpacity>           
          </LinearGradient>   

          <LinearGradient colors={['#e67850', '#e3a452']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.button}>
            <TouchableOpacity style={styles.infoButton} onPress={() => toggleModal('Assessing individual learning preferences and strengths to identify the most effective study techniques tailored to personal needs.', ['#e67850', '#e3a452'])}>
                <MaterialCommunityIcons name='information-outline' size={17} color='rgba(255,255,255,0.8)'></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
              onPress={() => navigateToScreen('ASSurvey')}>           
              <Text style={styles.buttonText}>Know Suitable Academic Strategies For You</Text>
            </TouchableOpacity>           
          </LinearGradient>  

          <LinearGradient colors={['#4868db', '#6de391']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.button}>
            <TouchableOpacity style={styles.infoButton} onPress={() => toggleModal('Utilizing a tool to track and calculate General Weighted Average (GWA) based on grades earned in courses, providing insight into academic performance.', ['#4868db', '#6de391'])}>
                <MaterialCommunityIcons name='information-outline' size={17} color='rgba(255,255,255,0.8)'></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
              onPress={() => navigateToScreen('GWACalc')}>           
              <Text style={styles.buttonText}>GWA Calculator</Text>
            </TouchableOpacity>           
          </LinearGradient>  

        </View>
      </ScrollView>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=> setModalVisible(false)}
        >

        <View style={styles.modalContainer}>

          <LinearGradient colors={modalColor} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity onPress={()=> setModalVisible(false)}>
              <View style={styles.closeModalButton}>
                <Text style={{fontSize:16, color:'white'}}>Close</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>

        </View>
  
      </Modal>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.settingsButton}>
        <Entypo name="home" size={20} color="rgba(255, 255, 255, 0.8)" paddingRight={10} paddingTop={10} />
      </TouchableOpacity>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-month" size={30} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open-page-variant" size={30} color="#e67850" />
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
    paddingBottom: 20,
  },
  explanation: {
    fontSize: 15,
    marginTop: -10,
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
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 100,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  infoButton:{
    position: 'absolute',
    width: 30, 
    height: 30,
    top: 10,
    right: 0,

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
    paddingBottom: 50
    
  },
  modalText:{
    fontSize: 20,
    marginTop: 40,
    marginHorizontal: 20,
    color: 'white'

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

export default Act;
