import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db, auth } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

const EventDetails: React.FC = () => {
  const router = useRouter();
  const { eventId, eventName, location, coordinates, notes, date, time, priority, reminders } = useLocalSearchParams();

  const handleEdit = () => {
    router.push({
      pathname: '/screens/EditEvent',
      params: {
        eventId,
        eventName,
        location,
        coordinates,
        notes,
        date,
        time,
        priority,
        reminders,
        mode: 'edit',
      },
    });
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
        <Text style={styles.title}>Event Details</Text>
        <View style={styles.eventContainer}>
          <Text style={styles.eventName}>{eventName}</Text>
          <Text style={styles.eventDetail}>Date: <Text style={styles.detailValue}>{date}</Text></Text>
          <Text style={styles.eventDetail}>Time: <Text style={styles.detailValue}>{time}</Text></Text>
          <Text style={styles.eventDetail}>Location: <Text style={styles.detailValue}>{location}</Text></Text>
          <Text style={styles.eventDetail}>Coordinates: <Text style={styles.detailValue}>{coordinates}</Text></Text>
          <Text style={styles.eventDetail}>Notes: <Text style={styles.detailValue}>{notes}</Text></Text>
          <Text style={styles.eventPriority}>Priority: <Text style={styles.detailValue}>{priority}</Text></Text>
          <Text style={styles.eventDetail}>Reminders: <Text style={styles.detailValue}>{reminders}</Text></Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={handleEdit} color="#007AFF" />
          <Button title="Delete" onPress={handleDelete} color="#FF3B30" />
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
  eventContainer: {
    backgroundColor: '#aaffaa',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailValue: {
    color: '#000',
  },
  eventPriority: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dddddd',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default EventDetails;
