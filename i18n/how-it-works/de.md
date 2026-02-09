# So funktioniert es

Diese Seite bietet einen dokumentationsbasierten Uberblick uber die Entscheidungs-Engine, das Datenmodell und die Erklarbarkeitsregeln von Pick Your Linux.

## Abgedeckte Dokumentationsquellen

- ARCHITECTURE.md
- DATA_CONTRACT.md
- DATA_RULES.md
- QUESTION_CATALOG.md
- CONSTRAINT_MAPPING.md
- RESULTS_COPY.md
- TESTING.md
- TONE_AND_COPY.md
- FRONTEND-IMPLEMENTATION-RULES.md

## 1. Produktversprechen

Pick Your Linux ist eine deterministische Kompatibilitats-Engine. Es rankt nicht, vergibt keine Scores und empfiehlt keine einzelne "beste" Distribution. Es filtert nur mit expliziten Regeln und zeigt transparente Grunde.

- Mehrere Treffer sind normal, wenn mehrere Distributionen dieselben Kriterien erfullen.
- Keine versteckten Gewichte, Popularitatsscores oder subjektive Empfehlungen.
- Antworten konnen geandert werden, und die Auswirkungen sind sofort sichtbar.

## 2. Kernarchitektur

Das System ist in strikte Schichten aufgeteilt, damit die Logik testbar bleibt und die UI keine Entscheidungen trifft.

- Datenebene (`/src/data`): Schemas, Fragenkatalog, Distribution-Datensatz.
- Logikebene (`/src/engine/logic.ts`): reine Auswertung von Bedingungen und Patches.
- Zustandsebene (`/src/engine/state.ts`): Flow-Orchestrierung, Fortschritt, Undo, Ergebnis-View-Modelle.
- UI-Ebene (`/src/components`): reine Rendering-Komponenten.
- Import-Richtung: UI -> state -> logic.

## 3. Datenvertrag (UserIntent)

Jede Antwort aktualisiert genau ein validiertes `UserIntent`-Objekt. Das ist der Entscheidungszustand.

- Installations- und Wartungspraferenzen definieren die Friktionstoleranz.
- Proprietar-Praferenz steuert die Akzeptanz geschlossener Komponenten.
- Hardware-Kontext umfasst Architektur, RAM, Secure Boot und GPU-Details.
- Use-Case-Tags umfassen Gaming, Privacy, Work, Server und OldHardware.
- Optionale Verfeinerungen umfassen Desktop, Release-Modell, Init-System und Paketmanager.

## 4. Fragen-Engine

Fragen sind datengetrieben. Jede Option enthalt deterministische JSON-Patches. Sichtbarkeit wird nur uber explizite Bedingungen gesteuert.

- Erlaubte Patch-Operationen: `set`, `add_tag`, `remove_tag`.
- Erlaubte Bedingungs-Operationen: `eq`, `neq`, `in`, `contains`, `and`, `or`.
- Keine Funktionen in Daten, keine Callbacks, kein Runtime-`eval`.
- Reihenfolge und Phasenverhalten kommen aus dem Katalog, nicht aus der UI.

## 5. Phasenmodell

Die Tiefe des Flows ist progressiv und nur vorwarts: Quick (Beginner) -> Intermediate -> Advanced.

- Quick sammelt schnell die wichtigsten Einschrankungen.
- Intermediate erganzt praktische Verfeinerungen (Desktop-Stil, Update-Modell, Hardware-Klarstellungen).
- Advanced erganzt explizite Systempraferenzen (Init, Paketmanager, strengere Vorgaben).
- Nach quick/intermediate kann man bei Ergebnissen stoppen und spater ohne Neustart verfeinern.

## 6. Harte Constraints (Pass/Fail)

Harte Constraints schliessen inkompatible Distributionen aus. Scheitert eine Distribution an einer harten Regel, ist sie raus.

- GUI-Installer erforderlich schliesst manuelle Installer aus.
- Wartung ohne Terminal erforderlich schliesst hands-on Distributionen aus.
- Proprietare Software vermeiden schliesst Distributionen aus, die sie voraussetzen.
- Proprietare Software erforderlich schliesst Distributionen ohne Support aus.
- Alte Hardware erforderlich schliesst Distributionen aus, die dafur ungeeignet sind.
- Secure-Boot- und NVIDIA-Praferenzen fugen explizite Zusatzprufungen hinzu.

## 7. Weiche Kompatibilitatsgrunde

Weiche Grunde erzeugen kein Ranking. Sie erklaren nur, warum eine kompatible Distribution fur bestimmte Ziele besser passen kann.

- Gaming- und Privacy-Profil erzeugen Erklarbarkeitsgrunde.
- Desktop/Release/Init/Paketmanager-Praferenzen erzeugen explizite Match-Grunde.
- Ergebnisansicht trennt Choice-driven Grunde von strikten Filter-Treffern.

## 8. Ergebnisse und Erklarbarkeit

Ergebnisse werden als Kompatibilitats-Ausgaben gezeigt, nicht als Empfehlungen.

- Jede Karte enthalt strikte Treffer, choice-driven Grunde und mogliche Reibung.
- Das Erklarbarkeits-Panel zeigt aktive Constraints und Ausschlussgrunde.
- Die Vergleichsseite zeigt Distro-Attribute nebeneinander aus derselben Datenquelle.
- Standard-Sortierung: meisten Treffer zuerst; Filter sind explizit und reversibel.

## 9. Datenqualitat und Audits

Distro-Daten durchlaufen Schema-Validierung plus Konsistenz-Audits.

- Schema-Validierung erzwingt legale Werte fur jedes Attribut.
- Audit-Regeln markieren suspekte Kombinationen (z. B. NVIDIA-Support vs Proprietar-Policy).
- Secure-Boot-Angaben und Rolling-Wartungsannahmen werden auf Belastbarkeit gepruft.

## 10. Tests und Validierungsgates

Anderungen sollen deterministische Validierungs-Pipelines bestehen.

- Der Flow-Validator pruft Sichtbarkeit und Ubergange.
- Fragen- und Distro-Validatoren sichern Schema- und Katalogintegritat.
- Engine-Tests decken Bedingungslogik, Patch-Verhalten, Abschluss und Undo ab.
- Ziel ist reproduzierbares, erklarbares Verhalten unter striktem Typing und Schema-Kontrolle.

## 11. UX- und Copy-Regeln

Sprache ist auf Klarheit und Reversibilitat ausgelegt.

- Keine Begriffe wie best, top, recommended oder Popularitats-Claims.
- Kein Skill-Judgment-Framing in der UI; Fokus auf Komfort und Ziele.
- Jede Entscheidung soll reversibel sein: Antworten prufen, andern oder neu starten.
