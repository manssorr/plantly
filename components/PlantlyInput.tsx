import { Text, StyleSheet, TextInput, type TextInputProps } from "react-native";
import { theme } from "@/theme";

interface InputProps extends TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  ...props
}: InputProps) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize="words"
        {...props}
      />
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
});
