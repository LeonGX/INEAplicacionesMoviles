import React, { useState, useEffect } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, StyleSheet } from "react-native";

import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  HStack,
} from "native-base";
import axios from "axios";
import * as Location from "expo-location";

export const PackageDetail = ({ route }) => {
  const { id, status } = route.params;
  const [packageine, setPackageine] = useState([]);
  const [address, setAddress] = useState("");

  const img = require("../assets/banner-ine.png");

  useEffect(() => {
    const getPackage = async () => {
      const formData = new FormData();
      formData.append("idPackage", id);
      formData.append("status", status);
      const response = await axios.post(
        "http://192.168.1.71:80/AplicacionesMoviles/GetPackageDetails.php",
        formData,
        { headers: { "Content-type": "multipart/form-data" } }
      )
      setPackageine(response.data[0]);
      let latitud = parseFloat(response.data[0].latitud)
      let longitud = parseFloat(response.data[0].longitud)
      let responseAddress = await Location.reverseGeocodeAsync({
        latitude:latitud,
        longitude:longitud
      });
      for (let item of responseAddress) {
        let address = `${item.street} #${item.name}, ${item.district} ${item.postalCode}, ${item.city}; ${item.region}`;
  
        setAddress(address);
      }
    };
    getPackage();
  }, []);
  return (
    <View style={styles.container}>
      <Box
        maxW="95%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth={1}
        height="100%"
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
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              height="100%"
              resizeMode={"cover"}
              width="100%"
              source={require("../assets/banner-ine.png")}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="#cc017a"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xl",
            }}
            position="absolute"
            bottom={0}
            px={3}
            py={1.5}
          >
            Instituto Nacional Electoral
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading style={styles.title} size="md" ml={-1}>
              Paquete Electoral N°{" "}
              <Text style={styles.number}>{packageine.numberpackage}</Text>
            </Heading>
            <Text
              fontSize="sm"
              _light={{
                color: "#cc017a",
              }}
              _dark={{
                color: "#cc017a",
              }}
              fontWeight="500"
              ml={-0.5}
              mt={-1}
            >
              Entrega y actualización de paquetes electorales
            </Text>
          </Stack>
          <Text fontWeight="400">
            <Text style={styles.info}>Número identificador: </Text> {packageine.IdPackage}
          </Text>
          <Text fontWeight="400"><Text style={styles.info}>Situación actual: </Text> {packageine.state}</Text>
          <Text fontWeight="400">
          <Text style={styles.info}>Ubicación aproximada del paquete: </Text> {address}
          </Text>
          
        </Stack>
      </Box>
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
    color: "black",
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
  info:{
    color:'black'
  },  
  number: {
    color: "#cc017a",
    fontWeight: "bold",
    fontSize: 25,
  },
});
