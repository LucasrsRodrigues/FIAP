import { AuthProvider } from "@/hooks/useAuth";
import {  Stack } from "expo-router";

export default function RootLayout() {
    return(
        <AuthProvider>
           <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(authenticated)" options={{ headerShown: false }}/>
           </Stack>
        </AuthProvider>
    )
}