// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        //if you want to use an animation that represents on scroll use this
        //else {
        //  sec.classList.remove('show-animate');
        //}
    });
}
    // sticky header
let header = document.querySelector('header');
if (window.scrollY > 100) {
    header.classList.add('sticky');
} else {
    header.classList.remove('sticky');
}

window.addEventListener("scroll", function () {
    var icon = document.getElementById('icon');

    icon.onclick = function () {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            icon.src = 'images/sun.png';
            //$('.home').css('background', 'url(\'/images/background-light.jpg\') center');
            $('.home')
                .css('background', 'url(\'/images/background-light.jpg\') center')
                .css('background-repeat-y', 'no-repeat');
            $('#icon').css('background', 'midnightblue');
            //$('.home').css('background-repeat', 'repeat-y');
        } else {
            icon.src = 'images/moon.png';
            $('.home').css('background', 'url(\'/images/background-dark.jpg\') center');
            $('#icon').css('background', 'aliceblue')
        }
    }
});

menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

// animation footer on scroll
const elements = ['header', 'home', 'about', 'education', 'skills', 'contact', 'footer'];

elements.forEach(elementClass => {
    const element = document.querySelector(`.${elementClass}`);
    if (element) {
        window.addEventListener('scroll', () => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop <= window.innerHeight) {
                element.classList.add('show-animate');
            }
        });
    } else {
        console.error(`${elementClass} element not found.`);
    }
})