import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { colorScheme, useColorScheme } from "nativewind";

colorScheme.set("dark");

import { Fontisto, MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { useCameraPermission } from "react-native-vision-camera";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const { navigate } = useNavigation();

  async function openCamera() {
    try {
      if (!hasPermission) {
        const permission = await requestPermission();

        if (!permission) {
          throw new Error("Permissão não dada");
        }
      }


      navigate("CameraScreen");

    } catch (error) {
      console.log("===> openCamera")
      console.log(error)
      console.log("===> openCamera")
    }
  }

  return (
    <View className="flex-1 pt-20 bg-main p-5 gap-10">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row justify-between">
        {/* Caixa da esquerda */}
        <View className="flex-row gap-3">
          {/* Foto */}
          <Image
            source={{
              uri: "https://github.com/lucasrsrodrigues.png"
            }}
            className="w-12 h-12 rounded-full"
          />

          {/* Nome */}
          <View >
            <Text className="text-gray-100 text-sm">
              Welcome Back
            </Text>

            <Text className="text-gray-100 font-medium text-base">
              Stephen McConan
            </Text>
          </View>
        </View>

        {/* Caixa da direita */}
        <View className="justify-center">
          {/* Notificacao */}
          <Fontisto name="bell-alt" size={24} color="#fff" />
        </View>
      </View>

      {/* Input de Busca + Scan */}
      <View className="flex flex-row items-center gap-4">
        {/* Fake Input */}
        <View className="flex-1 flex-row items-center border border-[#ffffff10] rounded-[10px] px-4 py-1 gap-3">
          <FontAwesome name="search" size={24} color="#999999" />

          <TextInput
            placeholder="Enter Receipt Number"
            className="text-white  flex-1"
            placeholderTextColor="#999999"
          />
        </View>

        <TouchableOpacity className="border border-[#ffffff10] rounded-[10px] p-3" onPress={openCamera}>
          <MaterialCommunityIcons name="line-scan" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Entrega atual */}
        <View>
          <Text className="text-white text-base font-semibold">Current Shipment</Text>

          {/* Caixa de detalhe */}
          <View className="bg-[#131417] rounded-[10px] h-[214px] mt-4">
            {/* Codigo de envio */}
            <View
              className="flex-row items-center justify-between pt-3 pl-4 pr-5 pb-4 border border-b-[#FFFFFF10] border-t-0 border-x-0"
            >
              <View>
                <Text
                  className="text-[#999999] text-sm"
                >
                  Shipment Number
                </Text>
                <Text
                  className="text-[#ffff] font-medium text-sm"
                >
                  DEL - 1290510916819
                </Text>
              </View>

              <View>
                <Feather name="box" size={24} color="#fff" />
              </View>
            </View>

            {/* Infos */}
            <View>
              {/* Linha */}
              <View className="flex-row justify-between px-5 py-4">
                <View>
                  <Text className="text-[#999999]">Sender</Text>
                  <Text className="text-white">Kemang, Jakarta, 12730</Text>
                </View>

                <View>
                  <Text className="text-[#999999]">Item</Text>
                  <Text className="text-white">Samsung S24</Text>
                </View>
              </View>

              <View className="flex-row justify-between px-5 py-4">
                <View>
                  <Text className="text-[#999999]">Receiver</Text>
                  <Text className="text-white">Dago, Bandung, 40135</Text>
                </View>

                <View>
                  <Text className="text-[#999999]">Status</Text>
                  <View className="flex-row gap-[6px] items-center">
                    <View className="w-1 h-1 bg-green-500 rounded-full" />
                    <Text className="text-white">On Progress</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Historico */}
        <View className="mt-10">
          <Text className="text-white text-base font-semibold">Shipment History</Text>

          <View className="mt-4 bg-[#131417] rounded-[10px]">
            {/* Item */}
            <View className="flex-row items-center justify-between py-3 px-4">
              <View className="flex-row items-center gap-3">
                <Feather name="box" size={24} color="#fff" />

                <View>
                  <Text className="text-[#999999]">Samsung S24</Text>
                  <Text className="text-white">DEL - 1290510916819</Text>
                </View>
              </View>

              <View className="flex-row gap-[6px] items-center">
                <View className="w-1 h-1 bg-green-500 rounded-full" />
                <Text className="text-white">On Progress</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between py-3 px-4">
              <View className="flex-row items-center gap-3">
                <Feather name="box" size={24} color="#fff" />

                <View>
                  <Text className="text-[#999999]">Samsung S24</Text>
                  <Text className="text-white">DEL - 1290510916819</Text>
                </View>
              </View>

              <View className="flex-row gap-[6px] items-center">
                <View className="w-1 h-1 bg-green-500 rounded-full" />
                <Text className="text-white">On Progress</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between py-3 px-4">
              <View className="flex-row items-center gap-3">
                <Feather name="box" size={24} color="#fff" />

                <View>
                  <Text className="text-[#999999]">Samsung S24</Text>
                  <Text className="text-white">DEL - 1290510916819</Text>
                </View>
              </View>

              <View className="flex-row gap-[6px] items-center">
                <View className="w-1 h-1 bg-green-500 rounded-full" />
                <Text className="text-white">On Progress</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between py-3 px-4">
              <View className="flex-row items-center gap-3">
                <Feather name="box" size={24} color="#fff" />

                <View>
                  <Text className="text-[#999999]">Samsung S24</Text>
                  <Text className="text-white">DEL - 1290510916819</Text>
                </View>
              </View>

              <View className="flex-row gap-[6px] items-center">
                <View className="w-1 h-1 bg-green-500 rounded-full" />
                <Text className="text-white">On Progress</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between py-3 px-4">
              <View className="flex-row items-center gap-3">
                <Feather name="box" size={24} color="#fff" />

                <View>
                  <Text className="text-[#999999]">Samsung S24</Text>
                  <Text className="text-white">DEL - 1290510916819</Text>
                </View>
              </View>

              <View className="flex-row gap-[6px] items-center">
                <View className="w-1 h-1 bg-green-500 rounded-full" />
                <Text className="text-white">On Progress</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}