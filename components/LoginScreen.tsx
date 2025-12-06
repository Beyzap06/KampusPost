import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomInput from './CustomInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>KampusPost Giriş</Text>
      <CustomInput label="E-posta" placeholder="ornek@kampus.edu.tr" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <CustomInput label="Şifre" placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />
      <View style={{height:12}} />
      <Button title="Giriş Yap" onPress={() => { console.log('[Login] email=', email, ' password=', password); navigation.navigate('Home'); }} />
      <View style={{height:12}} />
      <Button title="Kayıt Ol" color="#1A73E8" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex:1, padding:20, backgroundColor:'#F5F7FA' }, title:{ fontSize:20, fontWeight:'bold', marginBottom:12 } });
