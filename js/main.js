let obj = {};
let itemTitle = document.getElementById('title');
let itemDescription = document.getElementById('description');
let itemUrl = document.getElementById('image');
let itemDate = document.getElementById('date');
const loadingScreen = document.getElementById('loading-screen');
const likeButton = document.getElementById('like-button');
const heart = document.getElementById('heart');
const gif = document.getElementById('gif');
let likeState = false;

// API Call 
async function getJson() {

    const api = 'dItZ17cMrKOUB5ra3dtNtwntwwdO2NLcJpOJkULS';
    gif.style.visibility = 'visible';

    return fetch(`https://api.nasa.gov/planetary/apod?api_key=${api}`, {
        method: 'GET'})
        .then(response => response.json())
        .then((data) => {return data});
};

async function caller(){
    const obj = await this.getJson();

    itemTitle.innerHTML = obj['title'];
    itemTitle.alt = obj['title'];
    itemDescription.innerHTML = obj['explanation'];
    itemDate.innerHTML = obj['date'];
    itemUrl.src = obj['url'];
    gif.style.visibility = 'hidden';
    loadingScreen.style.visibility = 'hidden';
};

caller();

/* Like/Dislike */

likeButton.addEventListener('click', function(){
    if (likeState == false) {
        heart.style.color = 'red';
        heart.style.opacity = '1';
        likeState = true;
    } else {
        heart.style.color = 'grey';
        heart.style.opacity = '0.5';
        likeState = false;
    }
})

