/*Document appartenant à Sasha BALDASSIN L2 info Groupe F*/

/***********************************************************************/
/* Script javaScript permettant l'inscription au site via le serveur   */
/***********************************************************************/

/*On récupère chaque élément du formulaire d'inscription à l'aide de leur id*/
var lastname = document.getElementById("lastname");
var firstname = document.getElementById("firstname");
var username = document.getElementById("username");
var birthdate = document.getElementById("birthdate");
var userpwd = document.getElementById("userpwd");
var useremail = document.getElementById("useremail");
var submitButton = document.querySelector('button[type="submit"]');

/*Si on entre un caractère dans un des champs, on appelle la fonction "validateFields" */
lastname.addEventListener("input", validateFields);
firstname.addEventListener("input", validateFields);
username.addEventListener("input", validateFields);
birthdate.addEventListener("input", validateFields);
userpwd.addEventListener("input", validateFields);
useremail.addEventListener("input", validateFields);

function validateFields() {
    /*On créé des span dans le html afin d'afficher les messages d'erreurs si les champs ne sont pas remplis correctement*/
    var lastnameSpan = document.getElementById('lastnameSpan');
    var firstnameSpan = document.getElementById('firstnameSpan');
    var usernameSpan = document.getElementById('usernameSpan');
    var birthdateSpan = document.getElementById('dateSpan');
    var userpwdSpan = document.getElementById('mdpSpan');
    var useremailSpan = document.getElementById('mailSpan');

    /*On stocke la validité du mot de passe et de l'adresse email dans des variables locales*/
    var isUserpwdValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_;:!?./*&$])[A-Za-z\d-_;!?./*&$]{12,}$/.test(userpwd.value.trim());
    var isUseremailValid = isValidEmail(useremail.value.trim());  /*Appel de la fonction de validation de l'email*/

    /* Test pour vérifier la validité de tous les champs */
    var isValid = true;

    /*Il faut au moins un caractère pour le champ "prénom"*/
    if (lastname.value.trim().length === 0) {
        lastnameSpan.textContent = "Champ obligatoire";
        isValid = false;
    } else {
        /*Si c'est rempli correctement, on affiche rien*/
        lastnameSpan.textContent = "";
    }

    /*Il faut au moins un caractère pour le champ "nom de famille"*/
    if (firstname.value.trim().length === 0) {
        firstnameSpan.textContent = "Champ obligatoire";
        isValid = false;
    } else {
        /*Si c'est rempli correctement, on affiche rien*/
        firstnameSpan.textContent = "";
    }

    if (username.value.trim().length === 0) {
        /*On vérifie que le champ n'est pas vide*/
        usernameSpan.textContent = "Champ obligatoire";
        isValid = false;
    } else if (username.value.trim().length < 6) {
        /*Le pseudo doit contenir au moins 6 caractères*/
        usernameSpan.textContent = "Minimum 6 caractères";
        isValid = false;
    } else {
        /*Si c'est rempli correctement, on affiche rien*/
        usernameSpan.textContent = "";
    }

    if (userpwd.value.trim().length === 0) {
        /*On vérifie que le champ n'est pas vide*/
        userpwdSpan.textContent = "Champ obligatoire";
        isValid = false;
    } else if (!isUserpwdValid) {
        /*On vérifie que le mot de passe est valide à l'aide de la variable contenant la validation du mot de passe*/
        userpwdSpan.textContent = "Mot de passe invalide";
        isValid = false;
    } else {
        /*Si c'est rempli correctement, on affiche rien*/
        userpwdSpan.textContent = "";
    }

    if (useremail.value.trim().length === 0) {
        /*On vérifie que le champ n'est pas vide*/
        useremailSpan.textContent = "Champ obligatoire";
        isValid = false;
    } else if (!isUseremailValid) {
        /*On vérifie que l'email est valide à l'aide de la fonction contenant l'expression régulière*/
        useremailSpan.textContent = "Email invalide";
        isValid = false;
    } else {
        /*Si c'est rempli correctement, on affiche rien*/
        useremailSpan.textContent = "";
    }

    if (!isValidDate(birthdate.value.trim()) && birthdate.value.trim().length > 0) {
        /*Si le champ de date n'est pas vide, on vérifie que la date est valide*/
        birthdateSpan.textContent = "Date invalide";
        isValid = false;
    } else {
        /*Si c'est rempli correctement, on affiche rien*/
        birthdateSpan.textContent = "";
    }

    /* Activer ou désactiver le bouton de soumission en fonction de la validité des champs */
    submitButton.disabled = !isValid;
}

/*On vérifie la validité de la date à l'aide d'une expression régulière sous la forme xx/xx/xxxx*/
function isValidDate(dateString) {
    var regEx = /^\d{2}\/\d{2}\/\d{4}$/;
    /*Si l'expression régulière n'est pas respectée, on renvoie false*/
    if (!dateString.match(regEx)) return false;

    /*Sinon on sépare la date en 3 variables : jour, mois, année*/
    var parts = dateString.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);

    /*À l'aide de ces variables, on créé un objet date*/
    var date = new Date(year, month, day);

    /*On vérifie à l'aide des fonctions de js que c'est une date valide en vérifiant chaque partie*/
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

function isValidEmail(email) {
    /*Expression régulière qui rend une adresse email valide*/
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
