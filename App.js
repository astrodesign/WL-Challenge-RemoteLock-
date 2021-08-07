import * as React from "react";
import { View } from "react-native";
import { SafeAreaView, StatusBar } from "react-native";
import Tabs from "./components/Tabs";
import DeviceList from "./components/DeviceList";
import UserList from "./components/UserList";
import { useFetchData } from "./hooks/useFetchData";
import { FETCH_USERS_URL, FETCH_DEVICES_URL, FETCH_Z_DEVICES_URL } from "./Constants";

export default function TabViewExample() {
  const {
    loading: loadingUsers,
    data: dataUsers,
    fetchData: fetchUsers,
  } = useFetchData(FETCH_USERS_URL);
  
  const {
    loading: loadingDevices,
    data: dataDevices,
    fetchData: fetchDevices,
  } = useFetchData(FETCH_Z_DEVICES_URL);

  React.useEffect(() => {
    fetchDevices();
    fetchUsers();
  }, [fetchDevices, fetchUsers]);


  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          tabs={["Devices", "Users",]}
          content={[
            <DeviceList devices={dataDevices} />,
            <UserList users={dataUsers} />,
          ]}
        />
      </SafeAreaView>
    </View>
  );
}
