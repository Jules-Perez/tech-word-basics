import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
const windowHeight = Dimensions.get("window").height;

const imgProfile = require("@/assets/images/navProfile.png");
const imgLeaderboard = require("@/assets/images/navLeaderboard.png");
const imgStatistics = require("@/assets/images/navStatistics.png");

interface IButtonNavProps {
  img?: ImageSourcePropType;
  logo?: "profile" | "leaderboard" | "statistics";
  onPress?: () => void;
}
export function BottomNavButton(props: IButtonNavProps) {
  let defaultClickSound = new Audio(require("@/assets/sounds/click.wav"));

  const handlePress = () => {
    if (!(global as any).soundsMuted) {
      defaultClickSound.play();
    }

    if (props?.onPress) {
      props.onPress();
    }
  };
  const renderLogo = () => {
    switch (props.logo) {
      case "profile":
        return imgProfile;
      case "leaderboard":
        return imgLeaderboard;
      case "statistics":
        return imgStatistics;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
      <Image style={styles.buttonNavIcon} source={renderLogo()} />
    </TouchableOpacity>
  );
}

interface IProps {
  children?: string | JSX.Element | JSX.Element[];
}

export default function BottomNavigation(props: IProps) {
  return (
    <View style={{ ...styles.main, top: windowHeight - 75, zIndex: 100 }}>
      <View style={styles.container}></View>
      <View style={styles.buttonContainer}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    right: 0,
    left: 0,
    position: "absolute",
    height: 75,
  },
  container: {
    backgroundColor: "#ffffff55",
    bottom: 0,
    right: 0,
    left: 0,
    position: "absolute",
    height: 55,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#ffffff65",
    alignContent: "center",
    alignItems: "center",
  },
  buttonNavIcon: {
    width: 52,
    height: 52,
  },
});
