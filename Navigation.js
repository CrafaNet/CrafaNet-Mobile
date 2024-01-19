import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CommunityHomeScreen from "./screens/Community/CommunityHomeScreen";
import SkillHubHomeScreen from "./screens/SkillHub/SkillHubHomeScreen";
import LearnMateHomeScreen from "./screens/LearnMate/LearnMateHomeScreen";
import WorkfolioHomeScreen from "./screens/Workfolio/WorkfolioHomeScreen";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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
    headerTitleStyle: {
        color: Colors.primary500,
        fontFamily: "poppins-bold",
        fontSize: 26,
    },
    headerRight: () => (
        <Entypo
            name='dots-three-vertical'
            size={24}
            color={Colors.primary500}
        />
    ),
};

const communityBottomTabOptions = {
    tabBarIcon: (props) => <Ionicons name='people' {...props} />,
    tabBarLabel: Strings.community,
};
const skillHubBottomTabOptions = {
    tabBarIcon: (props) => <MaterialCommunityIcons name='puzzle' {...props} />,
    tabBarLabel: Strings.skillhub,
};
const learnMateBottomTabOptions = {
    tabBarIcon: (props) => <Ionicons name='chatbubbles' {...props} />,
    tabBarLabel: Strings.learnmate,
};
const workfolioBottomTabOptions = {
    tabBarIcon: (props) => <Ionicons name='person' {...props} />,
    tabBarLabel: Strings.workfolio,
};
