import React from "react";
import { View, Text, Image } from "react-native";
import tailwind from "tailwind-rn";

const ChatBubble = ({ message, isMe, profilePic }) => {
  return (
    <View
      style={[
        tailwind("flex-row flex-wrap   items-center "),
        isMe
          ? {
              alignSelf: "flex-end",
              marginLeft: "auto",
              justifyContent: "flex-end",
            }
          : {
              alignSelf: "flex-start",
              marginRight: "auto",
              justifyContent: "flex-start",
            },
      ]}
    >
      <Image
        source={{ uri: profilePic }}
        style={[tailwind(" w-10 h-10 mr-2 rounded-full ")]}
      />
      <View
        style={[
          tailwind("p-3 mr-3 ml-2 my-1 rounded-xl"),
          isMe
            ? tailwind("bg-purple-500 rounded-tr-none")
            : tailwind("bg-red-400 rounded-tl-none"),
        ]}
      >
        <Text style={tailwind("text-white  text-base")}>{message}</Text>
      </View>
    </View>
  );
};

export default ChatBubble;
