const express = require("express");
const router = express.Router();

// #1 import in the Country model
const {
    Country
} = require('../models')
// import in create country form
const {
    bootstrapField,
    createCountryForm
} = require('../forms');

router.get('/', async (req, res) => {
    // #2 - fetch all the countries (ie, SELECT * from products)
    let country = await Country.collection().fetch();
    res.render('country/index', {
        'country': country.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/create', async (req, res) => {
    const countryForm = createCountryForm();
    res.render('country/create', {
        'form': countryForm.toHTML(bootstrapField)
    })
})

// keeps returning error unless I remove POST
// router.post('/create', async(req,res)=>{
//     const countryForm = createCountryForm();
//     countryForm.handle(req, {
//         'success': async (form) => {
//             const country = new Country();
//             country.set('id', form.data.ID);
//             country.set('country_title', form.data.Name);
//             country.set('continent', form.data.Continent);
//             await country.save();
//             res.redirect('/country');

//         },
//         'error': async (form) => {
//             res.render('products/create', {
//                 'form': form.toHTML(bootstrapField)
//             })
//         }
//     })
// })


module.exports = router;