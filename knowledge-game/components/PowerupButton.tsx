import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  icon: any;
  value?: number;
  onPress?: () => void;
}

export function PowerupButton(props: IProps) {
  let defaultClickSound = new Audio(require("@/assets/sounds/click.wav"));

  const handlePress = () => {
    if (!(global as any).soundsMuted) {
      defaultClickSound.play();
    }

    if (props?.onPress) {
      props.onPress();
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.main}>
      <Image style={styles.img} source={props.icon}></Image>
      {props.value ? (
        <View style={styles.value}>
          <Image
            style={styles.coin}
            source={require("@/assets/images/coin.png")}
          ></Image>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {props.value}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    shadowColor: "#16FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    shadowColor: "#16FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    borderRadius: 90,
    width: 68,
    height: 68,
  },
  coin: {
    position: "absolute",
    top: -10,
    left: -22,
    width: 45,
    height: 45,
  },
  value: {
    position: "absolute",
    top: 50,
    left: 45,
    width: 60,
    height: 30,
    fontSize: 18,
    textAlign: "right",
    alignItems: "flex-end",
    paddingHorizontal: 5,
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 6,
    color: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
});
