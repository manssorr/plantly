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
    <Text style={[styles[variant], { color: theme[color] }, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: theme.colorGreen,
    ...Platform.select({
      ios: {
        fontFamily: "Caveat-Regular",
        fontWeight: "400",
      },
      android: {
        fontFamily: "Caveat_400Regular",
      },
    }),
  },
  heading: {
    fontSize: 34,
    color: theme.colorGreen,
    ...Platform.select({
      ios: {
        fontFamily: "Caveat-Bold",
        fontWeight: "bold",
      },
      android: {
        fontFamily: "Caveat_700Bold",
      },
    }),
  },
  subheading: {
    fontSize: 24,
    color: theme.colorGreen,
    ...Platform.select({
      ios: {
        fontFamily: "Caveat-SemiBold",
        fontWeight: "600",
      },
      android: {
        fontFamily: "Caveat_600SemiBold",
      },
    }),
  },
});
