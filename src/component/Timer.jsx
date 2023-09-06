import { View, Text, StyleSheet } from "react-native";

const Timer = ({ time }) => {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 15,
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },

  time: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default Timer;
