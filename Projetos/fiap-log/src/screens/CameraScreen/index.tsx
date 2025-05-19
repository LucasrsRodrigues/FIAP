import { StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";

export default function CameraScreen() {
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()

  //   if (!hasPermission) return <PermissionsPage />
  // if (device == null) return <NoCameraDeviceError />

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  )
}