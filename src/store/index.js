import Vue from 'vue'
import Vuex from 'vuex'
import {kelvinToCelsius, randomInteger, iconsArray, getRandomElementFromArray, formatDate} from "../common/helpers";
import cyrillicToTranslit from 'cyrillic-to-translit-js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        city: 'Unnamed City',
        coords: {
            lat: null,
            lon: null
        },
        locationStatus: {
            isError: false,
            errorMessage: ''
        },
        weatherDataToday: {
            temperature: null,
            humidity: null,
            pressure: null,
            wind: null,
            icon: '',
            date: null
        },
        date: null,
        icon: ``

    },
    getters: {
        fakeWeather: (state) => {
            const otherDaysWeather = []
            otherDaysWeather.push(state.weatherDataToday)
            for (let i = 0; i < 3; i++) {
                let date = null
                if (state.date) {
                    date = state.date
                    date.setDate(date.getDate() + 1);
                }
                const dayInfo = {
                    temperature: state.weatherDataToday.temperature ? Math.abs(state.weatherDataToday.temperature + randomInteger(-5, 5)) : null,
                    humidity: state.weatherDataToday.humidity + randomInteger(-5, 5),
                    pressure: state.weatherDataToday.pressure + randomInteger(-50, 50),
                    wind: Math.round(Math.abs(state.weatherDataToday.wind + randomInteger(-5, 5))),
                    icon: state.weatherDataToday.icon ? getRandomElementFromArray(iconsArray) : '',
                    date: state.date ? formatDate(date) : null
                }
                otherDaysWeather.push(dayInfo)
            }

            return otherDaysWeather
        }
    },
    mutations: {
        changeCoords(state, {lat, lon}) {
            state.coords = {
                lat,
                lon
            }

        },
        changeCity(state, city) {
            state.city = city
        },
        changeErrorStatus(state, isError) {
            state.locationStatus = {
                ...state.locationStatus,
                isError
            }
        },
        changeErrorMessage(state, errorMessage) {
            state.locationStatus = {
                ...state.locationStatus,
                errorMessage
            }
        },
        setTodayWeatherData(state, {temperature, humidity, pressure, wind, icon, date}) {
            state.weatherDataToday = {
                temperature: Math.round(temperature),
                humidity,
                pressure,
                wind,
                icon,
                date
            }
        },
        setDate(state, date) {
            state.date = date
        },
        setIcon(state, icon) {
            state.icon = icon
        }
    },
    actions: {
        setWeatherData({commit, state}, geo) {
            // ???????????????? ????????????
            const reverseGeocode = (coords) => {
                fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1], {
                    headers: {
                        'Accept-Language': 'en'
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {
                    // const geoName = json.address.road || json.address.city_district || json.address.county|| json.address.state
                    const geoName = json.address.city_district || json.address.county || json.address.state
                    commit('changeCity', cyrillicToTranslit().transform(geoName, ' '))
                    // commit('changeCity', json.address.suburb)
                });
            }
            // state.locationStatus.isError = false
            commit('changeErrorStatus', false)
            commit(`changeCoords`, {
                lat: geo.coords.latitude,
                lon: geo.coords.longitude
            })
            reverseGeocode([state.coords.lon, state.coords.lat])
            const key = 'f16dd19c3ddd4b028bed5074fee33402'
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${state.coords.lat}&lon=${state.coords.lon}&appid=${key}`)
                .then(response => response.json())
                .then((response) => {
                    const date = new Date()

                    commit(`setDate`, date)

                    commit(`setIcon`, response.weather[0].icon)
                    // commit(`setIcon`, `50d`)

                    commit(`setTodayWeatherData`, {
                        temperature: Math.round(kelvinToCelsius(response.main.temp)),
                        humidity: Math.round(response.main.humidity),
                        pressure: Math.round(response.main.pressure),
                        wind: Math.round(response.wind.speed),
                        icon: response.weather[0].icon,
                        date: formatDate(date)
                    })
                })
        },

        getCurrentPosition({commit, dispatch}) {

            // ?????????????????? ????????????
            const onSuccess = (geo) => {
                dispatch(`setWeatherData`, geo)
            }

            const onError = (error) => {
                commit('changeErrorStatus', true)
                commit('changeErrorMessage', error.message)
            }
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        }
    },
    modules: {}
})
