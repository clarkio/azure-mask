hideEmail();

function hideEmail() {
    let emailLabel = document.getElementsByClassName('fxs-avatarmenu-tenant')[0];
    console.log(emailLabel);
    emailLabel.style.display = 'none';
}