import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

type Props = { label?: string } & TextInputProps;
export default function CustomInput({ label, style, ...rest }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, style]} placeholderTextColor="#9AA0A6" {...rest} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { marginBottom: 6, color: '#5F6368' },
  input: { height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#E0E3E7', paddingHorizontal: 12, backgroundColor: '#fff' }
});
