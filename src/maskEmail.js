hideEmail();

function hideEmail() {
    let emailLabel = document.getElementsByClassName('fxs-avatarmenu-tenant')[0];
    console.log(emailLabel);
    emailLabel.style.textShadow = '0 0 10px white';
    emailLabel.style.color = 'rgba(0, 0, 0, 0)';
}