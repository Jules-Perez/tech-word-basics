import { LinearGradient } from "expo-linear-gradient";
import StatBox from "./StatBox";
import { Image, StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { memo, useEffect, useState } from "react";
import { IAnswerLog, IUser, useApi } from "@/hooks/useApi";
import StatboxGradient from "./StatBoxGradient";
import { gameLevels } from "@/constants/Levels";

const imgArena = [
  require("@/assets/images/arena-data-0.png"),
  require("@/assets/images/arena-data-1.png"),
  require("@/assets/images/arena-data-2.png"),
  require("@/assets/images/arena-data-3.png"),
];

interface IProp {
  user?: IUser;
}
export default memo(function StatisticsResult(props: IProp) {
  const [LevelCompleted, setLevelCompleted] = useState(0);
  const [QuestionAnswered, setQuestionAnswered] = useState(0);
  const [CorrectAnswers, setCorrectAnswers] = useState(0);
  const [IncorrectAnswers, setIncorrectAnswers] = useState(0);
  const [ArenaCorrectPercentage, setArenaCorrectPercentage] = useState<
    number[]
  >([0, 0, 0, 0]);

  useEffect(() => {
    if (!props.user?.id) return;
    useApi()
      .getUserAnswerLogs(props.user.id)
      .then((res) => {
        const answerlogs = res as IAnswerLog[];
        if (!answerlogs) {
          setLevelCompleted(0);
          setQuestionAnswered(0);
          setCorrectAnswers(0);
          setIncorrectAnswers(0);
          return;
        }
        setLevelCompleted(answerlogs.length);
        setQuestionAnswered(answerlogs.length);
        setCorrectAnswers(answerlogs.filter((ans) => ans.is_correct).length);
        setIncorrectAnswers(answerlogs.filter((ans) => !ans.is_correct).length);

        const arenaPercentage: number[] = [0, 0, 0, 0];
        answerlogs.forEach((ans) => {
          console.log(ans.is_correct);
          arenaPercentage[ans.category_id] += ans?.is_correct ? 1 : 0;
        });
        console.log("Arena Percentage", arenaPercentage);
        setArenaCorrectPercentage(arenaPercentage);
      });
  }, [props]);

  const getArenaCorrectPercentage = (arenaId: number) => {
    const val = Math.round(
      (ArenaCorrectPercentage[arenaId] / gameLevels[arenaId].length) * 100
    );
    return val < 0 ? 0 : val > 100 ? 100 : val;
  };

  return (
    <View>
      <View style={styles.statboxesContainer}>
        <View style={styles.statContainer2}>
          <StatboxGradient
            value={LevelCompleted}
            color="violet"
            label="Levels Completed"
          />
          <StatboxGradient
            value={CorrectAnswers}
            color="green"
            label="Correct Answers"
          />
        </View>
        <View style={styles.statContainer2}>
          <StatboxGradient
            value={QuestionAnswered}
            color="blue"
            label="Questions Answered"
          />
          <StatboxGradient
            value={IncorrectAnswers}
            color="red"
            label="Incorrect Answers"
          />
        </View>
      </View>
      <View style={styles.pieStatsContainer}>
        <CircularProgress
          radius={50}
          activeStrokeWidth={35}
          activeStrokeColor="#1DBF02"
          inActiveStrokeColor="#AE1032"
          inActiveStrokeWidth={35}
          value={(CorrectAnswers / QuestionAnswered) * 100}
          maxValue={100}
          showProgressValue={false}
        />
        <View style={{ marginLeft: 25 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: "#1DBF02",
                marginRight: 8,
              }}
            ></View>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Correct Answers{" - "}
              {!isNaN(Math.round((CorrectAnswers / QuestionAnswered) * 100))
                ? Math.round((CorrectAnswers / QuestionAnswered) * 100)
                : 0}
              %
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: "#AE1032",
                marginRight: 8,
              }}
            ></View>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Wrong Answers{" - "}
              {!isNaN(Math.round((IncorrectAnswers / QuestionAnswered) * 100))
                ? Math.round((IncorrectAnswers / QuestionAnswered) * 100)
                : 0}
              %
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Performance by Arena
      </Text>
      <View style={styles.graphContainer}>
        <View style={styles.graphYList}>
          <GraphY text="100%" />
          <GraphY text="80%" />
          <GraphY text="60%" />
          <GraphY text="40%" />
          <GraphY text="20%" />
          <GraphY text="0%" />
        </View>
        <View style={styles.graphXList}>
          <GraphData
            percentage={getArenaCorrectPercentage(0)}
            text="Hardware Haven"
          />
          <GraphData
            percentage={getArenaCorrectPercentage(1)}
            text="Software Sanctuary"
          />
          <GraphData
            percentage={getArenaCorrectPercentage(2)}
            text="Network Nexus"
          />
          <GraphData
            percentage={getArenaCorrectPercentage(3)}
            text="Cybersecurity Citadel"
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <GameArenaPercentageView
          categoryId={0}
          text="Hardware Haven"
          percentage={getArenaCorrectPercentage(0)}
        />
        <GameArenaPercentageView
          categoryId={1}
          text="Software Sanctuary"
          percentage={getArenaCorrectPercentage(1)}
        />
        <GameArenaPercentageView
          categoryId={2}
          text="Network Nexus"
          percentage={getArenaCorrectPercentage(2)}
        />
        <GameArenaPercentageView
          categoryId={3}
          text="Cybersecurity Citadel"
          percentage={getArenaCorrectPercentage(3)}
        />
      </View>
    </View>
  );
});

