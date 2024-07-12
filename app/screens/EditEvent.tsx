import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db, auth } from '../firebaseConfig';
import { doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';

const EditEvent: React.FC = () => {
  const router = useRouter();
  const { eventId, eventName, location, coordinates, notes, date, time, priority, reminders, repeat, repeatType, repeatCount } = useLocalSearchParams();

  const [eventData, setEventData] = useState({
    eventName: '',
    location: '',
    coordinates: '',
    notes: '',
    date: '',
    time: '',
    priority: '',
    reminders: '',
    repeat: false,
    repeatType: 'None', // None, Daily, Weekly
    repeatCount: 0,
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
      repeat: repeat === 'true',
      repeatType: repeatType as string,
      repeatCount: Number(repeatCount),
    });
  }, [eventId, eventName, location, coordinates, notes, date, time, priority, reminders, repeat, repeatType, repeatCount]);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const createEvent = async (eventData: any, date: string) => {
        const eventId = `${Date.now()}`;
        const newEventData = { ...eventData, userId: user.uid, eventId, date };
        const eventRef = doc(db, 'events', eventId);
        await setDoc(eventRef, newEventData);
      };

      const baseDate = new Date(eventData.date);
      if (eventData.repeat && eventData.repeatType !== 'None') {
        const repeatCount = eventData.repeatCount;
        for (let i = 0; i < repeatCount; i++) {
          const currentDate = new Date(baseDate);
          if (eventData.repeatType === 'Daily') {
            currentDate.setDate(baseDate.getDate() + i);
          } else if (eventData.repeatType === 'Weekly') {
            currentDate.setDate(baseDate.getDate() + i * 7);
          }
          const formattedDate = currentDate.toISOString().split('T')[0];
          await createEvent(eventData, formattedDate);
        }
      } else {
        await createEvent(eventData, eventData.date);
      }

      router.push('/screens/Dashboard');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!eventId) {
        console.error('Event ID is missing');
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const eventRef = doc(db, 'events', eventId as string);
      await deleteDoc(eventRef);

      console.log('Event deleted successfully');
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
            placeholder="Enter event name"
          />
          <Text>Date:</Text>
          <TextInput
            style={styles.input}
            value={eventData.date}
            onChangeText={(text) => setEventData({ ...eventData, date: text })}
            placeholder="Enter date (e.g., 2024-07-11)"
          />
          <Text>Time:</Text>
          <TextInput
            style={styles.input}
            value={eventData.time}
            onChangeText={(text) => setEventData({ ...eventData, time: text })}
            placeholder="Enter time (e.g., 02:00 PM)"
          />
          <Text>Location:</Text>
          <TextInput
            style={styles.input}
            value={eventData.location}
            onChangeText={(text) => setEventData({ ...eventData, location: text })}
            placeholder="Enter location"
          />
          <Text>Location Coordinates:</Text>
          <TextInput
            style={styles.input}
            value={eventData.coordinates}
            onChangeText={(text) => setEventData({ ...eventData, coordinates: text })}
            placeholder="Enter coordinates (e.g., 37.7749,-122.4194)"
          />
          <Text>Notes:</Text>
          <TextInput
            style={styles.input}
            value={eventData.notes}
            onChangeText={(text) => setEventData({ ...eventData, notes: text })}
            placeholder="Enter any notes"
          />
          <Text>Priority:</Text>
          <TextInput
            style={styles.input}
            value={eventData.priority}
            onChangeText={(text) => setEventData({ ...eventData, priority: text })}
            placeholder="Enter priority (e.g., High, Medium, Low)"
          />
          <Text>Reminders:</Text>
          <TextInput
            style={styles.input}
            value={eventData.reminders}
            onChangeText={(text) => setEventData({ ...eventData, reminders: text })}
            placeholder="Enter reminders (e.g., 10 minutes before)"
          />
          <Text>Repeat:</Text>
          <Switch
            value={eventData.repeat}
            onValueChange={(value) => setEventData({ ...eventData, repeat: value })}
          />
          {eventData.repeat && (
            <>
              <Text>Repeat Type:</Text>
              <View style={styles.segmentedControl}>
                {['None', 'Daily', 'Weekly'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.segmentedControlItem,
                      eventData.repeatType === type && styles.segmentedControlItemSelected,
                    ]}
                    onPress={() => setEventData({ ...eventData, repeatType: type })}
                  >
                    <Text style={styles.segmentedControlItemText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text>Repeat Count:</Text>
              <TextInput
                style={styles.input}
                value={eventData.repeatCount.toString()}
                onChangeText={(text) => setEventData({ ...eventData, repeatCount: Number(text) })}
                placeholder={`Enter number of ${eventData.repeatType === 'Daily' ? 'days' : 'weeks'}`}
                keyboardType="numeric"
              />
            </>
          )}
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
  segmentedControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  segmentedControlItem: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  segmentedControlItemSelected: {
    backgroundColor: '#007AFF',
  },
  segmentedControlItemText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
});

export default EditEvent;
