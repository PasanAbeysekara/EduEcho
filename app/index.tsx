import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/screens/LoginScreen');
    }, 5000); // 5 seconds
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.version}>Version Info</Text>
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
    bottom: 10,
    fontSize: 12,
  },
});

export default Index;
