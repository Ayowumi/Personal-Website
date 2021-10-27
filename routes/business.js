var express = require('express');
var router = express.Router();
const Contact = require('../models/Contact');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {

  Contact.find().sort({'name': 'asc'}).then(data => {
    res.render('contact_list', {
      user: req.user,
      data: data
    })
  }).catch(error => {
    req.flash('error', error)
    console.log(error)
    res.render('contact_list', form_data)
  })
}
);

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('contact_list/add', {
    user: req.user,
    id: '',
    name: '',
    email: '',
    phone: ''  
})

}
);

// add a new Contact
router.post('/add', ensureAuthenticated, function(req, res, next) {    

  let errors = false;

  const form_data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }


    const newContact = new Contact(form_data);
    
    newContact.save().then(data => {
      req.flash('success', 'Contact successfully added');
      res.redirect('/contact_list');
    }).catch(error => {
      req.flash('error', err)
      console.log(error)
        // render to add.ejs
        res.render('contact_list/add', form_data)
    })
  
})


// display edit contact page
router.get('/edit/(:id)', ensureAuthenticated, function(req, res, next) {

  let id = req.params.id;
 
  Contact.findById(id).then(data => {
    if (!data) {
      req.flash('error', 'Contact not found with id = ' + id)
      res.redirect('/contact_list')
   }else {
    res.render('contact_list/edit', {
      user: req.user,
      id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
    })
  }
  })
})

// update contact data
router.post('/update/:id', ensureAuthenticated, function(req, res, next) {

  const id = req.params.id

  const form_data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }


  Contact.findByIdAndUpdate(id, form_data).then(data => {
    req.flash('success', 'Contact successfully updated');
    res.redirect('/contact_list');
  }).catch(error => {
    req.flash('error', err)
    res.render('contact_list/edit', {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
  })
})
 
// delete contact
router.get('/delete/(:id)', ensureAuthenticated, function(req, res, next) {
  let id = req.params.id;
  Contact.findByIdAndDelete(id).then(data => {
    req.flash('success', 'Contact successfully updated');
    res.redirect('/contact_list');
  }).catch(error => {
    req.flash('error', err)
    res.redirect('/contact_list');
  })
})


module.exports = router;
