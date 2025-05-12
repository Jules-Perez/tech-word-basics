import { useState } from "react";
import {
  Image,
  ImageURISource,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Audio } from "expo-av";

interface IProps {
  logo?: ImageURISource;
  onPress?: () => void;
  isMuted?: boolean;
  overrideSound?: Audio.Sound;
  children?: string | JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
}

export function ThemedButton(props: IProps) {
  const [Sound, setSound] = useState<Audio.Sound | undefined>();

  const handlePress = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/click.wav")
    );
    if (!(global as any).soundsMuted) {
      if (props.overrideSound) {
        setSound(props.overrideSound);
      } else {
        setSound(sound);
      }
      await sound.playAsync();
    }

    if (props?.onPress) {
      props.onPress();
    }
  };
  return (
    <TouchableOpacity style={[props.style, styles.outer]} onPress={handlePress}>
      <View style={styles.inner}>
        {props.logo ? (
          <Image style={styles.logoImg} source={props.logo}></Image>
        ) : null}
        <Text style={styles.text}>{props?.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 25,
    borderColor: "#FEAB5CF2",
    borderWidth: 4,
    marginVertical: 8,
    fontFamily: "Tahoma",
    backgroundColor: "#246209",
    width: "100%",
  },
  inner: {
    backgroundColor: "#246209",
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    paddingVertical: 6,
    paddingHorizontal: "10%",
    shadowOffset: { width: 5, height: 5 },
    borderRadius: 90,
    display: "flex",
    flexDirection: "row",
  },
  logoImg: { width: 24, height: 24 },
  text: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
