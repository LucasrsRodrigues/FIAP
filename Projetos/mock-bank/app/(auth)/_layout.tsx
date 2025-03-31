import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
        <Stack.Screen
            name="Welcome/index"
            options={{
            headerShown: false,
            }}
        />
      <Stack.Screen
        name="Login/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register/index"
        options={{
          headerShown: false,
        }}
      />
      
    </Stack>
  );
}