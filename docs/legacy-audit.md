# Audit rapide de la version historique

## Périmètre et stratégie

L'audit a été réalisé sur `v2` à partir de l'état historique commun à `main` et `v2` (`aaec929`). La V2 remplace le point d'entrée, mais conserve sans modification les dossiers historiques `assets/`, `css/`, `js/`, `pages/` et `slick/`. Aucun asset n'a été supprimé.

Les assets retenus seront optimisés puis copiés dans `src/assets/`. Garder provisoirement les originaux séparés évite de transformer le dossier historique en dépendance implicite de la nouvelle application.

## Assets à conserver

Priorité haute :

- `assets/space2.jpg`, fond réellement utilisé par la page et une carte portfolio ;
- `assets/space.jpg` et `assets/space1.jpg`, variantes à comparer avant le choix final ;
- `assets/NacoDevlogo.png`, `NacoDevlogoW.png`, `NacoDevLogoFull.png`, `NacoDevLogoFullW.png`, déclinaisons à consolider ensuite en une source vectorielle si possible ;
- `assets/favicon/`, `assets/favicon.png` et `assets/favicon3.png`, à rationaliser après validation de la marque ;
- `Montserrat Subrayada`, chargée depuis Google Fonts et utilisée pour le titre, la signature et le footer.

À conserver comme sources ou références :

- `BigBang.mp4`, `BigBang.webm`, `BigBangR.mp4`, `BigBangShort.mp4` : matière vidéo spatiale à évaluer et compresser avant usage ;
- `Screensformat.png`, `beforeslide.jpg`, `afterslide.jpg`, leurs versions responsive, `macbook.png` et `iphone.png` : démonstration historique et comparateur avant/après ;
- `SuperGreen Lab.png`, `SuperGreenLabsmall.png`, `maquettage.jpg`, `bdd.jpg`, `backend.jpg`, `front.jpg`, `frontend.jpg` et `naco.jpg` : contenus portfolio/about à valider éditorialement ;
- `assets/Dev-logo/` : références des technologies historiques, à migrer seulement si elles correspondent encore à l'offre ;
- `gitwhite.png`, `linkedinwhite.png`, `linkedinform.png`, `maltwhite.png` : références sociales, à remplacer de préférence par des SVG accessibles ;
- `arrow1.png` : puce historique facilement réimplémentable en CSS ou SVG.

`assets/videoplayback.mp4` pèse environ 103 Mo et n'est référencé par aucun fichier actif. Il reste conservé pour contrôle de provenance, mais ne doit pas entrer dans la V2 sans justification, renommage, compression et formats adaptés.

## Background, filtres et parallaxe

Le fond historique comprend deux éléments fixes plein écran : `.page-bg` et `.animation-wrapper` dans `css/particle.css`. `.page-bg` affiche `space2.jpg` en `cover`. `background-blend-mode: screen` est déclaré, mais a peu d'effet avec une seule image. Le seul filtre actif est `filter: grayscale(100%)`.

La profondeur vient de quatre nappes `.particle-1` à `.particle-4`. Chaque nappe est un élément de 1 à 3 px dont des centaines d'étoiles sont générées par un très long `box-shadow`. Un pseudo-élément identique est placé 2560 px plus bas pour boucler. Toutes les nappes exécutent `animParticle`, une translation verticale de 0 à -2560 px, avec des durées différentes — notamment 2000 s, 120 s et 200 s. Les tailles et vitesses différentes produisent l'impression de parallaxe.

Il n'existe pas de parallaxe pilotée par scroll, pointeur ou JavaScript. `.parallaxe`, `.parallaxe2` et `.parallaxe3` sont des sections positionnées avec des décalages `top` de 600 à 700 pt, des marges massives et un `body` forcé à 6000 px. Ce mécanisme ne doit pas être reproduit.

À réimplémenter : un background global indépendant du contenu, des couches légères pilotables par variables CSS et une couche de filtres isolée. Les mouvements futurs devront utiliser `transform`, être synchronisés dans une seule boucle, respecter `prefers-reduced-motion` et éviter les milliers de `box-shadow`.

