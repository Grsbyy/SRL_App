import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TimerCountDownDisplay from "./TimerCountDownDisplay";
import TimerModeDisplay, { TimerModes } from "./TimerModeDisplay";
import TimerToggleButton from "./TimerToggleButton";
import { Audio } from "expo-av";


const FOCUS_TIME_MINUTES = 25 * 60 * 1000;
const BREAK_TIME_MINUTES = 5 * 60 * 1000;

// Import sound files
const focusSound = require("./focus_sound.mp3");
const breakSound = require("./break_sound.mp3");

export default function App() {
  const [timerCount, setTimerCount] = useState(FOCUS_TIME_MINUTES);
  const [intervalId, setIntervalId] = useState(null);
  const [timerMode, setTimerMode] = useState("Focus");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === "Focus") {
        setTimerMode("Break");
        // Play focus finished sound for 5 seconds
        playSound(focusSound, 7000);
        setTimerCount(BREAK_TIME_MINUTES);
      } else {
        setTimerMode("Focus");
        
        // Play break finished sound for 5 seconds
        playSound(breakSound, 7000);
        setTimerCount(FOCUS_TIME_MINUTES);
      }
      stopCountDown();
    }
  }, [timerCount]);

  // Load sound files
  useEffect(() => {
    async function loadSounds() {
      const { sound } = await Audio.Sound.createAsync(focusSound);
      setSound(sound);
    }
    loadSounds();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async (soundFile, duration) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
      console.log("Sound started playing.");
      setTimeout(async () => {
        await sound.stopAsync();
        console.log("Sound stopped.");
      }, duration);
    } catch (error) {
      console.log("Error occurred while playing sound:", error);
    }
  };

  const startCountDown = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setIntervalId(id);
  };

  const stopCountDown = () => {
    setIsTimerRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: timerMode === "Break" ? "#2a9d8f" : "#d95550",
      }}
    >
      <StatusBar style="auto" />
      <TimerModeDisplay timerMode={timerMode} />

      <TimerToggleButton
        startCountDownHandler={startCountDown}
        stopCountDownHandler={stopCountDown}
        isTimerRunning={isTimerRunning}
      />
      <TimerCountDownDisplay countDownDate={new Date(timerCount)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d95550",
    alignItems: "center",
    justifyContent: "center",
  },
});
