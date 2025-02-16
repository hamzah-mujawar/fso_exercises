import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='
const api_key = import.meta.env.VITE_API_KEY

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (lat, long) => {
    const request = axios.get(`${weatherUrl}${lat}&lon=${long}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {getAllCountries, getWeather}
