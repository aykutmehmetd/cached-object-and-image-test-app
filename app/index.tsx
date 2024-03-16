import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexPage() {
    return (
        <SafeAreaView edges={['left', 'right', 'top']}>
            <Text>Hello, World!</Text>
        </SafeAreaView>
    )
}