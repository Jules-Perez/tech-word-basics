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
  View,
} from "react-native";
import { NavigationProps } from "./_layout";
import { IUser, useApi } from "@/hooks/useApi";
import { useLoginSession } from "@/hooks/useLoginSession";

const imgPlaceholder = require("@/assets/images/user.png");
const imgEdit = require("@/assets/images/edit.png");
const windowHeight = Dimensions.get("window").height;

interface IUserListProps {
  img?: string;
  name: string;
  id: string;
  onAccept: () => void;
}
function UserList(props: IUserListProps) {
  return (
    <View style={ulStyles.container}>
      <Image style={ulStyles.img} source={imgPlaceholder} />
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
  img: { width: 45, height: 45 },
  dataContainer: { flexBasis: "35%" },
  name: { color: "white", fontWeight: "bold", fontSize: 20 },
  id: { fontSize: 12, color: "white" },
});

export default function InstructorDashboard(props: any) {
  const [LoggedUser, setLoggedUser] = useState<IUser>();
  const { navigate } = useNavigation<NavigationProps>();
  const [UnverifiedUsers, setUnverifiedUsers] = useState<IUser[]>([]);
  const [StudentCount, setStudentCount] = useState(0);

  useEffect(() => {
    console.log(props);
    useLoginSession()
      .getLoggedUser()
      .then((e) => {
        if (!e || e.user_type !== "instructor") {
          navigate("index");
        } else {
          setTimeout(() => setLoggedUser(e), 200);
        }
      });
  }, []);

  useEffect(() => {
    useApi()
      .getAllUsers()
      .then((data) => {
        const unverified = (data as IUser[]).filter((d) => !d.is_verified);
        console.log("unverified", unverified);
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

  return (
    <ThemedView style={{ overflow: "hidden" }}>
      <BottomNavigation>
        <BottomNavButton logo={"profile"} />
        <BottomNavButton logo={"leaderboard"} />
        <BottomNavButton
          logo={"statistics"}
          onPress={() => navigate("statistics")}
        />
      </BottomNavigation>
      <View style={{ ...styles.main, maxHeight: windowHeight - 100 }}>
        <View style={styles.dashboardContainer}>
          <Image style={styles.profileImg} source={imgPlaceholder} />
          <View style={styles.dashboardContent}>
            <Text style={styles.header}>Welcome Back!</Text>
            <Text style={styles.name}>{LoggedUser?.name.toUpperCase()}</Text>
            <Text style={styles.email}>{LoggedUser?.email}</Text>
          </View>
          <Image source={imgEdit}></Image>
        </View>
        <View style={styles.userStatsContainer}>
          <View
            style={{
              ...styles.statContainer,
              backgroundColor: "#6dabf6",
            }}
          >
            <Text style={styles.count}>{StudentCount}</Text>
            <Text style={styles.statLabel}>Total Student</Text>
          </View>
          <View
            style={{
              ...styles.statContainer,
              backgroundColor: "#73e45e",
            }}
          >
            <Text style={styles.count}>5</Text>
            <Text style={styles.statLabel}>Total Section</Text>
          </View>
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
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
