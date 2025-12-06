
📱 KampusPost – React Native Ödev 4

Bu proje, BGP201 dersi kapsamında React Native kullanılarak geliştirilmiş bir mobil uygulamadır.
Uygulama Login, Register ve Home ekranlarından oluşmaktadır.

Proje;

Navigation yapısı,

Form kontrolü,

API’den veri çekme,

FlatList ile listeleme

özelliklerini içerir.

📌 İçindekiler

Projenin Amacı

Kullanılan Teknolojiler

Kurulum

Ekran Görüntüleri

Kod Yapısı

LoginScreen

RegisterScreen

HomeScreen

Konsol / DevTools Çıktıları

Proje Klasör Yapısı

Sonuç

🎯 Projenin Amacı

Bu ödevde amaç:

React Navigation ile ekranlar arası geçiş yapmak

Login / Register form yapısını oluşturmak

Register ekranında şifre tekrar kontrolü eklemek

API’den veri çekip Home ekranında listelemek

DevTools üzerinden gerekli logları görüntülemek

Uygulama, ders için verilen PDF yönergesine birebir uyumludur.

🧩 Kullanılan Teknolojiler
Teknoloji	Açıklama
React Native v0.82	Mobil uygulama geliştirme
@react-navigation/native	Navigation container
@react-navigation/native-stack	Stack navigator
react-native-screens	Navigation performansı
react-native-safe-area-context	Güvenli alan yönetimi
Android Emulator / Expo Go (Windows)	Test ortamı (Windows kullanıldığı için iOS Simulator yerine Android veya Expo Go tercih edilmiştir)

💡 Not: Proje Windows ortamında geliştirildiği için iOS Simulator kullanılamamaktadır.
Testler Android Emulator veya Expo Go (Android) üzerinden gerçekleştirilmiştir.
🚀 Kurulum (Windows İçin)
1️⃣ Bağımlılıkların Yüklenmesi
npm install

2️⃣ React Navigation Kurulumu
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

3️⃣ iOS İşlemleri (Windows Kullanıcıları İçin GEREKSİZ ❌)

Windows'ta iOS Simulator çalışmaz. Bu adımlar uygulanmaz:

cd ios
pod install
cd ..
npx react-native run-ios  ❌

4️⃣ Android’de Çalıştırma (Windows İçin ✔)
npx react-native run-android


💻 Kod Yapısı
App.tsx (Navigation Yapısı)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Kayıt Ol' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

LoginScreen
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from './CustomInput';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    console.log('Login values:', { email, password });
    navigation.navigate('Home');
  };

  const onRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <CustomInput placeholder="E-posta" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Giriş Yap" onPress={onLoginPress} />
      <Button title="Kayıt Ol" onPress={onRegisterPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});

export default LoginScreen;

RegisterScreen
import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import CustomInput from './CustomInput';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const onRegisterPress = () => {
    if (password !== passwordAgain) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor!');
      return;
    }

    console.log('Kayıt başarılı', { email, password });
  };

  return (
    <View style={styles.container}>
      <CustomInput placeholder="E-posta" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomInput placeholder="Şifre Tekrar" value={passwordAgain} onChangeText={setPasswordAgain} secureTextEntry />

      <Button title="Kayıt Ol" onPress={onRegisterPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});

export default RegisterScreen;

HomeScreen – API + FlatList
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
      console.log('Posts:', data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  postItem: { marginBottom: 16 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
});

export default HomeScreen;

📁 Proje Klasör Yapısı
KampusPost
│── App.tsx
│── package.json
│── index.js
│── tsconfig.json
│── /components
│     ├── LoginScreen.tsx
│     ├── RegisterScreen.tsx
│     ├── HomeScreen.tsx
│     └── CustomInput.tsx
