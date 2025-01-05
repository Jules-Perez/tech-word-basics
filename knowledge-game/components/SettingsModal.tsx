import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BaseModal } from "./BaseModal";
import { Text } from "react-native";
import { ThemedButton } from "./ThemedButton";
import { useLoginSession } from "@/hooks/useLoginSession";
import { useNavigation } from "expo-router";
import { NavigationProps } from "@/app/_layout";
import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

interface IProps {
  loggedUserId?: number;
  visible?: boolean;
  onClose?: () => void;
  onMuteSoundPressed?: (muted: boolean) => void;
  onMuteMusicPressed?: (muted: boolean) => void;
  isSoundMuted?: boolean;
  isMusicMuted?: boolean;
}

const banner = require("@/assets/images/banner.png");
const music = require("@/assets/images/MusicalNote.png");
const sound = require("@/assets/images/Voice.png");
const questionMark = require("@/assets/images/QuestionMark.png");

interface ISettingProps {
  type: "music" | "sound" | "help";
  onPress?: () => void;
  disabled?: boolean;
}
function SettingButtons(props: ISettingProps) {
  const disabledColor = "#800020";

  const renderImg = (): ImageSourcePropType => {
    switch (props.type) {
      case "music":
        return music;
      case "sound":
        return sound;
      case "help":
        return questionMark;
    }
  };

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
    <TouchableOpacity
      style={[
        styles.settingBtnMain,
        props.disabled ? { backgroundColor: disabledColor } : null,
      ]}
      onPress={handlePress}
    >
      <Image style={{ alignSelf: "center" }} source={renderImg()}></Image>
      <Text
        style={{
          top: 15,
          alignSelf: "center",
          color: "#817368",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {props.type.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

export default function SettingsModal(props: IProps) {
  const { navigate } = useNavigation<NavigationProps>();
  const [IsMusicMuted, setIsMusicMuted] = useState(props.isMusicMuted);
  const [IsSoundMuted, setIsSoundMuted] = useState(props.isSoundMuted);

  const LogOut = () => {
    useLoginSession().LogOutUser();
    navigate("index");
  };

  useEffect(() => {
    if (IsSoundMuted) {
      useAsyncStorage("MuteSound").setItem("true");
    } else {
      useAsyncStorage("MuteSound").removeItem();
    }
    if (props.onMuteSoundPressed) {
      props.onMuteSoundPressed(IsSoundMuted ?? false);
    }
  }, [IsSoundMuted]);

  useEffect(() => {
    if (IsMusicMuted) {
      useAsyncStorage("MuteMusic").setItem("true");
    } else {
      useAsyncStorage("MuteMusic").removeItem();
    }
    if (props.onMuteMusicPressed) {
      props.onMuteMusicPressed(IsMusicMuted ?? false);
    }
  }, [IsMusicMuted]);

  return (
    <BaseModal visible={!props.visible} onClose={props.onClose}>
      <View style={styles.modalContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <SettingButtons
            onPress={() => setIsMusicMuted(!IsMusicMuted)}
            disabled={IsMusicMuted}
            type="music"
          />
          <SettingButtons
            onPress={() => setIsSoundMuted(!IsSoundMuted)}
            disabled={IsSoundMuted}
            type="sound"
          />
          <SettingButtons type="help" />
        </View>
        <View style={{ marginVertical: 10 }}>
          <ThemedButton onPress={LogOut}>LOG OUT</ThemedButton>
          <ThemedButton>CONTACT US</ThemedButton>
          <ThemedButton>TERMS AND POLICY</ThemedButton>
        </View>
        <Text
          style={{
            alignSelf: "center",
            color: "#968585",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          v.1.0
        </Text>
      </View>
      <Image source={banner} style={{ top: 50, height: 100 }} />
      <Text
        style={{
          color: "white",
          textShadowColor: "black",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 8,
          fontSize: 25,
          fontWeight: "bold",
          position: "absolute",
          top: 70,
          marginRight: 8,
        }}
      >
        SETTINGS
      </Text>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FCDEC7",
    width: "65%",
    top: 100,
    borderRadius: 25,
    position: "absolute",
    padding: 10,
    paddingTop: 80,
  },
  settingBtnMain: {
    width: 55,
    height: 55,
    borderRadius: 50,
    paddingTop: 10,
    backgroundColor: "#817368",
    marginBottom: 20,
  },
});
