import { ThemedView } from "@/components/ThemedView";
import TopFrame from "@/components/TopFrame";
import { arenaEnum } from "@/constants/Enums";
import { useCallback, useEffect, useState, memo } from "react";
import {
  BackHandler,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationProps } from "./_layout";
import { useNavigation } from "expo-router";
import { useLoginSession } from "@/hooks/useLoginSession";
import { IAnswerLog, IUser, useApi } from "@/hooks/useApi";
import { gameLevels } from "@/constants/Levels";
import TopNav, { TopNavOptionsEnum } from "@/components/TopNav";
import { Audio } from "expo-av";

const hardwareHavenImg = require("@/assets/images/hardwareHaven.png");
const networkNexusImg = require("@/assets/images/networkNexus.png");
const softwareSanctuaryImg = require("@/assets/images/softwareSanctuary.png");
const cybersecurityCitadelImg = require("@/assets/images/cybersecurityCitadel.png");
const lockIcon = require("@/assets/images/lock.png");

interface INavProp {
  arena: arenaEnum;
  arenaLevel?: number;
  arenaLevelMax?: number;
  isLocked?: boolean;
  onPress?: () => void;
}

const ArenaNav = memo((props: INavProp) => {
  type design = {
    text?: string;
    img?: ImageSourcePropType;
    bgColor?: string;
    bgBtnColor?: string;
    imgWidth?: number;
    imgHeight?: number;
  };

  const getDesign = useCallback((arena: string): design => {
    let design: design = {};
    design.text = arena;
    switch (arena) {
      case arenaEnum.HARDWARE_HAVEN:
        design.img = hardwareHavenImg;
        design.bgColor = "#1943A0";
        design.bgBtnColor = "#33ADE2";
        design.imgWidth = 115;
        design.imgHeight = 128;
        break;
      case arenaEnum.NETWORK_NEXUS:
        design.img = networkNexusImg;
        design.bgColor = "#F89311";
        design.bgBtnColor = "#FFD953";
        design.imgWidth = 118;
        design.imgHeight = 132;
        break;
      case arenaEnum.SOFTWARE_SANCTUARY:
        design.img = softwareSanctuaryImg;
        design.bgColor = "#271255";
        design.bgBtnColor = "#A28AD7";
        design.imgWidth = 112;
        design.imgHeight = 125;
        break;
      case arenaEnum.CYBERSECURITY_CITADEL:
        design.img = cybersecurityCitadelImg;
        design.bgColor = "#22590A";
        design.bgBtnColor = "#86C36C";
        design.imgWidth = 130;
        design.imgHeight = 160;
        break;
    }

    return design;
  }, []);

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
  const handlePress = () => {
    if (!(global as any).soundsMuted) {
      handleSoundPress();
    }

    if (props?.onPress) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity
      disabled={props.isLocked}
      style={{ marginHorizontal: 10 }}
      onPress={handlePress}
    >
      {props.isLocked ? (
        <Image
          style={{
            position: "absolute",
            left: 45,
            top: 100,
            zIndex: 1,
            width: 50,
            height: 50,
          }}
          source={lockIcon}
        />
      ) : (
        <View></View>
      )}

      <View style={{ opacity: props.isLocked ? 0.35 : 1 }}>
        <View style={styles.navImgContainer}>
          <View style={styles.mainCountContainer}>
            <View
              style={[
                styles.countContainer,
                { backgroundColor: getDesign(props.arena).bgColor },
              ]}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  textAlign: "center",
                  color: "white",
                }}
              >
                {`${props.arenaLevel ?? 0}/${props.arenaLevelMax ?? 0}`}
              </Text>
            </View>
            <View
              style={[
                styles.countContainerArrow,
                { borderTopColor: getDesign(props.arena).bgColor },
              ]}
            ></View>
            <View style={[styles.countContainerOutline]}></View>
            <View style={[styles.countContainerArrowOutline]}></View>
          </View>

          <Image
            style={[
              styles.arenaNavImg,
              {
                width: getDesign(props.arena).imgWidth,
                height: getDesign(props.arena).imgHeight,
              },
            ]}
            source={getDesign(props.arena).img}
          />
        </View>

        <View
          style={[
            styles.arenaNavBox,
            {
              backgroundColor: getDesign(props.arena).bgColor,
              borderColor: getDesign(props.arena).bgBtnColor,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              textAlign: "center",
              color: "white",
              textShadowColor: "white",
              textShadowRadius: 2,
            }}
          >
            {props.arena.toString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function StudentDashboard() {
  const { navigate } = useNavigation<NavigationProps>();
  const [ShowTopPanel, setShowTopPanel] = useState(false);
  const [LoggedUser, setLoggedUser] = useState<IUser>();
  const [AnswerLogs, setAnswerLogs] = useState<IAnswerLog[]>();
  const [AnswerCountByCategory, setAnswerCountByCategory] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [ShowSettings, setShowSettings] = useState(false);

  const handleLevelSelect = (category_id: number) => {
    navigate("levelSelect", { category_id });
  };

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

  useEffect(() => {
    if (!LoggedUser) return;
    useApi()
      .getUserAnswerLogs(LoggedUser.id)
      .then((answerLogs) => {
        if (!answerLogs) return;
        setAnswerLogs(answerLogs as IAnswerLog[]);
        const category0Count = (answerLogs as IAnswerLog[]).filter(
          (a) => a.category_id == 0
        ).length;
        const category1Count = (answerLogs as IAnswerLog[]).filter(
          (a) => a.category_id == 1
        ).length;
        const category2Count = (answerLogs as IAnswerLog[]).filter(
          (a) => a.category_id == 2
        ).length;
        const category3Count = (answerLogs as IAnswerLog[]).filter(
          (a) => a.category_id == 3
        ).length;
        setAnswerCountByCategory([
          category0Count,
          category1Count,
          category2Count,
          category3Count,
        ]);
      });
  }, [LoggedUser]);

  const getProgressPercentage = () => {
    const totalAnswerCount = AnswerCountByCategory.reduce(
      (a, b) => (a += b),
      0
    );
    const maxLevelCount = gameLevels.reduce((a, b) => (a += b.length), 0);

    return (totalAnswerCount / maxLevelCount) * 100;
  };

  return (
    <ThemedView>
      {/* <BottomNavigation>
        <BottomNavButton img={imgProfile} />
        <BottomNavButton img={imgLeaderboard} />
        <BottomNavButton img={imgStatistics} />
      </BottomNavigation> */}
      <TopNav
        showSettingsModal={ShowSettings}
        options={[TopNavOptionsEnum.SETTINGS, TopNavOptionsEnum.COIN_STATUS]}
        coins={LoggedUser?.byte_coins}
        onSettingsOpen={() => setShowSettings(true)}
        onSettingsClose={() => setShowSettings(false)}
      />
      <View
        style={[styles.topFrameContainer, { zIndex: ShowTopPanel ? 10 : -10 }]}
      >
        <TopFrame
          dropDown={ShowTopPanel}
          onHidden={() => setShowTopPanel(false)}
          onShow={() => setShowTopPanel(true)}
          bytePower={LoggedUser?.byte_power}
          progress={getProgressPercentage()}
        />
      </View>
      <View style={styles.arenaNavContainer}>
        <View style={[styles.arenaNavGroup]}>
          <ArenaNav
            arena={arenaEnum.HARDWARE_HAVEN}
            arenaLevelMax={gameLevels[0].length}
            arenaLevel={AnswerCountByCategory[0]}
            onPress={() => handleLevelSelect(0)}
            isLocked={false}
          />
          <ArenaNav
            arena={arenaEnum.SOFTWARE_SANCTUARY}
            arenaLevelMax={gameLevels[1].length}
            arenaLevel={AnswerCountByCategory[1]}
            onPress={() => handleLevelSelect(1)}
            // enable if should unlock after completing a level
            // isLocked={
            //   !gameLevels[1]
            //     ? true
            //     : gameLevels[0].length != AnswerCountByCategory[0]
            // }
          />
        </View>
        <View style={styles.arenaNavGroup}>
          <ArenaNav
            arena={arenaEnum.NETWORK_NEXUS}
            arenaLevelMax={gameLevels[2].length}
            arenaLevel={AnswerCountByCategory[2]}
            onPress={() => handleLevelSelect(2)}
            // enable if should unlock after completing a level
            // isLocked={
            //   !gameLevels[2]
            //     ? true
            //     : gameLevels[1].length != AnswerCountByCategory[1]
            // }
          />
          <ArenaNav
            arena={arenaEnum.CYBERSECURITY_CITADEL}
            arenaLevelMax={gameLevels[3].length}
            arenaLevel={AnswerCountByCategory[3]}
            onPress={() => handleLevelSelect(3)}
            // enable if should unlock after completing a level
            // isLocked={
            //   !gameLevels[3]
            //     ? true
            //     : gameLevels[2].length != AnswerCountByCategory[2]
            // }
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topFrameContainer: {
    marginBottom: -155,
  },
  arenaNavContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  navImgContainer: {
    width: 140,
    height: 160,
    alignItems: "center",
  },
  arenaNavImg: {
    position: "absolute",
    width: 140,
    height: 160,
  },
  arenaNavImgShadow: {
    position: "absolute",
    width: 150,
    height: 170,
    zIndex: -11,
    opacity: 0.25,
    left: -5,
    top: -5,
  },
  arenaNavBox: {
    zIndex: -10,
    left: 20,
    top: -60,
    width: 100,
    height: 130,
    marginBottom: -30,
    borderBottomWidth: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: "white",
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  arenaNavGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainCountContainer: {
    position: "absolute",
    width: 50,
    right: 0,
    zIndex: 6,
    alignItems: "center",
  },
  countContainer: {
    width: 45,
    height: 40,
    position: "absolute",
    backgroundColor: "white",
    zIndex: 5,
    justifyContent: "center",
  },
  countContainerArrow: {
    zIndex: 6,
    width: 0,
    height: 0,
    top: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    borderTopWidth: 15,
    borderLeftWidth: 22.5,
    borderRightWidth: 22.5,
  },
  countContainerOutline: {
    top: -4,
    width: 51,
    height: 45,
    position: "absolute",
    backgroundColor: "white",
    zIndex: 4,
    justifyContent: "center",
  },
  countContainerArrowOutline: {
    zIndex: 4,
    width: 0,
    height: 0,
    top: 41,
    position: "absolute",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    borderTopWidth: 18,
    borderLeftWidth: 25.5,
    borderRightWidth: 25.5,
  },
});
