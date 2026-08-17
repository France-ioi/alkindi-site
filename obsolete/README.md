# Contenu obsolète

Conservé pour archive, plus référencé par le menu ni par les pages du site.

## data/

Schéma SQL de la table `subscriptions`, qui alimentait un formulaire
d'inscription à une lettre d'information. **Ce formulaire a disparu du site le
2 janvier 2016** (commit `b842462`) et le code PHP associé (`email.php`,
`connect.php`, `config.php`) n'a plus jamais été atteignable ensuite ; il a été
supprimé lors de la conversion.

Conservé uniquement parce qu'il documente une table qui **peut encore contenir
de vraies adresses email** collectées jusqu'en 2016, dans une base que plus
personne ne consulte. Voir `infos-legales.html`, qui prend des engagements
précis sur la conservation des données. À vérifier puis purger, après quoi ce
dossier pourra disparaître.

## pageVisits.html

Visites de laboratoires de cryptographie organisées pour les lauréat·e·s
académiques des éditions **2017-2018 et 2018-2019**. L'opération n'a pas été
reconduite depuis.

Cette page n'est plus liée depuis aucune page du site :

- le lien « accueillir les lauréat·e·s de chaque académie » dans
  `qui-sommes-nous.html` avait déjà été mis en commentaire ;
- le lien « 18 laboratoires » de `epreuves-precedentes.html` a été retiré lors
  de la conversion (le texte, lui, a été conservé).

Attention si vous la remettez en ligne : les ~27 logos de laboratoires qu'elle
affiche pointent vers `images/<logo>` alors que les fichiers ont été déplacés
dans `images/labos/`. Une partie d'entre eux (`france-ioi.png`,
`crypto-experts.jpeg`, `orange.jpg`, `oppida.png`, `LogoThales.png`,
`logo-CNRS-2019.png`, `Universcience_2009_logo.png`) n'existe plus du tout dans
le dépôt.
