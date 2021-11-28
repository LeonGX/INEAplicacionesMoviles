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
  IconButton,
} from "native-base";
import Component1 from "./components/Component1";
import { Text, Alert } from "react-native";
import { InputPassword } from "./components/InputPassword";
import { PackageDetail } from "./components/PackageDetails";
import { QRCode } from "./components/QRCode";
import { StepperPackage } from "./components/Stepper";
import { Packages } from "./components/Packages";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function () {
  const [message, setMessage] = useState("button");
  const [hidden, setHidden] = useState(false);
  const Stack = createNativeStackNavigator();
  const Auth = createNativeStackNavigator();
  const Package = createBottomTabNavigator();
  const PackageDetails = createNativeStackNavigator();

  const PackageDetailsStack = () =>(
    <PackageDetails.Navigator
    initialRouteName="PackagesList"
    screenOptions={{
      animationEnabled: false,
    }}
    headerMode="none"
    >
      <PackageDetails.Screen  name='PackagesList' options={{ headerShown: false }} component={Packages}/>
      <PackageDetails.Screen  name='PackageDetails' options={{ title: 'Detalles de paquete electoral' }}  component={PackageDetail}/>
    </PackageDetails.Navigator>
  )
  const AuthStack = () => (
    <Auth.Navigator
      initialRouteName="Login"
      screenOptions={{
        animationEnabled: false,
      }}
      headerMode="none"
    >
      <Auth.Screen
        name="Login"
        options={{ headerShown: false }}
        component={InputPassword}
      />
    </Auth.Navigator>
  );

  const PackageStack = () => (
    <Package.Navigator
      initialRouteName="Packages"
      screenOptions={{
        animationEnabled: false,
        tabBarActiveTintColor: '#cc017a',
      }}
      headerMode="none"
    >
      <Package.Screen
        name="Packages"
        options={{
          tabBarLabelStyle:{fontSize:15,marginTop:10},
          tabBarStyle: { height:'8%',padding:10},
          tabBarLabel: "Paquetes",
          tabBarIcon: () => (
            <FontAwesome5 name="box" size={35} />
          ),
          headerShown: false,
        }}
        component={PackageDetailsStack}
      />
      <Package.Screen
        name="Stepper"
        options={{
          tabBarLabelStyle:{fontSize:15,marginTop:10},
          tabBarStyle: { height:'8%', padding:10},
          tabBarLabel: "Escanear Código QR",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="qrcode" size={40} />
          ),
          headerShown: false,
        }}
        component={QRCode}
      />
    </Package.Navigator>
  );
  const handleHidden = () => {
    setHidden(!hidden);
    console.log(hidden);
  };

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
          <Stack.Screen options={{ headerShown: false }} name="Home" component={AuthStack} />
          <Stack.Screen
            name="Package"
            options={{ headerShown: false }}
            component={PackageStack}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
