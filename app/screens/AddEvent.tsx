import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const AddEvent: React.FC = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState({
    eventName: '',
    location: '',
    coordinates: '',
    notes: '',
    date: '',
    time: '',
    priority: '',
    reminders: '',
    repeat: false
  });

  const handleSave = async () => {
    try {
      if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
      }

      const eventId = `${Date.now()}`;
      const newEventData = { ...eventData, userId: auth.currentUser.uid, eventId };

      const eventRef = doc(db, 'events', eventId);
      await setDoc(eventRef, newEventData);

      router.push('/screens/Dashboard');
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add Event</Text>
        <View style={styles.inputContainer}>
          <Text>Event Name:</Text>
          <TextInput
            style={styles.input}
            value={eventData.eventName}
            onChangeText={(text) => setEventData({ ...eventData, eventName: text })}
          />
          <Text>Date:</Text>
          <TextInput
            style={styles.input}
            value={eventData.date}
            onChangeText={(text) => setEventData({ ...eventData, date: text })}
          />
          <Text>Time:</Text>
          <TextInput
            style={styles.input}
            value={eventData.time}
            onChangeText={(text) => setEventData({ ...eventData, time: text })}
          />
          <Text>Location:</Text>
          <TextInput
            style={styles.input}
            value={eventData.location}
            onChangeText={(text) => setEventData({ ...eventData, location: text })}
          />
          <Text>Location Coordinates:</Text>
          <TextInput
            style={styles.input}
            value={eventData.coordinates}
            onChangeText={(text) => setEventData({ ...eventData, coordinates: text })}
          />
          <Text>Notes:</Text>
          <TextInput
            style={styles.input}
            value={eventData.notes}
            onChangeText={(text) => setEventData({ ...eventData, notes: text })}
          />
          <Text>Priority:</Text>
          <TextInput
            style={styles.input}
            value={eventData.priority}
            onChangeText={(text) => setEventData({ ...eventData, priority: text })}
          />
          <Text>Reminders:</Text>
          <TextInput
            style={styles.input}
            value={eventData.reminders}
            onChangeText={(text) => setEventData({ ...eventData, reminders: text })}
          />
          <Text>Repeat:</Text>
          <Switch
            value={eventData.repeat}
            onValueChange={(value) => setEventData({ ...eventData, repeat: value })}
          />
        </View>
        <View style={styles.buttonContainer}>
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
  inputContainer: {
    backgroundColor: '#aaffaa',
    padding: 20,
    borderRadius: 10,
    width: '100%',
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

export default AddEvent;
