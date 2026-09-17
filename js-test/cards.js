let iceCreams = []; //* We will store the json in this variable

fetch('icecreams.json') //* We fetch the data from the JSON file
    .then(response => response.json()) //* We make sure the data format is JSON
    .then(data => {
        iceCreams = data; //* We store the data in the iceCreams variable.
        console.log(iceCreams); // Just for debugging
        createCards(iceCreams); //* We call the function that will create our cards and passing the data to it
    })
    .catch(error => console.error('JSON Error: ', error)) // If there's an error, we catch it here, for debugging



function createCards(iceCreams){ //* The function that creats the cards themself

    const container = document.getElementById('card-container'); //* We select the container by ID. ("const" is a constant value)
    container.innerHTML = ''; //* We clear the container, so it don't stack cards ontop of each other if we ever decide to refresh the data

    iceCreams.forEach(item => { //* forEach will repeat for each entry in the JSON
        const html = `
        <div class="icecream-card" onclick='openModal(${JSON.stringify(item)})'>
            <img src="${item.img}" alt="${item.flavor} Ice Cream">
            <p>${item.flavor}</p>
        </div>
        `; //* We store each ice cream1s data in the onclick event as "item"
        container.innerHTML += html; //* We add the new card to the container
    })

}



function openModal(item) { //* The function that opens the modal
    const allergensText = item.allergens.length ? item.allergens.join(', ') : 'None'; //* Converts the allergens to a string
    console.log(item.flavor + '\n' + 'Allergens: ' + allergensText + '\n' + 'Traces: ' + item.traces); // Just for debugging

    //* Setting all elements in the model to the current ice cream
    document.getElementById('modal-title').textContent = item.flavor;
    document.getElementById('modal-img').src = item.img;
    document.getElementById('modal-allergens').textContent = item.allergens.join(', ');
    document.getElementById('modal-traces').textContent = item.traces;

    //* Removing the hidden class will show the modal
    document.getElementById('modal-overlay').classList.remove('hidden');
}

//* This will close the modal when the close button is clicked
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.add('hidden');
});
