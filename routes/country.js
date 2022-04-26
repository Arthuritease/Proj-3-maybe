const express = require("express");
const router = express.Router();

//import in the Country model
const {
    Country
} = require('../models')
// import in create country form
const {
    bootstrapField,
    createCountryForm
} = require('../forms');


// READ ALL COUNTRIES
router.get('/', async (req, res) => {
    // #2 - fetch all the countries (ie, SELECT * from products)
    let country = await Country.collection().fetch();
    res.render('country/index', {
        'country': country.toJSON() // #3 - convert collection to JSON
    })
})


//CREATE NEW COUNTRIES

//rednering CREATE forms
router.get('/create', async (req, res) => {
    const countryForm = createCountryForm();
    res.render('country/create', {
        'form': countryForm.toHTML(bootstrapField)
    })
})

//processing CREATE forms
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

//UPDATE COUNTRIES
// extracting country with id and rendering form
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

//processing UPDATE form
router.post('/:country_id/update', async (req, res) => {
    // retrieve the product
    const countryId = req.params.country_id
    const country = await Country.where({
        'id': countryId
    }).fetch({
        require: true
    });
    const countryForm = createCountryForm();
    countryForm.handle(req, {
        'success': async (form) => {
            country.set('country_title', form.data.Name); //like 'CREATE', you have to spell out which parameter of country to set
            country.set('continent', form.data.Continent);
            await country.save();
            res.redirect('/country');
        },
        'error': async (form) => {
            res.render('country/update' , {
                'form': form.toHTML(bootstrapField),
                'country': country.toJSON()
            })
        }
    })

})

//DELETE countries with ID

//Display a confirmation message for deletion

router.get('/:country_id/delete', async(req,res)=>{
    // fetch the product that we want to delete
    const country = await Country.where({
        'id': req.params.country_id
    }).fetch({
        require: true
    });

    res.render('country/delete', {
        'country': country.toJSON()
    })

});

//Processing the DELETE

router.post('/:country_id/delete', async(req,res)=>{
    // fetch the product that we want to delete
    const country = await Country.where({
        'id': req.params.country_id
    }).fetch({
        require: true
    });
    await country.destroy();
    res.redirect('/country')
})


module.exports = router;