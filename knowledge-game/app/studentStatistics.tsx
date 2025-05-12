import StatBox from "@/components/StatBox";
import StatisticsResult from "@/components/StatisticsResult";
import { ThemedView } from "@/components/ThemedView";
import TopFrame from "@/components/TopFrame";
import { IUser, useApi } from "@/hooks/useApi";
import { useLoginSession } from "@/hooks/useLoginSession";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProps } from "./_layout";
import { EditProfileModal } from "@/components/EditProfileModal";
import { ProfileImages } from "@/constants/ProfileImages";
import TopNav, { TopNavOptionsEnum } from "@/components/TopNav";
import { Audio } from "expo-av";

const imgEdit = require("@/assets/images/edit.png");
const imgPlaceholder = require("@/assets/images/user.png");

export default function StudentStatistics() {
  const [LoggedUser, setLoggedUser] = useState<IUser>();
  const { navigate } = useNavigation<NavigationProps>();
  const [ShowTopPanel, setShowTopPanel] = useState(false);
  const [ShowEditProfile, setShowEditProfile] = useState(false);
  const [ShowSettings, setShowSettings] = useState(false);

  useEffect(() => {
    refreshLoggedUser();
  }, []);

  const refreshLoggedUser = () => {
    useLoginSession()
      .getLoggedUser()
      .then((e) => {
        if (!e || e.user_type !== "student") {
          navigate("index");
        } else {
          setTimeout(() => setLoggedUser(e), 200);
        }
      });
  };
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const handleSoundPress = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/click.wav")
    );
    if (!(global as any).soundsMuted) {
      setSound(sound);
      await sound.playAsync();
    }
  };

  return (
    <ThemedView>
      <TopNav
        showSettingsModal={ShowSettings}
        options={[TopNavOptionsEnum.BACK, TopNavOptionsEnum.COIN_STATUS]}
        coins={LoggedUser?.byte_coins}
        onBack={() => navigate("studentDashboard")}
        onSettingsOpen={() => setShowSettings(true)}
        onSettingsClose={() => setShowSettings(false)}
      />
      <View
        style={[styles.topFrameContainer, { zIndex: ShowTopPanel ? 10 : -10 }]}
      >
        <TopFrame
          dropDown={ShowTopPanel}
          bytePower={LoggedUser?.byte_power}
          disabled
        />
      </View>
      {ShowEditProfile ? (
        <EditProfileModal
          user={
            LoggedUser ?? {
              id: -1,
              user_id: "",
              name: "",
              pass: "",
              user_type: "student",
            }
          }
          onClose={() => {
            setShowEditProfile(false);
          }}
          onEdit={(EditUser) => {
            useApi()
              .editUser(EditUser)
              .then((res) => {
                if (typeof res == "string") {
                  alert(res);
                  refreshLoggedUser();
                  setShowEditProfile(false);
                }
              });
          }}
          visible={true}
        />
      ) : null}

      <View style={styles.userInfoContainer}>
        <Image
          style={styles.userImage}
          source={ProfileImages[LoggedUser?.user_img_index ?? 0]}
        />
        <View>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {LoggedUser?.name}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {LoggedUser?.user_id}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSoundPress();
            setShowEditProfile(true);
          }}
        >
          <Image source={imgEdit}></Image>
        </TouchableOpacity>
      </View>
      <StatisticsResult user={LoggedUser} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topFrameContainer: {
    marginBottom: -155,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 15,
  },
  userInfoContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#00000050",
    alignItems: "center",
    gap: 15,
  },
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
});
