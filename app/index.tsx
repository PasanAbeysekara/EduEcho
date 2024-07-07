import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/screens/LoginScreen');
    }, 5000); // 5 seconds
  }, [router]);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        duration={2000}
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Animatable.Text animation="fadeInUp" duration={2000} style={styles.version}>
        Version Info
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" duration={2000} style={styles.developerName}>
        Developed by Chamil Abeysekara
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ff00',
  },
  logo: {
    width: 100,
    height: 100,
  },
  version: {
    position: 'absolute',
    bottom: 30,
    fontSize: 12,
  },
  developerName: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
  },
});

export default Index;
