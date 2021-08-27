import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { KeyboardAvoidingView } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { Button, Image, Input } from "react-native-elements"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = () => {}

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://img.icons8.com/color/200/000000/signal-app.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.InputContainer}>
        <Input
          placeholder="Email"
          autofocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button containerStyle={styles.button} type="outline" title="Register" />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  InputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})
