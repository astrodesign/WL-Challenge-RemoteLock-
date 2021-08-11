import moment from "moment";
import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableHighlight, Alert } from "react-native";
import { FlatList } from "react-native";
import { View, Text } from "react-native";

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
     
  },
  stateText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontWeight: 'bold',
    textTransform: "uppercase",
  },
});
 

function Item({ user }) {
  const status = useMemo(() => {
    const format = "YYYY-MM-DDTHH:mm:ss";
    let status = "User Access";
    if (!!user.attributes.starts_at && !!user.attributes.ends_at)
      status = moment().isBetween(
        moment(user.attributes.starts_at, format),
        moment(user.attributes.ends_at, format),
        "minutes"
      )
        ? "active"
        : moment().isBefore(moment(user.attributes.starts_at, format))
        ? "upcoming"
        : "expired";
    return status;
  }, [user.attributes.starts_at, user.attributes.ends_at]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.icon}></View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{user.attributes.name}</Text>
        <Text style={styles.subTitle}>{user.attributes.email}</Text>
        <View style={styles.stateContainer}>
          <Text
            style={[
              styles.stateText,
              {
                color:
                  status === "active"
                    ? "green"
                    : status === "expired"
                    ? "red"
                    : "orange",
                backgroundColor:
                  status === "active"
                    ? "#0f03"
                    : status === "expired"
                    ? "#f003"
                    : "#orange",
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function UserList({ users = [] }) {
    const [showBox, setShowBox] = useState(true);
  
    const showConfirmDialog = () => {
      return Alert.alert(
        "Are your sure?",
        "Are you sure you want to remove this User?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              setShowBox(false);
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped for now, needs to have a functionality to remove a user from API. 
          {
            text: "No",
          },
        ]
      );
    };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item, index }) => <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onLongPress={() => showConfirmDialog()}>
          <Item user={item} />
        </TouchableHighlight>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
