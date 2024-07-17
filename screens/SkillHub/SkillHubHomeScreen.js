import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons'
import ReelsComponent from '../../components/ReelsComponent'

const SkillHubHomeScreen = () => {
    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height

    return (
        <View style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor: 'white',
            position: 'relative',
            backgroundColor: 'black'
        }}>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    zIndex: 1,
                    padding: 10,
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 30
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', position: 'absolute', top: 10, left: 10 }}>CrafeNet</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Reels</Text>
                </View>


            </View>
            <ReelsComponent />
        </View>
    )
}
export default SkillHubHomeScreen;