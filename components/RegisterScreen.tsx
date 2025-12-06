import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import CustomInput from './CustomInput';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const onRegister = () => {
    if (password !== confirm) { Alert.alert('Uyarı', 'Şifreler uyuşmuyor!'); return; }
    console.log('[Register] eposta=', email); console.log('Kayıt başarılı');
  };
  return (
    <View style={styles.container}>
      <CustomInput label="E-posta" placeholder="ornek@kampus.edu.tr" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <CustomInput label="Şifre" placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />
      <CustomInput label="Şifre Tekrar" placeholder="••••••••" secureTextEntry value={confirm} onChangeText={setConfirm} />
      <Button title="Kayıt Ol" onPress={onRegister} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex:1, padding:20, backgroundColor:'#F5F7FA' } });
