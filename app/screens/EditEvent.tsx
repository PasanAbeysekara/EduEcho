import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Switch, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db, auth } from '../firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const EditEvent: React.FC = () => {
  const router = useRouter();
  const { eventId, eventName, location, coordinates, notes, date, time, priority, reminders, repeat } = useLocalSearchParams();

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

  useEffect(() => {
    setEventData({
      eventName: eventName as string,
      location: location as string,
      coordinates: coordinates as string,
      notes: notes as string,
      date: date as string,
      time: time as string,
      priority: priority as string,
      reminders: reminders as string,
      repeat: repeat === 'true'
    });
  }, [eventId, eventName, location, coordinates, notes, date, time, priority, reminders, repeat]);

  const handleSave = async () => {
    try {
      if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
      }

      const updatedEventData = { ...eventData, userId: auth.currentUser.uid };

      if (eventId) {
        const eventRef = doc(db, 'events', eventId as string);
        await updateDoc(eventRef, updatedEventData);
        console.log('Event updated successfully:', updatedEventData);
      }
      router.push('/screens/Dashboard');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (eventId) {
        const eventRef = doc(db, 'events', eventId as string);
        await deleteDoc(eventRef);
      }
      router.push('/screens/Dashboard');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Event</Text>
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
          <Button title="Delete" onPress={handleDelete} color="#FF3B30" />
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

export default EditEvent;
