import * as React from "react";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    height: 24,
    resizeMode: "contain",
    width: 24,
  }
});

export const ArrowRight = (props) => {
  const { style, ...rest } = props;

  return React.createElement(
    Image,
    {
      style: [styles.icon, style],
      ...rest,
      source: require("./ArrowRight.png"),
    }
  );
}