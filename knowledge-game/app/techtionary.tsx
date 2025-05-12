import { ThemedView } from "@/components/ThemedView";
import { gameLevels, gameTypeEnum } from "@/constants/Levels";
import { IAnswerLog, IUser, useApi } from "@/hooks/useApi";
import { useLoginSession } from "@/hooks/useLoginSession";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import {
  ImageSourcePropType,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Image, StyleSheet } from "react-native";
import { View } from "react-native";
import { NavigationProps } from "./_layout";
import { useNavigation } from "expo-router";
import TopNav, { TopNavOptionsEnum } from "@/components/TopNav";
import { Audio } from "expo-av";

export default function Techtionary() {
  const { navigate } = useNavigation<NavigationProps>();

  const [LoggedUser, setLoggedUser] = useState<IUser>();

  //seperated by categories
  const [IncorrectLevels, setIncorrectLevels] = useState<number[][]>([
    [],
    [],
    [],
    [],
  ]);
  const [SelectedCategory, setSelectedCategory] = useState(0);

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

  useEffect(() => {
    if (!LoggedUser) return;
    useApi()
      .getUserAnswerLogs(LoggedUser.id)
      .then((res) => {
        const answerlogs = res as IAnswerLog[];
        if (!answerlogs) {
          return;
        }
        const incorrect: number[][] = [[], [], [], []];
        answerlogs.forEach((e) => {
          if (e.is_correct) return;
          incorrect[e.category_id].push(e.level_id);
        });
        incorrect.map((e) => {
          e.sort((a, b) => a - b);
        });
        setIncorrectLevels(incorrect);
      });
  }, [LoggedUser]);

  const renderData = (
    questionNumber: number,
    gameType: gameTypeEnum,
    answer: string,
    question?: string,
    description?: string,
    img?: ImageSourcePropType | undefined
  ) => {
    return (
      <View style={styles.container} key={questionNumber}>
        <Text style={styles.gameType}>
          Question {questionNumber}. ({gameType})
        </Text>
        {gameType === gameTypeEnum.TureOrFalse ? (
          <Text style={styles.gameType}>
            {question ? question : "Undefined"}
          </Text>
        ) : null}
        <View style={styles.dataContainer}>
          {img ? <Image style={styles.img} source={img}></Image> : null}
          <View style={{ flex: 1, gap: 4 }}>
            <View style={{ flexDirection: "column", gap: -4 }}>
              <Text style={{ color: "#564849" }}>Correct Answer: </Text>
              <Text
                style={{ fontWeight: "bold", color: "#564849", fontSize: 16 }}
              >
                {answer}
              </Text>
            </View>

            <Text style={{ fontSize: 16 }}>{description}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ThemedView>
      <TopNav
        options={[TopNavOptionsEnum.BACK]}
        onBack={() => navigate("studentDashboard")}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 32,
          color: "white",
          marginTop: 32,
        }}
      >
        Techtionary
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "white",
        }}
      >
        This is where you can review your mistakes
      </Text>
      <ScrollView style={styles.categoryContainer} horizontal>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(0), handleSoundPress();
          }}
          style={[
            styles.categoryBtn,
            SelectedCategory === 0
              ? {
                  borderBottomWidth: 2,
                  marginTop: 4,
                  backgroundColor: "#235E0A",
                }
              : null,
          ]}
        >
          <Image
            style={styles.categoryImg}
            source={require("@/assets/images/arena-data-0.png")}
          ></Image>
          <Text
            style={[
              styles.categoryName,
              SelectedCategory === 0 ? { color: "white" } : null,
            ]}
          >
            Hardware Haven
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(1), handleSoundPress();
          }}
          style={[
            styles.categoryBtn,
            SelectedCategory === 1
              ? {
                  borderBottomWidth: 2,
                  marginTop: 4,
                  backgroundColor: "#235E0A",
                }
              : null,
          ]}
        >
          <Image
            style={styles.categoryImg}
            source={require("@/assets/images/arena-data-1.png")}
          ></Image>
          <Text
            style={[
              styles.categoryName,
              SelectedCategory === 1 ? { color: "white" } : null,
            ]}
          >
            Software Sanctuary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(2), handleSoundPress();
          }}
          style={[
            styles.categoryBtn,
            SelectedCategory === 2
              ? {
                  borderBottomWidth: 2,
                  marginTop: 4,
                  backgroundColor: "#235E0A",
                }
              : null,
          ]}
        >
          <Image
            style={styles.categoryImg}
            source={require("@/assets/images/arena-data-2.png")}
          ></Image>
          <Text
            style={[
              styles.categoryName,
              SelectedCategory === 2 ? { color: "white" } : null,
            ]}
          >
            Network Nexus
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(3), handleSoundPress();
          }}
          style={[
            styles.categoryBtn,
            SelectedCategory === 3
              ? {
                  borderBottomWidth: 2,
                  marginTop: 4,
                  backgroundColor: "#235E0A",
                }
              : null,
          ]}
        >
          <Image
            style={styles.categoryImg}
            source={require("@/assets/images/arena-data-3.png")}
          ></Image>
          <Text
            style={[
              styles.categoryName,
              SelectedCategory === 3 ? { color: "white" } : null,
            ]}
          >
            Cybersecurity Citadel
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView
        style={{
          maxHeight: useWindowDimensions().height - 260,
        }}
      >
        {IncorrectLevels[SelectedCategory].map((e, i) => {
          const gameLevel = gameLevels[SelectedCategory][e];
          if (!gameLevel) return null;
          return renderData(
            i + 1,
            gameLevel.gameType,
            gameLevel.choices.find((c) => c.isCorrect ?? false)?.name ??
              "Undefined",
            gameLevel.question,
            gameLevel.description,
            gameLevel.levelImg
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  categoryBtn: {
    backgroundColor: "#FCDEC7",
    width: 100,
    alignContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#967358",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#564849",
    textAlign: "center",
    marginTop: 8,
  },
  categoryImg: {
    width: 55,
    height: 55,
  },
  categoryContainer: {
    flexDirection: "row",
    marginVertical: 32,
  },
  container: {
    backgroundColor: "#FCDEC7",
    color: "#564849",
    padding: 16,
    margin: 16,
    borderRadius: 16,
  },
  gameType: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#564849",
  },
  img: {
    width: 135,
    height: 125,
    borderRadius: 10,
  },
  dataContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
