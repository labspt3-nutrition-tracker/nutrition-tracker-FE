import React, { Component } from "react";
import { Document, Page, Text, View, Font, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  document: {
    width: "100%",
    height: "100vh"
  },
  title: {
    margin: 20,
    fontSize: 25,
    textAlign: "center",
    // color: "#3685B5",
    textTransform: "uppercase"
  },
  body: {
    flexGrow: 1
  },
  row: {
    flexGrow: 1,
    flexDirection: "row"
  },
  block: {
    flexGrow: 1
  },
  text: {
    width: "60%",
    margin: 10,
    textAlign: "justify"
  },
  fill1: {
    width: "40%"
    // backgroundColor: "#e14427"
  },
  fill2: {
    flexGrow: 2
    // backgroundColor: "#e6672d"
  },
  fill3: {
    flexGrow: 2,
    backgroundColor: "#e78632"
  },
  fill4: {
    flexGrow: 2,
    backgroundColor: "#e29e37"
  }
});

class PDFReport extends Component {
  state = {};

  render() {
    return (
      <>
        <Document>
          <Page size='A4'>
            <View style={styles.body}>
              <View>
                <Text style={styles.title}>Report For The Last 7 Days</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum.
                </Text>
                <View style={styles.fill1} />
              </View>
              <View style={styles.row}>
                <View style={styles.fill2} />
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum.
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </>
    );
  }
}

export default PDFReport;
