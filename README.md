# Uddmans bästa snapsvisor

Detta är en digitala sångbok i form av en mobilanpassad och responsiv webbapplikation. Den är utformad för att ha på sociala sammankomster, middagsbjudningar, kräftskivor och midsommarfiranden. Den gör det enkelt för gäster att söka efter, bläddra bland och sjunga snapsvisor och dryckesvisor tillsammans – utan krångel, med snabba laddningstider och tydlig, lättläst design.

Målgruppen är toastmasters och deltagare av fest/event. Istället för att ha en pappersupplaga och inte tillräckligt många häften så finns en digitaliserad en sångbok. 


## Funktioner
Appen idag innehåller 27 visor som man lätt kan söka bland i sökfältet. Sångerna är kategoriesarade så att man lätt kan hitta en låt som är lämplig till tillfället. Man kan filtrera lätt bland de olika kategorierna under sökfältet.

Sångsidan är utformad för att vara tydlig för användaren och det finns knappar längst upp för att kunna justera storleken på texten 


## Skärmbilder

<img width="270" height="585" alt="Screenshot_20260917_144737_com android chrome" src="https://github.com/user-attachments/assets/b28f130b-e30e-4151-b252-d71b608faedb" />


<img width="270" height="585" alt="Screenshot_20260917_144201_com android chrome" src="https://github.com/user-attachments/assets/6a4f231d-866d-40da-b35d-379b3ae7d345" />

## Länk till app

https://songbook-iuvanuggh-suddis.vercel.app/

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
Kända begränsningar
Möjliga nästa steg



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
