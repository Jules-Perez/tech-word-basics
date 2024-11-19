import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const mascot = require("@/assets/images/fullBodyMascot.png");

interface IProps {
  text?: string;
  answer?: string;
  isCorrect?: boolean;
  isVisible?: boolean;
  onContinue?: () => void;
}

const praise = [
  "Great!",
  "Nice!",
  "Well done!",
  "Amazing!",
  "Correct!",
  "That's right!",
];

export default function InformationModal(props: IProps) {
  return (
    <View
      style={[
        styles.main,
        {
          height: useWindowDimensions().height,
          display: props.isVisible ? "flex" : "none",
        },
      ]}
    >
      <View
        style={[styles.blackBG, { height: useWindowDimensions().height }]}
      ></View>

      <View style={[styles.mascotContainer]}>
        <View style={styles.textBubble}>
          <Text
            style={{
              fontSize: 18,
              color: "#FFFFFF",
              textShadowColor: "black",
              textShadowRadius: 3,
              textShadowOffset: { width: 0, height: 2 },
            }}
          >
            {`“${
              props.isCorrect
                ? praise[Math.floor(Math.random() * praise.length)]
                : "Incorrect!"
            } The answer is - ${props.answer}“\n\n“${props?.text}”`}
          </Text>
        </View>
        <Image style={[styles.mascot]} source={mascot}></Image>
      </View>
      <TouchableOpacity
        onPress={props.onContinue}
        style={{
          width: "100%",
          height: 250,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 999,
          bottom: 0,
        }}
      >
        <Text style={{ color: "white", fontSize: 22 }}>Tap To Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    zIndex: 900,
    width: "100%",
    position: "absolute",
  },
  blackBG: {
    width: "100%",
    backgroundColor: "black",
    opacity: 0.95,
    position: "absolute",
  },
  mascotContainer: {
    top: -50,
  },
  textBubble: {
    backgroundColor: "#564849",
    borderRadius: 15,
    bottom: -135,
    padding: 15,
    maxWidth: "70%",
    borderWidth: 1,
    left: 100,
    borderColor: "#D3B49C",
  },
  mascot: {},
});
