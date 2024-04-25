import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const AcadStrat = ({ navigation }) => {
    
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };  
  const [searchText, setSearchText] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [modalVisible, setModalVisible] = useState(false);

  const academicStrategies = [
    { name: 'Mind Mapping', type: 'Visual Learning Strategy', description: 'Create visual diagrams to represent relationships between concepts. Start with a central idea and branch out with related subtopics.' },
    { name: 'Graphic Organizers', type: 'Visual Learning Strategy', description: 'Use charts, graphs, and tables to organize information visually. Summarize key points and relationships.' },
    { name: 'Color Coding', type: 'Visual Learning Strategy', description: 'Assign different colors to different types of information or concepts. This helps in categorization and memory recall.' },
    { name: 'Flashcards', type: 'Visual Learning Strategy', description: 'Create flashcards with keywords, diagrams, or images to reinforce learning through visual recall.' },
    { name: 'Diagram Drawing', type: 'Visual Learning Strategy', description: 'Draw diagrams or flowcharts to illustrate processes, sequences, or structures. Use arrows and labels for clarity.' },
    { name: 'Visualization', type: 'Visual Learning Strategy', description: "Picture information in your mind's eye to aid comprehension and memory. Imagine scenes, scenarios, or concepts vividly." },
    { name: 'Highlighting & Underlining', type: 'Visual Learning Strategy', description: 'Mark important information in textbooks or notes with colors or lines to emphasize key points.' },
    { name: 'Images & Videos', type: 'Visual Learning Strategy', description: ' Incorporate images, videos, and animations in your learning materials to enhance understanding and engagement.' },
    { name: 'Storyboarding', type: 'Visual Learning Strategy', description: 'Create storyboards for narrative-based subjects or concepts. Arrange images or scenes in sequence to depict a story or process.' },
    { name: 'Visual Note-taking', type: 'Visual Learning Strategy', description: 'Sketch or doodle visual representations of lecture content during note-taking. Use symbols, icons, and drawings to capture ideas visually.' },
    

    { name: 'Reading Aloud', type: 'Verbal Learning Strategy', description: 'Read textbooks, notes, or study materials aloud to reinforce auditory learning through repetition.' },
    { name: 'Explaining', type: 'Verbal Learning Strategy', description: 'Teach concepts or explain ideas to others in your own words. Verbalizing helps clarify understanding.' },
    { name: 'Group Discussions', type: 'Verbal Learning Strategy', description: 'Participate in group discussions or study sessions to verbalize thoughts, share ideas, and gain new perspectives.' },
    { name: 'Reciting', type: 'Verbal Learning Strategy', description: 'Recite key points, definitions, or formulas from memory to reinforce learning through repetition and recall.' },
    { name: 'Debates', type: 'Verbal Learning Strategy', description: 'Engage in debates or discussions on academic topics to develop critical thinking and verbal communication skills.' },
    { name: 'Self-Talk', type: 'Verbal Learning Strategy', description: 'Talk yourself through problem-solving processes or study tasks. Verbalize your thoughts and strategies aloud.' },
    { name: 'Verbal Quizing', type: 'Verbal Learning Strategy', description: 'Quiz yourself or have someone else quiz you verbally on study materials to test understanding and retention.' },
   
    
    { name: 'Podcasts & Audiobooks', type: 'Auditory Learning Strategy', description: 'Listen to educational podcasts or audiobooks to absorb information through verbal channels.' },
    { name: 'Audio Recordings', type: 'Auditory Learning Strategy', description: '' },
    { name: 'Rhymes and Mnemonic', type: 'Auditory Learning Strategy', description: 'Record lectures, discussions, or study notes and listen to them repeatedly for review and reinforcement.' },
    { name: 'Auditory Cues', type: 'Auditory Learning Strategy', description: 'Create rhymes, songs, or mnemonic devices to memorize facts, sequences, or concepts.' },
    { name: 'Active Recall', type: 'Auditory Learning Strategy', description: 'Active recall involves actively retrieving information from memory rather than passively reviewing material. Test yourself with practice questions or try to recall key concepts without looking at your notes.' },
    

    { name: 'Hands-On Activities', type: 'Kinesthetic Learning Strategy', description: 'Engage in hands-on experiments, projects, or simulations to experience concepts firsthand.' },
    { name: 'Role-Playing', type: 'Kinesthetic Learning Strategy', description: 'Act out scenarios or role-play situations related to academic topics to enhance understanding and retention.' },
    { name: 'Interactive Learning', type: 'Kinesthetic Learning Strategy', description: 'Use interactive software, apps, or games that involve physical interaction to reinforce learning.' },
    { name: 'Model Building', type: 'Kinesthetic Learning Strategy', description: 'Construct physical models or prototypes to represent abstract concepts or processes.' },
    { name: 'Gesturing', type: 'Kinesthetic Learning Strategy', description: 'Use hand gestures or body movements while explaining concepts to reinforce understanding and memory.' },
    { name: 'Teaching Others', type: 'Kinesthetic Learning Strategy', description: 'Teach concepts or explain ideas to others using hands-on demonstrations or interactive activities to deepen understanding.' },

    { name: 'Independent Study', type: 'Solitary Learning Strategy', description: ' Set aside dedicated time for self-study in a quiet and comfortable environment, free from distractions.' },
    { name: 'Self-Reflection:', type: 'Solitary Learning Strategy', description: 'Reflect on your learning progress, strengths, and areas for improvement. Keep a journal to record insights and observations.' },
    { name: 'Self-Assessment', type: 'Solitary Learning Strategy', description: 'Assess your understanding of concepts and materials through self-testing, quizzes, or practice exams.' },
   
    { name: 'Study Groups', type: 'Social Learning Strategy', description: 'Form or join study groups with classmates or peers to collaborate on assignments, discuss course materials, and share study resources.' },
    { name: 'Peer Teaching', type: 'Social Learning Strategy', description: 'Take turns teaching and explaining concepts to peers within study groups to reinforce understanding and promote active learning.' },
    { name: 'Collaborative Projects', type: 'Social Learning Strategy', description: 'Work on group projects or assignments that require cooperation, coordination, and shared responsibility.' },
    { name: 'Peer Feedback', type: 'Social Learning Strategy', description: 'Provide constructive feedback to peers on their work and receive feedback on your own assignments to improve learning outcomes.' },
    { name: 'Group Discussions', type: 'Social Learning Strategy', description: 'Engage in group discussions or brainstorming sessions to explore diverse perspectives, solve problems, and generate new ideas.' },
    { name: 'Peer Review', type: 'Social Learning Strategy', description: "Review and critique each other's work, such as essays, presentations, or projects, to refine understanding, communication, and analytical skills." },
 
  ];

  const handleSearch = () => {
    const filtered = academicStrategies.filter(strategy => strategy.name.toLowerCase().includes(searchText.toLowerCase()));
    setSelectedStrategy(null); // Reset selected strategy
    setSearchText(''); // Clear search text
    setFilteredStrategies(filtered);
  };

  const toggleType = (type) => {
    const index = selectedTypes.indexOf(type);
    if (index === -1) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      const updatedTypes = [...selectedTypes];
      updatedTypes.splice(index, 1);
      setSelectedTypes(updatedTypes);
    }
  };

  const isTypeSelected = (type) => {
    return selectedTypes.includes(type);
  };

  const selectStrategy = (strategy) => {
    setSelectedStrategy(strategy);
  };

  const filterStrategies = () => {
    return academicStrategies.filter(strategy => selectedTypes.length === 0 || selectedTypes.includes(strategy.type)).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Academic Strategies</Text>
        {!selectedStrategy && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="filter" size={24} color="#8a5dfb" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.scrollContainer}>
        {selectedStrategy ? (
          <StratDetails strategy={selectedStrategy} onClose={() => setSelectedStrategy(null)} />
        ) : (
          <View style={styles.section}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Academic Strategies"
              value={searchText}
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
            {filterStrategies().map((strategy, index) => (
              <TouchableOpacity key={index} onPress={() => selectStrategy(strategy)}>

                <Text style={styles.strategyButton}>{strategy.name} </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filter by Learning Strategy</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity style={[styles.filterButton, isTypeSelected('Visual Learning Strategy') && styles.selectedFilter]} onPress={() => toggleType('Visual Learning Strategy')}>
                <Text>Visual</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterButton, isTypeSelected('Verbal Learning Strategy') && styles.selectedFilter]} onPress={() => toggleType('Verbal Learning Strategy')}>
                <Text>Verbal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterButton, isTypeSelected('Auditory Learning Strategy') && styles.selectedFilter]} onPress={() => toggleType('Auditory Learning Strategy')}>
                <Text>Auditory</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterButton, isTypeSelected('Kinesthetic Learning Strategy') && styles.selectedFilter]} onPress={() => toggleType('Kinesthetic Learning Strategy')}>
                <Text>Kinesthetic</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterButton, isTypeSelected('Solitary Learning Strategy') && styles.selectedFilter]} onPress={() => toggleType('Solitary Learning Strategy')}>
                <Text>Solitary</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterButton, isTypeSelected('Social Learning Strategy') && styles.selectedFilter]} onPress={() => toggleType('Social Learning Strategy')}>
                <Text>Social</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterButton, { marginTop: 10 }]} onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                <Text>Sort {sortOrder === 'asc' ? 'A to Z' : 'Z to A'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const StratDetails = ({ strategy, onClose }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Strategy Details</Text>
      <Text style={styles.strategyName}>{strategy.name}</Text>
      <Text style={styles.strategyType}>Type: {strategy.type}</Text>
      <Text style={styles.strategyDescription}>{strategy.description}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.backButton}>Go Back</Text>
      </TouchableOpacity>
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
    paddingBottom: 90, 
    
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    
  },
  section: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  sectionHeader: {
    fontWeight: 'bold',
    
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  strategyButton: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue', // Add color to make it clickable
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingVertical: 10,
    backgroundColor: '#8a5dfb',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
  },
  backButton: {
    color: 'blue',
    marginTop: 10,
  },
  strategyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  strategyType: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
  strategyDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
  selectedFilter: {
    backgroundColor: 'blue',
    color: 'white',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#FF5733",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default AcadStrat;
