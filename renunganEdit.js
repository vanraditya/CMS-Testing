// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, setDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

async function updateFirestore(tema, isi, ayat) {
  // Create a reference to the collection and document
  const collectionRef = collection(db, "informasi");
  const documentRef = doc(collectionRef, "renungan"); // Replace 'renungan' with the actual document ID (optional)

  // Prepare data object
  const data = {
    tema: tema,
    isi: isi,
    ayat: ayat,
  };

  try {
    // Update the document using setDoc
    await setDoc(documentRef, data);
    console.log('Document updated successfully!');
  } catch (error) {
    console.error('Error updating document:', error);
  }
}

const form = document.getElementById('renunganForm');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const tema = document.getElementById('tema').value;
  const isi = document.getElementById('isi').value;
  const ayat = document.getElementById('ayat').value;

  // Update Firestore
  updateFirestore(tema, isi, ayat);
});