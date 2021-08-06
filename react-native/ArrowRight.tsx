import * as React from "react";
import { Image, ImageProps, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    height: 24,
    resizeMode: "contain",
    width: 24,
  }
});

export type ArrowRightProps = ImageProps;

export const ArrowRight: React.FunctionComponent<ArrowRightProps> = (props) => {
  const { style, ...rest } = props;

  return (
    <Image
      style={[styles.icon, style]}
      {...rest}
      source={require("ArrowRight.png")}
    />
  );
}