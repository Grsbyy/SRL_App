import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TimerModeDisplay = ({ timerMode }) => {
  return (
    <View style={styles.timerCountDownContainer}>
      <Text style={styles.timerCountDownText}>
        {timerMode} Time {timerMode === "Break" }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerCountDownContainer: {
    alignItems: "center",
    width: "100%",
  },
  timerCountDownText: {
    fontWeight: "800",
    fontSize: 40,
    color: "#fff",
  },
});

export default TimerModeDisplay;
