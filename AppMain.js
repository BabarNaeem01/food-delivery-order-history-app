import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const getExpoHost = () => {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.manifest2?.extra?.expoGo?.debuggerHost,
    Constants.manifest?.debuggerHost
  ];

  const hostValue = candidates.find(Boolean) ?? "";
  const host = hostValue.split(":")[0];
  return host || "localhost";
};

const getApiBaseUrl = (port) => {
  const host = getExpoHost();
  return `http://${host}:${port}`;
};

const API_BASE_URL = getApiBaseUrl(4110);
const Stack = createNativeStackNavigator();

function HistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate("OrderDetails", { order: item })}>
            <Text style={styles.cardTitle}>Order #{item.order_code}</Text>
            <Text>{item.order_date}</Text>
            <Text style={styles.total}>${Number(item.total_price).toFixed(2)}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

function OrderDetailsScreen({ route }) {
  const { order } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order #{order.order_code}</Text>
        <Text>Date: {order.order_date}</Text>
        <Text>Total: ${Number(order.total_price).toFixed(2)}</Text>
        <Text style={styles.details}>Items: {order.items_summary}</Text>
      </View>
    </SafeAreaView>
  );
}

function MainApp() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff7ed" },
  title: { fontSize: 28, fontWeight: "700", color: "#c2410c", padding: 20 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: "#ffffff", borderRadius: 18, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 6 },
  total: { color: "#c2410c", fontWeight: "700", marginTop: 8 },
  details: { marginTop: 12, color: "#334155", lineHeight: 22 }
});

registerRootComponent(MainApp);

export default MainApp;
