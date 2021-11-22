import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  Pressable,
  Input,
  Icon,
  IconButton,
  Container,
  Stack,
  Heading,
  Button,
  Center,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { backgroundColor, borderColor } from "styled-system";

export const InputPassword = ({ navigation }) => {
  const [value, setValue] = useState({
    nickname: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nickname", value.nickname);
    formData.append("password", value.password);
    const response = await axios.post(
      "http://192.168.1.71:80/AplicacionesMoviles/index.php",
      formData,
      { headers: { "Content-type": "multipart/form-data" } }
    );
    let isLogged = response.data.result;
    console.log(typeof isLogged);
    navigation.navigate("Details", { name: value.nickname });
  };
  const Submit = () => {
    return <Button onPress={handleSubmit}>Login</Button>;
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
    },
    paragraph: {
      fontSize: 18,
      textAlign: "center",
    },
    logo: {
      marginTop: 100,
    },
    heading: {
      color: "black",
      fontSize: 15,
      fontWeight:'normal',
      marginBottom: 10,
      marginTop: 60,
      
    },
  });
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/ine-logo.png")} />
      <Heading pt={4} style={styles.heading}>
        Ingresa tus datos para iniciar sesión
      </Heading>
      <Input
        p={4}
        width="75%"
        placeholder="Correo electrónico"
        onChangeText={(text) => {
          setValue({ ...value, nickname: text });
        }}
      />
      <Input
        p={4}
        m={3}
        type={show ? "text" : "password"}
        width="75%"
        onChangeText={(text) => setValue({ ...value, password: text })}
        InputRightElement={
          <Pressable>
            <IconButton
              icon={
                <Icon
                  size="sm"
                  as={MaterialIcons}
                  name={!show ? "visibility" : "visibility-off"}
                />
              }
              onPress={handleClick}
            />
          </Pressable>
        }
        placeholder="Contraseña"
      />
      <Button  width="75%" backgroundColor={"#cc017a"} onPress={handleSubmit}>
        Iniciar sesión
      </Button>
    </View>
    // <Container>
    //   <Stack space={5} w="100%" direction="column">
    //     <Center  bg="primary.400" p="20">
    //       Center
    //     </Center>

    //     {/* <Heading pt={4} fontWeight="100" size="sm">
    //       Login for application
    //     </Heading>

    //     <Submit /> */}
    //   </Stack>
    // </Container>
  );
};
