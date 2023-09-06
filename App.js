import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Platform, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Header from "./src/component/Header";
import Timer from "./src/component/Timer";
import { Audio } from "expo-av";

const colors = ["#f7dc6f", "#a2d9ce", "#d7bde2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(true);
  const [time, setTime] = useState(60 * 25); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = () => {
    playSound();
    setIsActive(!isActive);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("./assets/microwave-timer-117077.mp3"));
    await sound.playAsync();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === "android" && 50 }}>
        <Text style={styles.text}>Pomodoro 🍅</Text>

        <Header currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime} />

        <Timer time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{ color: "white", fontWeight: "bold" }}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>

        {/* <Button title="Mi Botón" /> */}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
