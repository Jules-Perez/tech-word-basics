import { StyleSheet, Text, View } from "react-native";

export default function StatBox() {
  return (
    <View
      style={{
        ...styles.statContainer,
        backgroundColor: "#6dabf6",
      }}
    >
      <Text style={styles.count}>150</Text>
      <Text style={styles.statLabel}>Total Student</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statContainer: {
    borderRadius: 10,
    backgroundColor: "blue",
    padding: 15,
    margin: 5,
  },
  count: {
    marginVertical: 10,
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 10,
    color: "white",
  },
});
