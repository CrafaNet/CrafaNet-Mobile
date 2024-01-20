import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import UpgradeToVipBox from "./ComunityComponents/UpgradeToVipBox";
import SearchBox from "./ComunityComponents/SearchBox";
import ClassListItem from "./ComunityComponents/ClassListItem";

import Styles from "../../constants/styles";
import Colors from "../../constants/colors";
import Strings from "../../util/strings";

import categories from "../../DUMMY_DATA/categories.json";
import classes from "../../DUMMY_DATA/classes.json";

export default function CommunityHomeScreen() {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    let classesList = classes;
    if (categories[activeCategoryIndex] !== "all") {
        classesList = classes.filter(
            (item) => item.category === categories[activeCategoryIndex]
        );
    }

    return (
        <View style={[Styles.screenContainer, styles.container]}>
            <UpgradeToVipBox />
            <SearchBox />
            <SafeAreaView>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item}
                    renderItem={(props) => (
                        <Pressable
                            onPress={() => setActiveCategoryIndex(props.index)}
                        >
                            {categoriesItem(props, activeCategoryIndex)}
                        </Pressable>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
            <SafeAreaView>
                <FlatList
                    data={classesList}
                    keyExtractor={(item) => item.name}
                    renderItem={(props) => <ClassListItem {...props} />}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    );
}

function categoriesItem({ item, index }, activeCategoryIndex) {
    const isActive = index === activeCategoryIndex;
    const defaultGradient = ["transparent", "transparent"];

    const textStyles = [
        styles.categoriesItemText,
        isActive && styles.activeCategoryText,
    ];

    return (
        <LinearGradient
            colors={isActive ? Colors.mainLinearGradient : defaultGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.categoriesItem}
        >
            <Text style={textStyles}>{Strings[item]}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    categoriesItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    categoriesItemText: {
        fontFamily: "poppins-",
        textTransform: "capitalize",
    },
    activeCategoryText: {
        color: "white",
    },
});
