import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { BaseModal } from "./BaseModal";
import ThemedInput from "./ThemedInput";
import { ThemedButton } from "./ThemedButton";
import LineDivider from "./LineDivider";
import { useCallback, useEffect, useState } from "react";
import { ProfileImages } from "@/constants/ProfileImages";
import { IUser } from "@/hooks/useApi";
import { Audio } from "expo-av";

const banner = require("@/assets/images/banner.png");
const userImgPlaceholder = require("@/assets/images/user.png");

interface IProps {
  user: IUser;
  visible?: boolean;
  onEdit?: (editedUser: IUser) => void;
  onClose?: () => void;
}

export function EditProfileModal(props: IProps) {
  const [EditUser, setEditUser] = useState<IUser>({ ...props.user, pass: "" });
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [IsPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    if (props.user) {
      let prevUser = { ...props.user };
      prevUser.pass = "";
      setEditUser(prevUser);
    }
  }, []);

  const handleInputChange = (userChanges: IUser) => {
    setEditUser(userChanges);
  };

  const handleChangeProfileImg = (index: number) => {
    let prevUser = { ...EditUser };

    prevUser.user_img_index = index;
    setEditUser(prevUser);
  };

  const handleOnEdit = () => {
    if (IsPasswordChanged && EditUser.pass != ConfirmPassword) {
      alert(`Confirm Password do not match!`);
      return;
    }
    if (IsPasswordChanged && EditUser.pass.length < 6) {
      alert(`Password should be atleast 6 characters`);
      return;
    }
    if (props?.onEdit) props.onEdit(EditUser);
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
  const renderProfileImages = useCallback((_userImg: number) => {
    return ProfileImages.map((img, i) => (
      <TouchableOpacity
        key={i}
        style={{ borderRadius: 65, overflow: "hidden" }}
        onPress={() => {
          handleSoundPress();
          handleChangeProfileImg(i);
        }}
      >
        <Image
          style={[
            styles.avatarSelectBtn,
            _userImg == i
              ? { borderColor: "#C3EF29", width: 60, height: 60 }
              : {},
          ]}
          source={img}
        />
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            width: 60,
            height: 60,
            opacity: _userImg == i ? 0.75 : 0,
            borderColor: "#C3EF29",
            borderWidth: 4,
            borderRadius: 45,
          }}
        />
      </TouchableOpacity>
    ));
  }, []);

  return (
    <BaseModal
      onClose={() => {
        if (props.onClose) props.onClose();
      }}
      visible={props.visible}
      style={{ alignItems: "center" }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          top: 45,
          zIndex: 11,
          fontSize: 25,
          width: 250,
          textAlign: "center",
          textShadowColor: "black",
          position: "absolute",
          textShadowRadius: 3,
          textShadowOffset: { width: 0, height: 2 },
        }}
      >
        BASIC INFORMATION
      </Text>
      <Image
        style={{
          position: "absolute",
          top: -50,
          alignSelf: "center",
          zIndex: 10,
        }}
        source={banner}
      />

      <View
        style={[
          styles.modalContainer,
          { height: useWindowDimensions().height - 150 },
        ]}
      ></View>
      <View
        style={[
          styles.modalContent,
          { height: useWindowDimensions().height - 150 },
        ]}
      >
        <Image
          style={styles.profileImage}
          source={ProfileImages[EditUser?.user_img_index ?? 0]}
        />
        <ThemedInput
          disabled={true}
          label="USER ID"
          placeholder={props.user?.user_id}
        />
        <ThemedInput
          onChangeText={(t) => {
            let prevUser = EditUser;
            prevUser.name = t;
            handleInputChange(prevUser);
          }}
          label="NAME"
          value={EditUser?.name}
          placeholder={props.user?.name}
        />
        <ThemedInput
          onChangeText={(t) => {
            let prevUser = EditUser;
            prevUser.section = t;
            handleInputChange(prevUser);
          }}
          label="YR/SEC"
          value={EditUser?.section}
          placeholder={props.user?.section}
        />
        <ThemedInput
          onChangeText={(t) => {
            let prevUser = EditUser;
            prevUser.email = t;
            handleInputChange(prevUser);
          }}
          label="EMAIL"
          value={EditUser?.email}
          placeholder={props.user?.email}
        />
        <ThemedInput
          label="PASSWORD"
          placeholder={props.user?.pass}
          isPassword
          onChangeText={(t) => {
            let prevUser = EditUser;
            prevUser.pass = t;
            handleInputChange(prevUser);
            setIsPasswordChanged(true);
          }}
          value={EditUser?.pass}
        />

        {IsPasswordChanged ? (
          <ThemedInput
            label="CONFIRM PASSWORD"
            placeholder={props.user?.pass}
            isPassword
            onChangeText={(t) => {
              setConfirmPassword(t);
            }}
            value={ConfirmPassword}
          />
        ) : null}
        <ThemedButton onPress={handleOnEdit}>EDIT PROFILE</ThemedButton>
        <LineDivider color="#564849">Choose Avatar</LineDivider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.avatarSelectContainer}>
            {renderProfileImages(EditUser?.user_img_index ?? 0)}
          </View>
        </ScrollView>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FCDEC7",
    width: "85%",
    top: 100,
    borderRadius: 25,
    position: "absolute",
  },
  modalContent: {
    top: 110,
    width: "65%",
    padding: 25,
    paddingTop: 50,
    zIndex: 15,
    alignItems: "center",
    gap: 15,
    overflowY: "auto",
  },
  profileImage: {
    backgroundColor: "black",
    width: 85,
    height: 85,
    borderRadius: 45,
    borderWidth: 6,
    borderColor: "#C3EF29",
  },
  avatarSelectContainer: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
  },
  avatarSelectBtn: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "black",
    borderWidth: 4,
    borderColor: "#114039",
  },
});
