const openSearchBarBtn =  document.querySelector(".open-search-mobile")
const searchWordsInput = document.querySelector(".search-words-input")
const openMenuMobile = document.querySelector(".open-menu-mobile")

openSearchBarBtn.addEventListener("click",function(e){
   
    if (searchWordsInput.classList.contains("active")) {
        e.target.textContent = "search"
        searchWordsInput.classList.remove("active")
        openMenuMobile.classList.remove("inactive")
    } else {
        e.target.textContent = "close"
        searchWordsInput.classList.add("active")
        openMenuMobile.classList.add("inactive")
    }
})