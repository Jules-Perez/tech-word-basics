import { Image, Text, View } from "react-native";
import { BaseModal } from "./BaseModal";
import { ThemedButton } from "./ThemedButton";
import { useEffect, useMemo, useState } from "react";
import { navigate } from "expo-router/build/global-state/routing";
import { useNavigation } from "expo-router";

const redBanner = require("@/assets/images/bannerRed.png");
const stars = require("@/assets/images/stars.png");
const coins = require("@/assets/images/coins.png");
const fullBodyMascot = require("@/assets/images/fullBodyMascot.png");

interface rewardProps {
  coinsReward?: number;
  visible?: boolean;
  onContinue?: () => void;
}

function RewardScreen(props: rewardProps) {
  return (
    <View
      style={{ display: props.visible ? "flex" : "none", alignItems: "center" }}
    >
      <Text
        style={{
          marginTop: 50,
          color: "white",
          fontWeight: "bold",
          fontSize: 25,
        }}
      >
        COMPLETED!
      </Text>
      <Image source={stars} />
      <Image style={{ marginTop: -155, marginBottom: -90 }} source={coins} />
      <Text
        style={{
          marginBottom: 20,
          color: "white",
          fontWeight: "bold",
          fontSize: 25,
        }}
      >
        Coins x{props.coinsReward ?? 0}
      </Text>
      <ThemedButton onPress={props.onContinue}>Claim Reward</ThemedButton>
    </View>
  );
}

interface EvalProps {
  rightAnswersCount?: number;
  rightAnswersMaxCount?: number;
  fastAnswersCount?: number;
  bytePowerReward?: number;
  visible?: boolean;
  onComplete?: () => void;
}

function EvaluationScreen(props: EvalProps) {
  const passed = useMemo(() => {
    return (
      (props?.rightAnswersCount ?? 0) >
      Math.floor((props?.rightAnswersMaxCount ?? 0) * 0.75)
    );
  }, [props.rightAnswersCount]);

  return (
    <View style={{ display: props.visible ? "flex" : "none" }}>
      <View
        style={{
          backgroundColor: "#FCDEC7",
          borderRadius: 35,
          top: 100,
          borderBottomColor: "grey",
          borderBottomWidth: 10,
          paddingTop: 30,
          paddingRight: 50,
          flexDirection: "row",
        }}
      >
        <Image source={fullBodyMascot}></Image>
        <View style={{ marginTop: 75, marginLeft: -25 }}>
          <Text
            style={{
              color: passed ? "#22590A" : "#EB7800",
              fontWeight: "bold",
              fontSize: 26,
              textShadowColor: "white",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 4,
            }}
          >
            {passed ? "BYTE-TASTIC" : "TRY AGAIN"}
          </Text>
          <View
            style={{
              marginLeft: 5,
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 16,
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#605251",
                  marginVertical: 15,
                }}
              >
                Right Answer
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#605251",
                  marginVertical: 15,
                }}
              >
                Fast Answer
              </Text>
            </View>
            <View style={{ alignContent: "flex-end", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#605251",
                  marginVertical: 15,
                }}
              >
                {props.rightAnswersCount ?? 0}/{props.rightAnswersMaxCount ?? 0}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#605251",
                  marginVertical: 15,
                }}
              >
                {props.fastAnswersCount ?? 0}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "#22590A",
              borderRadius: 25,
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
              {props.bytePowerReward ?? 0}
            </Text>
          </View>
        </View>
      </View>
      <ThemedButton onPress={props.onComplete} style={{ top: 135 }}>
        Continue
      </ThemedButton>
      {passed ? (
        <Image
          source={stars}
          style={{
            position: "absolute",
            top: 10,
            alignSelf: "center",
            marginRight: 10,
          }}
        ></Image>
      ) : null}
    </View>
  );
}

export interface ILevelCompleteProps {
  rightAnswersCount?: number;
  rightAnswersMaxCount?: number;
  fastAnswersCount?: number;
  bytePowerReward?: number;
  coinsReward?: number;
  isUserAlreadyRewarded?: boolean;
  visible?: boolean;
  onComplete?: () => void;
  onClaim?: () => void;
}
export default function LevelCompleteModal(props: ILevelCompleteProps) {
  const [ShowEvaluation, setShowEvaluation] = useState(false);

  useEffect(() => {
    if (props.isUserAlreadyRewarded) {
      setShowEvaluation(true);
    }
  }, [props]);

  return (
    <BaseModal visible={props.visible}>
      <View style={{ alignItems: "center", paddingHorizontal: 50, zIndex: 10 }}>
        <Image style={{ position: "absolute" }} source={redBanner} />
        <Text
          style={{
            marginTop: 78,
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
            textShadowOffset: { width: 0, height: 3 },
            textShadowColor: "black",
            textShadowRadius: 4,
          }}
        >
          Level 1
        </Text>
        <RewardScreen
          {...props}
          visible={!ShowEvaluation}
          onContinue={() => setShowEvaluation(true)}
        />
        <EvaluationScreen {...props} visible={ShowEvaluation} />
      </View>
    </BaseModal>
  );
}
