import {
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  type ViewProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  replaceBgImage?: ImageSourcePropType;
  bgStyles?: StyleProp<ViewStyle>;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  replaceBgImage,
  bgStyles,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <ImageBackground
      source={replaceBgImage ?? require("@/assets/images/background.png")}
      resizeMode="cover"
      style={[styles.image, bgStyles]}
    >
      <ScrollView style={[style]} {...otherProps} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    fontFamily: "Tahoma",
  },
});
