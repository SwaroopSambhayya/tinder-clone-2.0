import { useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { View, Text, Image,TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn';
import {Entypo} from '@expo/vector-icons';
const MatchedScreen = () => {
    const navigation=useNavigation();
    const {params}=useRoute();
    const {logedInProfile,matchedUser}=params;
    return (
        <View style={[tailwind(' h-full bg-red-500 pt-20'),{opacity:0.89}]}>
            <View style={tailwind('flex-row justify-end')}>
             <TouchableOpacity  style={tailwind('items-center rounded-full justify-center  w-16 h-16')} onPress={()=>navigation.goBack()} >
                    <Entypo name="cross" size={24} color='white'/>
                
                </TouchableOpacity>
                </View>
        <View style={tailwind('justify-center px-10 pt-10')}>
            <Image source={{uri: 'https://links.papareact.com/mg9'}} style={tailwind('w-full h-32')} resizeMode="contain"/>
        </View>
        <Text style={tailwind('text-white text-center mt-5')}>
            You and {matchedUser.displayName} have liked each other
        </Text>
        <View style={tailwind('justify-evenly flex-row mt-5')}>
            <Image source={{uri:logedInProfile.image}} style={tailwind('w-32 h-32 rounded-full')} />
            <Image source={{uri:matchedUser.image}} style={tailwind('w-32 h-32 rounded-full')}/>

        </View>
        <TouchableOpacity style={tailwind('bg-white m-5 px-12 py-6 rounded-2xl mt-20')} onPress={() => {
            navigation.goBack();
            navigation.navigate('Chat');
        }}>
            <Text style={tailwind('text-center')}>
            Send a Message
            </Text>
        </TouchableOpacity>
         
    </View>
    );
}

export default MatchedScreen;
