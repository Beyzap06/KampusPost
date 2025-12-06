import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
interface Post { userId: number; id: number; title: string; body: string }
export default function HomeScreen(){
  const [posts,setPosts] = useState<Post[]>([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(r=>r.json())
      .then((data:Post[])=>{ setPosts(data); console.log('posts', data); })
      .catch(e=>console.error('fetch error', e))
      .finally(()=>setLoading(false));
  },[]);
  if(loading){ return (<View style={styles.center}><ActivityIndicator size="large"/><Text style={{marginTop:12}}>Yükleniyor…</Text></View>); }
  return (
    <View style={styles.container}>
      <FlatList data={posts} keyExtractor={i=>String(i.id)} renderItem={({item})=> (
        <View style={styles.card}><Text style={styles.title}>{item.title}</Text><Text style={styles.body}>{item.body}</Text></View>
      )}/>
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1, backgroundColor:'#F5F7FA', padding:12}, center:{flex:1, alignItems:'center', justifyContent:'center'}, card:{backgroundColor:'#fff', borderRadius:12, padding:12, marginBottom:12, borderColor:'#E6EBF0', borderWidth:1}, title:{fontWeight:'bold', marginBottom:8, color:'#202124'}, body:{color:'#3C4043'} });
