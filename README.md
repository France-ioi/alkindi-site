# Site de présentation du concours Alkindi

Site statique : de simples pages HTML, sans framework, sans étape de build,
sans PHP. Pour travailler dessus il suffit d'un serveur web local (WAMP, ou
`python -m http.server`) — les pages ne peuvent pas être ouvertes directement
depuis le disque en `file://`, car le navigateur y bloque le chargement des
fichiers voisins.

> **Ancienne version du site.** Jusqu'en août 2026, le site était une
> application AngularJS (`index.html` + `page.js` + des fragments `page*.html`).
> Elle est conservée telle quelle sur la branche **`ancien-site-angularjs`**,
> uniquement pour référence — plus rien n'en dépend. La branche `master`
> contient la version en service.

## Structure

| Fichier | Page |
| --- | --- |
| `index.html` | Accueil |
| `manuel.html` | Manuel du concours |
| `epreuves-precedentes.html` | Les épreuves précédentes |
| `decouvrir-crypto.html` | Découvrir la crypto |
| `enseignants.html` | Enseignants |
| `qui-sommes-nous.html` | Qui sommes-nous ? |
| `bd.html` | La bande dessinée |
| `infos-legales.html` | Informations légales |

Chaque page est autonome et contient son propre contenu : pour corriger un
texte, une date ou un lien, on modifie **un seul fichier**.

### Éléments communs

`inc/site.js` fournit l'en-tête, le menu et le pied de page, sous la forme de
deux éléments `<site-header>` et `<site-footer>` présents dans chaque page.
C'est aussi là qu'on ajoute ou renomme une entrée de menu (tableau `MENU`, en
haut du fichier).

`style.css` est la seule feuille de style du site.

> **Important — à faire à chaque modification de `style.css` ou
> `inc/site.js`.** Ces deux fichiers sont référencés avec un numéro de version
> (`style.css?v=1`, `inc/site.js?v=1`). Sans lui, les navigateurs des visiteurs
> réguliers continuent de servir l'ancienne copie et la modification reste
> invisible — y compris une règle CSS manquante, qui peut casser la mise en
> page sans rien signaler.
>
> Après toute modification de l'un de ces deux fichiers, **incrémenter le
> numéro dans les 8 pages** :
>
> ```
> sed -i 's/?v=1/?v=2/g' *.html
> ```
>
> C'est la contrepartie de l'absence d'étape de build : le numéro n'est
> centralisé nulle part.

### Compatibilité avec l'ancien site

`index.html` contient en tête un petit script qui redirige les anciennes
adresses en `#/pageManual`, `#/pagePrevious`, etc. vers les nouvelles pages.
Ces fragments ne sont jamais transmis au serveur : aucune règle de redirection
côté serveur ne peut les traiter, d'où ce script. **À conserver au moins deux
ou trois ans** (favoris, liens de sites partenaires, moteurs de recherche).

## Typographie française

En français, les ponctuations hautes `? ! : ;` et les guillemets `« »` sont
précédés (ou suivis) d'une **espace insécable**. Sans elle, le navigateur peut
rejeter le signe seul en début de ligne — « Qui peut participer » sur une ligne
et « ? » sur la suivante.

Dans le HTML, on écrit donc `&nbsp;` et non une espace ordinaire :

```html
<h2>Qui peut participer&nbsp;?</h2>
<p>Félicitations aux trois équipes gagnantes&nbsp;:</p>
<p>Merci à tou·te·s&nbsp;!</p>
```

À penser à chaque ajout de texte. Attention : `&nbsp;` va dans le **texte
visible** uniquement, jamais dans du code (un `? :` JavaScript, un `margin:` CSS).

## Mode concours

Pendant les épreuves, des dizaines de milliers d'élèves arrivent sur le site en
même temps. On remplace alors l'accueil par une page minimale qui les oriente
directement vers l'épreuve, pour éviter de servir l'accueil complet à chacun.

L'écart est important :

| Page | Poids téléchargé |
| --- | --- |
| `index_during_contest.html` | **3 Ko** |
| accueil complet | **~1 250 Ko** + une iframe YouTube |

### Procédure — début des épreuves

```
cp index.html      main.html                  # l'accueil complet reste accessible
cp index_during_contest.html  index.html      # l'accueil devient la page allégée
```

### Procédure — fin des épreuves

```
cp main.html index.html
rm main.html
```

### Points à connaître

- Les autres pages (`manuel.html`, `epreuves-precedentes.html`, ...) restent
  accessibles normalement pendant toute la durée des épreuves : seul l'accueil
  est remplacé.
- Sur `main.html`, l'entrée « Accueil » du menu pointe vers `main.html` et non
  vers `index.html` — `inc/site.js` gère ce cas explicitement. Ailleurs pendant
  les épreuves, « Accueil » mène à la page allégée, ce qui est voulu.
- `index_during_contest.html` ne contient **pas** le script de redirection des
  anciennes adresses. Pendant les épreuves, un lien du type `#/pageManual`
  aboutit donc sur la page allégée plutôt que sur le manuel. À recopier depuis
  `index.html` si cela devient gênant.
- Penser à mettre à jour l'année indiquée dans `index_during_contest.html`.

## Reste à faire

### `infos/` — à mettre à jour avant décembre

`infos/instructionsTour2.html`, `instructionsTour2Suisse.html`,
`instructionsTour3.html` et `correctionsTour1.html` **n'ont pas été converties**
et portent encore les dates d'éditions passées. Le texte du tour 2 y décrit de
plus une épreuve étalée sur six semaines et sans limite de temps, ce qui
contredit le manuel (45 minutes). Elles ne sont plus reliées au reste du site.

À reprendre au moment de fixer les consignes 2026-2027 : convertir sur le même
modèle que les autres pages, puis les ajouter au tableau `MENU` et au script de
redirection de `index.html` (`#/infosTour2`, `#/infosTour3`, ...).

### `infos-legales.html` — section hors sujet

La section « Algorithmes de calcul des scores et classements » décrit les
concours **Algoréa et Castor** (catégories blanche / jaune / orange / verte,
niveaux CM1 à Terminale), et non Alkindi. Contenu manifestement copié depuis un
autre site France-ioi. Signalée par un commentaire dans le fichier : à réécrire
ou à supprimer.

### Doublons d'affiches

`affiches/alkindi-2025-A4.pdf` est un doublon octet pour octet de
`affiches/affiche-alkindi-2025-A4.pdf`, et `affiches/Alkindi-Affiche-2025.jpg`
est une version image de la même affiche. Ni l'un ni l'autre n'est référencé.
