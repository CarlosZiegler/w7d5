// server/app.js

const app = require('express')();

const countries = require('../client/src/countries.json');

app.get('/countries', (req, res) => {
    res.json(countries);
});

const getCountryByCode = cca3 => countries.find(el => el.cca3 === cca3);

app.get('/countries/:countryCode', (req, res) => {
    const country = { ...getCountryByCode(req.params.countryCode) };
    country.borders = country.borders.map(cca3 => getCountryByCode(cca3));
    // console.log(country);
    res.json(country);
})

app.listen(5555, () => {
    console.log('Server listening on Port 5555');
});