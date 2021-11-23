import React, { useState } from "react";
import {
  NativeBaseProvider,
  Button,
  extendTheme,
  Center,
  Box,
  StatusBar,
  theme,
  Container,
  Heading,
  useToast,
  Pressable,
  Input,
  Icon,
  IconButton
} from "native-base";
import Component1 from "./components/Component1";
import { Text, Alert } from "react-native";
import { InputPassword } from "./components/InputPassword";
import {QRCode} from './components/QRCode'
import {StepperPackage} from './components/Stepper'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function () {
  const [message, setMessage] = useState("button");
  const [hidden, setHidden] = useState(false);
  const Stack = createNativeStackNavigator();
  const Auth = createNativeStackNavigator();
  const Package = createNativeStackNavigator();
 const AuthStack =()=> (
    <Auth.Navigator 
        initialRouteName="Login"
        screenOptions={{
          animationEnabled: false
        }}
        headerMode='none'
    >
        <Auth.Screen name="Login" options={{ headerShown: false }} component={InputPassword} /> 
    </Auth.Navigator>
 )

 const PackageStack =()=> (
  <Package.Navigator 
      initialRouteName="QR"
      screenOptions={{
        animationEnabled: false
      }}
      headerMode='none'
  >
      <Package.Screen name="QR" options={{ headerShown: false }} component={QRCode} /> 
      <Package.Screen name="Stepper" options={{ headerShown: false }} component={StepperPackage} /> 
  </Package.Navigator>
)
  const handleHidden=()=>{
    setHidden(!hidden);
    console.log(hidden)
  }
 
  const theme = extendTheme({
    colors: {
      primary: {
        50: "#3600e6",
        100: "#2900b4",
        150: "#cb1aff",
      },
    },
  });
  
  return (
    <NavigationContainer>

    <NativeBaseProvider theme={theme}>
     
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AuthStack}/>
        <Stack.Screen name="Package" options={{ headerShown: false }} component={PackageStack} />
      </Stack.Navigator>
    </NativeBaseProvider>
    </NavigationContainer>
  );
}
