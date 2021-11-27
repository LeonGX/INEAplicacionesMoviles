import React, { useState } from "react";
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
} from "native-base";
const PackageInfo = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Box
        style={styles.card}
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
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
              bg: "#cc017a",
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
            Instituto Nacional Electoral
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md">
              Paquete Electoral
            </Heading>
            <Text
              _light={{
                color: "#cc017a",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              
            >
              {props.data}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </View>
  );
};
export const StepperPackage = ({ route }) => {
  const { data } = route.params;
  const content = [
    <PackageInfo data={data} title="Información del Paquete " />,
    <Coords title="Ubicación Actual" />,
    <Confirmation title="Estado del paquete" />,
  ];
  const [active, setActive] = useState(0);
  return (
    <View style={{ marginVertical: 30, marginHorizontal: 30 }}>
      <Stepper
        active={active}
        content={content}
        
        onFinish={() => Alert.alert("Finalizado")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
      marginTop:50
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
