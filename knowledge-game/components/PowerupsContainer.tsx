import { StyleSheet, View } from "react-native";
import { PowerupButton } from "./PowerupButton";
import { ReactElement } from "react";

const icons = {
  map: require("@/assets/images/map.png"),
  refresh: require("@/assets/images/refresh.png"),
  check: require("@/assets/images/check.png"),
  lightbulb: require("@/assets/images/lightbulb.png"),
};

interface IProps {
  children?: ReactElement[];
}

export function PowerupsContainer(props: IProps) {
  return <View style={styles.main}>{props.children}</View>;
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