export function GameArenaPercentageView(props: {
  categoryId: number;
  text: string;
  percentage?: number;
}) {
  return (
    <View style={styles.arenaPercentageViewStyle}>
      <Image
        source={imgArena[props.categoryId]}
        style={{ width: 50, height: 50 }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 18,
          flexBasis: "50%",
        }}
      >
        {props.text}
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 18,
          flexBasis: "30%",
          textAlign: "center",
        }}
      >
        {props.percentage}%
      </Text>
    </View>
  );
}

export function GraphY(props: { text: string }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 10,
      }}
    >
      <Text style={styles.graphYListText}>{props.text}</Text>
      <View style={styles.graphYListLine}></View>
    </View>
  );
}

export function GraphData(props: { text: string; percentage?: number }) {
  const maxHeight = 220;

  const getHeight = (percentage: number) => {
    return (
      2 + Math.round(((percentage > 100 ? 100 : percentage) / 100) * maxHeight)
    );
  };

  const getTop = (percentage: number) => {
    return -8 - getHeight(percentage);
  };

  return (
    <View
      style={{
        flexBasis: "20%",
      }}
    >
      <Text style={styles.graphXListText}>{props.text}</Text>
      <View
        style={[
          styles.graphXDataBox,
          {
            top: getTop(props.percentage ?? 0),
            height: getHeight(props.percentage ?? 0),
          },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchboxContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  statboxesContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
  },
  statContainer2: {
    flex: 1,
  },
  statbox2: {
    margin: 8,
    borderRadius: 20,
    padding: 15,
    height: 95,
    alignItems: "baseline",
  },
  pieStatsContainer: {
    marginHorizontal: 25,
    backgroundColor: "#00000050",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  graphContainer: {
    flex: 1,
    marginHorizontal: 25,
    backgroundColor: "#00000050",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  graphYList: { width: "100%", marginBottom: -23 },
  graphYListText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "right",
  },
  graphYListLine: {
    backgroundColor: "white",
    flexBasis: "88%",
    top: -10,
    height: 2,
    marginRight: 10,
    opacity: 0.5,
  },
  graphXList: { flex: 1, flexDirection: "row", marginLeft: "11%", gap: 18 },
  graphXListText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 25,
  },
  graphXDataBox: {
    backgroundColor: "#0FBB00",
    width: "100%",
    height: 2,
    borderRadius: 5,
    opacity: 1,
    top: -10,
    position: "absolute",
  },
  arenaPercentageViewStyle: {
    backgroundColor: "#00000050",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginHorizontal: 25,
    marginVertical: 10,
  },
});
