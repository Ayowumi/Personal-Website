var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
router.get('/', (req, res, next) => {

  const data =  {
    name:'Ayowumi Adeyeye',
    role:'Frontend Developer',
    missionStatement:'My mission is to help my clients achieve their objectives by developing a website that meets their requirements.'
  }
  

  res.render('home', data);
}); 

router.get('/about',(req, res, next) => {
  
  const data =  {
    image:'profile.png',
    name:'Ayowumi Adeyeye',
    role:'Frontend Developer',
    shortParagraph:'I am passionate, energetic somebody, so hire me.',
    link:'https://drive.google.com/file/d/1MbVLZNowTZvb2wiWhLaIS5u1dwLcVysm/view?usp=sharing'
  }
  
  res.render('about', data);
});

router.get('/projects',(req, res, next) => {
  const data = [
    {
        description: ' Movie Finder - An app, that retrieves Movie Data.',
        icon: 'cabin.png',
        role: 'Software Engineer'
    },
    {
      description: 'Weather Finder - An App that allows a user to search for weather data',
      icon: 'submarine.png',
      role: 'Software Engineer'
  },
  {
    description: 'To Do App - A To Do App.',
    icon: 'cake.png',
    role: 'Software Engineer'
  }
]

  res.render('project', {projects:  data});
});

router.get('/services',(req, res, next) => {

  const data = [
    {
        category: 'Software Engineering & Architecture',
        icon: 'game.png',
        offerings: ['Microservice Evaluation', 'Progressive Web Application', 'Cloud-NativeArchitecture']
    },
    {
        category: 'Cloud Native & System Transformation',
        icon: 'circus.png',
        offerings: ['Evaluation', 'Testing', 'Adaopting New Tech']
    },
    {
        category: 'Developer and Security Operation',
        icon: 'safe.png',
        offerings: ['CI/CD', 'Calico', 'Penetration Testing']
    }
]

  res.render('services', { services: data });
});

router.get('/contact',(req, res, next) => {
  res.render('contact', { layout: './layouts/template2' });
});


router.post('/thanks',(req, res, next) => {
  res.redirect('/');
});


module.exports = router;
