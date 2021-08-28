import { StatusBar } from "expo-status-bar"
import React, { useLayoutEffect, useState } from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { Platform, ScrollView, TextInput } from "react-native"
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { Avatar, Icon } from "react-native-elements"
import * as firebase from "firebase"
import { auth, db } from "../firebase"

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://img.icons8.com/material-sharp/240/000000/user-male-circle.png",
            }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      //   headerLeft: () => (
      //     <TouchableOpacity>
      //       <Icon name="arrowleft" type="antdesign" size={24} color="red" />
      //     </TouchableOpacity>
      //   ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <Icon
              type="font-awesome"
              size={24}
              name="video-camera"
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon type="ionicons" size={24} name="call" color="white" />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation, messages])

  const sendMessage = () => {
    Keyboard.dismiss()

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })

    setInput("")
  }

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
    return unsubscribe
  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      size={30}
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      rounded
                      source={{ uri: data.photoURL }}
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      size={30}
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      rounded
                      source={{ uri: data.photoURL }}
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                    <Text style={styles.receiverName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="send a Signal"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Icon type="ionicons" name="send" size={24} color="#2b68e6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sender: {
    padding: 15,
    backgroundColor: "#ececec",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingLeft: 10,
    fontSize: 10,
    color: "#2b68e6",
  },
  senderText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#2b68e6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 5,
  },
  receiverName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "lightblue",
  },

  footer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ececec",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
})
