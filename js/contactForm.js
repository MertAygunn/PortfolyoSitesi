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