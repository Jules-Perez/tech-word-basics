import { StyleSheet, Text, View } from "react-native";

interface IProps {
  children?: string | JSX.Element | JSX.Element[];
  color?: string;
}
export default function LineDivider(props: IProps) {
  return (
    <View style={styles.lineDivider}>
      <View
        style={[styles.line, { backgroundColor: props?.color ?? "white" }]}
      />
      <View style={styles.lineContent}>
        <Text style={{ color: props?.color ?? "white", fontWeight: "bold" }}>
          {props.children}
        </Text>
      </View>
      <View
        style={[styles.line, { backgroundColor: props?.color ?? "white" }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lineDivider: {
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  lineContent: {
    marginHorizontal: 6,
    fontWeight: "bold",
    fontSize: 14,
  },
  line: {
    flex: 1,
    backgroundColor: "white",
    height: 2,
  },
});
