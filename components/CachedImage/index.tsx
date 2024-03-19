import { storage } from "@/utils/mmkv";
import { useEffect, useState } from "react";
import { Image, ImageProps } from "react-native";
import { stringMd5 } from "react-native-quick-md5";
import * as FileSystem from 'expo-file-system';

export default function CachedImage(
    props: { url: string } & ImageProps
) {
    const [uri, setUri] = useState("");

    async function ensureDirExists() {
        const dirInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + "images/");
        if (!dirInfo.exists) {
          console.log("Gif directory doesn't exist, creating…");
          await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + "images/", { intermediates: true });
        }
      }

    let checkImage = () => {
        const md5 = stringMd5(props.url);
        const local_path = storage.getString(`@ImageStore/${md5}`);

        if (!local_path) {
            
            FileSystem.downloadAsync(
                props.url,
                FileSystem.cacheDirectory + md5 + ".jpg"
            )
            .then(({ uri }) => {
                console.log("Downloaded to: ",uri)
                storage.set(`@ImageStore/${md5}`, uri);
                setUri(uri);
            })
            .catch((error) => {
                console.error(error)
            })
        } else {
            setUri(local_path);
        }
    }

    useEffect(() => {
        checkImage();
    }, [])

    return (
        <Image
            {...props}
            source={{ uri: uri }}
            style={[props.style]}
        />
    )
}