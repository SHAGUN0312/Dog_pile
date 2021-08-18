let timer;
let deleteFirstPhotoDelay;

//Fetch the data
async function start() {
    try{
        const resp = await fetch("https://dog.ceo/api/breeds/list/all"); // fetch returns a promise so we need to wait for it
        const data = await resp.json(); //resp is now only a http response , so we now need to call res.json().
        createBreedList(data.message);
    }
    catch(e){
        console.log("There was a problem fetching the breed list.");
    }
}
start();

//Create select menu ---- WOW List will be created
 
//It is easy to loop through an array with map, but this list of breeds is not an array, but we can get an array based on the objects property list, woohoo, problem solved, then array mein convert hine ke baad, we'll map through breed, har ek element ke liye ek callback function milega in the form of an array.

function createBreedList(list) {
    document.getElementById('breed').innerHTML = `
    <select onchange = "loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(list).map((breed) => `<option>${breed} </option>`).join('')} 
    </select>
    ` 
}
// What happens on clicking our desired option.

//idhar bhi async-await use kiyaa, because we are fetching the image which'll return a promise.

async function loadByBreed(choice) {
    if(choice != "Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${choice}/images`);
        const data = await response.json();
        createSlideShow(data.message);
    }
}

//Slideshow ke liye ek separate function

function createSlideShow(images){
    let current = 0;

    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
   
    if(images.length > 1){
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        current += 2;
        
        // when we have only two images
        if(images.length == 2) current = 0;

        timer = setInterval(next, 3000);

    } else{
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `
    }

//slideshow mein baar baar img change karne ke liye function
    function next(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[current]}')"></div>`);
        //beforeend --> just inside the element after it's last child.
        deleteFirstPhotoDelay = setTimeout(() => {
            document.querySelector(".slide").remove;
        }, 400);

        //If we are on the last image, we would like to circle back to the first image, else increase the cureent by 1...ez pz

        if(current + 1 >= images.length){
            current = 0;
        } else{
            current++;
        }
    }
}





















