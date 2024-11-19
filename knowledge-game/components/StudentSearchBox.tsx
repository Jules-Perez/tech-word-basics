import { Image, StyleSheet, Text, View } from "react-native";
import ThemedInput from "./ThemedInput";
import ThemedInputWithButton from "./ThemedInputWithButton";
import { useState } from "react";
import { IUser, useApi } from "@/hooks/useApi";

const logo = require("@/assets/images/logo.png");

interface IProps {
  onTextChange: (text: string) => void;
  onSubmit: () => void;
}

export default function StudentSearchBox({ onTextChange, onSubmit }: IProps) {
  return (
    <View>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.main}>
        <Text style={styles.label}>Enter Student No:</Text>
        <ThemedInputWithButton
          onTextChange={onTextChange}
          onSubmit={onSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
  },
  logo: {
    width: 90,
    height: 90,
  },
  label: { color: "#564849", fontWeight: "bold", marginBottom: 10 },
  main: {
    backgroundColor: "#FCDEC7",
    borderRadius: 25,
    padding: 20,
    paddingTop: 60,
    marginTop: 25,
  },
});
