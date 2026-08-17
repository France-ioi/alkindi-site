/*
 * Éléments communs à toutes les pages (en-tête, menu, pied de page) et petites
 * interactions. Remplace AngularJS : plus de framework, plus d'étape de build.
 *
 * Chaque page du site est un fichier .html autonome qui contient son propre
 * contenu. Ce script n'injecte que l'habillage, via deux éléments personnalisés
 * <site-header> et <site-footer>.
 */

/*
 * Le menu du site. Pour ajouter / renommer une entrée, il suffit de modifier
 * ce tableau : [fichier, libellé].
 */
var MENU = [
   ['index.html', 'Accueil'],
   ['manuel.html', 'Manuel du concours'],
   ['epreuves-precedentes.html', 'Les épreuves précédentes'],
   ['decouvrir-crypto.html', 'Découvrir la crypto'],
   ['enseignants.html', 'Enseignants'],
   ['qui-sommes-nous.html', 'Qui sommes-nous&nbsp;?']
];

// Nom du fichier courant, pour surligner l'entrée de menu active.
function currentFile() {
   return location.pathname.split('/').pop() || 'index.html';
}

customElements.define('site-header', class extends HTMLElement {
   connectedCallback() {
      var here = currentFile();
      var items = MENU.map(function (entry) {
         var href = entry[0];
         var label = entry[1];
         /*
          * Mode concours : pendant les épreuves, index.html est remplacé par la
          * page allégée et l'accueil complet est déplacé dans main.html. Sur
          * cette page-là, « Accueil » doit renvoyer vers main.html, sinon le
          * lien ramène à la page allégée.
          */
         if (here === 'main.html' && href === 'index.html') {
            href = 'main.html';
         }
         // On compare sur le nom de fichier seul, en ignorant une éventuelle ancre.
         var file = href.split('#')[0];
         var active = (file === here) ? ' class="active"' : '';
         return '<li' + active + '><a href="' + href + '">' + label + '</a></li>';
      }).join('');

      this.innerHTML =
         '<header class="header" role="banner">' +
         '  <div class="headerContent">' +
         '    <div class="subHeader">' +
         '      <a href="https://www.facebook.com/concours-alkindi" target="_blank" title="Suivez-nous sur Facebook" class="fr mrm">' +
         '        <img src="images/facebook_black.png" alt="Suivez-nous sur Facebook" height="20" width="20">' +
         '      </a>' +
         '      <a href="https://www.twitter.com/ConcoursAlKindi" target="_blank" title="Suivez-nous sur Twitter" class="fr">' +
         '        <img src="images/twitter_black.png" alt="Suivez-nous sur Twitter" height="20" width="20">' +
         '      </a>' +
         '    </div>' +
         '    <div class="siteLogo">' +
         '      <div class="siteTitle">' +
         '        <span class="hidden">Concours Alkindi</span>' +
         '        <img src="images/logo.png" alt="Logo Concours Alkindi" />' +
         '      </div>' +
         '    </div>' +
         '    <nav id="menu" role="navigation"><ul>' + items + '</ul></nav>' +
         '  </div>' +
         '</header>';
   }
});

customElements.define('site-footer', class extends HTMLElement {
   connectedCallback() {
      this.innerHTML =
         '<footer id="footer" role="contentinfo">' +
         '  <div id="copyright">' +
         '    Concours Alkindi par <a href="https://www.animath.fr" target="_blank">Animath</a>' +
         '    et <a href="https://www.france-ioi.org" target="_blank">France-ioi</a>' +
         '    - <a href="qui-sommes-nous.html">Contact</a>' +
         '    - <a href="qui-sommes-nous.html#presse">Presse</a>' +
         '    - <a href="infos-legales.html">Informations légales</a>' +
         '  </div>' +
         '</footer>';
   }
});

/*
 * Listes de vidéos : au clic sur une vignette, on remplace l'image par le
 * lecteur YouTube. Une seule vidéo ouverte à la fois, comme avant.
 * Le contenu (titre, vignette, URL) reste dans le HTML de la page.
 */
function closeVideo(li) {
   li.classList.remove('active');
   var player = li.querySelector('.videoPlayer');
   if (player) { player.remove(); }
   var img = li.querySelector('img');
   if (img) { img.style.display = ''; }
}

function openVideo(li) {
   li.classList.add('active');
   var img = li.querySelector('img');
   if (img) { img.style.display = 'none'; }

   var frame = document.createElement('iframe');
   frame.width = 800;
   frame.height = 450;
   frame.setAttribute('frameborder', '0');
   frame.setAttribute('allowfullscreen', '');
   frame.src = li.dataset.video;

   var player = document.createElement('div');
   player.className = 'videoPlayer';
   player.appendChild(frame);
   li.insertBefore(player, li.firstChild);
}

function initVideos() {
   document.querySelectorAll('.videosList li[data-video]').forEach(function (li) {
      li.addEventListener('click', function () {
         if (li.classList.contains('active')) { return; }
         li.parentNode.querySelectorAll('li.active').forEach(closeVideo);
         openVideo(li);
      });
   });
}

if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initVideos);
} else {
   initVideos();
}
