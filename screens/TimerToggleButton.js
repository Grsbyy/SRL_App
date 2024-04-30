import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const TimerToggleButton = ({
  startCountDownHandler,
  stopCountDownHandler,
  isTimerRunning,
}) => {
  const toggleTimer = () => {
    isTimerRunning ? stopCountDownHandler() : startCountDownHandler();
  };

  return (
    <Pressable
      onPress={toggleTimer}
      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
    >
      <View style={styles.container}>
        <FontAwesome
          style={styles.icon}
          name={isTimerRunning ? "pause" : "play"}
          size={125}
          color="#fff"
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    justifyContent: "center",
    borderColor: "#fff",
    marginVertical: 50,
  },
  icon: { alignSelf: "center" },
});

export default TimerToggleButton;
