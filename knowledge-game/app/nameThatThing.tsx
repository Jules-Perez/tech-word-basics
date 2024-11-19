import { ChoiceBox } from "@/components/ChoiceBox";
import { ChoiceContainer } from "@/components/ChoicesContainer";
import InformationModal from "@/components/InformationModal";
import { PowerupsContainer } from "@/components/PowerupsContainer";
import { ThemedView } from "@/components/ThemedView";
import { TopPanel } from "@/components/TopPanel";
import { gameLevels, INameThatThingLevel } from "@/constants/Levels";
import { IAnswerLog, IUser, useApi } from "@/hooks/useApi";
import { useLoginSession } from "@/hooks/useLoginSession";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { NavigationProps } from "./_layout";

const levelImages = [
  require(`@/assets/images/ntt-${0}.png`),
  require(`@/assets/images/ntt-${1}.png`),
  require(`@/assets/images/ntt-${2}.png`),
];

export default function NameThatThing() {
  const { navigate } = useNavigation<NavigationProps>();
  // @ts-ignore
  const params = useLocalSearchParams<{ category_id: number; level_id }>();
  const [LoggedUser, setLoggedUser] = useState<IUser>();
  const intervalRef = useRef<NodeJS.Timeout>(); // Add a ref to store the interval id
  const [TimerStart, setTimerStart] = useState(false);
  const [TimerSeconds, setTimerSeconds] = useState(0);
  const [Category, setCategory] = useState(-1);
  const [Level, setLevel] = useState<number>(-1);
  const [Selected, setSelected] = useState(-1);
  const [LevelData, setLevelData] = useState<INameThatThingLevel[]>([]);
  const [ShowInfo, setShowInfo] = useState(false);
  const [IsUserCorrect, setIsUserCorrect] = useState<boolean | undefined>(
    false
  );
  const [StartDate, setStartDate] = useState<Date>(new Date());

  useEffect(() => {
    setLevel(parseInt(params?.level_id) ?? -1);
    useLoginSession()
      .getLoggedUser()
      .then((e) => {
        if (!e || e.user_type !== "student") {
          navigate("index");
        } else {
          setTimeout(() => {
            setTimerStart(true);
            setLoggedUser(e);
            setCategory(params?.category_id ?? -1);
          }, 200);
        }
      });
  }, []);

  // Add a listener to `timeLeft`
  useEffect(() => {
    if (!TimerStart) return;
    intervalRef.current = setInterval(() => {
      setTimerSeconds((t) => t + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [TimerStart]);

  //TODO: Testing
  const [Score, setScore] = useState(0);

  const hoverAnimation = useSharedValue(0);

  hoverAnimation.value = withRepeat(
    withSequence(
      withTiming(-10, { duration: 1000 }),
      withTiming(0, { duration: 1000 })
    ),
    0
  );

  function handleSelect(
    selection: number,
    currCategory: number,
    currLevel: number,
    isCorrect?: boolean
  ) {
    setSelected(selection);
    setIsUserCorrect(isCorrect);
    setTimerStart(false);
    clearInterval(intervalRef.current);
    const dateNow = new Date();
    const duration = dateNow.getSeconds() - StartDate.getSeconds();
    let answerLog = {
      user_id: LoggedUser?.id ?? -1,
      category_id: currCategory,
      level_id: currLevel,
      is_correct: isCorrect,
      duration_seconds: duration,
    };
    useApi()
      .answer(answerLog)
      .then(() => {});
    setTimeout(() => {
      setShowInfo(true);
      if (isCorrect) {
        setScore(Score + 100);
      } else {
        setScore(Score - 100 > 0 ? Score : 0);
      }
    }, 2000);
  }

  useEffect(() => {
    if (!LoggedUser || Category == -1) return;
    const randomChoices = gameLevels[Category].map((data) => {
      data.choices = shuffleArray(data.choices);
      return data;
    });
    console.log(randomChoices);
    setLevelData(randomChoices);
  }, [LoggedUser, Category]);

  const renderLevelImage = useCallback((level: INameThatThingLevel) => {
    return <Image style={styles.img} source={level?.levelImg}></Image>;
  }, []);

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const renderChoices = useCallback(
    (level: INameThatThingLevel, currCategory: number, currLevel: number) => {
      return level?.choices.map((c, i) => (
        <ChoiceBox
          key={i}
          onTouchStartHandler={() =>
            handleSelect(i, currCategory, currLevel, c?.isCorrect)
          }
          selected={Selected == i}
          isCorrect={c?.isCorrect}
        >
          {c.name}
        </ChoiceBox>
      ));
    },
    [Selected, LoggedUser]
  );

  const handleInfoContinue = (levelIncrement: number) => {
    console.log("levelIncrement", levelIncrement);
    setLevel(levelIncrement);
    setTimerStart(true);
    setTimerSeconds(0);
    setShowInfo(false);
    setSelected(-1);
    setStartDate(new Date());
  };

  return (
    <>
      <InformationModal
        isCorrect={IsUserCorrect}
        isVisible={ShowInfo}
        text={LevelData[Level]?.description}
        answer={LevelData[Level]?.choices.find((c) => c.isCorrect)?.name}
        onContinue={() => handleInfoContinue(Level + 1)}
      />
      <TopPanel energy={Score} timeSeconds={TimerSeconds} />
      <ThemedView>
        <View style={styles.main}>
          {Level >= LevelData.length ? (
            <View>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 30 }}
              >
                Congratulations! You have finished this stage.
              </Text>
              <Link
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 30,
                  textDecorationLine: "underline",
                }}
                href={"/studentDashboard"}
              >
                Go back to level select.
              </Link>
            </View>
          ) : (
            <>
              <View style={styles.imgContainer}>
                <View>{renderLevelImage(LevelData[Level])}</View>
              </View>
              <ChoiceContainer>
                {renderChoices(LevelData[Level], Category, Level)}
              </ChoiceContainer>
            </>
          )}
        </View>
      </ThemedView>
      <PowerupsContainer />
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 100,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
  },
  imgContainer: {
    alignItems: "center",
  },
  img: {
    margin: 15,
    width: 220,
    height: 220,
  },
});
