import { ThemedView } from "@/components/ThemedView";
import { gameLevels } from "@/constants/Levels";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { NavigationProps } from "./_layout";
import { useLoginSession } from "@/hooks/useLoginSession";
import { IAnswerLog, IUser, useApi } from "@/hooks/useApi";

const trail1 = require(`@/assets/images/trail1_active.png`);
const trail1_inactive = require(`@/assets/images/trail1_inactive.png`);
const trail2 = require(`@/assets/images/trail2_active.png`);
const trail2_inactive = require(`@/assets/images/trail2_inactive.png`);
const lockIcon = require("@/assets/images/lock.png");

const BG = require(`@/assets/images/levelSelectBg.jpg`);

export default function LevelSelect() {
  const { navigate } = useNavigation<NavigationProps>();
  const scroll = useRef<ScrollView>();
  const [Category, setCategory] = useState(-1);
  // @ts-ignore
  const params = useLocalSearchParams<{ category_id: number }>();
  const [LoggedUser, setLoggedUser] = useState<IUser>();
  const [AnswerLogs, setAnswerLogs] = useState<IAnswerLog[]>([]);

  useEffect(() => {
    useLoginSession()
      .getLoggedUser()
      .then((e) => {
        if (!e || e.user_type !== "student") {
          navigate("index");
        } else {
          setCategory(params?.category_id);
          setTimeout(() => setLoggedUser(e), 200);
        }
      });
  }, []);

  useEffect(() => {
    if (!LoggedUser) return;
    useApi()
      .getUserAnswerLogsByCategory(LoggedUser.id, Category)
      .then((answerLogs) => {
        console.log("answerLogs", answerLogs);
        if (!answerLogs) return;
        setAnswerLogs(answerLogs as IAnswerLog[]);
      });
  }, [LoggedUser]);

  useEffect(() => {
    const backAction = () => {
      navigate("studentDashboard");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleRenderLevels = (category_id: number) => {
    const categoryLevels = gameLevels[category_id];
    if (!categoryLevels || categoryLevels.length <= 0) return;
    return (
      <View style={{ alignItems: "center", paddingBottom: 120 }}>
        {categoryLevels.map((c, i) => {
          const isLeft = i % 2 == 1;
          const isLocked = categoryLevels.length - i > AnswerLogs?.length + 1;
          const isTrailActive = categoryLevels.length - i > AnswerLogs?.length;

          //last element
          if (i == 0) {
            return (
              <View
                key={i}
                style={[
                  isLeft ? styles.levelContainer1 : styles.levelContainer2,
                ]}
              >
                <View
                  style={
                    isLeft
                      ? styles.levelBtnContainer1
                      : styles.levelBtnContainer2
                  }
                >
                  {isLocked ? (
                    <Image
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        left: 17,
                        top: 50,
                      }}
                      source={lockIcon}
                    />
                  ) : (
                    <></>
                  )}
                  <TouchableOpacity
                    style={[styles.levelBtn, { opacity: isLocked ? 0.5 : 1 }]}
                    disabled={isLocked}
                    onPress={() =>
                      navigate("nameThatThing", {
                        category_id,
                        level_id: categoryLevels.length - i - 1,
                      })
                    }
                  >
                    <Text
                      style={{
                        color: "#0F8817",
                        fontWeight: "bold",
                        fontSize: 26,
                      }}
                    >
                      {categoryLevels.length - i}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
          return (
            <View
              key={i}
              style={isLeft ? styles.levelContainer1 : styles.levelContainer2}
            >
              <View
                style={isLeft ? styles.trail1Container : styles.trail2Container}
              >
                <Image
                  style={isLeft ? styles.trail1 : styles.trail2}
                  source={
                    isLeft
                      ? !isTrailActive
                        ? trail1
                        : trail1_inactive
                      : !isTrailActive
                      ? trail2
                      : trail2_inactive
                  }
                />
              </View>
              <View
                style={
                  isLeft ? styles.levelBtnContainer1 : styles.levelBtnContainer2
                }
              >
                {isLocked ? (
                  <Image
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      left: 17,
                      top: 50,
                    }}
                    source={lockIcon}
                  />
                ) : (
                  <></>
                )}
                <TouchableOpacity
                  style={[styles.levelBtn, { opacity: isLocked ? 0.5 : 1 }]}
                  disabled={isLocked}
                  onPress={() =>
                    navigate("nameThatThing", {
                      category_id,
                      level_id: categoryLevels.length - i - 1,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "#0F8817",
                      fontWeight: "bold",
                      fontSize: 26,
                    }}
                  >
                    {categoryLevels.length - i}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      scroll.current?.scrollToEnd({ animated: false });
    }, 200);
  }, [Category]);

  return (
    <ThemedView replaceBgImage={BG}>
      <View
        style={{
          backgroundColor: "#0C2228",
          position: "absolute",
          width: "100%",
          height: useWindowDimensions().height,
          opacity: 0.8,
        }}
      ></View>
      <ScrollView
        // @ts-ignore
        ref={scroll}
        style={{
          marginTop: -120,
          maxHeight: useWindowDimensions().height + 120,
        }}
      >
        {handleRenderLevels(Category)}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  levelBtn: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: "#FFFFFF",
    borderColor: "#0F8817",
    borderWidth: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    alignItems: "center",
  },
  levelContainer1: {
    width: 350,
    top: 160,
    height: 180,
  },
  levelBtnContainer1: {},
  levelContainer2: {
    width: 450,
    top: 165,
    height: 180,
  },
  levelBtnContainer2: {
    right: -330,
  },
  img: {
    margin: 15,
    width: 220,
    height: 220,
  },
  container: {
    width: "100%",
    height: 75,
    borderRadius: 12,
    backgroundColor: "blue",
  },
  trail1Container: {
    left: 85,
    top: -130,
  },
  trail2Container: {
    left: 110,
    top: -150,
  },
  trail1: {
    width: 190,
    height: 155,
    position: "absolute",
    marginBottom: -190,
  },
  trail2: {
    width: 225,
    height: 185,
    marginBottom: -215,
    position: "absolute",
  },
});
