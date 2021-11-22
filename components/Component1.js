import React, { useEffect, useState } from "react"
import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
} from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import axios from "axios";

const Component1 = ({navigation}) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getData = async ()=>{
      const response = await axios.post('http://192.168.1.71/AplicacionesMoviles/index.php')
      setUsers(response.data)
      console.log("USER",users)
    }
    getData()
  }, [])
  return (
    <NativeBaseProvider>

      {users.map(user=>(
        <Heading>{user.name } {user.password}</Heading>
      ))}
    </NativeBaseProvider>

  );
};

export default Component1;
