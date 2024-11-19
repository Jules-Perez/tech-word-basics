import { LinearGradient } from "expo-linear-gradient";
import StatBox from "./StatBox";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { memo, useEffect, useState } from "react";
import { IAnswerLog, IUser, useApi } from "@/hooks/useApi";
import StatboxGradient from "./StatBoxGradient";

interface IProp {
  user?: IUser;
}
export default memo(function StatisticsResult(props: IProp) {
  const [LevelCompleted, setLevelCompleted] = useState(0);
  const [QuestionAnswered, setQuestionAnswered] = useState(0);
  const [CorrectAnswers, setCorrectAnswers] = useState(0);
  const [IncorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    console.log("props.user", props.user);
    if (!props.user?.id) return;
    useApi()
      .getUserAnswerLogs(props.user.id)
      .then((res) => {
        const answerlogs = res as IAnswerLog[];
        console.log("answerlogs", answerlogs);

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
      });
  }, [props]);

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
              Correct Answers {(CorrectAnswers / QuestionAnswered) * 100}%
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
              Wrong Answers {(IncorrectAnswers / QuestionAnswered) * 100}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
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
  },
});
