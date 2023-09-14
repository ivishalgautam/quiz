import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import CerticateTemplate from "../../certificate_template.png";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    textTransform: "capitalize",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Pdf = ({ result }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={{ ...styles.body }}>
        <Text style={styles.header} fixed></Text>
        <Text style={styles.text}>{`Name: ${result?.fullname}`}</Text>
        <Text style={styles.text}>{`Test name: ${result?.test_name}`}</Text>
        <Text
          style={styles.text}
        >{`Total questions: ${result?.total_questions}`}</Text>
        <Text
          style={styles.text}
        >{`You attempted: ${result?.student_attempted}`}</Text>
        <Text
          style={styles.text}
        >{`Total points: ${result?.total_points}`}</Text>
        <Text
          style={styles.text}
        >{`Your points: ${result?.student_points}`}</Text>
        <Image
          style={styles.image}
          src={CerticateTemplate}
          width={200}
          height={150}
        />
      </Page>
    </Document>
  );
};

export default Pdf;
