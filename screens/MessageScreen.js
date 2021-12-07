import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import tailwind from "tailwind-rn";
import useAuth from "../hooks/AuthProvider";
import { getMatchedUserId } from "../utils/helper";
import Header from "./components/Header";
import { FontAwesome } from "@expo/vector-icons";
import ChatBubble from "./components/ChatBubble";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";

const MessageScreen = ({ route }) => {
  const { user } = useAuth();
  const { params } = route;
  const { matchDetails } = params;

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timeStamp: serverTimestamp(),
      userId: user.uid,
      message: messageInput,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].image,
    });
    setMessageInput("");
  };
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [db, matchDetails, user]
  );

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Header
        title={getMatchedUserId(matchDetails, user.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "android" ? "height" : "padding"}
        style={tailwind("flex-1")}
        keyboardVerticalOffset={10}
      >
        <FlatList
          data={messages}
          style={tailwind("flex-1 ml-3")}
          keyExtractor={(item) => item.id}
          inverted={-1}
          renderItem={({ item }) => {
            return (
              <ChatBubble
                message={item.message}
                key={item.id}
                isMe={item.userId === user.uid}
                profilePic={item.photoURL}
              />
            );
          }}
        />
        <View
          style={[
            tailwind(
              "flex-row justify-between px-5 items-center border-gray-300"
            ),
            { borderTopWidth: 0.7 },
          ]}
        >
          <TextInput
            value={messageInput}
            onChangeText={(text) => setMessageInput(text)}
            placeholder="Send Message..."
            style={tailwind("flex-1 h-10 items-center text-lg")}
          />

          <TouchableOpacity
            onPress={() => sendMessage()}
            style={tailwind("p-4")}
          >
            <FontAwesome name="send" color="#EF4444" size={26}></FontAwesome>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
