import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { db, auth } from '../firebaseConfig'; // Ensure your firebaseConfig file is correctly set up
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

interface Event {
  id: string;
  eventName: string;
  location: string;
  coordinates: string;
  notes: string;
  date: string;
  time: string;
  priority: string;
  reminders: string;
  userId: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [profileName, setProfileName] = useState('User');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User not authenticated');
          return;
        }

        const q = query(collection(db, 'events'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        const eventsData: Event[] = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<Event, 'id'>;
          return { id: doc.id, ...data };
        });

        // Sort events by date, time, and priority
        const sortedEvents = eventsData.sort((a, b) => {
          const dateTimeA = new Date(`${a.date} ${convertTo24HourFormat(a.time)}`);
          const dateTimeB = new Date(`${b.date} ${convertTo24HourFormat(b.time)}`);
          
          if (dateTimeA < dateTimeB) return -1;
          if (dateTimeA > dateTimeB) return 1;

          // If dates and times are the same, sort by priority
          if (a.priority === 'High' && b.priority !== 'High') return -1;
          if (a.priority !== 'High' && b.priority === 'High') return 1;

          return 0;
        });

        console.log('Fetched events:', sortedEvents);
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchProfileName = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User not authenticated');
          return;
        }

        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileName(userData?.name || 'User');
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchEvents();
    fetchProfileName();
  }, []);

  const handleEventPress = (event: Event) => {
    router.push({
      pathname: '/screens/EventDetails',
      params: {
        ...event,
      },
    });
  };

  const handleAddEvent = () => {
    router.push('/screens/AddEvent');
  };

  const handleEditEvent = (event: Event) => {
    router.push({
      pathname: '/screens/EditEvent',
      params: {
        ...event,
        eventId: event.id,
      },
    });
  };

  const handleSettingsPress = () => {
    router.push('/screens/Settings');
  };

  const handleProfilePress = () => {
    router.push('/screens/Profile');
  };

  const filteredEvents = events.filter(event => event.eventName.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.welcome}>Welcome, {profileName}</Text>
      <TextInput
        placeholder="Search Bar"
        style={styles.search}
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Add Event" onPress={handleAddEvent} color="#007AFF" />
      <ScrollView style={styles.eventList}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.event} onPress={() => handleEventPress(event)}>
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.eventName}</Text>
                <Text style={styles.eventDetails}>{event.date} at {event.time}</Text>
                <Text style={styles.eventDetails}>{event.location}</Text>
                <Text style={[styles.eventDetails, styles.priority, event.priority === 'High' ? styles.highPriority : styles.lowPriority]}>
                  {event.priority} Priority
                </Text>
              </View>
              <Button title="Edit" onPress={() => handleEditEvent(event)} color="#007AFF" />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No events found.</Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Settings" onPress={handleSettingsPress} />
        <Button title="Profile" onPress={handleProfilePress} />
      </View>
    </View>
  );
};

const convertTo24HourFormat = (time12h: string): string => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours}:${minutes}`;
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
    marginBottom: 80, // Adjust to make room for the footer
  },
  event: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventContent: {
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#333',
  },
  priority: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  highPriority: {
    backgroundColor: '#ffcccc',
    color: '#ff0000',
  },
  lowPriority: {
    backgroundColor: '#ccffcc',
    color: '#00aa00',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    elevation: 10,
  },
  buttons: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Dashboard;
