import {
  StyleProp,
  StyleSheet,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { StyleProps } from "react-native-reanimated";

interface IProps {
  style?: StyleProps;
  children?: string | JSX.Element | JSX.Element[];
  onClose?: () => void;
  visible?: boolean;
}

export function BaseModal(props: IProps) {
  return (
    <View
      style={[
        {
          zIndex: 999,
          position: "absolute",
          width: useWindowDimensions().width,
          display: props.visible ? "flex" : "none",
          alignItems: "center",
          top: 0,
          left: 0,
        },
        props.style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onClose}
        style={[styles.blackBG, { height: useWindowDimensions().height }]}
      ></TouchableOpacity>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  blackBG: {
    width: "100%",
    backgroundColor: "black",
    opacity: 0.95,
    position: "absolute",
  },
});
