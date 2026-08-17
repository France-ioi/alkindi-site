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
      /*
       * Les vignettes sont des <li> : sans cela, elles ne réagissent qu'à la
       * souris et restent inatteignables au clavier. On les annonce comme des
       * boutons et on les rend focalisables.
       */
      li.setAttribute('role', 'button');
      li.setAttribute('tabindex', '0');

      li.addEventListener('click', function () {
         if (li.classList.contains('active')) { return; }
         li.parentNode.querySelectorAll('li.active').forEach(closeVideo);
         openVideo(li);
      });

      li.addEventListener('keydown', function (e) {
         if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();   // sinon la barre d'espace fait défiler la page
            li.click();
         }
      });
   });
}

/*
 * Vidéo de présentation de l'accueil : elle n'est chargée qu'au clic.
 * Auparavant l'iframe YouTube était présente dès l'ouverture de la page, ce qui
 * téléchargeait plusieurs centaines de kilooctets et déposait des cookies tiers
 * avant toute action de l'internaute.
 */
function initTeaser() {
   var bouton = document.querySelector('.mainTeaser button[data-video]');
   if (!bouton) { return; }

   bouton.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      // Mêmes dimensions que la vignette (600x338, 16/9) : le lecteur prend
      // exactement sa place, sans saut de mise en page au clic.
      frame.width = 600;
      frame.height = 338;
      frame.setAttribute('frameborder', '0');
      frame.setAttribute('allowfullscreen', '');
      frame.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      frame.src = bouton.dataset.video;
      bouton.parentNode.replaceChild(frame, bouton);
      frame.focus();
   });
}

function initSite() {
   initVideos();
   initTeaser();
}

if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initSite);
} else {
   initSite();
}
