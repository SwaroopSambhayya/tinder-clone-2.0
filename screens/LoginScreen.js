import React from 'react'
import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn';
import useAuth from '../hooks/AuthProvider'

const LoginScreen = () => {
        const {signIn}=useAuth();
    return (
        <View style={tailwind("flex-1")}>
            <ImageBackground
            resizeMode='cover'
            style={tailwind('flex-1')}
            source={{uri:"https://tinder.com/static/tinder.png"}}
            >
                <TouchableOpacity style={[tailwind('absolute bottom-40 p-4 bg-white rounded-2xl'),{marginHorizontal:'25%'}]} onPress={signIn} >
                <Text style={{textAlign:'center'}} >Sign in & get swiping </Text>
                </TouchableOpacity>
                </ImageBackground>
                
            
         
        </View>
    )
}

export default LoginScreen;
