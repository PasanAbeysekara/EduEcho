import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const Settings: React.FC = () => {
  const router = useRouter();
  const [settingsData, setSettingsData] = useState({
    name: '',
    eventReminders: false,
    silentHoursFrom: '',
    silentHoursTo: '',
    oldPassword: '',
    newPassword: '',
    email: ''
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settingsData);
    // Optionally navigate back or show a confirmation
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logged out');
    router.push('/screens/LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="Back" onPress={() => router.back()} color="#007AFF" />
        <Text style={styles.title}>Settings</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            value={settingsData.name}
            onChangeText={(text) => setSettingsData({ ...settingsData, name: text })}
          />
        </View>
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={settingsData.email}
            onChangeText={(text) => setSettingsData({ ...settingsData, email: text })}
          />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
});

export default Settings;
