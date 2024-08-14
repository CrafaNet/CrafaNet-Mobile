import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const messages = [
    {
        id: '1',
        text: 'Hi there, are you available around 4PM today for meeting with a new client?',
        time: '10:45 AM',
        sender: 'other',
        image: require('../assets/tabicons/person.png'),
    },
    {
        id: '2',
        text: 'Hey, Adeline',
        time: '10:46 AM',
        sender: 'user',
        image: require('../assets/tabicons/person.png'),
    },
    {
        id: '3',
        text: 'Sure, just give me a call!',
        time: '10:46 AM',
        sender: 'user',
        image: require('../assets/tabicons/person.png'),
    },
    {
        id: '4',
        text: 'Thank you 😍',
        time: '10:47 AM',
        sender: 'other',
        image: require('../assets/tabicons/person.png'),
    },
    // Diğer mesajlar...
];

const Message = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.otherMessage]}>
            {!isUser && <Image source={message.image} style={styles.profileImage} />}
            <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.otherBubble]}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
            </View>
            {isUser && <Image source={message.image} style={styles.profileImage} />}
        </View>
    );
};

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/tabicons/Learnmate.png')} style={styles.logo} />
                <Text style={styles.headerText}>Learnmate</Text>
                <Image source={require('../assets/tabicons/Learnmate.png')} style={styles.cartoonImage} />
            </View>
            <Text style={styles.dateText}>Today</Text>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Message message={item} />}
                keyExtractor={(item) => item.id}
                style={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write your message here"
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Ionicons name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',

    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7B3FDB',
    },
    cartoonImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    dateText: {
        textAlign: 'center',
        color: '#aaa',
        marginVertical: 10,
    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-end',
    },
    userMessage: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    otherMessage: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
    },
    userBubble: {
        backgroundColor: '#e1ffc7',
    },
    otherBubble: {
        backgroundColor: '#f0f0f0',
    },
    messageText: {
        fontSize: 16,
        marginBottom: 5,
    },
    messageTime: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        backgroundColor: '#7B3FDB',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatScreen;
