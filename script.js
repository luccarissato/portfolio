document.addEventListener('DOMContentLoaded', function () {
  emailjs.init('SEU_USER_ID');

  const form = document.getElementById('contact-form');
  const status = document.getElementById('status');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', this)
      .then(() => {
        status.textContent = "Mensagem enviada com sucesso! 🎉";
        status.style.color = 'green';
        form.reset();
      }, (error) => {
        status.textContent = "Erro ao enviar a mensagem. Tente novamente.";
        status.style.color = 'red';
        console.error('Erro:', error);
      });
  });
});