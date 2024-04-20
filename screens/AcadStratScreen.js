import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AcadStrat = ({ navigation }) => {
    
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };  
  const [searchText, setSearchText] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const academicStrategies = [
    { name: 'Pomodoro Technique', description: 'TESTEST' },
    { name: 'Active Recall', description: 'TESTEST' },
    { name: 'Mnemonics', description: 'TESTEST'},
    { name: 'Metaphors', description: 'TESTEST' },
    { name: 'Essay Writing', description: 'TESTEST' },
    { name: 'Review Sessions', description: 'TESTEST'},
  ];

  const handleSearch = () => {
    const filtered = academicStrategies.filter(strategy => strategy.name.toLowerCase().includes(searchText.toLowerCase()));
    setSelectedStrategy(null); // Reset selected strategy
    setSearchText(''); // Clear search text
    setFilteredStrategies(filtered);
  };

  const selectStrategy = (strategy) => {
    setSelectedStrategy(strategy);
  };

  return (
    <View style={styles.container}>
      {selectedStrategy ? (
        <IllnessDetails strategy={selectedStrategy} onClose={() => setSelectedStrategy(null)} />
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Academic Strategies</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Academic Strategies"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            onSubmitEditing={handleSearch}
          />
          {academicStrategies.map((strategy, index) => (
            <TouchableOpacity key={index} onPress={() => selectStrategy(strategy)}>
              <Text style={styles.strategyButton}>{strategy.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

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

const IllnessDetails = ({ strategy, onClose }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Strategy Details</Text>
      <Text style={styles.strategyName}>{strategy.name}</Text>
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
  },
  section: {
    width: '100%',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    backgroundColor: '#007bff',
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
    marginBottom: 10,
  },
  strategyDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AcadStrat;
