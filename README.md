📱 KampusPost – React Native BGP 201 Ödev 4

Bu proje BGP201 dersi kapsamında React Native kullanılarak geliştirilmiş bir mobil uygulamadır.
Uygulama; Login, Register ve Home ekranlarından oluşmaktadır.
Navigation yapısı, form doğrulama, API’den veri çekme ve FlatList ile listeleme özellikleri içermektedir.

📌 İçindekiler

Projenin Amacı

Kullanılan Teknolojiler

Kurulum (Windows İçin)

Ekran Görüntüleri

Kod Yapısı

App.tsx

LoginScreen

RegisterScreen

HomeScreen

Konsol / DevTools Çıktıları

Proje Klasör Yapısı

Sonuç

🎯 Projenin Amacı

Bu ödev kapsamında hedeflenenler:

React Navigation kullanarak ekranlar arası geçiş yapmak

Login ve Register ekranlarında form yapısı oluşturmak

Register ekranında “şifre – şifre tekrar” doğrulaması yapmak

API’den veri çekip Home ekranında listelemek

DevTools üzerinden gerekli logları görmek

Uygulama PDF yönergesine birebir uyumludur.

🧩 Kullanılan Teknolojiler
Teknoloji	Açıklama
React Native v0.82	Mobil uygulama geliştirme
@react-navigation/native	Navigation container
@react-navigation/native-stack	Stack Navigator
react-native-screens	Navigation performans modülü
react-native-safe-area-context	Güvenli alan yönetimi
Android Emulator / Windows	Test ortamı
🚀 Kurulum (Windows)
1️⃣ Gerekli bağımlılıkların yüklenmesi
npm install
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

2️⃣ Android için Gradle bağımlılıklarını güncelle
cd android
gradlew clean
cd ..

3️⃣ Uygulamayı çalıştır
npx react-native run-android


✔ Eğer emülatör çalışıyorsa uygulama otomatik olarak açılır.

🖼 Ekran Görüntüleri
<img width="1007" height="2182" alt="02" src="https://github.com/user-attachments/assets/642c3abe-0a1b-4b02-b221-37bdb0c7054e" />
<img width="1030" height="2233" alt="03" src="https://github.com/user-attachments/assets/df5fe766-a221-463c-a42c-7740400538a0" />
<img width="1400" height="1200" alt="01" src="https://github.com/user-attachments/assets/c4dd01cd-fa1d-42b5-a54d-bb06f0df63b0" />
<img width="1008" height="1061" alt="04" src="https://github.com/user-attachments/assets/53082dee-34e8-430a-84d9-e28d666e6db7" />
<img width="1003" height="1048" alt="04" src="https://github.com/user-attachments/assets/48d4da5c-ffc2-4919-8622-43869368c727" />
<img width="1080" height="1044" alt="05" src="https://github.com/user-attachments/assets/2b1eec94-e110-4861-9cf5-dcdf45d3a5d3" />
<img width="1052" height="2159" alt="06" src="https://github.com/user-attachments/assets/26eeb395-67d7-440c-a899-7d8c5de4804f" />
<img width="1040" height="2234" alt="07" src="https://github.com/user-attachments/assets/5d5e9170-5b2d-4577-bf54-d1af320fcc2f" />
<img width="1400" height="700" alt="08" src="https://github.com/user-attachments/assets/7a8a5dc8-86de-415b-b567-37c291fcdbf7" />
<img width="1400" height="700" alt="10" src="https://github.com/user-attachments/assets/4d2158ec-9699-4d15-b651-03095d4db083" />
<img width="967" height="2196" alt="11" src="https://github.com/user-attachments/assets/5702650c-cec7-4f4b-a8c2-dc9558973dc5" />
<img width="1080" height="2222" alt="12" src="https://github.com/user-attachments/assets/93dcac1e-b302-4228-828f-f17d56369d2a" />


	
📂 Kod Yapısı
App.tsx (Navigation Yapısı)

React Navigation ile Login → Register → Home ekranları arasında geçiş yapılmaktadır.

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

Kullanıcı giriş bilgileri alınıyor.
“Giriş Yap” → Home ekranına yönlendiriyor.

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

Şifre kontrolü yapılmaktadır.
Şifreler uyuşmazsa Alert gösterilir.

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

jsonplaceholder.typicode.com/posts üzerinden veri çekilmektedir.

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
│
│── /components
│     ├── LoginScreen.tsx
│     ├── RegisterScreen.tsx
│     ├── HomeScreen.tsx
│     └── CustomInput.tsx

✅ Sonuç

Bu proje React Native’in temel yapı taşlarını uygulamalı olarak pekiştirmek amacıyla hazırlanmıştır.
Navigation, form yönetimi, API’den veri çekme ve listeleme adımları başarıyla gerçekleştirilmiştir.
