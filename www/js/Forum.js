/*Document appartenant à Sasha BALDASSIN L2 info Groupe F*/

/**********************************************************************************/
/* Script javaScript permettant la communication entre utilisateurs via un forum  */
/**********************************************************************************/


document.addEventListener('DOMContentLoaded', function () {
    /*On affiche tous les messages précédents lorsque l'on ouvre la page*/
    ancienMessage();
    /*On récupère la span du html dans laquelle on va stocker la réponse du serveur par son id : "connexion"*/
    var text = document.getElementById("connexion");

    /*On récupère le formulaire du forum grâce à son id "idChat"*/
    var idConnexion = document.getElementById('idChat');

    /*Gestion d'évènement si le formulaire est envoyé en appuyant sur le bouton*/
    idConnexion.addEventListener("submit", function (event) {
        event.preventDefault();

        /*On récupère le message de l'utilisateur grâce à son id "msg"*/
        const message = document.getElementById("msg").value;

        /*On démarre une requête au serveur*/
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) { /*Le serveur renvoie un code valide*/
                    const answer = JSON.parse(xhr.responseText);
                    if (answer.num !== 0) {
                        /*Si c'est invalide, la span a une classe "error"*/
                        text.className = "error";
                    } else {
                        /*Si c'est invalide, la span a une classe "good"*/
                        text.className = "good";
                        /*On affiche tous les messages*/
                        ancienMessage();
                    }
                    /*On attribue la réponse du serveur à la span : "Message envoyé*/
                    text.textContent = answer.msg;
                }
                else {
                    /*Message d'erreur si la requête échoue*/
                    alert("Une erreur s'est produite lors de la requête");
                }
            }
        };

        /*Méthode envoyée au serveur python*/
        xhr.open("POST", "htbin/chatsend.py", true);
        /*On définit les entêtes de la requête*/
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        /*On envoie la requête au serveur*/
        xhr.send("msg=" + encodeURIComponent(message));


    });
});

/*Fonction permettant d'afficher tous les messages envoyés sur le forum*/
function ancienMessage() {
    /*Envoie de la requête au serveur*/
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "htbin/chatget.py", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const answer = JSON.parse(xhr.responseText);
            /*On récupère les nouveaux messages*/
            getInfo(answer);
        }
        else {
            /*on créé une alerte s'il y a eu une erreur lors de la requête au serveur*/
            alert("Une erreur s'est produite lors de la requête");
        }
    };
    xhr.onerror = function () {
        alert("Erreur de connexion serveur");
    };
    xhr.send();
};

/*Fonction pour ajouter les nouveaux messages à la liste des messages */
function getInfo(messages) {
    /*On récupère tous les messages qui ne sont pas affichés*/
    for (var i = nbMessages; i < messages.length; i++) {
        /*On récupère toutes les informations de chaque message*/
        let message = messages[i];
        let name = message.user;
        let date = message.date;
        let heure = message.time;
        let msg = message.msg;

        /*Création de span pour afficher chaque élément*/
        /*Création de classe pour les récupérer dans le CSS*/

        /*Nom d'utilisateur*/
        let spanName = document.createElement("span");
        spanName.textContent = name + " : ";
        spanName.className = "className";

        /*Date et heure de l'envoi*/
        let spanDate = document.createElement("span");
        spanDate.textContent = "Le " + date + " à " + heure + ":";
        spanDate.className = "classDate";

        /*Contenu du message*/
        let spanMsg = document.createElement("span");
        spanMsg.textContent = msg;
        spanMsg.className = "classMsg";

        /*Div où l'on va stocker tous les éléments*/
        let cadre = document.createElement("div");
        cadre.className = "classCadre";

        /*On ajoute chaque élément à la div*/
        cadre.appendChild(spanDate);
        cadre.appendChild(spanName)
        cadre.appendChild(spanMsg);

        /*On ajoute l'ensemble des anciens messages au cadre*/
        let mess = document.getElementById("Message");
        mess.appendChild(cadre);
        /*Incrémentation du nombre de messages actuels*/
        nbMessages++;
    };
}

/*Initialisation du nombre de messages affiché*/
var nbMessages = 0;
/*Actualise le nombre de messages toutes les 3 secondes*/
setInterval(ancienMessage, 3000);