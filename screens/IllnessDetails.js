import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const IllnessDetails = ({ illness, onBack }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Illness Details</Text>
      <Text style={styles.hospitalName}>{illness.name}</Text>
      <Image source={illness.image} style={styles.illnessImage} />
      <Text style={styles.detailHeader}>Description:</Text>
      <Text>{illness.description}</Text>
      <Text style={styles.detailHeader}>Symptoms:</Text>
      {illness.symptoms ? (
        <View>
          {illness.symptoms.map((symptom, index) => (
            <Text key={index} style={styles.symptomText}>
              {symptom.name} - {symptom.severity}
            </Text>
          ))}
        </View>
      ) : (
        <Text>No symptoms found.</Text>
      )}
      <Text style={styles.detailHeader}>Medicines:</Text>
      <Text>{illness.medicine}</Text>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backButton}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  illnessImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  detailHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  symptomText: {
    marginBottom: 5,
  },
  backButton: {
    color: 'blue',
    marginTop: 10,
  },
});

export default IllnessDetails;
