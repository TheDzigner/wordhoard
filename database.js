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
let showedCards  = ''
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
    }).then(()=>{
        alert("saved succesfully")
    }).catch((error)=>{
        alert("failed to save card",error.message)
    })

    displayCards()
    })


    function displayCards()
    {
        let html = ''
        const retrieveData = database.ref("words")
        retrieveData.once("child_added",(snapshot)=>{
            const data = snapshot.val()
            const key = snapshot.key
            const word = data.word 
            const tag = data.tag
            const example = data.example 
            const meanings = data.meanings

           let card = `
           <div class="card">

           <div class="word-detail">
           <h4 class="word">${word}</h4>
            <h5 class="tag">${tag}</h5>
           </div>

           <div class="meanings">
             ${meanings}
           </div>

           <div class="example-word">
               <p class="example">
               ${example}
               </p>
           </div>

           <div class="action-btns"  contentEditable="false">
               <button class="edit material-symbols-outlined" data-action="${key}">edit</button>
               <button class="check material-symbols-outlined" data-action="${key}">check</button>
               <button class="share material-symbols-outlined" data-action="${key}">share</button>
               <button class="remove material-symbols-outlined" data-action="${key}">remove</button>
           </div>
           <div class="date">
               <span  contentEditable="false">jun 28,2023 at 05:10</span>
           </div>
       </div>
           `
           html += card
      
           cards_wrapper.innerHTML = html

           const cards = document.querySelectorAll(".card")
      
           cards.forEach((card)=>{
               const editbtn = card.querySelector(".edit")
               const checkbtn = card.querySelector(".check")
               const sharebtn = card.querySelector(".share")
               const removebtn = card.querySelector(".remove")

            const word_detail = card.querySelector('.word-detail h4')
            const word_tag = card.querySelector('.word-detail h5')
            const meaningsContainer = card.querySelector('.meanings')
            const exampleContainer = card.querySelector('.example-word')
             
   
               checkbtn.style.display = "none"
   
               editbtn.addEventListener("click",function(e){
                  const btnKey = e.target.dataset.action 
 
            
        word_detail.setAttribute("contentEditable",true)
        word_detail.focus()
        word_tag.setAttribute("contentEditable",true)
        word_tag.focus()
          meaningsContainer.setAttribute("contentEditable",true)
          meaningsContainer.focus()
          exampleContainer.setAttribute("contentEditable",true)
          exampleContainer.focus()

                checkbtn.style.display = "inline-block"
                editbtn.style.display = "none"
               })

            checkbtn.addEventListener("click",function(e){
            const btnKey = e.target.dataset.action 

            word_detail.removeAttribute("contentEditable")
            word_tag.removeAttribute("contentEditable")
            meaningsContainer.removeAttribute("contentEditable")
            exampleContainer.removeAttribute("contentEditable")
                  
    
              checkbtn.style.display = "none"
              editbtn.style.display = "inline-block"
             
              const word = card.querySelector(".word").innerHTML
              const tag = card.querySelector(".tag").innerHTML
              const meanings = card.querySelector(".meanings").innerHTML
              const example = card.querySelector(".example").innerHTML

            const updateCardRef = database.ref(`words/${btnKey}`)

            //  updateCardRef.child(btnKey).update({
            //    
            //  })

              updateCardRef.update({
                    word : word,
                    tag : tag,
                    example : example,
                    meanings : meanings,
                    hello : "hello world"
                 })
          

             })

   


             removebtn.addEventListener("click",function(e){
                const btnKey = e.target.dataset.action 
              const deleteCardRef = database.ref(`words/${btnKey}`)
                      if (confirm("delete card")) {
                        deleteCardRef.remove().then(()=>{
                            alert("card deleted")
                            displayCards()
                        }).catch((error)=>{
                          alert("failed to delete card",error.message)
                        })
                      } else {
                        return;
                      }


             })




        })



        })


     


    }
    displayCards()

   
   
   