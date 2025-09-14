[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/nHPSu_dn)

**Heroku**: https://pg6301-reexam-moab01567-cdc15abd1115.herokuapp.com

**Github**: https://github.com/kristiania-pg6301-2023/pg6301-reexam-moab01567

## Anbefaller å lese gjennom denne før gjennomgang

### Funksjonelle Krav

- [x] **Krav**: Anonyme brukere skal se de siste innleggene og reaksjoner (emojier) når de kommer til nettsiden. (Lag noen eksempelinnlegg for å demonstrere)
- Jeg tolket det slik at brukere som ikke er logget inn er anonyme. Disse vil ikke se hvem som har reagert på artiklene, men de vil se hvor mange. Dersom de vil se hvem som har reagert, må de logge inn enten med Google eller GitHub.
- Dersom du er innlogget med Github, så vil det være en knapp på venstre side, helt på bunnet, "Create Event", den dukker kun opp dersom du er logget in med Github.
- Det vil også være en knapp på meny som er "My Articles", dersom logget inn med github.

---

- [x] **Krav**: Brukere skal kunne logge seg inn. Du kan velge om brukere skal kunne registrere seg med brukernavn og passord (anbefales ikke) eller om brukere skal logge inn med Google eller Entra ID.
- Jeg har valgt at brukere kan logge seg inn med Google eller GitHub. Kun GitHub-brukere kan publisere artikler.

---

- [x] **Krav**: En bruker som er logget inn kan se på sin profilside.
- Det er en knapp i menyen som sender deg til profilsiden din, hvor du kan logge ut.

---

- [x] **Krav**: Brukere skal forbli logget inn når de refresher nettsiden.
- Hver gang du refresher, vil React sjekke om du har en cookie. Dersom den eksisterer, forblir du innlogget. Jeg har ikke tatt i bruk JWT, da dette ikke var et krav, og vi har ikke jobbet med det i emnet. I den virkelige verden ville vi validert JWT før forespørselen til autoriserte endepunkter.

---

- [x] **Krav**: En bruker som er logget inn kan klikke på et innlegg for å se hvem som har reagert på innlegget og kommentarer. Detaljene skal inkludere en overskrift, tekst, navn og bilde (om tilgjengelig) på den som publiserte innlegget.
- Jeg oppfatter det slik at kun reaksjonene er obligatoriske, siden kommentarer senere ble satt som valgfritt. Denne eksamen er mye arbeid for én person på to uker. Dersom jeg rekker, vil kommentarer bli lagt til, hvor brukere kan kommentere.

---

- [x] **Krav**: Brukere skal kunne publisere nye innlegg. Innlegg skal være mellom 10 ord og 1000 tegn.
- Dette er implementert. Dersom du skriver mindre enn 10 ord i artikkelen, får du en varsel og kan sende den inn på nytt. Det samme gjelder for 1000 tegn. Dette sto ikke beskrevet, men dersom du sender inn en tom tittel, vil du også få beskjed om å prøve igjen.
- valideringene finner du under server->article->ArticleValidator.ts

---

- [x] **Krav**: Systemet hindrer en bruker fra å publisere mer enn 5 innlegg innenfor en time.
- Dette er også implementert. Tiden lagres i sekunder på MongoDB.
- valideringene finner du under server->article->ArticleValidator.ts

---

- [x] **Krav**: Brukeren skal forhindres fra å sende inn en nyhetsartikkel som mangler tekst.
- Dette er implementert. Jeg tolket dette som at tittel er obligatorisk, siden forrige krav nevnte minst 10 ord og 1000 tegn.
- Det vil ikke være mulig å sende inn en nyhetsartikkel uten tekst.
- Poenget er at du ikke kan sende noe dersom feltene er tomme.
- valideringene finner du under server->article->ArticleValidator.ts

---

- [x] **Krav**: En bruker skal kunne redigere et innlegg de selv har publisert.
- Dersom du trykker på en av dine artikler, vil du få en knapp som sier "Edit Article" i høyre hjørne. Denne knappen endrer artikkelmodus fra "read" til "update", hvor du får muligheten til å slette artikkelen eller gjøre endringer og lagre den.

---

- [x] **Krav**: En bruker skal kunne slette et innlegg de selv har publisert.
- Dersom du trykker på en av dine artikler, vil du få en knapp som sier "Edit Article" i høyre hjørne. Denne knappen endrer artikkelmodus fra "read" til "update", hvor du får muligheten til å slette artikkelen eller gjøre endringer og lagre den.

---

- [x] **Krav**: Brukere skal reagere på andres innlegg med en av flere emojier.
- Jeg syntes det var litt uklart her. Sånn jeg forsto det, får en bruker opp et par emojis som de kan velge mellom. Det jeg syntes var uklart, var om brukeren skulle kunne reagere med en eller flere emojier per artikkel. Jeg valgte derfor å gjøre det som Facebook, hvor du kun kan ha en reaksjon per artikkel.

---

- [x] **Valgfritt**: Brukere kan legge til kommentarer til andres innlegg.
- Siden dette er valgfritt, ser jeg an om jeg rekker å gjøre det. Det er mye å gjøre for en person på to uker.

---

- [x] **Valgfritt**: Brukere kan legge til andre brukere som venner.
- Siden dette er valgfritt, ser jeg an om jeg rekker å gjøre det. Det er mye å gjøre for en person på to uker.

---

- [x] **Krav**: Alle feil fra serveren skal presenteres til brukeren på en pen måte, med mulighet for brukeren til å prøve igjen.
- Ja, dette gjøres. Dersom noe ikke lastes inn grunnet serverproblemer, krasjer ikke hele applikasjonen, men heller bare de områdene hvor komponentene ikke skulle lastes inn. Det vil også stå grunnen til hvorfor. Dersom det er en grunn som ikke skyldes brukeren, vil det komme opp "server error" der komponenten skulle vært.

---

## Funksjonelle Krav

- alle kravene følges, jeg syntes bare at npm start skal starte alt sammen? noe som ikke ga helt mening, siden heroku tar den i bruk for å starte serveren og build for å bygge applikajsonen. Vil egt ikke kjøre de to sammtdig siden det kan føre til komplikajsoner.
- Men det er ikke vansklig bare å gjøre det jeg har gjort med npm run dev på top nivå, så kjører den alt i dev. Bare seg package json filen
- testene finner du i github actions
