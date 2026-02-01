document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('affiliation-form');
    const formStatusDiv = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatusDiv.textContent = 'Thank you for your affiliation request! We will get back to you soon.';
                formStatusDiv.style.color = 'green';
                form.reset(); // Clear the form
            } else {
                const data = await response.json();
                if (data.errors) {
                    formStatusDiv.textContent = data.errors.map(error => error.message).join(', ');
                } else {
                    formStatusDiv.textContent = 'Oops! There was a problem submitting your form.';
                }
                formStatusDiv.style.color = 'red';
            }
        });
    }
});
