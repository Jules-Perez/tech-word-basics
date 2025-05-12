import BottomNavigation, {
  BottomNavButton,
} from "@/components/BottomNavigation";
import StatBox from "@/components/StatBox";
import StatboxGradient from "@/components/StatBoxGradient";
import StatisticsResult from "@/components/StatisticsResult";
import StatisticsResultView, {
  StatisticsResultProfile,
} from "@/components/StatisticsResultView";
import StudentSearchBox from "@/components/StudentSearchBox";
import { ThemedView } from "@/components/ThemedView";
import { IUser, useApi } from "@/hooks/useApi";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { NavigationProps } from "./_layout";

export default function statistics() {
  const { navigate } = useNavigation<NavigationProps>();
  const [SearchValue, setSearchValue] = useState("");
  const [SearchResult, setSearchResult] = useState<IUser>();

  const handleOnSubmit = () => {
    useApi()
      .getUser(SearchValue)
      .then((res) => {
        if (!res || (res as IUser).user_type != "student") {
          alert("Student does not exist!");
          return;
        }
        setSearchResult(res);
      });
  };

  return (
    <ThemedView>
      <ScrollView style={{ height: useWindowDimensions().height }}>
        <View style={styles.searchboxContainer}>
          <StudentSearchBox
            onSubmit={handleOnSubmit}
            onTextChange={(t) => setSearchValue(t)}
          />
        </View>
        <View style={{ marginHorizontal: 25, marginBottom: 25 }}>
          <StatisticsResultProfile user={SearchResult} />
        </View>
        <StatisticsResult user={SearchResult} />
        <View style={{ marginBottom: 100 }}></View>
      </ScrollView>

      <BottomNavigation>
        <BottomNavButton
          logo={"profile"}
          onPress={() => navigate("instructorDashboard")}
        />
        <BottomNavButton logo={"leaderboard"} />
        <BottomNavButton logo={"statistics"} />
      </BottomNavigation>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchboxContainer: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
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
