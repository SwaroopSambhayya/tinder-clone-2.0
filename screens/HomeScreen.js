import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "tailwind-rn";
import useAuth from "../hooks/AuthProvider";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase";
import { generateId } from "../utils/helper";

const HomeScreen = () => {
  const nav = useNavigation();
  const { user, signOut } = useAuth();
  const [profileCards, setProfile] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          nav.navigate("TinderModal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;
    const fetchProfile = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const matches = await getDocs(
        collection(db, "users", user.uid, "matches")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const matchedUserIds = matches.length > 0 ? matches : ["test"];
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...matchedUserIds])
        ),
        (snapshot) => {
          setProfile(
            snapshot.docs
              .filter((doc) => doc.id != user.uid)
              .map((doc) => ({
                ...doc.data(),
              }))
          );
        }
      );

      return unsub;
    };
    fetchProfile();
  }, []);

  const onSwipedRight = async (cardIndex) => {
    if (!profileCards[cardIndex]) return;
    const matchedUser = profileCards[cardIndex];
    console.log(matchedUser.displayName);
    const logedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();
    getDoc(doc(db, "users", matchedUser.id, "matches", user.uid)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          console.log("Hooray there is a match");
          setDoc(doc(db, "matches", generateId(matchedUser.id, user.uid)), {
            users: {
              [user.uid]: logedInProfile,
              [matchedUser.id]: matchedUser,
            },
            usersMatched: [user.uid, matchedUser.id],
            timeStamp: serverTimestamp(),
          });

          nav.navigate("Match", {
            logedInProfile: logedInProfile,
            matchedUser: matchedUser,
          });
        }
      }
    );
    setDoc(doc(db, "users", user.uid, "matches", matchedUser.id), matchedUser);
  };
  const onSwipedLeft = (cardIndex) => {
    if (!profileCards[cardIndex]) return;
    const passedUser = profileCards[cardIndex];
    console.log(passedUser.displayName);
    setDoc(doc(db, "users", user.uid, "passes", passedUser.id), passedUser);
  };

  return (
    <SafeAreaView style={tailwind("flex-1 ")}>
      {/*Header*/}
      <View
        style={tailwind("flex flex-row justify-between items-center ml-5 mr-5")}
      >
        <TouchableOpacity onPress={signOut}>
          <Image
            source={{ uri: user.photoURL }}
            style={tailwind("w-10 h-10 rounded-full")}
          />
        </TouchableOpacity>

        <Image
          source={{
            uri: "https://toppng.com/uploads/preview/tinder-logo-transparent-tinder-logo-11563243301zivc1sx84c.png",
          }}
          resizeMode="contain"
          style={tailwind("w-14 h-14")}
        />

        <TouchableOpacity onPress={() => nav.navigate("Chat")}>
          <Ionicons name="chatbubbles" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/*End OF Header*/}
      {/*Cards*/}
      <View style={tailwind("flex-1 -mt-6")}>
        <Swiper
          containerStyle={{ backgroundColor: "transparent" }}
          ref={swipeRef}
          cards={profileCards}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            onSwipedLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            onSwipedRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "Nope",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "Match",
              style: {
                label: {
                  textAlign: "left",
                  color: "green",
                },
              },
            },
          }}
          renderCard={(cardData, index) =>
            cardData ? (
              <View
                key={cardData.id}
                style={[
                  tailwind("relative rounded-xl bg-white h-3/4 "),
                  style.cardShadow,
                ]}
              >
                <Image
                  source={{ uri: cardData.image }}
                  style={tailwind("absolute top-0 h-full w-full rounded-xl")}
                  resizeMode="cover"
                />

                <View
                  style={tailwind(
                    "absolute bottom-0 bg-white w-full px-4 py-4 flex-row items-center rounded-b-xl justify-between"
                  )}
                >
                  <View>
                    <Text style={tailwind("font-bold text-xl")}>
                      {cardData.displayName}
                    </Text>
                    <Text style={tailwind("")}>{cardData.job}</Text>
                  </View>
                  <Text style={tailwind("font-bold text-2xl")}>
                    {cardData.age}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tailwind(
                    "relative rounded-xl bg-white h-3/4 items-center justify-center"
                  ),
                  style.cardShadow,
                ]}
              >
                <Text style={tailwind("text-center  pb-5")}>
                  Oops, No more profiles
                </Text>
                <Image
                  resizeMode="contain"
                  style={tailwind("h-20 w-full rounded-xl")}
                  source={{
                    uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crying-face_1f622.png",
                  }}
                />
              </View>
            )
          }
        />
        {/*Card Ends*/}
      </View>
      <View style={tailwind("flex flex-row justify-evenly")}>
        <TouchableOpacity
          style={tailwind(
            "items-center rounded-full justify-center bg-red-200 w-16 h-16"
          )}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind(
            "items-center rounded-full justify-center bg-green-200 w-16 h-16"
          )}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <Entypo name="heart" size={24} color="green"></Entypo>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});

export default HomeScreen;
