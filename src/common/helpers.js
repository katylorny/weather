export const kelvinToCelsius = (kelvinTemp) => {
    return kelvinTemp - 273.15
}

export const randomInteger = (min, max) => {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const iconsArray = [`01d`, `02d`, `03d`, `04d`, `09d`, `10d`, `11d`, `13d`, `50d`]

export const getRandomElementFromArray = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

export const formatDate = (date) => {
    if (date) console.log(`date`, date);
    const dayName = date.toLocaleDateString("en-En", {weekday: 'short'})
    const day = date.toLocaleDateString("en-En", {day: 'numeric'})
    const month = date.toLocaleDateString("en-En", {month: 'short'})
    return dayName + `, ` + day + ` ` + month
}