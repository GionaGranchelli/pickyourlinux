# Comment ca marche

Cette page fournit une vue d'ensemble basee sur la documentation du moteur de decision, du modele de donnees et des regles d'explicabilite de Pick Your Linux.

## Sources de documentation couvertes

- ARCHITECTURE.md
- DATA_CONTRACT.md
- DATA_RULES.md
- QUESTION_CATALOG.md
- CONSTRAINT_MAPPING.md
- RESULTS_COPY.md
- TESTING.md
- TONE_AND_COPY.md
- FRONTEND-IMPLEMENTATION-RULES.md

## 1. Promesse produit

Pick Your Linux est un moteur de compatibilite deterministe. Il ne classe pas, ne note pas et ne recommande pas une seule distribution "meilleure". Il applique uniquement des regles explicites et affiche des raisons transparentes.

- Plusieurs resultats sont normaux si plusieurs distributions respectent les memes contraintes.
- Aucun poids cache, score de popularite ou recommandation subjective.
- Vous pouvez modifier vos reponses et voir immediatement ce qui change.

## 2. Architecture principale

Le systeme est separe en couches strictes pour garder une logique testable et une UI sans prise de decision.

- Couche donnees (`/src/data`) : schemas, catalogue de questions, dataset des distributions.
- Couche logique (`/src/engine/logic.ts`) : evaluation pure des conditions et patchs.
- Couche etat (`/src/engine/state.ts`) : orchestration du flux, progression, annulation, modeles de resultats.
- Couche UI (`/src/components`) : composants de rendu uniquement.
- Sens des imports : UI -> state -> logic.

## 3. Contrat de donnees (UserIntent)

Chaque reponse met a jour un unique objet `UserIntent` valide. C'est l'etat de decision.

- Les preferences d'installation et de maintenance definissent la tolerance a la friction.
- La preference logiciel proprietaire controle l'acceptation de composants fermes.
- Le contexte materiel inclut architecture, RAM, secure boot et details GPU.
- Les tags d'usage incluent Gaming, Privacy, Work, Server et OldHardware.
- Les raffinements optionnels incluent desktop, modele de release, init system et package manager.

## 4. Moteur de questions

Les questions sont pilotees par les donnees. Chaque option contient des patchs JSON deterministes. La visibilite repose uniquement sur des conditions explicites.

- Operations patch autorisees : `set`, `add_tag`, `remove_tag`.
- Operations condition autorisees : `eq`, `neq`, `in`, `contains`, `and`, `or`.
- Aucune fonction dans les donnees, aucun callback, aucun `eval` runtime.
- L'ordre des questions et les phases viennent du catalogue, pas de la UI.

## 5. Parcours par phases

La profondeur du flux est progressive et uniquement vers l'avant : Quick (Beginner) -> Intermediate -> Advanced.

- Quick collecte rapidement les contraintes les plus fortes.
- Intermediate ajoute des raffinements pratiques (style de bureau, modele de mise a jour, precisions materiel).
- Advanced ajoute des preferences systeme explicites (init, gestionnaire de paquets, contraintes plus strictes).
- Vous pouvez vous arreter aux resultats apres quick/intermediate puis continuer sans repartir de zero.

## 6. Contraintes dures (Pass/Fail)

Les contraintes dures excluent les distributions incompatibles. Si une distribution echoue a une regle dure, elle est exclue.

- Exiger un installateur GUI exclut les distributions a installation manuelle.
- Exiger une maintenance sans terminal exclut les distributions "hands-on".
- Eviter le proprietaire exclut les distributions qui en dependent.
- Exiger le proprietaire exclut les distributions qui ne le supportent pas.
- Exiger support vieux materiel exclut les distributions non adaptees aux machines modestes.
- Les preferences Secure Boot et NVIDIA ajoutent des verifications explicites.

## 7. Raisons de compatibilite souples

Les raisons souples ne classent pas les distributions. Elles expliquent pourquoi une distribution compatible peut mieux convenir selon certains objectifs.

- Le profil gaming et privacy genere des raisons d'explicabilite.
- Les preferences desktop/release/init/package manager ajoutent des raisons explicites.
- Les resultats separent raisons liees aux choix et correspondances de filtres stricts.

## 8. Resultats et explicabilite

Les resultats sont presentes comme des issues de compatibilite, pas comme des recommandations.

- Chaque carte inclut filtres stricts correspondants, raisons liees aux choix et friction potentielle.
- Le panneau d'explicabilite montre les contraintes actives et les causes d'exclusion.
- La page de comparaison expose les attributs des distributions cote a cote.
- Tri par defaut : plus de correspondances d'abord ; filtres explicites et reversibles.

## 9. Qualite des donnees et audits

Les donnees des distributions passent une validation de schema et des audits de coherence.

- La validation de schema impose des valeurs legales pour chaque attribut.
- Les regles d'audit signalent les combinaisons suspectes (ex. NVIDIA vs politique proprietaire).
- Les declarations Secure Boot et attentes rolling sont auditees pour garantir leur defensibilite.

## 10. Tests et portes de validation

Les changements doivent passer des pipelines de validation deterministes.

- Le validateur de flux verifie coherence de visibilite et transitions.
- Les validateurs questions/distributions garantissent l'integrite du schema et du catalogue.
- Les tests moteur couvrent logique des conditions, patchs, completion et annulation.
- Objectif : comportement explicable et reproductible sous typage strict et controle schema.

## 11. Regles UX et copy

Le langage est concu pour la clarte et la reversibilite.

- Eviter les mots comme meilleur, top, recommande, ou les promesses de popularite.
- Eviter les jugements de niveau dans la UI ; privilegier confort et objectifs.
- Chaque choix doit rester reversible : revoir, modifier ou recommencer.
