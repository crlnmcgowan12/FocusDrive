import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { accelerometer } from "react-native-sensors";
import axios from "axios";

export default function App() {
  const [motion, setMotion] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      setMotion({ x, y, z });

      if (Math.abs(x) > 5 || Math.abs(y) > 5) {
        Alert.alert("Distracted Driving Alert!", "Keep your hands on the wheel!");
        axios.post("http://your-backend-api.com/detect", { x, y, z });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View>
      <Text>Motion: X: {motion.x.toFixed(2)} Y: {motion.y.toFixed(2)} Z: {motion.z.toFixed(2)}</Text>
      <Button title="Simulate Driving Alert" onPress={() => Alert.alert("Test", "Distracted driving detected!")} />
    </View>
  );
}
