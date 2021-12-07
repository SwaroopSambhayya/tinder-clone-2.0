import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Header from "./components/Header";
import { collection, doc, onSnapshot, query, where } from "@firebase/firestore";
import useAuth from "../hooks/AuthProvider";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import ChatList from "./components/ChatList";

const ChatScreen = () => {
  const navigation = useNavigation();

  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );

  return (
    <View>
      <Header title="Chat" />
      <ChatList matches={matches} />
    </View>
  );
};

export default ChatScreen;
