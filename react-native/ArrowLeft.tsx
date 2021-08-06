import * as React from "react";
import { Image, ImageProps, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    height: 24,
    resizeMode: "contain",
    width: 24,
  }
});

export type ArrowLeftProps = ImageProps;

export const ArrowLeft: React.FunctionComponent<ArrowLeftProps> = (props) => {
  const { style, ...rest } = props;

  return (
    <Image
      style={[styles.icon, style]}
      {...rest}
      source={require("ArrowLeft.png")}
    />
  );
}