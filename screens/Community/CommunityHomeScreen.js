import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";
import UpgradeToVipBox from "./ComunityComponents/UpgradeToVipBox";
import SearchBox from "./ComunityComponents/SearchBox";
import ClassListItem from "./ComunityComponents/ClassListItem";

import { queryClient, sendRequest } from "../../util/http";
import { getToken } from "../../store/auth";

import Colors from "../../constants/colors";
import Strings from "../../util/strings";

export default function CommunityHomeScreen() {
    const { data: userResponse } = useQuery({
        queryKey: ["user"],
        queryFn: () => {
            const token = queryClient.getQueryData(["token"]);
            const api = "/user/sendUserInfo";
            return sendRequest({ api, token });
        },
    });
    const userData = userResponse?.data;

    const { data: communitiesResponse } = useQuery({
        queryKey: ["communities"],
        queryFn: () => sendRequest({ api: "/comunity/listAllComunities" }),
    });
    const communitiesData = communitiesResponse?.data;

    const { data: categoriesResponse } = useQuery({
        queryKey: ["communityCategories"],
        queryFn: () => {
            const token = queryClient.getQueryData(["token"]);
            const api = "/comunity/listOfCategories";
            return sendRequest({ api, token });
        },
    });
    let categoriesData = categoriesResponse?.data;

    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

    if (!userData || !communitiesData || !categoriesData) return;
    categoriesData = [{ _id: "0" }, ...categoriesData];

    let communitiesList = communitiesData;
    if (activeCategoryIndex !== 0) {
        communitiesList = communitiesData.filter((item) =>
            item.categories.includes(categoriesData[activeCategoryIndex])
        );
    }

    return (
        <ScreenContainer
            contentContainerStyle={styles.container}
            stickyHeaderIndices={[0, 2]}
            stickyHeaderHiddenOnScroll={true}
            showsVerticalScrollIndicator={false}
        >
            <AppHeader />
            <UpgradeToVipBox />
            <View style={styles.stickyHeaderWrapper}>
                <View style={styles.searchBoxWrapper}>
                    <SearchBox />
                </View>

                <SafeAreaView>
                    <FlatList
                        data={categoriesData}
                        keyExtractor={(item) => item._id}
                        renderItem={(props) => (
                            <Pressable
                                onPress={() =>
                                    setActiveCategoryIndex(props.index)
                                }
                            >
                                {categoriesItem(props, activeCategoryIndex)}
                            </Pressable>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </SafeAreaView>
            </View>

            <SafeAreaView>
                <FlatList
                    data={communitiesList}
                    keyExtractor={(item) => item.name}
                    renderItem={(props) => classListRenderItem(props, userData)}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </SafeAreaView>
        </ScreenContainer>
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
            <Text style={textStyles}>{Strings[`category_${item._id}`]}</Text>
        </LinearGradient>
    );
}

function classListRenderItem(props, userData) {
    const workshopId = props?.item?._id;
    const userWorkshops = userData?.interestWorkshop;
    const isUserMember = userWorkshops?.includes(workshopId);
    return <ClassListItem {...props} isUserMember={isUserMember} />;
}

const styles = StyleSheet.create({
    container: {},
    stickyHeaderWrapper: {
        paddingVertical: 16,
        backgroundColor: "white",
    },
    searchBoxWrapper: {
        marginBottom: 16,
    },
    categoriesItem: {
        paddingVertical: 6,
        paddingHorizontal: 14,
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
