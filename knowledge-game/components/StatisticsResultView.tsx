import { ProfileImages } from "@/constants/ProfileImages";
import { IUser } from "@/hooks/useApi";
import { Image, StyleSheet, Text, View } from "react-native";

const imgPlaceholder = require("@/assets/images/user.png");
const coinImg = require("@/assets/images/coin.png");
const powerImg = require("@/assets/images/power.png");

interface IProps {
  user?: IUser;
}
export function StatisticsResultProfile({ user }: IProps) {
  return (
    <View style={SRPStyles.main}>
      <View style={SRPStyles.profileContainer}>
        <Image
          style={SRPStyles.img}
          source={
            user?.user_img_index
              ? ProfileImages[user?.user_img_index]
              : imgPlaceholder
          }
        />
        <Text style={SRPStyles.name}>{user?.name ?? "Student Name"}</Text>
        <Text style={SRPStyles.id}>{user?.user_id ?? "Student ID"}</Text>
      </View>
      <View style={SRPStyles.mainStatsContainer}>
        <View style={SRPStyles.statsContainer}>
          <Text style={SRPStyles.statLabel}>Rank</Text>
          <Image style={SRPStyles.icons} />
          <Text style={SRPStyles.statVal}>{user?.rank ?? 0}</Text>
        </View>
        <View style={{ borderWidth: 1, borderColor: "white" }} />
        <View style={SRPStyles.statsContainer}>
          <Text style={SRPStyles.statLabel}>Byte Coins</Text>
          <Image style={SRPStyles.icons} source={coinImg} />
          <Text style={SRPStyles.statVal}>{user?.byte_coins ?? 0}</Text>
        </View>
        <View style={{ borderWidth: 1, borderColor: "white" }} />
        <View style={SRPStyles.statsContainer}>
          <Text style={SRPStyles.statLabel}>Byte Power</Text>
          <Image style={SRPStyles.icons} source={powerImg} />
          <Text style={SRPStyles.statVal}>{user?.byte_power ?? 0}</Text>
        </View>
      </View>
    </View>
  );
}

const SRPStyles = StyleSheet.create({
  main: {
    backgroundColor: "#00000025",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
  profileContainer: { flexBasis: "35%" },
  img: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
  },
  name: { fontWeight: "bold", color: "white" },
  id: { color: "white" },
  mainStatsContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  statLabel: { color: "white", fontWeight: "bold", flexBasis: "65%" },
  statVal: { color: "white", flexBasis: "45%", textAlign: "left" },
  icons: { width: 25, height: 25 },
});

export default function StatisticsResultView() {
  return <View></View>;
}

const styles = StyleSheet.create({});
