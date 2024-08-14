import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const videos = [
    { id: 1, source: require('../src/reels/video1.mp4'), liked: false, likesCount: 0 },
    { id: 2, source: require('../src/reels/video2.mp4'), liked: false, likesCount: 0 },
    { id: 3, source: require('../src/reels/video3.mp4'), liked: false, likesCount: 0 },
];

const ReelsScreen = () => {
    const [videoData, setVideoData] = useState(videos);
    const videoRef = useRef([]);

    const handleLike = (index) => {
        const newVideoData = [...videoData];
        newVideoData[index].liked = !newVideoData[index].liked;
        if (newVideoData[index].liked) {
            newVideoData[index].likesCount += 1;
        } else {
            newVideoData[index].likesCount -= 1;
        }
        setVideoData(newVideoData);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.videoContainer}>
            <Video
                ref={(ref) => {
                    videoRef.current[index] = ref;
                }}
                source={item.source}
                style={styles.backgroundVideo}
                resizeMode="cover"
                shouldPlay
                isLooping
            />

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => handleLike(index)}>
                    <Ionicons
                        name="heart"
                        size={30}
                        color={item.liked ? 'red' : 'white'}
                    />
                    <Text style={styles.likeCount}>{item.likesCount}</Text>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Beğen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Kaydedildi!')}>
                    <Ionicons name="bookmark" size={30} color="white" />
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Kaydet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('İçeriğe Git!')}>
                    <Ionicons name="play" size={30} color="white" />
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>İçeriğe Git</Text>

                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={videoData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onScroll={(event) => {
                const index = Math.floor(event.nativeEvent.contentOffset.y / height);
                videoRef.current.forEach((video, i) => {
                    if (video != null) {
                        if (i === index) {
                            video.playAsync();
                        } else {
                            video.pauseAsync();
                        }
                    }
                });
            }}
        />
    );
};

const styles = StyleSheet.create({
    videoContainer: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    buttonContainer: {
        position: 'absolute',
        right: 10,
        bottom: 200,
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        alignItems: 'center',
    },
    likeCount: {
        color: 'white',
        marginTop: 5,
    },
});

export default ReelsScreen;
