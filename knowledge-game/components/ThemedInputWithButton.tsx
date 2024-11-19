import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface IProps {
  onTextChange: (e: string) => void;
  onSubmit: () => void;
}

export default function ThemedInputWithButton(props: IProps) {
  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        placeholderTextColor={"grey"}
        placeholder="enter here..."
        onChangeText={props.onTextChange}
      />
      <TouchableOpacity onPress={props.onSubmit} style={styles.button}>
        <Text style={{ color: "white" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    flexBasis: "100%",
    paddingRight: 95,
  },
  button: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: -89,
    backgroundColor: "#22590A",
    color: "#FFFFFF",
    borderRadius: 25,
    borderColor: "#564849",
    borderWidth: 1,
    minWidth: 89,
    alignItems: "center",
    justifyContent: "center",
  },
});
