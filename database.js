// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOm8bEwkOsbUcDYsJIplWoYwtPevz2npg",
    authDomain: "wordhoard-8115c.firebaseapp.com",
    projectId: "wordhoard-8115c",
    storageBucket: "wordhoard-8115c.appspot.com",
    messagingSenderId: "984194436960",
    appId: "1:984194436960:web:ff96bdbf6c13306d885805",
    measurementId: "G-C6RPEKSSTC"
  };

  firebase.initializeApp(firebaseConfig)

    const database = firebase.database()


const saveWordsForm = document.querySelector("#saveWords")
const cards_wrapper = document.querySelector(".cards-wrapper")


saveWordsForm.addEventListener("submit",function(e){
    e.preventDefault()
    const wordInput = saveWordsForm.querySelector('#word').value
    const tagInput = saveWordsForm.querySelector('#tag').value
    const ExampleInput = saveWordsForm.querySelector('#example').value
    const meaningsInput = saveWordsForm.querySelector('#meanings').value
   

    const wordsRef = database.ref("words").push({
        word : wordInput,
        tag : tagInput,
        example : ExampleInput,
        meanings : meaningsInput
    })
    displayWords()
    })


    function displayWords()
    {
        let html = ''
        const retrieveData = database.ref("words")
        retrieveData.once("value",(snapshot)=>{
            const data = snapshot.val()

           for (const cardList in data) {
        //    console.log(data[cardList])
           let card = `
           <div class="card">
           <div class="word-detail">
           <h4>${data[cardList].word}</h4>
            <h5>${data[cardList].tag}</h5>
           </div>
           <div class="word">
           ${data[cardList].meanings}
           </div>
           <div class="example-word">
               <p>
               ${data[cardList].example}
               </p>
           </div>
           <div class="action-btns">
               <button class="material-symbols-outlined">edit</button>
               <button class="material-symbols-outlined">check</button>
               <button class="material-symbols-outlined">share</button>
               <button class="material-symbols-outlined">remove</button>
           </div>
           <div class="date">
               <span>jun 28,2023 at 05:10</span>
           </div>
       </div>
           `
           html += card
           }
      
           cards_wrapper.innerHTML = html
        })

    }
    displayWords()