## Modale de contact

Le clic sur `.button#one` récupère l'id `one`, l'applique comme classe à `#modal-container`, puis ajoute `modal-active` au `body`. Le conteneur, caché par `scale(0)`, lance `unfoldIn` pendant 1 s avec `cubic-bezier(0.165, 0.84, 0.44, 1)` : il devient d'abord une ligne horizontale (`scaleY(0.005) scaleX(1)`), puis se déploie verticalement. Le panneau attend 0,8 s avant un `zoomIn` de 0,5 s. L'overlay est noir à 80 % et le panneau blanc est centré par `display: table/table-cell`.

La fermeture ajoute `out-sketch`. Le panneau exécute `zoomOut` pendant 0,5 s, puis le conteneur lance `unfoldOut` après 0,3 s : aplatissement vertical puis contraction horizontale. La croix tourne de 360° au survol. Le formulaire contient nom, e-mail, message, statut particulier/professionnel, honeypot Netlify et redirection vers `pages/success.html`.

Le responsive ajuste surtout `.modal-content` : largeur automatique, marges latérales de 10 pt et padding de 15 px. Ces règles sont recopiées dans de nombreux media queries. Il n'y a pas de fermeture par Échap ou clic overlay, de gestion correcte du focus ou de rôle ARIA. La classe `modal-active` n'a pas de règle utile. Le sélecteur global `.close` ferme aussi plusieurs modales portfolio, ce qui couple des composants sans rapport.

À conserver visuellement : le déploiement en deux temps, le contraste overlay/panneau, la réponse du bouton fermer et la géométrie simple. `BaseModal.vue` prépare une version nettoyée avec Teleport, Échap, clic overlay, verrouillage du scroll, focus initial/restauré, attributs de dialogue et transition réduite si l'utilisateur le demande.

## Dépendances à ne pas reprendre

- jQuery 1.7.2 chargé par CDN, ancien et inutile avec Vue ;
- Slick et `slick/`, présents mais non chargés par la page actuelle ;
- Font Awesome 5.8.1, chargé deux fois, à remplacer par quelques SVG locaux ;
- CountAPI, chargé deux fois alors que son callback est commenté ;
- scripts impératifs de sliders, accordéons et modales dans `js/demo.js` ;
- implémentations quasi identiques `modal.css`, `modalM.css`, `modalC.css` ;
- feuilles `sketch*.css` dupliquées.

Google Fonts reste temporairement utilisé pour préserver Montserrat et Montserrat Subrayada. L'auto-hébergement de fichiers optimisés est préférable avant production. Netlify Forms est un choix de déploiement à revalider, pas une dépendance à recopier automatiquement.

## Dette technique à éviter

- page monolithique de plus de 1200 lignes et CSS qui se surcharge entre fichiers ;
- hauteur fixe, positionnement en `pt`, grands offsets `top` et styles inline ;
- media queries massivement dupliquées dans `responsive.css` ;
- sélecteurs par id, événements globaux et composants couplés ;
- code commenté, règles dupliquées, titre et scripts externes chargés deux fois ;
- ordre d'animations implicite sans état applicatif ;
- absence d'accessibilité clavier et focus des modales ;
- milliers de `box-shadow` pour les particules ;
- vidéo non référencée de plus de 100 Mo et nommage incohérent des assets ;
- contenu, structure, comportement et présentation mélangés.

## Base V2

La base sépare les cinq scènes, l'UI, les composants spatiaux, les données, les traductions et les styles. Le mini système i18n local évite une dépendance prématurée et expose FR/EN/ES avec `fr` par défaut ; Vue I18n pourra le remplacer si les besoins se complexifient. `GlobalBackground`, `ParallaxLayer` et `VisualFilters` définissent les responsabilités futures sans figer la direction artistique. Three.js, TresJS, GSAP et équivalents ne sont pas installés.
