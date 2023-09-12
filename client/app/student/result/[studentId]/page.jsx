"use client";
import { publicRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export default function ResultPage({ params: { studentId } }) {
  const [result, setResult] = useState([]);
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get(`/results/${studentId}`);
        setResult(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <section>
      <table className="w-full my-4" key={result[0]?.id}>
        <tbody className="flex flex-col items-start">
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Your points</th>
            <td className="p-2 w-[70%]">{result[0]?.student_points}</td>
          </tr>
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Total points</th>
            <td className="p-2 w-[70%]">{result[0]?.total_points}</td>
          </tr>
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Question attempted</th>
            <td className="p-2 w-[70%]">{result[0]?.student_attempted}</td>
          </tr>
          <tr className="w-full flex border-b">
            <th className="py-2 bg-gray-300 w-[30%]">Total questions</th>
            <td className="p-2 w-[70%]">{result[0]?.total_questions}</td>
          </tr>
        </tbody>
      </table>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </section>
  );
}
