import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const navigation = useNavigation();

    const videos = [
        require('../src/homevideo/home1.mp4'),
        require('../src/homevideo/home2.mp4'),
        require('../src/homevideo/home3.mp4'),
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.premiumContainer}
                onPress={() => navigation.navigate('Premium')}
            >
                <View style={styles.row}>
                    <Image source={require('../assets/cartons/idea.png')} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Premium Al</Text>
                        <Text style={styles.subtitle}>Premium üyelik ile sınırsız erişim sağlayın.</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={styles.searchAndVideosContainer}>
                <TouchableOpacity style={styles.searchButton} onPress={() => alert('Arama işlevi burada')} >
                    <Ionicons name="search" size={24} color="white" />
                    <Text style={styles.searchButtonText}>Arama</Text>
                </TouchableOpacity>

                <View style={styles.videosContainer}>
                    {videos.map((video, index) => (
                        <Video
                            key={index}
                            source={video}
                            style={styles.video}
                            useNativeControls
                            resizeMode="cover"
                            isLooping
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 20,
    },
    premiumContainer: {
        width: 380,
        height: 120,
        backgroundColor: '#42176E',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 80,
        width: 80,
    },
    textContainer: {
        marginLeft: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        color: 'white',
    },
    searchAndVideosContainer: {
        width: '100%',
        alignItems: 'center',
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#42176E',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 150,
        elevation: 5,
        marginBottom: 20,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    videosContainer: {
        width: '100%',
        borderRadius: 10,
    },
    video: {
        width: '80%',
        height: 400,
        marginBottom: 20,
        borderRadius: 20,
        margin: 20,
        padding: 10,
        justifyContent: 'center'
    },
});
