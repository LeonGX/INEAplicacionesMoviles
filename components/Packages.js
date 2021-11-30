import React, { useState, useEffect,useRef } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, StyleSheet } from "react-native";
import { Coords } from "./Coords";
import { Confirmation } from "./Confirmation";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  ScrollView,
  Pressable,
  Circle,
  HStack,

} from "native-base";
import axios from "axios";
import {Package} from './Package'
import {useIsFocused} from '@react-navigation/native'


export const Packages = ({navigation}) => {
  const [packages, setPackages] = useState([]);
  const isFocused = useIsFocused();
  let isRendered = useRef(false);
  
  useEffect(() => {
    isRendered = true;
  const getPackages=async()=>{
    const response =await  axios.post("http://192.168.1.71:80/AplicacionesMoviles/getPackages.php", {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      }})
    setPackages(response.data)
  }
    getPackages()
    return () => {
      isRendered = false;
  };
  }, [isFocused])

  const seeDetails = (id,status) => {
    navigation.navigate("PackageDetails", {
      id: id,
      status: status,
    });
  };

  return (
    <ScrollView >
      {packages.map((pack)=>{
        return (

          <Package key={pack.numberpackage} data={pack}/>
        )
      })}
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: "90%",
    borderWidth: 1,
    borderColor: "#cc017a",
    justifyContent: "center",
  },
  container: {
    marginVertical: 10,
    height: 675,
    alignItems: "center",
  },
  component: {
    marginVertical: 10,
    backgroundColor: "red",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
