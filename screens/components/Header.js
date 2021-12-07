import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import { Feather, Foundation } from "@expo/vector-icons";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tailwind("flex-row items-center justify-between")}>
      <View style={tailwind("flex-row items-center")}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tailwind("p-3")}
        >
          <Feather name="chevron-left" color="#ff5864" size={28} />
        </TouchableOpacity>
        <Text style={tailwind("text-xl font-bold")}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity
          style={tailwind(
            "items-center rounded-full justify-center bg-red-200 w-9 h-9 mr-3"
          )}
        >
          <Foundation name="telephone" color="#ff5864" size={24} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Header;
