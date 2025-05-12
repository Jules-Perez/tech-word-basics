import BottomNavigation, {
  BottomNavButton,
} from "@/components/BottomNavigation";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { NavigationProps } from "./_layout";
import { IUser, useApi } from "@/hooks/useApi";
import { useLoginSession } from "@/hooks/useLoginSession";
import { EditProfileModal } from "@/components/EditProfileModal";
import StatboxGradient from "@/components/StatBoxGradient";
import { ProfileImages } from "@/constants/ProfileImages";
import TopNav, { TopNavOptionsEnum } from "@/components/TopNav";
import { Audio } from "expo-av";

const imgPlaceholder = require("@/assets/images/user.png");
const imgEdit = require("@/assets/images/edit.png");

interface IUserListProps {
  img?: string;
  name: string;
  id: string;
  imgIndex?: number;
  onAccept: () => void;
}
function UserList(props: IUserListProps) {
  return (
    <View style={ulStyles.container}>
      <Image style={ulStyles.img} source={ProfileImages[props.imgIndex ?? 0]} />
      <View style={ulStyles.dataContainer}>
        <Text style={ulStyles.name}>{props.name}</Text>
        <Text style={ulStyles.id}>{props.id}</Text>
      </View>
      <ThemedButton onPress={props.onAccept} style={{ flexBasis: "35%" }}>
        Accept
      </ThemedButton>
    </View>
  );
}

const ulStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#00000025",
    marginBottom: 8,
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  dataContainer: { flexBasis: "35%" },
  name: { color: "white", fontWeight: "bold", fontSize: 20 },
  id: { fontSize: 12, color: "white" },
});

export default function InstructorDashboard(props: any) {
  const [LoggedUser, setLoggedUser] = useState<IUser>();
  const { navigate } = useNavigation<NavigationProps>();
  const [UnverifiedUsers, setUnverifiedUsers] = useState<IUser[]>([]);
  const [StudentCount, setStudentCount] = useState(0);
  const [ShowEditProfile, setShowEditProfile] = useState(false);
  const [ShowSettings, setShowSettings] = useState(false);

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

  useEffect(() => {
    refreshLoggedUser();
  }, []);

  useEffect(() => {
    useApi()
      .getAllUsers()
      .then((data) => {
        const unverified = (data as IUser[]).filter((d) => !d.is_verified);
        if (!unverified) return;
        setUnverifiedUsers(unverified);
        setStudentCount(
          (data as IUser[]).reduce((a, b) => {
            return b.user_type == "student" ? a + 1 : a;
          }, 0)
        );
      });
  }, [LoggedUser]);

  const renderRegistrationRequestList = useCallback(
    (_unverifiedUsers: IUser[]) => {
      return _unverifiedUsers.map((userData, i) => (
        <UserList
          onAccept={() => handleRegistrationAccept(userData.id ?? -1)}
          key={i}
          name={userData.name}
          id={userData.user_id}
          imgIndex={userData.user_img_index}
        />
      ));
    },
    []
  );

  const handleRegistrationAccept = (id: number) => {
    useApi()
      .verifyUser(id)
      .then((e) => {
        if (!e) return;
        alert(e);
        const prevUnregisteredUsers = UnverifiedUsers;
        prevUnregisteredUsers.filter((d) => d.id !== id);
        setUnverifiedUsers(prevUnregisteredUsers);
      });
  };
  const refreshLoggedUser = () => {
    useLoginSession()
      .getLoggedUser()
      .then((e) => {
        if (!e || e.user_type !== "instructor") {
          navigate("index");
        } else {
          setTimeout(() => setLoggedUser(e), 200);
        }
      });
  };
  return (
    <ThemedView style={{ overflow: "hidden" }}>
      <TopNav
        showSettingsModal={ShowSettings}
        options={[TopNavOptionsEnum.SETTINGS]}
        coins={LoggedUser?.byte_coins}
        onBack={() => navigate("studentDashboard")}
        onSettingsOpen={() => setShowSettings(true)}
        onSettingsClose={() => setShowSettings(false)}
      />
      {ShowEditProfile ? (
        <EditProfileModal
          user={
            LoggedUser ?? {
              id: -1,
              user_id: "",
              name: "",
              pass: "",
              user_type: "instructor",
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

      <BottomNavigation>
        <BottomNavButton logo={"profile"} />
        <BottomNavButton logo={"leaderboard"} />
        <BottomNavButton
          logo={"statistics"}
          onPress={() => navigate("statistics")}
        />
      </BottomNavigation>

      <View
        style={{
          ...styles.main,
          top: 50,
          maxHeight: useWindowDimensions().height - 50,
        }}
      >
        <View style={styles.dashboardContainer}>
          <Image
            style={styles.profileImg}
            source={ProfileImages[LoggedUser?.user_img_index ?? 0]}
          />
          <View style={styles.dashboardContent}>
            <Text style={styles.header}>Welcome Back!</Text>
            <Text style={styles.name}>{LoggedUser?.name.toUpperCase()}</Text>
            <Text style={styles.email}>{LoggedUser?.email}</Text>
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

        <View style={[styles.userStatsContainer]}>
          <StatboxGradient value={StudentCount} color="blue" label="Students" />
          <StatboxGradient value={5} color="green" label="Sections" />
        </View>
        <Text style={{ color: "white", marginHorizontal: 25 }}>
          List of Registration Requests
        </Text>
        <ScrollView
          style={styles.userListContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {renderRegistrationRequestList(UnverifiedUsers)}
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "space-between",
  },
  dashboardContainer: {
    margin: 25,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 25,
    backgroundColor: "#FCDEC7",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dashboardContent: {
    flexBasis: "45%",
    minHeight: 65,
    textAlign: "left",
    justifyContent: "space-between",
    display: "flex",
  },
  profileImg: {
    width: 75,
    height: 75,
    borderRadius: 90,
    borderWidth: 4,
    backgroundColor: "#718182",
    borderColor: "white",
  },
  header: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    textShadowColor: "#564849",
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 0 },
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
  },
  email: {
    fontSize: 10,
    color: "#817368",
  },
  userStatsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
  },
  statContainer: {
    flexBasis: "40%",
    borderRadius: 10,
    backgroundColor: "blue",
    padding: 15,
    margin: 5,
    marginBottom: 30,
  },
  count: {
    marginVertical: 10,
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 10,
    color: "white",
  },
  userListContainer: {
    marginTop: 15,
    bottom: 0,
    left: 0,
    flexBasis: "55%",
  },
});
