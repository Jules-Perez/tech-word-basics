import { ThemedButton } from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { ThemedView } from "@/components/ThemedView";
import { IUser, useApi } from "@/hooks/useApi";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationProps } from "./_layout";

const userLogo = require("@/assets/images/user.png");
const mail = require("@/assets/images/mail.png");
const google = require("@/assets/images/google.png");

export default function login() {
  const { navigate } = useNavigation<NavigationProps>();

  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPass, setLoginPass] = useState("");
  useEffect(() => {
    useAsyncStorage("loggedUser").removeItem();
  }, []);

  const handleLogin = () => {
    useApi()
      .loginUser({ email: LoginEmail, password: LoginPass })
      .then((res) => {
        if (res instanceof Object) {
          useAsyncStorage("loggedUser")
            .setItem(JSON.stringify(res))
            .then(() => {
              if ((res as IUser).user_type == "instructor") {
                navigate("instructorDashboard");
              } else {
                navigate("studentDashboard");
              }
            });
        } else if (typeof res == "string") {
          alert(res);
        } else {
          alert("error connecting to server...");
        }
      });
  };

  return (
    <ThemedView>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.loginHeader}>Login to your Account</Text>
      <Text style={styles.loginHeader2}>
        Welcome Back! Select method to Login
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.googleBtn}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Google</Text>
          <Image source={google} />
        </TouchableOpacity>
        <View style={styles.lineDivider}>
          <View style={styles.line} />
          <View style={styles.lineContent}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              or continue with email
            </Text>
          </View>
          <View style={styles.line} />
        </View>
        <View
          style={{ width: 300, height: 100, justifyContent: "space-between" }}
        >
          <ThemedInput label="Email" onChangeText={(e) => setLoginEmail(e)} />
          <ThemedInput label="Password" onChangeText={(e) => setLoginPass(e)} />
        </View>

        <Link href={"/"} style={{ color: "white" }}>
          Forgot password?
        </Link>

        <ThemedButton onPress={() => handleLogin()} style={{ width: 250 }}>
          Login
        </ThemedButton>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Link href={"/signup"} style={styles.signupLink}>
            Create an account.
          </Link>
        </Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    top: 0,
    left: 5,
    maxHeight: 120,
    maxWidth: 120,
  },
  loginHeader: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontSize: 24,
    textShadowColor: "#564849",
    textShadowRadius: 2,
    textShadowOffset: { width: 0, height: 0 },
  },
  loginHeader2: {
    color: "white",
    textAlign: "center",
    marginBottom: 25,
    fontSize: 14,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 160,
  },
  googleBtn: {
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    minWidth: 120,
    flexDirection: "row",
    backgroundColor: "#00000025",
    padding: 4,
  },
  lineDivider: {
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  lineContent: {
    marginHorizontal: 6,
    fontWeight: "bold",
    fontSize: 14,
  },
  line: {
    flex: 1,
    backgroundColor: "white",
    height: 2,
  },
  buttonContainer: {
    display: "flex",
    paddingHorizontal: "15%",
    minHeight: 380,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  signupText: {
    color: "white",
    textAlign: "center",
  },
  signupLink: {
    textDecorationLine: "underline",
  },
});
