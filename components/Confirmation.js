import React, { useState } from "react";
import { View, StyleSheet, Alert,Button } from "react-native";

 export const Confirmation = () =>{
    const createTwoButtonAlert = () =>{
    Alert.alert(
      "¿EL PAQUETE FUE ENTREGADO?",
      " Seleccione una opcion ",
      [
        {
          text: "NO ENTREGADO",
          onPress: () => console.log("no se entrego el paquete"),
          style: "cancel"
        },
        { text: "ENTREGADO", onPress: () => console.log("se entrego el paquete")}
      ],
      { cancelable: false }
    );
    }
    return (
      <View style={styles.container}>
        <Button title="ENTREGA" onPress={createTwoButtonAlert} />
      </View>
    );
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});