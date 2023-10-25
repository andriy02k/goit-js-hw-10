import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
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
    elements.load.classList.remove('is-hidden');
    elements.div.classList.add('is-hidden');

    fetchCatByBreed(selected)
        .then(data => {
            elements.div.innerHTML = createMarkup(data);

        })
        .catch(() => {
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!', 
                { timeout: 2000, userIcon: false }
            );
        })
        .finally(() => {
            elements.load.classList.add('is-hidden');
            elements.div.classList.remove('is-hidden');
        });
};

function createMarkup(arr) {
    // console.log(arr);
    return arr
        .map(({ breeds: [{ name, description, temperament }], url }) => `
    <div class = "container">
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

            elements.select.classList.remove('is-hidden');
        })
        .then(() => new SlimSelect({ select: `.breed-select` }))
        .catch(() => {
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!', 
                { timeout: 2000, userIcon: false }
            );
        })
        .finally(() => {
            elements.load.classList.add('is-hidden');
        })
};

function getPetsList(breed) {
    // console.log(breed);
    elements.select.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('\n');
}

fetchBreedsAndSetPetsList();

