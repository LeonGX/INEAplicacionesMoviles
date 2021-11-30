import React, { useState, useEffect } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  Pressable,
  Circle,
  Icon,
  HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {useIsFocused} from '@react-navigation/native'


export const Package = ({ data }) => {
  const navigation = useNavigation();
  const packag = data;
  const stepper = ["test", "test", "test", "test", "test"];
  const isFocused = useIsFocused();


  const seeDetails = () => {
    navigation.navigate("PackageDetails", {
      id: packag.IdPackage,
      status: packag.status,
    });
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={() => seeDetails()}>
        <Box
          style={styles.card}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Stack p="2" space={3}>
            <Stack space={2}>
              <Heading style={styles.heading} size="md">
                Paquete Electoral #{packag.numberpackage}
              </Heading>
              <HStack width="40%" style={{ marginRight:50}} >

              <Text
                style={styles.state}
                _light={{
                  color: "gray.500",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                >
                Estado actual: {packag.state}
                </Text>
              <View style={{marginLeft:50}}>

              <HStack  space={2}>
              {stepper.map((stepper, index) =>
                  index + 1 <= packag.status ? (
                    <Circle key={index} size={4} bg="#cc017a">
                      <Text style={styles.stepper}>{index + 1}</Text>
                    </Circle>
                  ) : (
                    <Circle key={index}  size={4} bg="#ff9ed8">
                      <Text style={styles.stepper}>{index + 1}</Text>
                    </Circle>
                  )
                  )}
              </HStack>
              </View>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    width: "95%",
    borderWidth: 1,
    borderColor: "#cc017a",
    justifyContent: "center",
  },
  circle: {
    padding: 10,
  },
  container: {
    marginVertical: 5,
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
  heading: {
    color: "black",
    fontWeight: "100",
    textTransform: "uppercase",
  },
  pressable: {
    width: "100%",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: "50%",
    backgroundColor: "red",
  },
  state: {
    fontSize: 12,
  },
  stepper: {
    color: "white",
    fontSize: 6,
  },
});
