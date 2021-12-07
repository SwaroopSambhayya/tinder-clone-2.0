import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import tailwind from "tailwind-rn";
import { db } from "../../firebase";
import useAuth from "../../hooks/AuthProvider";
import { getMatchedUserId } from "../../utils/helper";

const ChatTile = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("Say Hi!!");
  useEffect(() => {
    setMatchedInfo(getMatchedUserId(matchDetails, user.uid));
  }, [user, matchDetails]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timeStamp", "desc"),
        limit(1)
      ),
      (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
    );
  }, [matchDetails, user, db]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
      style={[
        tailwind(
          "flex-row   items-center px-5 py-3 bg-white  mr-3 ml-3 my-3 rounded-lg"
        ),
        style.cardShadow,
      ]}
    >
      <Image
        source={{ uri: matchedUserInfo?.image }}
        style={tailwind("rounded-full h-16 w-16 mr-4")}
      />
      <View style={tailwind("flex-1 ")}>
        <Text style={tailwind("font-bold text-lg")}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardShadow: {
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
export default ChatTile;
