import React, { useState } from "react";
import { Switch } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { TouchableHighlight } from "react-native"; 
import { Alert } from "react-native";

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    elevation: 4,
    padding: 16,
    marginTop: 8,
    margin: 10, 
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20, 
    elevation: 7,
    shadowColor: "#000",   
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    height: "100%",
    paddingLeft: 16,
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    opacity: 0.5,
    fontSize: 12,
  },
  icon: {
    backgroundColor: "#eee",
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  stateContainer: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  stateText: {
    textTransform: "capitalize",
    textAlign: "right",
    flex: 1,
  },
  temperature:{
    color: "#000",
    fontSize: 20,
    fontWeight: "bold", 
  }, 
  iconContainer:{
    marginHorizontal: 20
  }
});

function Lock({ device }) {
  const [state, setState] = useState(device.attributes.state);
  const [name, setName] = useState(device.attributes.name); 
  const updateName = () => setName(() => name); 

  return (
    <View style={styles.itemContainer}>
      <View style={styles.icon}></View>
      <View style={styles.contentContainer}>
      <TextInput 
               
               style={styles.title}
               defaultValue={name}
               onChangeText={()=> updateName}
               keyboardType='default'
               />
        <Text style={styles.subTitle}>{device.attributes.model_number}</Text>
        <View style={styles.stateContainer}>
          <Switch
            thumbColor={state === "locked" ? "green" : "red"}
            trackColor={{
              false: "#f003",
              true: "#0f03",
            }}
            onValueChange={(e) => setState(e ? "locked" : "unlocked")}
            value={state === "locked"}
          />
          <Text
            style={[
              styles.stateText,
              {
                color: state === "locked" ? "green" : "red",
              },
            ]}
          >
            <Ionicons
              name={
                state === "locked" ? "lock-closed-outline" : "lock-open-outline"
              }
              size={20}
              color={state === "locked" ? "green" : "red"}
            />
            {' '}
            {state}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Thermostat({ device }) {
  const [target, setTarget] = useState(Number(device.attributes.target_temperature));
  const [name, setName] = useState(`${device.attributes.name}`); 
  const updateName = () => setName(() => name); 
  const updateTarget = () => setTarget(() => Number(target)); 

  return (
    <View style={styles.itemContainer}>
      <View style={styles.icon}></View>
      <View style={styles.contentContainer}>
      <TextInput 
               
               style={styles.title}
               defaultValue={name}
               onChangeText={()=> updateName}
               keyboardType='default'
               />
        <Text style={styles.subTitle}>{device.attributes.model_number}</Text>
        <View style={styles.stateContainer}>
          <View>
            <Text style={styles.temperature}>{device.attributes.temperature} °F</Text>
            <Text style={styles.subTitle}>CURRENT</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name='arrow-forward-outline' size={20}/>
          </View>
            
          <View>
            <View style={styles.stateContainer}>
            <TextInput 
               
              style={styles.temperature}
              defaultValue={target}
              numbericw
              onChangeText={()=> updateTarget}
              keyboardType='number-pad'
              maxLength={2}
              />
              <Text style={styles.temperature}>°F</Text>
            </View>

            <Text style={styles.subTitle}>TARGET</Text>
          </View>
          </View>
      </View>
    </View>
  );
}

const Item = ({device}) =>{
  if (device.type === 'lock'){
    return(
      <Lock device={device}/>
    )
  } else {
    return(
      <Thermostat device={device}/>
    )
  }
}; 


export default function DeviceList({ devices = [] }) {
  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this device?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped for now, needs to have a functionality to remove a device from API. 
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View>
      <FlatList
        data={devices}
        renderItem={({ item, index }) => 
        <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onLongPress={() => showConfirmDialog()}>
          <Item device={item} />
        </TouchableHighlight>
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}; 
