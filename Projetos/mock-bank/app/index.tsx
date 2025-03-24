import { View } from "@/components/Themed";
import { StyleSheet, Text } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Hello world!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
