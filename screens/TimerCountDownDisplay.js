import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TimerCountDownDisplay = ({ countDownDate }) => {
  return (
    <View>
      <Text style={styles.timerCountDownText}>
        {countDownDate.getMinutes().toString().padStart(2, "0")}:
        {countDownDate.getSeconds().toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerCountDownText: {
    fontWeight: "800",
    fontSize: 40,
    color: "#fff",
  },
});

export default TimerCountDownDisplay;
