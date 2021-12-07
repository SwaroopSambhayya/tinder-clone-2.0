import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from '@firebase/auth';
import {auth} from '../firebase';
const AuthContext=createContext({});
const config={
    iosClientId:"261259144383-l145ejrpidbh9nc38h003hvos8muicmb.apps.googleusercontent.com",
    androidClienId:"261259144383-fckcklg3v825fg5j8dmqa8c52l6t97d9.apps.googleusercontent.com",
    scopes:["profile","email"],
    permissions:["public_profile","email","gender","location"]
};

export const AuthProvider = ({children}) => {
    const [error,setError]= useState(null);
    const [user,setUser]=useState(null);
    const [loadingInitial,setLoading]=useState(true);
    const [loadingData,setLoadingData]=useState(false);
    useEffect(()=> onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }
            else setUser(null);
         setLoading(false);   
      
    },[]));
    
    
    const signIn=async()=>{
        setLoadingData(true);
        try{  
        await Google.logInAsync(config).then(async(loginResult)=>{
            if(loginResult.type=="success"){
                const {idToken,accessToken}=loginResult;
                const credential=GoogleAuthProvider.credential(idToken,accessToken);
            await signInWithCredential(auth, credential); 
            }
            return Promise.reject();
        })
    }catch(e){
    setError(e);
    }
    setLoadingData(false);
    }

    const signOut=async()=>{
        setLoadingData(true);
        await auth.signOut().catch((err)=>setError(err)).finally(()=>setLoadingData(false));
    }
    const memo=useMemo(()=>({user,signIn,loadingInitial,signOut,loadingData}),[user,loadingData,error]);

    return (
        <AuthContext.Provider value={memo}>
        {!loadingInitial && children}
        </AuthContext.Provider>
        
    )
}

export default function useAuth(){
    return useContext(AuthContext);
}

 
