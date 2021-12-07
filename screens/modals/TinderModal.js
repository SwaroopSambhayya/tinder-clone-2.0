import { updateProfile } from '@firebase/auth';
import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn';
import { db } from '../../firebase';
import useAuth from '../../hooks/AuthProvider';

const TinderModal = () => {
    const {user}=useAuth();
    const [imageUrl,setImage]=useState(null);
    const [occupation,setOccupation]=useState(null);
    
    
    const navigation=useNavigation();
    const [age,setAge]=useState(null);
    const incompleteForm=!imageUrl || !occupation || !age;

        const updateProfile=()=>{
                setDoc(doc(db,'users',user.uid),{
                    id: user.uid,
                    displayName: user.displayName,
                    photoURL:user.photoURL,
                    job:occupation,
                    age:age,
                    image: imageUrl,  
                    timeStamp:serverTimestamp()
                }).then(()=>navigation.navigate('Home')).catch((err)=>alert(err));
        }

    return (
        <View style={tailwind('flex-1 items-center pt-5')}>
            <Image source={{uri:'https://www.kindpng.com/picc/m/132-1323877_tinder-logo-png-transparent-png.png'}} resizeMode='contain' style={tailwind('h-10 w-full')} />
            <Text style={tailwind('text-xl text-gray-400 p-5 font-bold')}>Welcome {user.displayName}</Text>
            <Text style={tailwind('text-red-500 p-4 ')}>
                Step 1: Add profile picuture
            </Text>
            <TextInput 
            value={imageUrl}
            onChangeText={(text)=>setImage(text)}

            placeholder="Enter profile picture url"
            style={tailwind('text-xl pb-2 text-center')}
            />
            <Text style={tailwind('text-red-500 p-4 ')}>
                Step 2: The Occupation
            </Text>
            <TextInput 
            value={occupation}
            onChangeText={text=>setOccupation(text)}
            placeholder="Enter your occupation"
            style={tailwind('text-xl pb-2 text-center')}
            />
            <Text style={tailwind('text-red-500 p-4 ')}>
                Step 1: The Age
            </Text>
            <TextInput 
            value={age}
            onChangeText={text=>setAge(text)}
            placeholder="Enter your age"
            maxLength={2}
            keyboardType="numeric"
            
            style={tailwind('text-xl pb-2 text-center')}
            />
            <TouchableOpacity 
            disabled={incompleteForm}
            onPress={updateProfile}
            style={[tailwind('absolute bottom-10  p-3 w-64 rounded-xl  '),incompleteForm?tailwind('bg-gray-300'):tailwind('bg-red-400')]}>
                <Text style={tailwind('text-white font-bold text-center')} >Update Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TinderModal;
