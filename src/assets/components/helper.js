document.addEventListener("DOMContentLoaded", function() {
    let h1Element = document.querySelector('.meal-title h1');
    let maxWidth = ["50 px"]; // set this to the width of your container
    
    if(h1Element.offsetWidth > maxWidth) {
        let words = h1Element.innerText.split(' ');
        let middle = Math.floor(words.length / 2);
        
        let firstHalf = words.slice(0, middle).join(' ');
        let secondHalf = words.slice(middle).join(' ');
        
        h1Element.innerHTML = firstHalf + '<br>' + secondHalf;
    }
});
