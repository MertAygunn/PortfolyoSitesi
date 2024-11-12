let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            sec.classList.add('show-animate');
        }
    });
}
let header = document.querySelector('header');
if (window.scrollY > 100) {
    header.classList.add('sticky');
} else {
    header.classList.remove('sticky');
}

window.addEventListener("click", function () {
    var icon = document.getElementById('icon');

    icon.onclick = function () {
        document.body.classList.toggle('light-theme');
        var home = document.querySelector('.home');

        if (document.body.classList.contains('light-theme')) {
            icon.src = '/images/sun.png';
            home.style.background = 'url(\'/images/background-light.jpg\') center';
            home.style.backgroundRepeat = 'no-repeat';
            icon.style.background = 'midnightblue';
        } else {
            icon.src = '/images/moon.png';
            home.style.background = 'url(\'/images/background-dark.jpg\') center';
            icon.style.background = 'aliceblue';
        }
    }
});

menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

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

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const formData = new FormData(event.target); // Form verilerini al
    const data = Object.fromEntries(formData); // Form verilerini nesneye dönüştür

    try {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Verileri JSON formatında gönder
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Başarılı olursa mesaj göster
            document.getElementById('contactForm').reset(); // Formu sıfırla
        } else {
            alert(result.error || 'Bir hata oluştu.'); // Hata durumunda mesaj göster
        }
    } catch (error) {
        console.error('Hata:', error);
        alert('E-posta gönderme sırasında bir hata oluştu.');
    }
});