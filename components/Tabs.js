import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
  },
  tabsContainer: {
    backgroundColor: "#e3e3e3",
    padding: 2,
    borderRadius: 8,
    flexDirection: "row",
    flex: 1,
    
  },
  activeTab: {
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
  },
  tabContainer: {
    flex: 1,
    padding: 4,
    alignItems: "center",
    borderRadius: 8,
  },
});

export default function Tabs({ tabs = [], content = [] }) {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {tabs.flatMap((tab, index) => (
            <Pressable
              key={index}
              style={[
                styles.tabContainer,
                selectedTab === index ? styles.activeTab : [],
              ]}
              onPress={() => {
                setSelectedTab(index);
              }}
            >
              <Text key={index}>{tab}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={{ flex: 1, padding: 8 }}>{content?.[selectedTab]}</View>
    </>
  );
}
