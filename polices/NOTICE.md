# Polices hébergées localement

Fichiers `.woff2` récupérés depuis Google Fonts et servis par notre propre
serveur, afin de ne pas transmettre l'adresse IP des visiteurs à Google à
chaque page consultée.

| Fichier | Police | Sous-ensemble |
| --- | --- | --- |
| `opensans-latin.woff2` | Open Sans v44 | latin |
| `opensans-latin-ext.woff2` | Open Sans v44 | latin-ext |
| `exo-latin.woff2` | Exo v25 | latin |
| `exo-latin-ext.woff2` | Exo v25 | latin-ext |

Open Sans (v44) est une police variable : le même fichier sert les graisses
400 et 700.

## Licence

Open Sans et Exo sont toutes deux publiées sous la **SIL Open Font License
1.1**, qui autorise explicitement la redistribution et l'hébergement sur son
propre serveur : <https://openfontlicense.org/>

## Mettre à jour

Les déclarations `@font-face` sont en tête de `style.css`. Pour récupérer une
version plus récente, ouvrir
`https://fonts.googleapis.com/css?family=Open+Sans:400,700` avec un navigateur
récent, y relever les URL `.woff2` des sous-ensembles latin et latin-ext, les
télécharger ici, puis reporter les `unicode-range` correspondants.
