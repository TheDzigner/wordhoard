const navBtns = document.querySelectorAll("nav ul li button")
const sections = document.querySelectorAll("section")
const saveWordsForm = document.querySelector("#saveWords")
let activeIndex = 0

navBtns.forEach((button,index)=>{
    button.addEventListener("click",function(){
    const filter = this.dataset.filter
    navBtns[activeIndex].classList.remove("active")
   activeIndex = index 
   navBtns[activeIndex].classList.add("active")

   for (const data in sections) {
       const filterKey = sections[data].dataset.filter

       if (filter === filterKey) {
        sections[data].style.display ="block"
       } else {
        sections[data].style.display ="none"
       }
   }
    })
})




saveWordsForm.addEventListener("click",function(e){
const wordInput = document.querySelector('#word')
const tagInput = document.querySelector('#tag')
const ExampleInput = document.querySelector('#example')
const meaningsInput = document.querySelector('#meanings')
})