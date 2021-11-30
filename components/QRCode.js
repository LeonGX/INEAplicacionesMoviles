import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, AlertDialog, useToast } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import * as Location from "expo-location";

export const QRCode = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [coords, setCoords] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [finished, setFinished] = useState(false);
  const [unfinished, setUnfinished] = useState(false);
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(false);
  const [text, setText] = useState("Escanea el código QR");

  const onClose = () => setIsOpen(false);
  const toast = useToast();
  const cancelRef = useRef(null);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const formData = new FormData();
    formData.append("numberpackage", data);
    const response = await axios.post(
      "http://192.168.1.71:80/AplicacionesMoviles/GetPackageQR.php",
      formData,
      { headers: { "Content-type": "multipart/form-data" } }
    );

    if (response.data.length !== 0) {
      if (response.data[0].package_status == 5) {
        setText(data);
        setFinished(true);
      } else {
        setText(data);
        setUnfinished(true);
        console.log(unfinished);
        setInfo(response.data[0]);
      }
    } else {
      setText('Error')
      setError(true);
    }
  };

  const successUpdate = () => {
    toast.show({
      title: "Actualizado",
      status: "success",
      placement: "top",
      description: "Paquete electoral actualizado con éxito",
    });
    setTimeout(() => {
      navigation.navigate("Packages");
    }, 2000);
  };

  const updateInfo = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    setCoords(location);
    const { latitude, longitude } = location.coords;
    const formData = new FormData();
    formData.append("IdTracking", info.IdTracking);
    formData.append("Id_State", info.Id_State);
    formData.append("package_status", info.package_status);
    formData.append("IdPackage", info.IdPackage);
    formData.append("latitud", latitude);
    formData.append("longitud", longitude);
    const response = await axios.post(
      "http://192.168.1.71:80/AplicacionesMoviles/updateQR.php",
      formData,
      { headers: { "Content-type": "multipart/form-data" } }
    );
    response.data == true
      ? successUpdate()
      : toast.show({
          title: "Error",
          status: "error",
          placement: "top",
          description: "Algo salió mal, intenta de nuevo",
        });
    setScanned(false);
    setFinished(false);
    setText("Escanea el código QR");
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {unfinished && (
        <>
          <Text>Paquete Electoral N°: {info.numberpackage}</Text>
          <Text>N° identificador: {info.IdPackage}</Text>
          <Text>Estado actual: {info.state}</Text>
          <Text style={{ marginBottom: 10 }}>
            Siguiente estado: {info.next}
          </Text>
          <Button
            width="75%"
            marginBottom={5}
            backgroundColor={"#cc017a"}
            onPress={updateInfo}
          >
            Actualizar información
          </Button>
          <Button
            width="75%"
            backgroundColor={"#cc0000"}
            onPress={() => {
              setScanned(false);
              setUnfinished(false);
              setText("Escanea el código QR");
            }}
          >
            Escanear de nuevo
          </Button>
        </>
      )}

      {finished && (
        <>
          <Text>Este paquete ya completo su recorrido! </Text>
          <Text>Intenta escaneando otro paquete</Text>
          <Button
            width="75%"
            backgroundColor={"#cc0000"}
            onPress={() => {
              setScanned(false);
              setFinished(false);
              setText("Escanea el código QR");
            }}
          >
            Escanear de nuevo
          </Button>
        </>
      )}
      {error && (
        <>
          <Text>Al parecer este código QR no pertenece al INE!</Text>
          <Text>Intenta escaneando otro paquete</Text>
          <Button
            width="75%"
            backgroundColor={"#cc0000"}
            onPress={() => {
              setScanned(false);
              setError(false);
              setText("Escanea el código QR");
            }}
          >
            Escanear de nuevo
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color: "#cc017a",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#cc017a",
  },
  button: {
    backgroundColor: "#cc017a",
    height: 50,
  },
});
