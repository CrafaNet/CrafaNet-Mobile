import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const badges = [
    { id: '1', name: 'Zeus Crafa', image: require('../assets/achievements/zeus.png') },
    { id: '2', name: 'Wizard Crafa', image: require('../assets/achievements/wizard.png') },
    { id: '3', name: 'Diamond Crafa', image: require('../assets/achievements/diamond.png') },
    { id: '4', name: 'Novice Crafa', image: require('../assets/achievements/novice.png') },
    { id: '5', name: 'Winner Crafa', image: require('../assets/achievements/winner.png') },
    { id: '6', name: 'OpenWay Crafa', image: require('../assets/achievements/openWay.png') },
];

const workshops = [
    { id: '1', name: 'Performing Arts Workshop', image: require('../assets/images/worksshop.png') },
    { id: '2', name: 'Performing Arts Workshop', image: require('../assets/images/worksshop.png') },
    { id: '3', name: 'Performing Arts Workshop', image: require('../assets/images/worksshop.png') },
    { id: '4', name: 'Performing Arts Workshop', image: require('../assets/images/worksshop.png') },
    { id: '5', name: 'Performing Arts Workshop', image: require('../assets/images/worksshop.png') },
    { id: '6', name: 'Performing Arts Workshop', image: require('../assets/images/worksshop.png') },
];

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>CrafaNet</Text>
                <Ionicons name="notifications-outline" size={32} color="#7B3FDB" />
            </View>
            <View style={styles.profileContainer}>
                <Image source={require('../assets/user.png')} style={styles.profileImage} />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Olivia Wilson</Text>
                    <Text style={styles.profileTitle}>Novice Crafa</Text>
                </View>
                <Ionicons name="pencil-outline" size={30} color="#7B3FDB" style={styles.editIcon} />
            </View>

            <View style={styles.badgesContainer}>
                {badges.map(badge => (
                    <View key={badge.id} style={styles.badge}>
                        <Image source={badge.image} style={styles.badgeImage} />
                        <Text style={styles.badgeText}>{badge.name}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.workshopsButton}>
                <Text style={styles.workshopsButtonText}>My Workshops</Text>
            </TouchableOpacity>
            <FlatList
                data={workshops}
                renderItem={({ item }) => (
                    <View style={styles.workshopItem}>
                        <Image source={item.image} style={styles.workshopImage} />
                        <Text style={styles.workshopText}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                style={styles.workshopsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7B3FDB',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileTitle: {
        fontSize: 14,
        color: 'black',
    },
    editIcon: {
        padding: 10,
    },
    badgesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    badge: {
        alignItems: 'center',

    },
    badgeImage: {
        width: 40,
        height: 40,
    },
    badgeText: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    workshopsButton: {
        backgroundColor: '#7B3FDB',
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
    },
    workshopsButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    workshopsList: {
        flex: 1,
    },
    workshopItem: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    workshopImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    workshopText: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default ProfileScreen;
