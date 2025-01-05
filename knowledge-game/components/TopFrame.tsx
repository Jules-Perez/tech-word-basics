import { NavigationProps } from "@/app/_layout";
import { useNavigation } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const frame = require("@/assets/images/topFrame.png");

interface IProps {
  dropDown: boolean;
  onHidden?: () => void;
  onShow?: () => void;
  progress?: number;
  bytePower?: number;
  disabled?: boolean;
}

export default function TopFrame(props: IProps) {
  const { navigate } = useNavigation<NavigationProps>();

  const showAnimation = useRef(new Animated.Value(-300)).current;
  const contentFadeAnimation = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(props.dropDown);

  const show = () => {
    setIsVisible(true);
    if (props.onShow) {
      props.onShow();
    }
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(showAnimation, {
      toValue: -20,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(contentFadeAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(showAnimation, {
      toValue: -300,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        if (props.onHidden) {
          props.onHidden();
        }
        setIsVisible(false);
      }
    });
    Animated.timing(contentFadeAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  let defaultClickSound = new Audio(require("@/assets/sounds/click.wav"));
  const handleSoundPress = () => {
    if (!(global as any).soundsMuted) {
      defaultClickSound.play();
    }
  };
  const handleDropdownBtn = () => {
    handleSoundPress();
    if (!isVisible) show();
    else hide();
  };

  return (
    <View style={{ ...styles.main }}>
      <Animated.Image
        style={[styles.frameBg, { transform: [{ translateY: showAnimation }] }]}
        source={frame}
      />
      <View style={styles.bytePowerContainer}>
        <Text style={styles.byteVal}>{props.bytePower ?? 0}</Text>
        <Text style={styles.byteLabel}>Byte Power</Text>
      </View>
      <Animated.View
        style={{
          alignItems: "center",
          marginTop: 20,
          transform: [{ translateY: showAnimation }],
          opacity: contentFadeAnimation,
        }}
      >
        <Text style={styles.progessContainerLabel}>COMPLETED</Text>
        <View style={styles.progressContainer}>
          <View style={styles.circleProgressShadow} />
          <CircularProgress
            value={props.progress ?? 0}
            maxValue={100}
            progressValueStyle={{ maxWidth: 55 }}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            activeStrokeColor="#16FF00"
            inActiveStrokeColor="#1E470D"
            progressValueColor="white"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSoundPress();
              navigate("studentStatistics");
            }}
          >
            <Text style={styles.buttonText} selectionColor={"white"}>
              PROFILE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} selectionColor={"white"}>
              TECHTIONARY
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          top: 10,
          transform: [{ translateY: showAnimation }],
        }}
      >
        {!props.disabled ? (
          <TouchableOpacity
            style={[
              {
                padding: 10,
                top: isVisible ? -15 : 0,
                transform: [{ rotateX: isVisible ? "180deg" : "0deg" }],
              },
            ]}
            onPress={handleDropdownBtn}
          >
            <View style={styles.dropDownBtn} />
            <View style={styles.dropDownBtnShadow} />
          </TouchableOpacity>
        ) : null}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: 300,
    alignItems: "center",
  },
  frameBg: {
    position: "absolute",
    width: 250,
    height: 450,
  },
  bytePowerContainer: {
    marginBottom: 15,
  },
  byteVal: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  byteLabel: { color: "white", fontSize: 18, textAlign: "center" },
  progressContainer: {
    flex: 1,
    marginBottom: 15,
  },
  progessContainerLabel: {
    marginBottom: 5,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: 100,
  },
  button: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 15,
    width: 180,
    flex: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    backgroundColor: "#246209",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  circleProgressShadow: {
    position: "absolute",
    width: 120,
    height: 120,

    borderRadius: 180,
    backgroundColor: "transparent",
    shadowColor: "#16FF00",
    shadowRadius: 10,
  },
  dropDownBtn: {
    width: 0,
    height: 0,
    top: -8,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#54A032",
    shadowColor: "black",
  },
  dropDownBtnShadow: {
    position: "absolute",
    left: 5,
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderTopWidth: 22,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "black",
    opacity: 0.2,
    zIndex: -10,
  },
});
