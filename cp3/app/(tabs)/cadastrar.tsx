import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [validade, setValidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [lote, setLote] = useState("");
  const [estado, setEstado] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [scanAtivo, setScanAtivo] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleBarCodeScanned = (scanningResult: any) => {
    if (scanningResult?.data) {
      setScanAtivo(false);
      setCodigoBarras(scanningResult.data);
    }
  };

  const salvarProduto = async () => {
    if (
      !nome ||
      !fabricacao ||
      !validade ||
      !quantidade ||
      !lote ||
      !estado ||
      !codigoBarras
    ) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    const novoProduto = {
      id: Date.now().toString(),
      nome,
      fabricacao,
      validade,
      quantidade,
      lote,
      estado,
      codigoBarras,
    };

    const dados = await AsyncStorage.getItem("produtos");
    const produtos = dados ? JSON.parse(dados) : [];
    produtos.push(novoProduto);
    await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
    Alert.alert("Produto salvo");
    limpar();
  };

  const limpar = () => {
    setNome("");
    setFabricacao("");
    setValidade("");
    setQuantidade("");
    setLote("");
    setEstado("");
    setCodigoBarras("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Fabricação"
        placeholderTextColor="#999"
        value={fabricacao}
        onChangeText={setFabricacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Validade"
        placeholderTextColor="#999"
        value={validade}
        onChangeText={setValidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        placeholderTextColor="#999"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Lote"
        placeholderTextColor="#999"
        value={lote}
        onChangeText={setLote}
      />
      <Text style={styles.label}>Estado</Text>
      <Picker
        selectedValue={estado}
        onValueChange={setEstado}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um estado" value="" color="#000" />
        {estados.map((uf) => (
          <Picker.Item key={uf} label={uf} value={uf} color="#000" />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Código de Barras"
        value={codigoBarras}
        editable={false}
      />

      {scanAtivo && permission?.granted ? (
        <>
          <CameraView
            style={{ height: 300, width: "100%", marginBottom: 10 }}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13", "ean8", "qr", "code128"],
            }}
            onBarcodeScanned={handleBarCodeScanned}
          />
          <Button
            title="Cancelar"
            color="#B10000"
            onPress={() => setScanAtivo(false)}
          />
        </>
      ) : (
        <Button
          title="Escanear Código de Barras"
          onPress={() => setScanAtivo(true)}
        />
      )}

      <Button title="Salvar" onPress={salvarProduto} color="#00B131" />
    </ScrollView>
  );
}

const estados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "#000",
  },
  label: { fontWeight: "bold", marginTop: 10 },
  picker: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    marginBottom: 20,
    color: "#000",
  },
});
