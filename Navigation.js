import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Community
import CommunityHomeScreen from "./screens/Community/CommunityHomeScreen";
import JoinClassScreen from "./screens/Community/JoinClassScreen";
import ClassScreen from "./screens/Community/ClassScreen";
import ClassVideosScreen from "./screens/Community/ClassVideosScreen";
import VideoScreen from "./screens/Community/VideoScreen";
// SkillHub
import SkillHubHomeScreen from "./screens/SkillHub/SkillHubHomeScreen";
// LearnMate
import LearnMateHomeScreen from "./screens/LearnMate/LearnMateHomeScreen";
// Workfolio
import WorkfolioHomeScreen from "./screens/Workfolio/WorkfolioHomeScreen";
// Other screens
import UpgradeToVipScreen from "./screens/UpgradeToVipScreen";

import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import Colors from "./constants/colors";
import Strings from "./util/strings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={bottomTabScreenOptions}>
                <Tab.Screen
                    name='Community'
                    component={CommunityStack}
                    options={communityBottomTabOptions}
                />
                <Tab.Screen
                    name='SkillHub'
                    component={SkillHubStack}
                    options={skillHubBottomTabOptions}
                />
                <Tab.Screen
                    name='LearnMate'
                    component={LearnMateStack}
                    options={learnMateBottomTabOptions}
                />
                <Tab.Screen
                    name='Workfolio'
                    component={WorkfolioStack}
                    options={workfolioBottomTabOptions}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function CommunityStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen
                name='CommunityHome'
                component={CommunityHomeScreen}
            />
            <Stack.Screen name='JoinClassScreen' component={JoinClassScreen} />
            <Stack.Screen name='ClassScreen' component={ClassScreen} />
            <Stack.Screen
                name='UpgradeToVipScreen'
                component={UpgradeToVipScreen}
            />
            <Stack.Screen
                name='ClassVideosScreen'
                component={ClassVideosScreen}
            />
            <Stack.Screen name='VideoScreen' component={VideoScreen} />
        </Stack.Navigator>
    );
}

function SkillHubStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen name='SkillHubHome' component={SkillHubHomeScreen} />
        </Stack.Navigator>
    );
}

function LearnMateStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen
                name='LearnMateHome'
                component={LearnMateHomeScreen}
            />
        </Stack.Navigator>
    );
}

function WorkfolioStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen
                name='WorkfolioHome'
                component={WorkfolioHomeScreen}
            />
        </Stack.Navigator>
    );
}

const bottomTabScreenOptions = {
    headerShown: false,
    tabBarActiveTintColor: Colors.primary500,
    tabBarLabelStyle: { fontFamily: "poppins-bold" },
    tabBarStyle: {
        paddingBottom: 6,
        paddingTop: 8,
        height: 58,
        elevation: 0,
        shadowOpacity: 0,
        borderColor: "transparent",
    },
};

const stackScreenOptions = {
    headerTitle: "CrafaNet",
    headerShadowVisible: false,
    headerShown: false,
    headerTitleStyle: {
        color: Colors.primary500,
        fontFamily: "poppins-bold",
        fontSize: 24,
    },
    headerRight: () => (
        <Entypo
            name='dots-three-vertical'
            size={20}
            color={Colors.primary500}
        />
    ),
};

const communityBottomTabOptions = {
    tabBarIcon: (props) => (
        <Ionicons
            name={`people${props.focused ? "" : "-outline"}`}
            {...props}
        />
    ),
    tabBarLabel: Strings.community,
};
const skillHubBottomTabOptions = {
    tabBarIcon: (props) => (
        <MaterialCommunityIcons
            name={`puzzle${props.focused ? "" : "-outline"}`}
            {...props}
        />
    ),
    tabBarLabel: Strings.skillhub,
};
const learnMateBottomTabOptions = {
    tabBarIcon: (props) => (
        <MaterialCommunityIcons
            name={`robot-happy${props.focused ? "" : "-outline"}`}
            {...props}
        />
    ),
    tabBarLabel: Strings.learnmate,
};
const workfolioBottomTabOptions = {
    tabBarIcon: (props) => (
        <MaterialCommunityIcons
            name={`briefcase-account${props.focused ? "" : "-outline"}`}
            {...props}
        />
    ),
    tabBarLabel: Strings.workfolio,
};
