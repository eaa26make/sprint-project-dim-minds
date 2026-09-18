// ? Getting the day and month
const now = new Date(); // * We get the current date
const month = now.toLocaleString('default', { month: 'long' }); // * We get the current month
const day = now.getDate(); // * We get the current day

document.getElementById("month1").textContent = day; // * We put the current day in the HTML
document.getElementById("month2").textContent = month; // * We put the current month in the HTML



// ? Fetching the ice cream data from the JSON file
let iceCreams = []; // * We will store the json in this variable

fetch('icecreams.json') // * We fetch the data from the JSON file
    .then(response => response.json()) // * We make sure the data format is JSON
    .then(data => {
        iceCreams = data; // * We store the data in the iceCreams variable.
        console.log(iceCreams); // Just for debugging
        showDayFlavor();
        createCards(iceCreams); // * We call the function that will create our cards and passing the data to it
    })
    .catch(error => console.error('JSON Error: ', error)) // If there's an error, we catch it here, for debugging

// ? Editing the highlighted flavor (first entry in JSON)
function showDayFlavor() {
    document.getElementById("dayflavor").textContent = iceCreams[0].flavor;
    document.getElementById("dayflavor-img").src = "assets/img/" + iceCreams[0].img;
    document.getElementById("big-container").onclick = function () {
        openModal(iceCreams[0]);
    }
}

// ? Creating the cards
function createCards(iceCreams) { // * The function that creats the cards themself

    const container = document.getElementById('card-container'); // * We select the container by ID. ("const" is a constant value)
    container.innerHTML = ''; // * We clear the container, so it don't stack cards ontop of each other if we ever decide to refresh the data

    iceCreams.forEach((item, index) => { // * forEach will repeat for each entry in the JSON
        if (index == 0) return; // * We skip the first entry
        const html = `
        <div id="card" onclick='openModal(${JSON.stringify(item).replace(/'/g, "&#39;")})'>
            <img id="card-img" src="assets/img/${item.img}" alt="${item.flavor} Ice Cream">
            <div id="card-text"><p>${item.flavor}</p></div>
        </div>
        `; // * We store each ice cream1s data in the onclick event as "item"
        container.innerHTML += html; // * We add the new card to the container
    })

}



// ? Opening the modal
function openModal(item) { //* The function that opens the modal
    const allergensText = item.allergens.length ? item.allergens.join(', ') : 'None'; //* Converts the allergens to a string
    console.log(item.flavor + '\n' + 'Allergens: ' + allergensText + '\n' + 'Traces: ' + item.traces); // Just for debugging

    //* Setting all elements in the model to the current ice cream
    document.getElementById('modal-title').textContent = item.flavor;
    document.getElementById('modal-img').src = "assets/img/" + item.img;
    document.getElementById('modal-allergens').textContent = item.allergens.join(', ');
    document.getElementById('modal-traces').textContent = item.traces;

    //* Removing the hidden class will show the modal
    document.getElementById('modal-overlay').classList.remove('hidden');
}

//* This will close the modal when the close button is clicked
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.add('hidden');
});