import { StyleSheet, Text, TextInput, View } from "react-native";

interface IProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
}

export default function (props: IProps) {
  return (
    <View style={styles.main}>
      <View style={styles.labelContainer}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 10,
            letterSpacing: 0.5,
            left: 8,
            alignSelf: "flex-start",
          }}
        >
          {props.label ?? "label here"}:
        </Text>
      </View>
      <TextInput
        editable={!props.disabled}
        secureTextEntry={props.isPassword}
        onChangeText={props.onChangeText}
        style={styles.input}
        placeholder={!props.isPassword ? props.placeholder : ""}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    fontFamily: "Tahoma",
    backgroundColor: "#8B552C",
    height: 40,
    borderRadius: 45,
    borderColor: "white",
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    alignContent: "center",
    width: "100%",
  },
  labelContainer: {
    flexBasis: "30%",
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    overflow: "hidden",
    paddingLeft: 2,
    paddingRight: 35,
  },
  input: {
    fontFamily: "Tahoma",
    flexBasis: "85%",
    backgroundColor: "#FCDEC7",
    borderRadius: 45,
    borderColor: "white",
    borderWidth: 2.5,
    paddingBottom: 9.5,
    paddingTop: 9.5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "#564849",
    margin: -10,
  },
});
