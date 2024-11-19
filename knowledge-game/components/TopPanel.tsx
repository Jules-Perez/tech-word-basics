import { Image, StyleSheet, Text, View } from "react-native";
import { ThemedView } from "./ThemedView";

interface IProp {
  timeSeconds?: number;
  energy: number;
}

export function TopPanel(props: IProp) {
  function pad(n: number) {
    if (n < 10) return "000" + n;
    if (n < 100) return "00" + n;
    if (n < 1000) return "0" + n;
  }

  const renderTimer = (seconds: number = 0) => {
    const secondsOnly = seconds % 60;
    const secondsTwoDigits = secondsOnly < 10 ? `0${secondsOnly}` : secondsOnly;
    return `${Math.floor(seconds / 60)}:${secondsTwoDigits}`;
  };

  return (
    <View style={styles.topPanelContainer}>
      <View style={styles.timerContainer}>
        <View style={styles.timerLabel}>
          <Text style={{ color: "#564849", fontWeight: "bold", fontSize: 18 }}>
            Timer
          </Text>
        </View>
        <View style={styles.timerVal}>
          <Text style={{ color: "#564849", fontWeight: "bold", fontSize: 28 }}>
            {renderTimer(props.timeSeconds)}
          </Text>
        </View>
      </View>
      <View style={styles.energyContainer}>
        <Text
          style={{
            fontSize: 35,
            color: "white",
            textShadowColor: "#16FF00",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 2,
          }}
        >
          {pad(props.energy)}
        </Text>
      </View>
      <View style={styles.userImageContainer}>
        <Image
          style={styles.userImage}
          source={require(`@/assets/images/sampleUserPic.png`)}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topPanelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#EED9CE",
    position: "absolute",
    fontFamily: "Tahoma",
    zIndex: 1,
    top: 0,
    left: 0,
    height: 80,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  timerContainer: {
    marginTop: 5,
    paddingTop: 10,
    alignItems: "center",
  },
  timerLabel: {},
  timerVal: {
    marginTop: -5,
    fontSize: 26,
  },
  energyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "45%",
    backgroundColor: "#D3B49CB2",
    borderRadius: 35,
    marginTop: 15,
    marginBottom: 15,
  },
  userImageContainer: {
    top: 8,
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  userImage: {
    width: 125,
    height: 125,
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
