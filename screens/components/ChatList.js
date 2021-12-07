import React from "react";
import { View, Text, FlatList } from "react-native";
import tailwind from "tailwind-rn";
import ChatTile from "../components/ChatTile";

const ChatList = ({ matches }) => {
  return matches.length > 0 ? (
    <FlatList
      data={matches}
      style={tailwind("h-full")}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatTile matchDetails={item} />}
    />
  ) : (
    <View style={tailwind("text-center pt-5")}>
      <Text> No matches found </Text>
    </View>
  );
};

export default ChatList;
