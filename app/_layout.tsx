import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SignUpScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="screens/EventDetails" options={{ title: 'Event Details' }} />
      <Stack.Screen name="screens/AddEvent" options={{ title: 'Add Event' }} />
      <Stack.Screen name="screens/EditEvent" options={{ title: 'Edit Event' }} />
      <Stack.Screen name="screens/Settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="screens/Profile" options={{ title: 'Profile' }} />
    </Stack>
  );
}
