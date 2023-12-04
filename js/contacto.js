const $form = document.querySelector('#form');
const $email = document.querySelector('#contactemail');
const $error = document.querySelector('#error');

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(this);

    if (!validateEmail($email.value)) {
        $error.style.display = 'block';
    } else {
        $error.style.display = 'none';
        sendData(form);
    }
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

async function sendData(form) {
    const response = await fetch($form.action, {
        method: $form.method,
        body: form,
        headers: {
            Accept: 'application/json',
        },
    });
    if (response.ok) {
        $form.reset();
        alert('Gracias por contactarnos. Nos contactaremos contigo en la proximidad.');
    }
}