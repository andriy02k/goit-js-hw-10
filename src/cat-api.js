export { fetchBreeds, fetchCatByBreed };
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_VAU1ByBTXXgohIUt2HGujcB3KcpkmIOGo11JAE8Yj6R6yPJ6PRImpchIqt8Vqirc";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
};

function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
    return resp.data;
  });
};
