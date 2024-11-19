import StatBox from "@/components/StatBox";
import StatisticsResult from "@/components/StatisticsResult";
import { ThemedView } from "@/components/ThemedView";
import TopFrame from "@/components/TopFrame";
import { IUser } from "@/hooks/useApi";
import { useLoginSession } from "@/hooks/useLoginSession";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationProps } from "./_layout";

const imgPlaceholder = require("@/assets/images/user.png");

export default function StudentStatistics() {
  const [LoggedUser, setLoggedUser] = useState<IUser>();
  const { navigate } = useNavigation<NavigationProps>();
  const [ShowTopPanel, setShowTopPanel] = useState(false);

  useEffect(() => {
    useLoginSession()
      .getLoggedUser()
      .then((e) => {
        if (!e || e.user_type !== "student") {
          navigate("index");
        } else {
          setTimeout(() => setLoggedUser(e), 200);
        }
      });
  }, []);

  return (
    <ThemedView>
      <View
        style={[styles.topFrameContainer, { zIndex: ShowTopPanel ? 10 : -10 }]}
      >
        <TopFrame
          dropDown={ShowTopPanel}
          onHidden={() => setShowTopPanel(false)}
          onShow={() => setShowTopPanel(true)}
        />
      </View>
      <View style={styles.userInfoContainer}>
        <Image style={styles.userImage} source={imgPlaceholder} />
        <View>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {LoggedUser?.name}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {LoggedUser?.user_id}
          </Text>
        </View>
      </View>
      <StatisticsResult user={LoggedUser} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topFrameContainer: {
    marginBottom: -125,
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
