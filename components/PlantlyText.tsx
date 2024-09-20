import React from "react";
import { Text, TextProps, StyleSheet, Platform } from "react-native";
import { theme } from "@/theme";

interface PlantlyTextProps extends TextProps {
  variant?: "default" | "heading" | "subheading";
  color?: keyof typeof theme;
}

export const PlantlyText: React.FC<PlantlyTextProps> = ({
  children,
  style,
  variant = "default",
  color = "colorGreen",
  ...props
}) => {
  return (
    <Text
      style={[styles.default, styles[variant], { color: theme[color] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: Platform.select({
      ios: "Caveat-Regular",
      android: "Caveat_400Regular",
    }),
    fontSize: 16,
    color: theme.colorGreen,
  },
  heading: {
    fontFamily: "Caveat_400Regular",
    fontSize: 34,
    fontWeight: "bold",
    color: theme.colorGreen,
  },
  subheading: {
    fontFamily: "Caveat_400Regular",
    fontSize: 24,
    color: theme.colorGreen,
  },
});
