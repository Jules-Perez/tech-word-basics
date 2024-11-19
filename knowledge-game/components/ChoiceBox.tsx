import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";

interface IProps {
  onTouchStartHandler?: () => void;
  selected?: boolean;
  isCorrect?: boolean;
  children?: string | JSX.Element | JSX.Element[];
}
export function ChoiceBox(props: IProps) {
  return (
    <TouchableOpacity
      onPress={props.onTouchStartHandler}
      style={{
        ...styles.main,
        backgroundColor: props.selected
          ? props.isCorrect
            ? "#12DD00"
            : "red"
          : "#246209",
      }}
    >
      {props.selected ? (
        props.isCorrect ? (
          <View style={styles.selectedCorrect}>
            <Image
              style={styles.checkImg}
              source={require("@/assets/images/checkmark.png")}
            />
            <Text style={{ color: "white", fontSize: 16 }}>
              {props.children}
            </Text>
          </View>
        ) : (
          <View style={styles.selectedWrong}>
            <Text style={{ color: "white", fontSize: 16 }}>
              {props.children}
            </Text>
          </View>
        )
      ) : (
        <View style={styles.inner}>
          <Text style={{ color: "white", fontSize: 16 }}>{props.children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    fontSize: 18,
    color: "#FFFFFFCC",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 45,
    borderColor: "#FEAB5CF2",
    borderWidth: 4,
    marginVertical: 8,
    fontFamily: "Tahoma",
    textAlign: "left",
  },
  inner: {
    paddingVertical: 8,
    paddingHorizontal: "20%",
    borderRadius: 45,
    backgroundColor: "#22590A80",
  },
  selectedCorrect: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: "20%",
    borderRadius: 45,
    backgroundColor: "#12DD00",
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 5 },
  },
  selectedWrong: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: "20%",
    borderRadius: 45,
    backgroundColor: "red",
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 5 },
  },
  checkImg: {
    width: 26,
    height: 26,
    left: -35,
    marginRight: -25,
  },
});
