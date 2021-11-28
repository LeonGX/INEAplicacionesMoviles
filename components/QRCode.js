import React, { useState, useEffect, useRef} from "react";
import { View, StyleSheet} from "react-native";
import {Button, Text,AlertDialog,useToast} from 'native-base'
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import * as Location from "expo-location";



export const QRCode = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [coords, setCoords] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const [scanned, setScanned] = useState(false);
  const [info, setInfo] = useState([]);
  const [text, setText] = useState("Escanea el código QR");

  const onClose = () => setIsOpen(false)
  const toast = useToast();
  const cancelRef = useRef(null)

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
    setText(data);
    const formData = new FormData();
      formData.append("numberpackage", data);
      const response = await axios.post(
        "http://192.168.1.71:80/AplicacionesMoviles/GetPackageQR.php",
        formData,
        { headers: { "Content-type": "multipart/form-data" } }
      )
      setInfo(response.data[0])
      console.log(response.data[0])
    
  };

  const updateInfo= async ()=> {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setCoords(location);
      const {latitude,longitude} = location.coords;
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
      )
      response.data==true ? navigation.navigate('Packages') : toast.show({
        title: "Error",
        status: "error",
        placement: "top",
        description: "Algo salió mal, intenta de nuevo",
      });
      onClose()
  
  }




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

      {scanned && (
        <>
          <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Actualizar información de paquete</AlertDialog.Header>
        <AlertDialog.Body>
          Se actualizará el estado del paquete. Además,
          se almacenará la ubicación actual para el seguimiento del estado del paquete.
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}
            >
              Cancelar
            </Button>
            <Button backgroundColor="#cc017a" onPress={updateInfo}>
              Actualizar
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
         
        <Text>Paquete Electoral N°: {info.numberpackage}</Text>
        <Text>N° identificador: {info.IdPackage}</Text>
        <Text>Estado actual: {info.state}</Text>
        <Text style={{ marginBottom: 10 }}>Siguiente estado: {info.next}</Text>
        <Button width="75%" marginBottom={5} backgroundColor={"#cc017a"} onPress={() => setIsOpen(!isOpen)} >
        Actualizar información
      </Button>
      <Button width="75%" backgroundColor={"#cc0000"}  onPress={() => {
            setScanned(false);
            setText("Escanea el código QR");
          }} >
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
