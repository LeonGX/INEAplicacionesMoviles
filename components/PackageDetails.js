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
  HStack
} from "native-base";
import axios from "axios";

export const PackageDetail = ({ route }) => {
  const { id, status } = route.params;
  const [packageine, setPackageine] = useState([]);

  useEffect(() => {
    const getPackage = async () => {
      const formData = new FormData();
      formData.append("idPackage", id);
      formData.append("status", status);
      const response = await axios.post(
        "http://192.168.1.71:80/AplicacionesMoviles/GetPackageDetails.php",
        formData,
        { headers: { "Content-type": "multipart/form-data" } }
      );
      setPackageine(response.data[0]);
    };
    getPackage();
  }, []);
  return (
    <View style={styles.container}>
       <Box
      maxW="90%"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth={1}
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
            source={{
              uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
            }}
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
            fontSize: "xs",
          }}
          position="absolute"
          bottom="0"
          px="3"
          py="1.5"
        >
          PHOTOS
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            The Garden City
          </Heading>
          <Text
            fontSize="xs"
            _light={{
              color: "violet.500",
            }}
            _dark={{
              color: "violet.400",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            The Silicon Valley of India.
          </Text>
        </Stack>
        <Text fontWeight="400">
          Bengaluru (also called Bangalore) is the center of India's high-tech
          industry. The city is also known for its parks and nightlife.
        </Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
            >
              6 mins ago
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
      {/* <Box
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
              Paquete Electoral {packag.numberpackage}
            </Heading>
            <Text
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
          </Stack>
        </Stack>
      </Box> */}
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
});
