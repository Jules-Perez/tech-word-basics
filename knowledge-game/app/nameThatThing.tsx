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
import { BaseModal } from "@/components/BaseModal";
import LevelCompleteModal, {
  ILevelCompleteProps,
} from "@/components/LevelCompleteModal";
import { PowerupButton } from "@/components/PowerupButton";
import { ThemedButton } from "@/components/ThemedButton";

const icons = {
  map: require("@/assets/images/map.png"),
  refresh: require("@/assets/images/refresh.png"),
  check: require("@/assets/images/check.png"),
  lightbulb: require("@/assets/images/lightbulb.png"),
};

enum PowerupsEnums {
  SKIP = "Skip",
  REVEAL = "Reveal Answer",
  HINT = "Hint",
}

interface IPowerupUseModalProps {
  visible?: boolean;
  currentCoins?: number;
  powerupUse?: PowerupsEnums;
  powerupCost?: number;
  canAfford?: boolean;
  onPurchase: (powerup?: PowerupsEnums, cost?: number) => void;
  onClose?: () => void;
}

function PowerupUseModal(props: IPowerupUseModalProps) {
  return (
    <BaseModal visible={props.visible} onClose={props.onClose}>
      <View
        style={{
          backgroundColor: "#FCDEC7",
          width: "65%",
          top: 100,
          borderRadius: 25,
          position: "absolute",
          padding: 15,
        }}
      >
        <Text
          style={{
            color: "#564849",
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          You have
          <Image
            style={{ width: 35, height: 35, marginBottom: -5 }}
            source={require("@/assets/images/coin.png")}
          />
          {props.currentCoins ?? 0}
        </Text>
        {props.canAfford ? (
          <Text
            style={{
              color: "#564849",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Use {props.powerupUse?.toString() ?? "Powerup name"} (
            <Image
              style={{ width: 25, height: 25, marginBottom: -5 }}
              source={require("@/assets/images/coin.png")}
            />
            {props.powerupCost ?? 0} )?
          </Text>
        ) : (
          <Text
            style={{
              color: "#564849",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Insufficient Coins. <br></br>
            {props.powerupUse ?? "Powerup name"} (
            <Image
              style={{ width: 25, height: 25, marginBottom: -5 }}
              source={require("@/assets/images/coin.png")}
            />
            {props.powerupCost ?? 0} )
          </Text>
        )}
        {props.canAfford ? (
          <ThemedButton
            onPress={() =>
              props.onPurchase(props?.powerupUse, props.powerupCost)
            }
          >
            USE
          </ThemedButton>
        ) : (
          <ThemedButton onPress={props.onClose}>Back</ThemedButton>
        )}
      </View>
    </BaseModal>
  );
}

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
  const [Score, setScore] = useState(0);
  const [IsLevelComplete, setIsLevelComplete] = useState(false);
  const [IsUserRewarded, setIsUserRewarded] = useState(false);
  const [ShowPowerupModal, setShowPowerupModal] = useState(false);
  const [SelectedPowerup, setSelectedPowerup] =
    useState<IPowerupUseModalProps>();
  const [HintUsed, setHintUsed] = useState(false);
  const [RevealUsed, setRevealUsed] = useState(false);

  useEffect(() => {
    setLevel(parseInt(params?.level_id) ?? -1);
    useLoginSession()
      .getLoggedUser()
      .then((e) => {
        if (!e || e.user_type !== "student") {
          navigate("index");
        } else {
          useApi()
            .getUser(e.user_id)
            .then((data) => {
              if (!data) {
                navigate("index");
                return;
              }
              setTimeout(() => {
                setTimerStart(true);
                setLoggedUser(data);
                setScore(data.byte_power ?? 0);
                setCategory(params?.category_id ?? -1);
              }, 200);
            })
            .catch((e) => {
              navigate("index");
            });
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
    setHintUsed(false);
    setRevealUsed(false);
    clearInterval(intervalRef.current);
    const dateNow = new Date();
    const duration = dateNow.getSeconds() - StartDate.getSeconds();
    const newScore = Score + calcScore(duration, isCorrect ?? false);
    let answerLog = {
      user_id: LoggedUser?.id ?? -1,
      category_id: currCategory,
      level_id: currLevel,
      is_correct: isCorrect,
      duration_seconds: duration,
    };
    useApi()
      .answer(answerLog, newScore)
      .then(() => {});
    setTimeout(() => {
      setShowInfo(true);
      setScore(newScore);
    }, 2000);
  }

  const calcScore = (duration: number, isCorrect: boolean) => {
    let score = 30 - duration;
    return score + (isCorrect ? 10 : -50);
  };

  useEffect(() => {
    if (!LoggedUser || Category == -1) return;
    const randomChoices = gameLevels[Category].map((data) => {
      data.choices = shuffleArray(data.choices);
      return data;
    });
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
          reveal={RevealUsed}
        >
          {c.name}
        </ChoiceBox>
      ));
    },
    [Selected, LoggedUser, RevealUsed]
  );

  const handleInfoContinue = (levelIncrement: number) => {
    setLevel(levelIncrement);
    setTimerSeconds(0);
    setShowInfo(false);
    setSelected(-1);
    setStartDate(new Date());
    if (levelIncrement >= LevelData.length) {
      setIsLevelComplete(true);
    } else {
      setTimerStart(true);
    }
  };

  // Powerups
  function handlePowerupSelect(
    powerupSelected: PowerupsEnums,
    powerupCost: number
  ) {
    useApi()
      .getUserTransaction(LoggedUser?.id ?? -1)
      .then((res) => {
        const { byte_coins } = { ...res };
        setSelectedPowerup({
          currentCoins: byte_coins,
          powerupUse: powerupSelected,
          powerupCost: powerupCost,
          canAfford: byte_coins >= powerupCost,
          onPurchase: () => {},
        });
        setShowPowerupModal(true);
      });
  }
  function useSkip(cost: number) {
    let answerLog = {
      user_id: LoggedUser?.id ?? -1,
      category_id: Category,
      level_id: Level,
      duration_seconds: 0,
      is_skipped: true,
    };
    useApi()
      .purchase(LoggedUser?.id ?? -1, cost)
      .then(() => {
        useApi()
          .answer(answerLog, Score)
          .then(() => {
            setTimeout(() => {
              handleInfoContinue(Level + 1);
            }, 200);
          });
      });
  }
  function useHint(cost: number) {
    useApi()
      .purchase(LoggedUser?.id ?? -1, cost)
      .then(() => {
        setHintUsed(true);
        setShowInfo(true);
      });
  }
  function useReveal(cost: number) {
    useApi()
      .purchase(LoggedUser?.id ?? -1, cost)
      .then(() => {
        setRevealUsed(true);
      });
  }

  const [ResultsData, setResultsData] = useState<ILevelCompleteProps>({});

  const getResultsData = useMemo(() => {
    let results: ILevelCompleteProps = {};
    const FAST_ANSWER_DUR = 15;
    const FAST_ANSWER_REWARD = 25;
    const ANSWER_REWARD = 15;
    results.coinsReward = 500;
    useApi()
      .getUserAnswerLogsByCategory(LoggedUser?.id ?? -1, Category)
      .then((e) => {
        const res = e as IAnswerLog[];
        results.rightAnswersCount = res.filter((r) => r.is_correct).length;
        results.rightAnswersMaxCount = res.length;
        results.fastAnswersCount = res.filter((r) => {
          return r.is_correct && r.duration_seconds <= FAST_ANSWER_DUR;
        }).length;
        results.bytePowerReward =
          results.fastAnswersCount * FAST_ANSWER_REWARD +
          (results.rightAnswersCount - results.fastAnswersCount) *
            ANSWER_REWARD;
        useApi()
          .getUserRewardLogs(LoggedUser?.id ?? -1, Category)
          .then((e) => {
            if (e == null || e == "") {
              useApi()
                .rewardUser(
                  LoggedUser?.id ?? -1,
                  results.bytePowerReward,
                  results.coinsReward,
                  Category
                )
                .then(() => {
                  setResultsData(results);
                });
            } else {
              setResultsData(results);
              setIsUserRewarded(true);
            }
          });
      });
  }, [IsLevelComplete]);

  return (
    <View style={{ flex: 1 }}>
      <PowerupUseModal
        {...SelectedPowerup}
        visible={ShowPowerupModal}
        onClose={() => setShowPowerupModal(false)}
        onPurchase={(powerupUsed?: PowerupsEnums, cost: number = 0) => {
          if (!powerupUsed) return;
          setShowPowerupModal(false);
          switch (powerupUsed) {
            case PowerupsEnums.SKIP:
              useSkip(cost);
              break;
            case PowerupsEnums.HINT:
              useHint(cost);
              break;
            case PowerupsEnums.REVEAL:
              useReveal(cost);
              break;
          }
        }}
      />
      <LevelCompleteModal
        visible={IsLevelComplete}
        {...ResultsData}
        isUserAlreadyRewarded={IsUserRewarded}
        onComplete={() => {
          navigate("studentDashboard");
        }}
      />
      <InformationModal
        isCorrect={IsUserCorrect}
        isVisible={ShowInfo}
        isHint={HintUsed}
        text={LevelData[Level]?.description}
        answer={LevelData[Level]?.choices.find((c) => c.isCorrect)?.name}
        onContinue={() => {
          HintUsed ? setShowInfo(false) : handleInfoContinue(Level + 1);
        }}
      />
      <TopPanel
        energy={Score}
        timeSeconds={TimerSeconds}
        imgIndex={LoggedUser?.user_img_index}
      />
      <ThemedView>
        <View style={styles.main}>
          {Level >= LevelData.length ? (
            <View></View>
          ) : (
            <View>
              <View style={styles.imgContainer}>
                <View>{renderLevelImage(LevelData[Level])}</View>
              </View>
              <ChoiceContainer>
                {renderChoices(LevelData[Level], Category, Level)}
              </ChoiceContainer>
            </View>
          )}
        </View>
      </ThemedView>
      <PowerupsContainer>
        <PowerupButton
          onPress={() => {
            navigate("levelSelect", { category_id: Category });
          }}
          icon={icons.map}
        ></PowerupButton>
        <PowerupButton
          onPress={() => handlePowerupSelect(PowerupsEnums.SKIP, 50)}
          icon={icons.refresh}
          value={50}
        ></PowerupButton>
        <PowerupButton
          onPress={() => {
            !RevealUsed ? handlePowerupSelect(PowerupsEnums.REVEAL, 100) : null;
          }}
          icon={icons.check}
          value={100}
        ></PowerupButton>
        <PowerupButton
          onPress={() => {
            !HintUsed
              ? handlePowerupSelect(PowerupsEnums.HINT, 80)
              : setShowInfo(true);
          }}
          icon={icons.lightbulb}
          value={80}
        ></PowerupButton>
      </PowerupsContainer>
    </View>
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
