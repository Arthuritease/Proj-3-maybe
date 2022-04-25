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


router.post('/create', async(req,res)=>{
    const countryForm = createCountryForm();
    countryForm.handle(req, {
        'success': async (form) => {
            const country = new Country();
            // country.set('id', form.data.ID);
            country.set('country_title', form.data.Name);
            country.set('continent', form.data.Continent);
            await country.save();
            res.redirect('/country');

        },
        'error': async (form) => {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/:country_id/update', async (req, res) => {
    // retrieve the product
    const countryId = req.params.country_id
    const country = await Country.where({
        'id': countryId
    }).fetch({
        require: true
    });

    const countryForm = createCountryForm();

    // fill in the existing values
    countryForm.fields.Name.value = country.get('country_title');
    countryForm.fields.Continent.value = country.get('continent');
    // countryForm.fields.ID.value = country.get('id');

    res.render('country/update', {
        'form': countryForm.toHTML(bootstrapField),
        'country': country.toJSON()
    })

})




module.exports = router;