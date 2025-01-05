import { ThemedButton } from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { ThemedView } from "@/components/ThemedView";
import { IUser, IUserKeys, useApi, UserType } from "@/hooks/useApi";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function signup() {
  const [FormInput, setFormInput] = useState<IUser>({
    id: -1,
    user_type: null,
    user_id: "",
    name: "",
    pass: "",
    email: "",
    section: "",
  });
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [activeUserType, setactiveUserType] = useState<UserType>("instructor");

  const handleInstructormFormChange = (key: IUserKeys, text: string) => {
    const _FormInput = FormInput;
    _FormInput[key] = text;
    setFormInput(_FormInput);
  };

  const handleOnSubmit = () => {
    if (FormInput.pass !== ConfirmPassword) {
      alert("Confirm password does not match.");
      return;
    }
    FormInput.user_type = activeUserType;

    useApi().signupUser(FormInput);
    alert(`User ${FormInput.name} added for confirmation`);
  };
  let defaultClickSound = new Audio(require("@/assets/sounds/click.wav"));
  const handleSoundPress = () => {
    if (!(global as any).soundsMuted) {
      defaultClickSound.play();
    }
  };
  return (
    <ThemedView style={{ paddingHorizontal: 35 }}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <View style={styles.headerContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
          Create your Account
        </Text>
        <Text style={{ fontSize: 14, color: "white" }}>
          Provide your details below.
        </Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => {
            handleSoundPress();
            setactiveUserType("instructor");
          }}
          style={[
            styles.tabButton,
            {
              borderColor:
                activeUserType == "instructor" ? "green" : "transparent",
            },
          ]}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14, color: "white" }}>
            INSTRUCTOR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSoundPress();
            setactiveUserType("student");
          }}
          style={[
            styles.tabButton,
            {
              borderColor:
                activeUserType == "student" ? "green" : "transparent",
            },
          ]}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14, color: "white" }}>
            STUDENT
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <ThemedInput
          onChangeText={(text) => handleInstructormFormChange("user_id", text)}
          label={
            activeUserType == "instructor" ? "INSTRUCTOR ID" : "STUDENT ID"
          }
        />
        <ThemedInput
          onChangeText={(text) => handleInstructormFormChange("name", text)}
          label="NAME"
        />
        <ThemedInput
          onChangeText={(text) => handleInstructormFormChange("email", text)}
          label="EMAIL"
        />
        <ThemedInput
          onChangeText={(text) => handleInstructormFormChange("pass", text)}
          label="PASSWORD"
        />
        <ThemedInput
          onChangeText={(text) => setConfirmPassword(text)}
          label="CONFIRM PASSWORD"
        />
        <ThemedInput
          onChangeText={(text) => handleInstructormFormChange("section", text)}
          label={activeUserType == "instructor" ? "SECTIONS" : "SECTION"}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ThemedButton onPress={handleOnSubmit}>
          <Text>SUBMIT</Text>
        </ThemedButton>
        <Text style={styles.signupText}>
          Already a member?{" "}
          <Link href={"/"} style={styles.signupLink}>
            Login here
          </Link>
        </Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
    position: "absolute",
    right: -25,
    top: 15,
  },
  headerContainer: {
    marginTop: 75,
    marginBottom: 15,
  },
  tabsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tabButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#00000050",
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputContainer: {
    height: 350,
    justifyContent: "space-evenly",
  },
  bottomContainer: {
    marginTop: 20,
  },
  signupText: {
    color: "white",
    textAlign: "center",
    marginTop: 15,
  },
  signupLink: {
    textDecorationLine: "underline",
  },
});
