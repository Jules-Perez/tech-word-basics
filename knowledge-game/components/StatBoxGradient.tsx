import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
  color?: "violet" | "blue" | "red" | "green";
  label?: string;
  value?: number;
}

export default function StatboxGradient(props: IProps) {
  const renderColor = (): readonly [string, string] => {
    switch (props?.color) {
      case "violet":
        return ["#7C3AFE", "#5791D9"];
      case "blue":
        return ["#55BDF7", "#025DC7"];
      case "red":
        return ["#FE5657", "#AE1032"];
      case "green":
        return ["#4FFA56", "#1DBF02"];
      default:
        return ["#5791D9", "#5791D9"];
    }
  };

  return (
    <View>
      <LinearGradient
        style={styles.statbox2}
        start={{ x: 0, y: 1 }}
        colors={renderColor()}
      >
        <View style={{ top: 15 }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
            {!props.value || isNaN(props.value) ? 0 : props.value}
          </Text>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
            {props.label}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  searchboxContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  statboxesContainer: {
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
  },
  statContainer2: {
    flex: 1,
  },
  statbox2: {
    margin: 8,
    borderRadius: 20,
    padding: 15,
    height: 95,
    minWidth: 200,
    alignItems: "baseline",
  },
});
