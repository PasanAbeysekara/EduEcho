import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Settings: React.FC = () => {
  const router = useRouter();
  const [settingsData, setSettingsData] = useState({
    name: '',
    eventReminders: false,
    silentHoursFrom: '',
    silentHoursTo: '',
    oldPassword: '',
    newPassword: '',
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settingsData);
    // Optionally navigate back or show a confirmation
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
        <Text style={styles.title}>Settings</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Text>Event Reminders:</Text>
          <Switch
            value={settingsData.eventReminders}
            onValueChange={(value) => setSettingsData({ ...settingsData, eventReminders: value })}
          />
          <Text>Silent Hours:</Text>
          <TextInput
            style={styles.input}
            placeholder="Time From"
            value={settingsData.silentHoursFrom}
            onChangeText={(text) => setSettingsData({ ...settingsData, silentHoursFrom: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Time To"
            value={settingsData.silentHoursTo}
            onChangeText={(text) => setSettingsData({ ...settingsData, silentHoursTo: text })}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <Text>Change Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry
            value={settingsData.oldPassword}
            onChangeText={(text) => setSettingsData({ ...settingsData, oldPassword: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={settingsData.newPassword}
            onChangeText={(text) => setSettingsData({ ...settingsData, newPassword: text })}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          <Text>Contact Us:</Text>
          <Text style={styles.contactEmail}>support@eduecho.com</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Log Out" onPress={handleLogout} color="#FF3B30" />
          <Button title="Save" onPress={handleSave} color="#34C759" />
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
  contactEmail: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
});

export default Settings;
