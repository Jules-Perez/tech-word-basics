import { StyleSheet, Text, TextInput, View } from "react-native";

interface IProps {
  label?: string;
  value?: string;
  placeholder?: string;
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
          }}
        >
          {props.label ?? "label here"}:
        </Text>
      </View>
      <TextInput
        onChangeText={props.onChangeText}
        style={styles.input}
        placeholder={props.placeholder}
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
  },
  labelContainer: {
    flexBasis: "30%",
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    paddingLeft: 12,
  },
  input: {
    fontFamily: "Tahoma",
    flexBasis: "70%",
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
    marginLeft: 2,
  },
});
