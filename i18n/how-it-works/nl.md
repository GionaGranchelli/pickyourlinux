# Hoe het werkt

Deze pagina geeft een documentatiegedreven overzicht van de beslisengine, het datamodel en de uitlegbaarheidsregels achter Pick Your Linux.

## Gedekte documentatiebronnen

- ARCHITECTURE.md
- DATA_CONTRACT.md
- DATA_RULES.md
- QUESTION_CATALOG.md
- CONSTRAINT_MAPPING.md
- RESULTS_COPY.md
- TESTING.md
- TONE_AND_COPY.md
- FRONTEND-IMPLEMENTATION-RULES.md

## 1. Productbelofte

Pick Your Linux is een deterministische compatibiliteitsengine. Het rangschikt niet, geeft geen scores en adviseert niet een enkele beste distro. Het filtert alleen met expliciete regels en toont transparante redenen.

- Meerdere matches zijn normaal wanneer meerdere distro's aan dezelfde beperkingen voldoen.
- Geen verborgen gewichten, populariteitsscores of subjectieve aanbevelingen.
- Je kunt antwoorden aanpassen en direct zien wat er verandert.

## 2. Kernarchitectuur

Het systeem is opgesplitst in strikte lagen zodat logica testbaar blijft en de UI dom blijft.

- Datalaag (`/src/data`): schema's, vraagcatalogus, distro-dataset.
- Logiclaag (`/src/engine/logic.ts`): pure evaluatie van condities en patches.
- Statuslaag (`/src/engine/state.ts`): flow-orchestratie, voortgang, ongedaan maken, resultaat-viewmodellen.
- UI-laag (`/src/components`): render-only componenten.
- Import-richting is eenrichtingsverkeer: UI -> state -> logic.

## 3. Datacontract (UserIntent)

Elk antwoord werkt een enkel gevalideerd `UserIntent`-object bij. Dat is de beslisstatus.

- Installatie- en onderhoudsvoorkeuren bepalen tolerantie voor frictie.
- Proprietary-voorkeur bepaalt acceptatie van gesloten componenten.
- Hardwarecontext bevat architectuur, RAM, secure boot en GPU-details.
- Use-case-tags bevatten Gaming, Privacy, Work, Server en OldHardware.
- Optionele verfijningen bevatten desktopvoorkeur, release-model, init-systeem en package manager.

## 4. Vraagengine

Vragen zijn data-gedreven. Elke optie bevat deterministische JSON-patches. Zichtbaarheid wordt alleen bepaald door expliciete condities.

- Toegestane patch-ops: `set`, `add_tag`, `remove_tag`.
- Toegestane condition-ops: `eq`, `neq`, `in`, `contains`, `and`, `or`.
- Geen functies in data, geen callbacks en geen runtime-`eval`.
- Vraagvolgorde en fasegedrag komen uit de catalogus, niet uit de UI.

## 5. Gefaseerde reis

De flowdiepte is progressief en alleen vooruit: Quick (Beginner) -> Intermediate -> Advanced.

- Quick verzamelt snel de belangrijkste beperkingen.
- Intermediate voegt praktische verfijning toe (desktopstijl, update-model, hardwaredetails).
- Advanced voegt expliciete systeemvoorkeuren toe (init, package manager, strengere controles).
- Gebruikers kunnen na quick/intermediate stoppen bij resultaten en later verder verfijnen zonder herstart.

## 6. Harde beperkingen (Pass/Fail)

Harde beperkingen sluiten incompatibele distro's uit. Als een distro op een harde regel faalt, valt die af.

- GUI-installer vereist sluit distro's met handmatige installatie uit.
- Onderhoud zonder terminal vereist sluit hands-on distro's uit.
- Proprietary vermijden sluit distro's uit die proprietary vereisen.
- Proprietary vereisen sluit distro's uit zonder proprietary-ondersteuning.
- Oude hardware vereist sluit distro's uit die niet geschikt zijn voor lichte/oudere systemen.
- Secure Boot- en NVIDIA-voorkeuren voegen extra expliciete checks toe.

## 7. Zachte compatibiliteitsredenen

Zachte redenen rangschikken distro's niet. Ze verklaren alleen waarom een compatibele distro beter kan passen bij bepaalde doelen.

- Gaming- en privacyprofiel genereren uitlegbaarheidsredenen.
- Desktop/release/init/package-manager-voorkeuren voegen expliciete matchredenen toe.
- In resultaten worden keuzegedreven redenen en strikte filtermatches apart getoond.

## 8. Resultaten en uitlegbaarheid

Resultaten worden getoond als compatibiliteitsuitkomsten, niet als aanbevelingen.

- Elke kaart bevat strikte filtermatches, keuzegedreven redenen en mogelijke frictie.
- Uitlegbaarheidspaneel toont actieve beperkingen en uitsluitingsredenen.
- Vergelijkingspagina toont distro-attributen naast elkaar uit dezelfde databron.
- Standaard sortering is meeste matches eerst; filters zijn expliciet en omkeerbaar.

## 9. Datakwaliteit en audits

Distro-data volgt schema-validatie plus consistentie-audits.

- Schema-validatie dwingt geldige waarden per attribuut af.
- Auditregels markeren verdachte combinaties (bijv. NVIDIA-support vs proprietary-beleid).
- Secure Boot-claims en rolling-maintenance-aannames worden getoetst op verdedigbaarheid.

## 10. Tests en validatiegates

Wijzigingen moeten deterministische validatiepipelines doorstaan.

- Flow-validator controleert of zichtbaarheid en transities coherent zijn.
- Vraag- en distro-validators bewaken schema- en catalogusintegriteit.
- Engine-tests dekken conditielogica, patchgedrag, afronding en ongedaan maken.
- Doel: uitlegbaar en reproduceerbaar gedrag onder strict typing en schemacontrole.

## 11. UX- en copyregels

Taal is ontworpen voor duidelijkheid en omkeerbaarheid.

- Vermijd woorden als best, top, recommended of populariteitsclaims.
- Vermijd skill-judgment framing in de UI; focus op comfort en doelen.
- Elke keuze moet omkeerbaar voelen: antwoorden bekijken, aanpassen of opnieuw starten.
