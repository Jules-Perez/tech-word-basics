import { StyleSheet, View } from "react-native";
import { PowerupButton } from "./PowerupButton";

const icons = {
  map: require("@/assets/images/map.png"),
  refresh: require("@/assets/images/refresh.png"),
  check: require("@/assets/images/check.png"),
  lightbulb: require("@/assets/images/lightbulb.png"),
};

export function PowerupsContainer() {
  return (
    <View style={styles.main}>
      <PowerupButton icon={icons.map}></PowerupButton>
      <PowerupButton icon={icons.refresh} value={50}></PowerupButton>
      <PowerupButton icon={icons.check} value={100}></PowerupButton>
      <PowerupButton icon={icons.lightbulb} value={80}></PowerupButton>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    bottom: 0,
    width: "84%",
    marginVertical: 15,
    marginHorizontal: "8%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
