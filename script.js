document.addEventListener('DOMContentLoaded', function() {
    var gallery = document.getElementById('gallery');
    var loadMoreBtn = document.getElementById('loadMoreBtn');
    var loadLessBtn = document.getElementById('loadLessBtn');
    var totalPhotos = 6; // Nombre total de photos disponibles
    var displayedPhotos = 3; // Nombre d'images affichées à la fois
    var currentPhotoIndex = 1; // Index de la prochaine photo à charger
    var loadMoreClickCount = 0; // Nombre de fois que "Load More" a été cliqué

    loadMoreBtn.addEventListener('click', function() {
        loadImages(); // Charger les images supplémentaires

        // Afficher le bouton "Load Less" lorsque toutes les images sont chargées
        if (currentPhotoIndex >= totalPhotos) {
            loadMoreBtn.style.display = 'none';
            loadLessBtn.style.display = 'block';
        }

        // Mettre à jour le compteur de clics sur "Load More"
        loadMoreClickCount++;
    });

    loadLessBtn.addEventListener('click', function() {
        removeImages(); // Supprimer les images chargées par "Load More"
        loadMoreClickCount--; // Décrémenter le compteur de clics sur "Load More"

        // Afficher le bouton "Load More" lorsque le compteur de clics est supérieur à 0
        if (loadMoreClickCount > 0) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadLessBtn.style.display = 'none'; // Masquer le bouton "Load Less" si le compteur de clics est égal à 0
        }
    });

    // Fonction pour charger les images supplémentaires
    function loadImages() {
        var end = Math.min(currentPhotoIndex + displayedPhotos, totalPhotos + 1); // Ne pas dépasser le nombre total de photos
        for (var i = currentPhotoIndex; i < end; i++) {
            var img = document.createElement('img');
            img.src = 'groupe' + i + '.jpg'; // Modifier le chemin d'accès selon votre structure de fichiers
            gallery.appendChild(img);
            gallery.appendChild(document.createElement('br'));
        }
        currentPhotoIndex += displayedPhotos; // Mettre à jour l'index de la prochaine photo à charger

        // Afficher le bouton "Load Less" dès la première fois que des images sont chargées
        loadLessBtn.style.display = 'block';
    }

    // Fonction pour supprimer les images chargées par "Load More"
    function removeImages() {
        for (var i = 0; i < displayedPhotos; i++) {
            gallery.removeChild(gallery.lastChild);
            gallery.removeChild(gallery.lastChild); // Retirer également les éléments <br>
        }
        currentPhotoIndex -= displayedPhotos; // Mettre à jour l'index de la prochaine photo à charger
    }
});
