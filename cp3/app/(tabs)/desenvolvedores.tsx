import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function Desenvolvedores() {
  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Conheça a equipe por trás deste projeto! 💻
        </Text>

        <View style={styles.card}>
          <Image
            source={require("../../assets/images/integrante-gustavo.jpg")}
            style={styles.image}
          />
          <Text style={styles.cardTitle}>👨‍💻 Gustavo Camargo</Text>
          <Text style={styles.cardText}>📄 RM: 555562</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL("https://github.com/tcguus")}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/733/733609.png",
              }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>GitHub</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../assets/images/integrante-rodrigo.jpg")}
            style={styles.image}
          />
          <Text style={styles.cardTitle}>👨‍💻 Rodrigo Souza</Text>
          <Text style={styles.cardText}>📄 RM: 555451</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL("https://github.com/rsmanto")}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/733/733609.png",
              }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>GitHub</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../assets/images/integrante-leonardo.jpeg")}
            style={styles.image}
          />
          <Text style={styles.cardTitle}>👨‍💻 Leonardo Cesar</Text>
          <Text style={styles.cardText}>📄 RM: 558373</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL("https://github.com/leoc7sar")}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/733/733609.png",
              }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 0 },
  subtitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "FFF",
  },
  card: {
    backgroundColor: "#ccc",
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    gap: 6,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 100,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: "#000",
  },
  cardText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#999",
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    width: "40%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});