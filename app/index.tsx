import CachedImage from "@/components/CachedImage";
import { storage } from "@/utils/mmkv";
import { Pressable, StyleSheet, Text } from "react-native";
import { stringMd5 } from "react-native-quick-md5";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexPage() {

    const genMD5 = () => {
        const md5 = stringMd5('Hello, Worl!');
        
        //const local_path = storage.getString(`@ImageStore/${md5}`);
        //console.log(local_path)

        // if (!local_path) console.log('No local path found!')

        //storage.set(`@ImageStore/${md5}`, 'Hello, Wor!');
    }

    return (
        <SafeAreaView edges={['left', 'right', 'top']} style={styles.main}>
            
            <CachedImage
            url="https://i.nefisyemektarifleri.com/2022/02/10/lazanya-tarifi-1.jpg"
            style={{ width: 200, height: 200 }}
            />

            <Pressable style={styles.buton} onPress={()=>genMD5()}></Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
    },
    buton: {
        backgroundColor: 'blue',
        width: 115,
        height: 50,
        borderRadius: 25,
    }
})