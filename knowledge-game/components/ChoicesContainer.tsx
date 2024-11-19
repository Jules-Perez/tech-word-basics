import { StyleSheet, View } from "react-native";
import { ChoiceBox } from "./ChoiceBox";
import { Children } from "react";

interface Iprop {
  children?: string | JSX.Element | JSX.Element[];
}

export function ChoiceContainer(prop: Iprop) {
  return <View style={styles.main}>{prop.children}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
  },
});
