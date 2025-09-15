/*Document appartenant à Sasha BALDASSIN L2 info Groupe F*/

/***********************************************************/
/* Script javaScript permettant l'authentification au site */
/***********************************************************/

document.addEventListener('DOMContentLoaded', function () {

    /*On récupère la span du html dans laquelle on va stocker la réponse du serveur par son id : "connexion"*/
    var text = document.getElementById("connexion");

    /*On récupère le formulaire pour se connecter avec son id : "idConnexion"*/
    var idConnexion = document.getElementById('idConnexion');

    /*Gestion d'évènement si le formulaire est envoyé en appuyant sur le bouton*/
    idConnexion.addEventListener("submit", function (event) {
        event.preventDefault();

        /*On récupère le nom d'utilisateur entré à l'aide de l'id*/
        const username = document.getElementById("username").value;
        /*On récupère le mot de passe entré à l'aide de l'id*/
        const userpwd = document.getElementById("userpwd").value;

        /*On démarre une requête au serveur*/
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) { /*Le serveur renvoie un code valide*/
                    const answer = xhr.responseText;
                    if (answer.includes("invalide")) {
                        /*Si c'est invalide, la span a une classe "error"*/
                        text.className = "error";
                    } else {
                        /*Si c'est valide, la span a une classe "good"*/
                        text.className = "good";
                    }

                    /*On attribue la réponse du serveur à la span*/
                    text.textContent = answer;
                }
                else {
                    /*On envoie un message d'alerte s'il y a eu une erreur lors de la requête, ex : le serveur n'est pas ouvert*/
                    alert("Une erreur s'est produite lors de la requête");
                }
            }
        };

        /*Méthode envoyée au serveur python*/
        xhr.open("POST", "htbin/login.py", true);
        /*On définit les entêtes de la requête*/
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        /*On envoie la requête au serveur*/
        xhr.send("username=" + encodeURIComponent(username) + "&userpwd=" + encodeURIComponent(userpwd));

    });
});