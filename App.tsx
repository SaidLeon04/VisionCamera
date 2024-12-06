import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

const App = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.find((device) => device.position === "front");

  useEffect(() => {
    (async () => {
      const permissionResult = await Camera.requestCameraPermission();
      setCameraPermission(permissionResult === 'granted');
    })();
  }, []);
  

  if (!device || !cameraPermission) {
    return <Text>Solicitando acceso a la cámara frontal...</Text>;
  }

  return (
    <View style={styles.container}>
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Capturar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default App;
