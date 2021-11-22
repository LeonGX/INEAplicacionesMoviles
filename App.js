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
import { NavigationContainer } from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Drawer = createDrawerNavigator();
export default function () {
  const [message, setMessage] = useState("button");
  const [hidden, setHidden] = useState(false);
  // const Stack = createNativeStackNavigator();
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
      {/* <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Component1}/>
        <Drawer.Screen name="Details" component={InputPassword}/>
      </Drawer.Navigator> */}

      <InputPassword/>
      {/* <Center flex={1}>
        <Container>
          <Heading>
            A component library for the
            <Heading color="emerald.400"> React Ecosystem</Heading>
          </Heading>
          <Heading pt={4} fontWeight="300" fontSize="md">
            NativeBase is a simple, modular and accessible component library
            that gives you building blocks to build you React applications.
          </Heading>

          <InputPassword/>
          
        </Container>
      </Center> */}

    </NativeBaseProvider>
    </NavigationContainer>
  );
}
