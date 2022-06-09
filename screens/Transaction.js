import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity, AsyncStorage} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";



export default class TransactionScreen extends Component {
  constructor(){
    super();
    this.state={
      domState : "normal",
      hasCameraPermissions : null,
      scanned: false,
      scannedData:""
    }
  }

  getCameraPermission=async(domState)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions : status === "granted",
      domState:domState,
      scanned:false
    })
  }

  handleBarcodeScanned=async({type,data})=>{
    this.setState({
      scannedData:data,
      domState:"normal",
      scanned:"true"
    })
  }
  render() {
    const { domState,hasCameraPermissions,scanned,scannedData} = this.state;

    if(domState === "scanner"){
      return(
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned} style={StyleSheet.absoluteFillObject}/>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Transaction Screen</Text>
        <TouchableOpacity style={styles.button} onPress={()=>this.getCameraPermission("scanner")}>
         <Text style={styles.buttonText}> Scan QR code</Text>
        </TouchableOpacity>

        <Text> 
          {hasCameraPermissions ? scannedData : "Request for Camera Permissions"}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button:{
    width:"43%",
    height:55,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F48D20",
    borderRadius:15
  },
  buttonText:{
    fontSize:24,
    color:"white"
  }
});
