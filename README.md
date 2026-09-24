![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-%23000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

# Uddmans bästa snapsvisor

Detta är en digitala sångbok i form av en mobilanpassad och responsiv webbapplikation. Den är utformad för att ha på sociala sammankomster, middagsbjudningar, kräftskivor och midsommarfiranden. Den gör det enkelt för gäster att söka efter, bläddra bland och sjunga snapsvisor och dryckesvisor tillsammans – utan krångel, med snabba laddningstider och tydlig, lättläst design.

Målgruppen är toastmasters och deltagare av fest/event. Istället för att ha en pappersupplaga och inte tillräckligt många häften så finns en digitaliserad en sångbok. 


## Funktioner
Appen idag innehåller 57 visor som man lätt kan söka bland i sökfältet. Sångerna är kategoriesarade så att man lätt kan hitta en låt som är lämplig till tillfället. Man kan filtrera lätt bland de olika kategorierna under sökfältet.

Sångsidan är utformad för att vara tydlig för användaren och det finns knappar längst upp för att kunna justera storleken på texten 


## Skärmbilder

<img width="270" height="585" alt="Screenshot_20260917_144737_com android chrome" src="https://github.com/user-attachments/assets/b28f130b-e30e-4151-b252-d71b608faedb" />


<img width="270" height="585" alt="Screenshot_20260917_144201_com android chrome" src="https://github.com/user-attachments/assets/6a4f231d-866d-40da-b35d-379b3ae7d345" />

## Länk till app

https://songbook-delta.vercel.app/

# Teknikval


Projektet är en modern webbapp byggd med följande teknikstack:

- Next.js 16 med App Router för routing, server-rendering och sidstruktur.
- React 19 för komponentbaserat användargränssnitt.
- TypeScript för typsäker kod.
- Tailwind CSS v4 för styling och responsiv design.
- JSON Server som lokal REST-databas på port 3001, med data i db.json.
- Concurrently för att starta Next.js och JSON Server samtidigt med npm run dev.
- Vitest och Testing Library för automatiserade komponent- och funktionstester.
- ESLint för kodkvalitet och linting.
- Google Fonts via next/font, bland annat DM Sans och Fraunces.


<img width="267" height="279" alt="image" src="https://github.com/user-attachments/assets/42f8832d-d69e-4d16-9623-4dd12a50189b" />



## Lokal setup

1. Clona reposotriet till din dator.
2. Skriv in `npm install`i terminalen, se till att du är i root folder av projektet.
3. För att köra igång både server och app lokalt skriv in `npm run dev` i terminalen.
4. Öppna [http://localhost:3000](http://localhost:3000) med din browser.


## Kända begränsningar

 - Faviicon borde bytas ut till något mer stilenligt.
 - Kategorier borde inte ha slidebar utan borde visas under varandra för att göra sidan mer användarvänlig.


##  Roadmap 

- [x] Sökning av sång
- [x] Filtrering av Kategorier
- [x] Justering av storlek på sångtext
- [ ] Justering av UI
- [ ] Favoriter
- [ ] Dark mode /light mode
- [ ] "Om" sida
- [ ] Qr-kod till sångerna


