import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="screens/EventDetails" options={{ title: 'Event Details' }} />
      <Stack.Screen name="screens/AddEditEvent" options={{ title: 'Add/Edit Event' }} />
      <Stack.Screen name="screens/Settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
