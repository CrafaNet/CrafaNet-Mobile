import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from "react-query";
import { Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import WorkFolioScreen from './screens/WorkFolioScreen';
import ReelsScreen from './screens/ReelsScreen';
import LearnMateScreen from './screens/LearnMateScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import PreminumScreen from './screens/PreminumScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const homeIcon = require('./assets/tabicons/video.png');
const reelsIcon = require('./assets/tabicons/Reels.png');
const learnmateIcon = require('./assets/tabicons/Learnmate.png');
const profilIcon = require('./assets/tabicons/person.png');


function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = homeIcon;
                            break;
                        case 'Reels':
                            iconName = reelsIcon;
                            break;
                        case 'LearnMate':
                            iconName = learnmateIcon;
                            break;
                        case 'Profil':
                            iconName = profilIcon;
                            break;
                        default:
                            iconName = profilIcon; // varsayılan bir ikon
                    }

                    return (
                        <Image
                            source={iconName}
                            style={{ width: 60, height: 60 }}
                        />
                    );
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#42176E',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 60,
                    borderRadius: 10,
                    margin: 10,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Reels" component={ReelsScreen} />
            <Tab.Screen name="LearnMate" component={LearnMateScreen} />
            <Tab.Screen name="WorkFolio" component={WorkFolioScreen} />
        </Tab.Navigator>

    );
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Premium" component={PreminumScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}