import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Switch, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const AddEditEvent: React.FC = () => {
  const router = useRouter();
  const { eventName, location, coordinates, notes, date, time, priority, reminders, mode } = useLocalSearchParams();

  const [eventData, setEventData] = useState({
    eventName: eventName?.toString() || '',
    location: location?.toString() || '',
    coordinates: coordinates?.toString() || '',
    notes: notes?.toString() || '',
    date: date?.toString() || '',
    time: time?.toString() || '',
    priority: priority?.toString() || '',
    reminders: reminders?.toString() || '',
    repeat: false
  });

  const handleSave = () => {
    // Save event logic here
    console.log('Event saved:', eventData);
    router.push('/screens/Dashboard');
  };

  const handleDelete = () => {
    // Delete event logic here
    console.log('Event deleted');
    router.push('/screens/Dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{mode === 'edit' ? 'Edit Event' : 'Add Event'}</Text>
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
          {mode === 'edit' && <Button title="Delete" onPress={handleDelete} color="#FF3B30" />}
          <Button title={mode === 'edit' ? 'Save' : 'Add'} onPress={handleSave} color="#34C759" />
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

export default AddEditEvent;
