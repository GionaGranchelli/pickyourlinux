# Come funziona

Questa pagina offre una panoramica basata sulla documentazione del motore decisionale, del modello dati e delle regole di spiegabilita di Pick Your Linux.

## Fonti di documentazione coperte

- ARCHITECTURE.md
- DATA_CONTRACT.md
- DATA_RULES.md
- QUESTION_CATALOG.md
- CONSTRAINT_MAPPING.md
- RESULTS_COPY.md
- TESTING.md
- TONE_AND_COPY.md
- FRONTEND-IMPLEMENTATION-RULES.md

## 1. Promessa del prodotto

Pick Your Linux e un motore di compatibilita deterministico. Non classifica, non assegna punteggi e non suggerisce una sola distro migliore. Filtra solo con regole esplicite e mostra motivazioni trasparenti.

- E normale avere piu risultati quando piu distro soddisfano gli stessi vincoli.
- Non ci sono pesi nascosti, punteggi di popolarita o raccomandazioni soggettive.
- Puoi cambiare risposta e vedere subito cosa cambia.

## 2. Architettura principale

Il sistema e diviso in livelli rigorosi per mantenere la logica testabile e la UI priva di decisioni.

- Livello dati (`/src/data`): schemi, catalogo domande, dataset distro.
- Livello logica (`/src/engine/logic.ts`): valutazione pura di condizioni e patch.
- Livello stato (`/src/engine/state.ts`): orchestrazione del flusso, progresso, annulla, modelli risultati.
- Livello UI (`/src/components`): componenti di sola visualizzazione.
- Direzione import unidirezionale: UI -> state -> logic.

## 3. Contratto dati (UserIntent)

Ogni risposta aggiorna un unico oggetto `UserIntent` validato. Questo e lo stato decisionale.

- Preferenze su installazione e manutenzione definiscono la tolleranza alla frizione.
- Preferenza sul software proprietario controlla l'accettazione di componenti chiusi.
- Contesto hardware include architettura, RAM, secure boot e dettagli GPU.
- I tag di utilizzo includono Gaming, Privacy, Work, Server e OldHardware.
- I campi opzionali includono desktop, modello di rilascio, init system e package manager.

## 4. Motore delle domande

Le domande sono guidate dai dati. Ogni opzione contiene patch JSON deterministiche. La visibilita e controllata solo da condizioni esplicite.

- Operazioni patch consentite: `set`, `add_tag`, `remove_tag`.
- Operazioni condizione consentite: `eq`, `neq`, `in`, `contains`, `and`, `or`.
- Nessuna funzione nei dati, nessuna callback, nessun `eval` runtime.
- Ordine delle domande e comportamento di fase vengono dal catalogo, non dalla UI.

## 5. Percorso a fasi

La profondita del flusso e progressiva e solo in avanti: Quick (Beginner) -> Intermediate -> Advanced.

- Quick raccoglie i vincoli ad alto segnale in poco tempo.
- Intermediate aggiunge raffinamenti pratici (stile desktop, modello aggiornamenti, dettagli hardware).
- Advanced aggiunge preferenze di sistema esplicite (init, package manager, controlli piu rigorosi).
- Puoi fermarti ai risultati dopo quick/intermediate e continuare a rifinire senza ripartire.

## 6. Vincoli rigidi (Pass/Fail)

I vincoli rigidi escludono distro incompatibili. Se una distro fallisce una regola rigida, viene esclusa.

- Richiedere installer GUI esclude distro con installer manuale.
- Richiedere manutenzione senza terminale esclude distro che richiedono interventi manuali.
- Evitare software proprietario esclude distro che lo richiedono.
- Richiedere software proprietario esclude distro che non lo supportano.
- Richiedere supporto hardware vecchio esclude distro non adatte a sistemi datati.
- Preferenze Secure Boot e NVIDIA applicano controlli espliciti aggiuntivi.

## 7. Motivazioni di compatibilita soft

Le motivazioni soft non ordinano le distro. Spiegano solo perche una distro compatibile puo adattarsi meglio a certi obiettivi.

- Gaming e privacy generano motivazioni di spiegabilita.
- Preferenze desktop/rilascio/init/package manager aggiungono motivazioni esplicite.
- Nei risultati motivazioni legate alle scelte e filtri rigidi sono separate.

## 8. Risultati e spiegabilita

I risultati sono presentati come esiti di compatibilita, non come raccomandazioni.

- Ogni card include filtri rigidi soddisfatti, motivazioni legate alle scelte e possibile frizione.
- Il pannello di spiegabilita mostra vincoli attivi e motivi di esclusione.
- La pagina compare mostra gli attributi delle distro affiancati con la stessa fonte dati.
- Ordinamento predefinito: piu corrispondenze in alto; filtri utente espliciti e reversibili.

## 9. Qualita dati e audit

I dati distro seguono validazione schema piu audit di coerenza.

- La validazione schema impone valori legali per ogni attributo.
- Le regole di audit segnalano combinazioni sospette (es. supporto NVIDIA vs policy proprietaria).
- Le dichiarazioni secure boot e le aspettative rolling vengono verificate per difendibilita.

## 10. Test e gate di validazione

Le modifiche devono passare pipeline deterministiche di validazione.

- Il validatore di flusso controlla coerenza di visibilita e transizioni.
- I validatori di domande e distro garantiscono integrita di schema e catalogo.
- I test del motore coprono logica condizioni, patch, completamento e annulla.
- Obiettivo: comportamento spiegabile e riproducibile con typing rigoroso e controllo schema.

## 11. Regole UX e copy

Il linguaggio e progettato per chiarezza e reversibilita.

- Evita parole come migliore, top, consigliato o claim basati sulla popolarita.
- Evita framing di giudizio sulle competenze nella UI; focalizzati su comfort e obiettivi.
- Ogni scelta deve essere reversibile: rivedi risposte, modifica o riavvia.
