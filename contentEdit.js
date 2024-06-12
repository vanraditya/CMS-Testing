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

var form = document.getElementById("kontenForm"),
    // file = document.getElementById("imgInput"),
    judul = document.getElementById("judul"),
    tautan = document.getElementById("tautan"),
    gambar = document.getElementById("gambar"),
    imgInput = document.querySelector(".card.imgholder img"),
    dibuat = document.getElementById("dibuat"),
    deskripsi = document.getElementById("deskripsi"),
    // post = document.getElementById("post"),
    // sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    contentInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newContentBtn = document.querySelector(".newContent");

function newInfo(tautan, judul, gambar, dibuat, deskripsi) {
    const collectionRef = collection(db, "konten");
    const docRef = doc(collectionRef);
  // Prepare the data object
    const data = {
        tautan: tautan,
        judul: judul,
        gambar: gambar,
        dibuat: dibuat,
        deskripsi: deskripsi
    };
}


// let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
// showInfo()

document.addEventListener('DOMContentLoaded', () => {
  newContentBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/Profile Icon.webp"
    form.reset()
  });
});


gambar.addEventListener('change', () => {
    const url = gambar.value;
  
    if (URLValidator.validate(url)) {
      imgInput.src = url;
    } else {
      // Optional: Display error message if URL is invalid
      console.error('Invalid image URL.');
    }
  });
// file.onchange = function(){
//     if(file.files[0].size < 1000000){  // 1MB = 1000000
//         var fileReader = new FileReader();

//         fileReader.onload = function(e){
//             imgUrl = e.target.result
//             imgInput.src = imgUrl
//         }

//         fileReader.readAsDataURL(file.files[0])
//     }
//     else{
//         alert("This file is too large!")
//     }
// }


async function showInfo(){
    document.querySelectorAll('.contentDetails').forEach(info => info.remove())

    const kontenRef = collection(db, "konten");
    const querySnapshot = await getDocs(kontenRef);
    
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.dibuat;
        const date = timestamp.toDate();
        let createElement = `<tr>
          <td>${doc.id}</td> <td><img src="${data.gambar}" alt="" width="50" height="50"></td>
          <td>${data.judul}</td>
          <td>${data.tautan}</td>
          <td>${date}</td>
          <td>${data.deskripsi}</td>
          <td>
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#readData">
              <i class="bi bi-eye"></i>
            </button>
          </td>
        </tr>`

        contentInfo.innerHTML += createElement
    });

    document.querySelectorAll('.contentDetails .btn-success').forEach(btn => {
      const documentId = doc.id; // Assuming this data attribute is set on the button
      btn.addEventListener('click', () => {
        readInfo(documentId); // Call readInfo with the document ID
      });
    });
}


async function readInfo(documentId) {
  const docRef = doc(db, "konten", documentId);
  const docSnap = await getDoc(docRef);
  
    if (docSnap.exists) {
      const data = docSnap.data();
      const date = data.dibuat.toDate().toLocaleString();
      document.querySelector('.showImg').src = data.gambar; // Update image
      document.querySelector('#showTautan').value = data.tautan; // Update values
      document.querySelector("#showJudul").value = data.judul; // Assuming judul is used for something like "age" in this context
      document.querySelector("#showDibuat").value = date; // Assuming dibuat is used for "city"
      document.querySelector("#showDeskripsi").value = data.deskripsi;
    } else {
      console.error("Document not found!");
    }
}


// function readInfo() {
//     document.querySelector('.showImg').src = pic,
//     document.querySelector('#showName').value = name,
//     document.querySelector("#showAge").value = age,
//     document.querySelector("#showCity").value = city,
//     document.querySelector("#showEmail").value = email,
//     document.querySelector("#showPhone").value = phone,
//     document.querySelector("#showPost").value = post,
//     document.querySelector("#showsDate").value = sDate
// }


// function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate){
//     isEdit = true
//     editId = index
//     imgInput.src = pic
//     userName.value = name
//     age.value = Age
//     city.value =City
//     email.value = Email,
//     phone.value = Phone,
//     post.value = Post,
//     sDate.value = Sdate

//     submitBtn.innerText = "Update"
//     modalTitle.innerText = "Update The Form"
// }


// function deleteInfo(index){
//     if(confirm("Are you sure want to delete?")){
//         getData.splice(index, 1)
//         localStorage.setItem("userProfile", JSON.stringify(getData))
//         showInfo()
//     }
// }

showInfo()
// form.addEventListener('submit', (e)=> {
//     e.preventDefault()

//     const information = {
//         picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
//         employeeName: userName.value,
//         employeeAge: age.value,
//         employeeCity: city.value,
//         employeeEmail: email.value,
//         employeePhone: phone.value,
//         employeePost: post.value,
//         startDate: sDate.value
//     }

//     if(!isEdit){
//         getData.push(information)
//     }
//     else{
//         isEdit = false
//         getData[editId] = information
//     }

//     localStorage.setItem('userProfile', JSON.stringify(getData))

//     submitBtn.innerText = "Submit"
//     modalTitle.innerHTML = "Fill The Form"

//     showInfo()

//     form.reset()

//     imgInput.src = "./image/Profile Icon.webp"  

//     // modal.style.display = "none"
//     // document.querySelector(".modal-backdrop").remove()
// })