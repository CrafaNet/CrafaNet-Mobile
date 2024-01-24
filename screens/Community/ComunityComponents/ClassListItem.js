import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";

import Colors from "../../../constants/colors";
import Sizes from "../../../constants/sizes";
import Strings from "../../../util/strings";

export default function ClassListItem({ item }) {
    const navigation = useNavigation();
    let memberText = `+50 ${Strings.members}`;
    if (item.memberCount < 50)
        memberText = `${item.memberCount} ${Strings.members}`;
    if (item.memberCount < 11) memberText = Strings.miniClass;

    return (
        <ImageBackground style={styles.container} source={{ uri: item.image }}>
            <View style={styles.contentContainer}>
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.row}>
                        <Octicons
                            name='people'
                            size={18}
                            color={Colors.primary500}
                        />
                        <Text style={styles.memberCount}>{memberText}</Text>
                    </View>
                </View>
                <Pressable
                    style={styles.joinButton}
                    onPress={() =>
                        navigation.navigate("JoinClassScreen", { item })
                    }
                >
                    <Text style={styles.joinButtonText}>{Strings.join}</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 16 / 9,
        marginBottom: 20,
        borderRadius: 8,
        overflow: "hidden",
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "auto",
        paddingVertical: 4,
        paddingHorizontal: 8,
        margin: 6,
        backgroundColor: "#0008",
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 8,
    },
    title: {
        fontFamily: "poppins-bold",
        color: "white",
    },
    memberCount: {
        fontFamily: "montserrat-",
        fontSize: Sizes.textSmall,
        color: "#bbb",
    },
    joinButton: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    joinButtonText: {
        fontFamily: "poppins-bold",
        textTransform: "uppercase",
        color: Colors.primary500,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
});
