import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const events = [
    {
      eventName: 'Event 1',
      location: 'Location 1',
      coordinates: '123, 456',
      notes: 'Some notes about Event 1',
      date: '2024-07-01',
      time: '10:00 AM',
      priority: 'High',
      reminders: '10 min before',
    },
    // Add more events as needed
  ];

  const handleEventPress = (event: any) => {
    router.push({
      pathname: '/screens/EventDetails',
      params: {
        ...event,
      },
    });
  };

  const handleAddEvent = () => {
    router.push('/screens/AddEditEvent?mode=add');
  };

  const handleEditEvent = (event: any) => {
    router.push({
      pathname: '/screens/AddEditEvent',
      params: {
        ...event,
        mode: 'edit',
      },
    });
  };

  const handleSettingsPress = () => {
    router.push('/screens/Settings');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.welcome}>Welcome, User</Text>
      <TextInput placeholder="Search Bar" style={styles.search} />
      <Button title="Add Event" onPress={handleAddEvent} color="#007AFF" />
      <ScrollView style={styles.eventList}>
        {events.map((event, index) => (
          <TouchableOpacity key={index} style={styles.event} onPress={() => handleEventPress(event)}>
            <Text>{event.eventName}</Text>
            <Text>{event.location}</Text>
            <Text>{event.date}</Text>
            <Text>{event.time}</Text>
            <Text>{event.priority}</Text>
            <Button title="Edit" onPress={() => handleEditEvent(event)} color="#007AFF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttons}>
        <Button title="Settings" onPress={handleSettingsPress} />
        <Button title="Profile" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ff00',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  search: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  eventList: {
    width: '90%',
  },
  event: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 3,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    position: 'absolute',
    bottom: 30,
  },
});

export default Dashboard;
