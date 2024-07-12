import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

const Profile: React.FC = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    accountCreated: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
      }

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfileData({
          name: data?.name || '',
          email: data?.email || '',
          phone: data?.phone || '',
          address: data?.address || '',
          accountCreated: data?.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : '',
        });
      } else {
        console.log('No such document!');
      }
    };

    fetchProfileData();
  }, []);

  const parseDateString = (dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleSave = async () => {
    try {
      if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
      }

      const accountCreatedDate = parseDateString(profileData.accountCreated);

      const updatedProfileData = {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
        createdAt: Timestamp.fromDate(accountCreatedDate),
      };

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, updatedProfileData, { merge: true });
      console.log('Profile saved:', updatedProfileData);
      router.push('/screens/Dashboard'); // Redirect to Dashboard after saving
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/screens/LoginScreen');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Image source={require('../../assets/images/logo.png')} style={styles.profileImage} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
          />
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) => setProfileData({ ...profileData, email: text })}
          />
          <Text>Phone:</Text>
          <TextInput
            style={styles.input}
            value={profileData.phone}
            onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
          />
          <Text>Address:</Text>
          <TextInput
            style={styles.input}
            value={profileData.address}
            onChangeText={(text) => setProfileData({ ...profileData, address: text })}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <Text>Account Created:</Text>
          <Text style={styles.textValue}>{profileData.accountCreated}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} color="#34C759" />
          <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00ff00',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#aaffaa',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
});

export default Profile;
