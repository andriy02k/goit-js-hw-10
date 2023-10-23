import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

axios.defaults.headers.common["x-api-key"] = "live_VAU1ByBTXXgohIUt2HGujcB3KcpkmIOGo11JAE8Yj6R6yPJ6PRImpchIqt8Vqirc";

const elements = {
    select: document.querySelector(".breed-select"),
    load: document.querySelector(".loader"),
    err: document.querySelector(".error"),
    div: document.querySelector(".cat-info"),
};

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
    const selected = evt.target.value;
    fetchCatByBreed(selected)
        .then(data => elements.div.innerHTML = createMarkup(data))
        .catch(() => {
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!', 
                { timeout: 2000, userIcon: false }
            );
        })
};

function createMarkup(arr) {
    console.log(arr);
    return arr
        .map(({ breeds: [{ name, description, temperament }], url }) => `
    <div>
        <img src="${url}" alt="${name}" />
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${temperament}</p>
    </div>`
    )
    .join("");
}

function fetchBreedsAndSetPetsList() {
    fetchBreeds()
        .then(result => {
            // console.log(result);
            getPetsList(result);
        })
        .then(() => new SlimSelect({ select: `.breed-select` }))
        .catch(() => {
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!', 
                { timeout: 2000, userIcon: false }
            );
        })
};

function getPetsList(breed) {
    // console.log(breed);
    elements.select.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('\n');
}

fetchBreedsAndSetPetsList();

