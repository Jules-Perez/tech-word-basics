import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import SettingsModal from "./SettingsModal";
import { Text } from "react-native";
import { NavigationProps } from "@/app/_layout";
import { useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

const settingsImg = require("@/assets/images/settings.png");
const backImg = require("@/assets/images/left.png");
const coinImg = require("@/assets/images/coin.png");

export enum TopNavOptionsEnum {
  BACK,
  SETTINGS,
  COIN_STATUS,
  LOGO,
}

interface IProps {
  children?: string | JSX.Element | JSX.Element[];
  onBack?: () => void;
  showSettingsModal?: boolean;
  onSettingsOpen?: () => void;
  onSettingsClose?: () => void;
  coins?: number;
  options?: TopNavOptionsEnum[];
}
export default function TopNav(props: IProps) {
  const [IsMusicMuted, setIsMusicMuted] = useState(false);
  const [IsSoundMuted, setIsSoundMuted] = useState(false);

  useEffect(() => {
    useAsyncStorage("MuteMusic")
      .getItem()
      .then((e) => {
        let isMuted = e != null;
        setIsMusicMuted(isMuted);
        if (!isMuted) {
          playThemeMusic();
        } else {
          stopThemeMusic();
        }
      });
    useAsyncStorage("MuteSound")
      .getItem()
      .then((e) => {
        (global as any).soundsMuted = e != null;
        setIsSoundMuted(e != null);
      });
  }, []);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [themeSound, setThemeSound] = useState<Audio.Sound | null>(null);

  const playThemeLoop = async () => {
    if ((global as any).theme) {
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/theme.wav")
    );
    (global as any).theme = sound;
    setThemeSound(sound);
    await sound.setIsLoopingAsync(true);
    await sound.playAsync();
  };

  const stopTheme = async () => {
    if ((global as any).theme) {
      await (global as any).theme.stopAsync();
      await (global as any).theme.unloadAsync();
      (global as any).theme = null;
    }
  };

  const playThemeMusic = () => {
    playThemeLoop();
  };

  const stopThemeMusic = () => {
    stopTheme();
  };

  const onMuteMusicPressed = (mute: boolean) => {
    setIsMusicMuted(mute);
    if (!mute) {
      playThemeMusic();
    } else {
      stopThemeMusic();
    }
  };

  const onMuteSoundPressed = (mute: boolean) => {
    (global as any).soundsMuted = mute;
    setIsSoundMuted(mute);
  };

  const handleSoundPress = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/click.wav")
    );
    if (!(global as any).soundsMuted) {
      setSound(sound);
      await sound.playAsync();
    }
  };
  const handlePress = (onPress?: () => void) => {
    handleSoundPress();
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.main}>
      {props.options?.includes(TopNavOptionsEnum.BACK) ? (
        <TouchableOpacity onPress={() => handlePress(props.onBack)}>
          <Image source={backImg}></Image>
        </TouchableOpacity>
      ) : null}
      {props.options?.includes(TopNavOptionsEnum.SETTINGS) ? (
        <TouchableOpacity onPress={() => handlePress(props.onSettingsOpen)}>
          <Image source={settingsImg}></Image>
        </TouchableOpacity>
      ) : null}
      {props.options?.includes(TopNavOptionsEnum.COIN_STATUS) ? (
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 28, height: 28, zIndex: 10 }}
            source={coinImg}
          ></Image>
          <Text
            style={{
              alignSelf: "center",
              borderWidth: 1,
              borderColor: "white",
              paddingLeft: 20,
              paddingRight: 4,
              marginLeft: -22,
              borderRadius: 8,
              fontWeight: "bold",
              color: "white",
              fontSize: 16,
            }}
          >
            {props.coins ?? 0}
          </Text>
        </TouchableOpacity>
      ) : null}

      {props.showSettingsModal ? (
        <SettingsModal
          onMuteSoundPressed={onMuteSoundPressed}
          onMuteMusicPressed={onMuteMusicPressed}
          isMusicMuted={IsMusicMuted}
          isSoundMuted={IsSoundMuted}
          onClose={props.onSettingsClose}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 15,
    zIndex: 1050,
    alignItems: "flex-start",
  },
});
