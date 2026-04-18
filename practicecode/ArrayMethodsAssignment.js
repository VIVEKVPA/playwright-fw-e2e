//Get the hottest cities > 40 degree, mark them as Red Alert, Rank 1 for the highest degree and Rank 10 for lowest degree

const summerData = [
    {city : 'Vijayapur', temperature : 41},
    {city : 'Kalburgi', temperature : 42},
    {city : 'Yadagir', temperature : 43},
    {city : 'Bidar', temperature : 40},
    {city : 'Hubli', temperature : 38},
    {city : 'Dharwad', temperature : 36},
    {city : 'Ballari', temperature : 44},
    {city : 'Hassan', temperature : 30},
    {city : 'Bengaluru', temperature : 32},
    {city : 'Mysuru', temperature : 30},
    {city : 'Belagavi', temperature : 30},
    {city : 'Shivamogga', temperature : 28},
]

const hottestCities = summerData.filter(city => city.temperature>40)
console.log(hottestCities)

const redAlertCities = hottestCities.map(hotcity => ({...hotcity, alert: 'RED'}))
console.log(redAlertCities)

const coolestCities = summerData.filter(coolcity => coolcity.temperature <32).map(coolestCities => ({...coolestCities, alert: 'GREEN'}))
console.log(coolestCities)

const warmCities = summerData.filter(warmcity => warmcity.temperature>=32 & warmcity.temperature<=40).map(warmCities => ({...warmCities, alert: 'AMBER'}))
console.log(warmCities)





