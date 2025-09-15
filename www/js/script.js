/*Document appartenant à Sasha BALDASSIN L2 info Groupe F*/

/**********************************************************************************************************/
/* Script javaScript permettant de gérer les boutons "afficher plus" et "afficher moins" pour les photos  */
/**********************************************************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    /*Endroit où l'on va stocker toutes les images identifié par "gallery" */
    var gallery = document.getElementById('gallery');
    /*On récupère les deux boutons à l'aide de leur id*/
    var loadMoreBtn = document.getElementById('loadMoreBtn');
    var loadLessBtn = document.getElementById('loadLessBtn');
    // Nombre total de photos disponibles
    var totalPhotos = 6;
    // Nombre d'images affichées à la fois
    var displayedPhotos = 3;
    // Index de la prochaine photo à charger
    var currentPhotoIndex = 1;
    // Nombre de fois que "Load More" a été cliqué
    var loadMoreClickCount = 0;

    loadMoreBtn.addEventListener('click', function () {
        // Charger les images 
        loadImages();

        // Afficher le bouton "Afficher moins" lorsque l'on appuie une fois sur "Afficher Plus"
        if (currentPhotoIndex >= totalPhotos) {
            loadMoreBtn.style.display = 'none';
            loadLessBtn.style.display = 'block';
        }

        // Mettre à jour le compteur de clics sur "Afficher plus"
        loadMoreClickCount++;
    });

    loadLessBtn.addEventListener('click', function () {
        // Supprimer les images affichées en plus quand on clique
        removeImages();
        // Décrémenter le compteur de clics sur "Afficher plus"
        loadMoreClickCount--;

        // Afficher le bouton "Load More" lorsque le compteur de clics est supérieur à 0
        if (loadMoreClickCount > 0) {
            loadMoreBtn.style.display = 'block';
        } else {
            // Ne pas afficher le bouton afficher moins si le compteur de clics est égal à 0
            loadLessBtn.style.display = 'none';
        }
    });

    // Fonction pour afficher les images supplémentaires
    function loadImages() {
        var end = Math.min(currentPhotoIndex + displayedPhotos, totalPhotos + 1);
        for (var i = currentPhotoIndex; i < end; i++) {
            var img = document.createElement('img');
            //endroit où se situe chaque image à afficher
            img.src = 'image/groupe' + i + '.jpg';
            gallery.appendChild(img);
            gallery.appendChild(document.createElement('br'));
        }
        // Mettre à jour l'indice de la prochaine photo à afficher
        currentPhotoIndex += displayedPhotos;

        // Afficher le bouton afficher moins dès la première fois que des images sont chargées
        loadLessBtn.style.display = 'block';
    }

    // Fonction pour supprimer les images affichées
    function removeImages() {
        for (var i = 0; i < displayedPhotos; i++) {
            gallery.removeChild(gallery.lastChild);
        }
        // Mettre à jour l'indice de la prochaine photo à afficher
        currentPhotoIndex -= displayedPhotos;
    }
});
