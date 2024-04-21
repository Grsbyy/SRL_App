import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ASSurvey = ({ navigation }) => {
  const [answers, setAnswers] = useState(Array(10).fill('')); // Array to store user's answers
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [results, setResults] = useState(''); // State to store the results

  // Function to handle selecting an answer
  const handleAnswerSelection = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  // Function to calculate the learning style based on answers
  const calculateLearningStyle = () => {
    // Algorithm to determine learning style based on answers
    // You can replace this with your provided algorithm
    // Example algorithm here:
    const counts = {
      Visual: 0,
      Auditory: 0,
      Kinesthetic: 0,
      Social: 0,
      Solitary: 0,
      Verbal: 0
    };
  
    answers.forEach(answer => {
      switch (answer) {
        case 'A':
          counts.Visual += 1;
          break;
        case 'B':
          counts.Auditory += 1;
          break;
        case 'C':
          counts.Kinesthetic += 1;
          break;
        case 'D':
          counts.Solitary += 1;
          break;
        case 'E':
          counts.Social += 1;
          break;
        case 'F':
          counts.Verbal += 1;
          break;
        default:
          break;
      }
    });
  
    // Find the maximum count
    let maxCount = Math.max(...Object.values(counts));
  
    // Find the learning styles with the maximum count
    let equalMostPickedChoices = [];
    for (const style in counts) {
      if (counts[style] === maxCount) {
        equalMostPickedChoices.push(style);
      }
    }
  
    // Check if there's only one equal most picked choice
    if (equalMostPickedChoices.length === 1) {
      // Return the single learning style
      return { learningStyle: equalMostPickedChoices[0], counts };
    } else {
      // Return the combination of learning styles
      return { learningStyle: 'Combination', counts, equalMostPickedChoices };
    }
  };
  
  // Function to handle submitting the survey
  const handleSubmit = () => {
    // Check if any question is unanswered
    if (answers.some(answer => answer === '')) {
      Alert.alert('Missing Answer', 'Please answer all questions before submitting.');
    } else {
      // Calculate learning style
      const learningStyle = calculateLearningStyle();
      // Set results
      setResults(learningStyle);
      // Show modal
      setModalVisible(true);
    }
  };

  // Function to render explanation based on learning style
  const renderExplanation = (style, counts) => {
    switch (style) {
      case 'Visual':
        return 'You are a visual learner. Visual learners prefer to learn through images, diagrams, and spatial understanding. They benefit most from visual aids and demonstrations.';
      case 'Auditory':
        return 'You are an auditory learner. Auditory learners learn best through listening and verbal explanation. They excel in understanding information through lectures, discussions, and recordings.';
      case 'Kinesthetic':
        return 'You are a kinesthetic learner. Kinesthetic learners learn best through hands-on experiences and physical activities. They prefer to engage with material through movement, touch, and practical applications.';
      case 'Social':
        return 'You are a social learner. Social learners thrive in group settings and enjoy discussing concepts with others. They learn best through collaboration, interaction, and sharing ideas with peers.';
      case 'Solitary':
        return 'You are a solitary learner. Solitary learners prefer to study alone in a quiet environment, focusing on individual tasks and reflecting on material independently.';
      case 'Verbal':
        return 'You are a verbal learner. Verbal learners excel in expressing themselves through speech and writing. They prefer to learn through reading, writing, and discussing concepts with others.';
      case 'Combination':
        // Display the combination of learning styles
        return `You have a combination of learning styles: ${counts.equalMostPickedChoices.join(', ')}. This means you may benefit from multiple approaches to learning, depending on the context and material.`;
      default:
        return '';
    }
  };

  // Render survey questions
  const renderQuestions = () => {
    const questions = [
      "When learning a new skill, what approach do you find most effective?",
      "How do you prefer to study for exams or tests?",
      "When trying to understand a complex concept, what do you find yourself doing most often?",
      "What type of learning environment do you find most conducive to your studying?",
      "When faced with a problem, how do you prefer to approach it?",
      "How do you prefer to remember information for the long term?",
      "How do you prefer to take notes during lectures or presentations?",
      "How do you prefer to engage with reading materials?",
      "What type of group activity do you enjoy the most?",
      "When learning a new subject, what approach do you find most effective for retaining information?"
    ];

    const options = [
      ["A. Watching demonstrations or instructional videos.", "B. Listening to verbal instructions or explanations.", "C. Jumping in and trying it out myself, learning through trial and error.", "D. Studying written instructions or manuals alone.", "E. Discussing the skill with others and seeking their input.", "F. Repeating the skill aloud or teaching it to someone else."],
      ["A. Reviewing notes and making flashcards.", "B. Listening to recorded lectures or explanations.", "C. Practicing problems or applying concepts in real-life scenarios.", "D. Studying alone in a quiet environment.", "E. Discussing the material with classmates or friends.", "F.  Explaining concepts to yourself or reciting them aloud. "],
      ["A. Visualizing diagrams or images related to the concept.", "B. Listening to explanations or lectures about the concept.", "C. Using physical objects or examples to understand the concept.", "D. Reading about the concept and reflecting on it alone.", "E. Discussing the concept with others to gain different perspectives.", "F. Explaining the concept to yourself or talking it through."],
      ["A. A visually stimulating environment with charts, posters, or diagrams", "B. An environment where I can listen to lectures or discussions.", "C. Anywhere I can move around freely or have access to hands-on materials", "D. A quiet room with good lighting where I can focus without distractions. ", "E.  A collaborative space where I can interact with classmates or peers. ", "F. An environment where I can engage in discussions, debates, or verbal interactions with others."],
      ["A. Visualizing different solutions or drawing diagrams to analyze the problem.", "B. Seeking guidance from others or listening to their advice.", "C. Engaging in trial and error or physically manipulating objects to solve the problem.", "D. Working through the problem alone and reflecting on possible solutions.", "E. Discussing the problem with others to gain different perspectives. ", "F. Talking through the problem aloud to yourself or explaining it to someone else."],
      ["A. Creating visual aids like charts, mind maps, or diagrams.", "B. Listening to recordings or repeating information aloud.", "C. Engaging in physical activities or using gestures to reinforce memory.", "D. Reviewing the information alone and connecting it to personal experiences.", "E. Engaging in group discussions or collaborative learning activities.", "F. Discussing the information with others or teaching it to someone else."],
      ["A. Using diagrams, charts, or bullet points to organize information visually.", "B. Recording the lecture or presentation to listen to later.", "C. Engaging in hands-on note-taking methods like sketching or doodling.", "D. Taking notes independently, focusing on personal understanding and reflection.", "E. Discussing the material with classmates and collaboratively creating notes. ", "F. Summarizing the information in your own words or paraphrasing."],
      ["A. Skimming through and focusing on diagrams, illustrations, or highlighted text.", "B. Reading aloud or listening to audiobooks.", "C. Taking breaks to act out scenes or physically interact with the content.", "D. Reading alone in a quiet environment, free from distractions.", "E. Discussing the material with others or joining a study group.", "F. Explaining the material to someone else or discussing it with a study partner."],
      ["A. Collaborating on a visual project like designing posters or presentations.", "B. Listening to recordings or audio materials as a group.", "C. Engaging in hands-on group projects or experiments.", "D. Working independently on a group task or assignment.", "E. Participating in discussions or debates.", "F.  Explaining concepts or teaching others within the group. "],
      ["A. Creating visual summaries or mind maps of key concepts,", "B. Listening to recordings or repeating information aloud.", "C. Applying the knowledge in real-life situations or through practical exercises.", "D. Reviewing the material alone and connecting it to personal experiences.", "E. Discussing the subject with others or teaching it to someone else. ", "F. Repeating the information aloud or explaining it to yourself. "]
    ];

    return questions.map((question, index) => (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.question}>{`${index + 1}. ${question}`}</Text>
        <View style={styles.optionsContainer}>
          {options[index].map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[styles.optionButton, answers[index] === option.charAt(0) ? styles.selectedOption : null]} // Add conditional styling
              onPress={() => handleAnswerSelection(index, option.charAt(0))}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {index === questions.length - 1 && ( // Render Submit button only after the last question
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderQuestions()}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
>
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your Learning Style:</Text>
            <Text style={styles.modalLearningStyle}>{results.learningStyle}</Text>
            {results.learningStyle === 'Combination' ? (
            <Text style={styles.modalExplanation}>
            You have a combination of learning styles: {results.equalMostPickedChoices.join(', ')}. This means you may benefit from multiple approaches to learning, depending on the context and material.
            </Text>
          ) : (
            <Text style={styles.modalExplanation}>
            {renderExplanation(results.learningStyle, results.counts)}
            </Text>
           )}
            <Pressable
              style={[styles.modalButton, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

   
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Plan')}>
          <MaterialCommunityIcons name="calendar-check" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Act')}>
          <MaterialCommunityIcons name="book-open" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigateToScreen('Reflect')}>
          <MaterialCommunityIcons name="chart-line" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  optionButton: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedOption: { // Style for selected option
    backgroundColor: '#007bff',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 20, 
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalLearningStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalExplanation: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#007bff',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#007bff', // Blue background for all buttons
    paddingBottom: 10, // Extra space below buttons
    
  
    borderRadius: 10,
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
    marginTop: 10, 
  
  },
});

export default ASSurvey;
