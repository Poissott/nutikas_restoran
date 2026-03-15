# Nutikas Restoran

Interactive restaurant reservation system with a React + Vite frontend and a Spring Boot backend.

## Overview

This project allows a user to:

- select a reservation date and start time
- view the restaurant floor plan visually
- see which tables are already occupied
- choose party size and comfort preferences
- receive recommended tables based on party fit and comfort scores
- confirm and submit a booking through the UI

The backend seeds a fixed restaurant table layout and generates random demo reservations on startup when the database is empty.

## Tech Stack

### Frontend

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4
- React Konva / Konva
- React Select
- MUI X Date Pickers
- Day.js
- Motion

### Backend

- Java 25
- Spring Boot 4.0.3
- Spring Web
- Spring Data JPA
- H2 in-memory database
- Maven Wrapper

## Prerequisites

Before starting the project, install the following tools:

1. Node.js
2. npm
3. Java JDK 25
4. Maven is optional because the project includes Maven Wrapper (`mvnw` / `mvnw.cmd`)
5. Git, if you want to clone the repository

Recommended checks:

```bash
node --version
npm --version
java --version
```

## Dependencies

### Frontend runtime dependencies

- `@emotion/react`
- `@emotion/styled`
- `@mui/material`
- `@mui/x-date-pickers`
- `@tailwindcss/vite`
- `dayjs`
- `konva`
- `motion`
- `react`
- `react-dom`
- `react-konva`
- `react-router-dom`
- `react-select`
- `tailwindcss`

### Frontend development dependencies

- `@eslint/js`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@vitejs/plugin-react`
- `babel-plugin-react-compiler`
- `eslint`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `typescript`
- `typescript-eslint`
- `vite`

### Backend dependencies

- `spring-boot-starter-webmvc`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-web`
- `h2`

### Backend test dependencies

- `spring-boot-starter-webmvc-test`
- `spring-boot-starter-test`

## Project Structure

```text
nutikas_restoran/
├─ src/                   # Frontend source code
├─ public/                # Static frontend assets
├─ backend/               # Spring Boot backend
│  ├─ src/main/java/      # Java source code
│  ├─ src/main/resources/ # Spring configuration and resources
│  └─ pom.xml             # Maven configuration
├─ package.json           # Frontend dependencies and scripts
└─ README.md
```

## Activation Plan

Follow these steps to activate and run the project locally.

### 1. Clone the repository

```bash
git clone <repository-url>
cd nutikas_restoran
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the backend

From the project root:

#### Windows

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

#### macOS / Linux

```bash
cd backend
./mvnw spring-boot:run
```

Backend default URL:

```text
http://localhost:8080
```

### 4. Start the frontend

Open a second terminal from the project root:

```bash
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

The frontend is configured to proxy `/api` requests to `http://localhost:8080`.

### 5. Open the application

Open the browser and go to:

```text
http://localhost:5173
```

### 6. Use the application

1. Open the reservation page.
2. Select a date and start time.
3. Click `Submit` in the timetable modal.
4. Select the number of guests.
5. Optionally select comfort preferences.
6. Click a recommended table.
7. Click `Confirm the booking`.
8. Review the booking in the confirmation dialog.
9. Click `Submit booking`.

## Booking Behavior

- Demo reservations generated on backend startup have random durations.
- User-created bookings from the frontend currently use a fixed duration of `90 minutes`.
- The available start-time grid uses `15-minute` increments.
- Demo data is generated for the next `30 days` when the database is empty.

## Build Commands

### Frontend

```bash
npm run build
```

### Backend

#### Windows

```powershell
cd backend
.\mvnw.cmd -DskipTests compile
```

#### macOS / Linux

```bash
cd backend
./mvnw -DskipTests compile
```

## Development Commands

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

#### Windows

```powershell
cd backend
.\mvnw.cmd spring-boot:run
.\mvnw.cmd test
.\mvnw.cmd -DskipTests compile
```

#### macOS / Linux

```bash
cd backend
./mvnw spring-boot:run
./mvnw test
./mvnw -DskipTests compile
```

## Configuration Notes

- Frontend dev server proxy is configured in `vite.config.ts`.
- Backend uses an H2 in-memory database, so demo data is recreated when the database starts empty.
- The language switcher UI exists, but language-changing behavior is not yet implemented.

## Troubleshooting

### Backend does not start

Check:

- Java 25 is installed and active
- port `8080` is free
- Maven Wrapper commands are run from the `backend` directory

### Frontend cannot reach backend

Check:

- backend is running on `http://localhost:8080`
- frontend is running on `http://localhost:5173`
- Vite proxy configuration is unchanged

### Dependencies fail to install

Check:

- Node.js and npm are installed correctly
- internet access is available for package download
- `node_modules` is not locked by another process

## Future Improvements

- configurable booking duration in the UI
- real language switching
- post-booking navigation or success screen
- persistent production database instead of H2 in-memory storage


# Nutikas Restorani Reserveerimissüsteem

## Programmi tutvustus:

Nutikas restoranisüsteem on mõeldud laudade interaktiivseks broneerimiseks. Esilehel avaneb võimalus lugeda lühiinfot äpi kohta ning samas ka edasi liikuda laua broneermise lehele.

Esimese asjana avaneb broneerimise lehel kuupäeva ning kellaaja valik (mida saab ka hiljem muuta). Mida eriti silmas pidada, on see, et demo andmebaasis on juhuslikult genereeritud esimese 30 päeva broneerimise info koos juhuslike broneeringu pikkustega (mida saab loomulikult ka enda vajaduse järgi sätestada). Kuid samas testiv kasutaja ise, valides kellaja vahemikust 8:00-21:45, saab automaatselt 90-minutilise broneeringu ning selle pikkuse muutmist ei ole implementeeritud.

Kui kuupäev ja kellaaeg on valitud, avaneb testijale ette restorani ruumiplaan, kus ei ole veel ühtegi lauda võimalik valida. Näha on hallikasrohelisi laudu, mis tähistavad potensiaalseid vabu laudu, ning punaseid laudu, mille broneerimine on eelnevalt valitud algusaja suhtes välistatud. 
Ruumiplaani kõrval avaneb testijale võimalus valida külastajate arv (1-6) ja soovitud mugavused (valikus on vaikne nurk, aknavaade ja lähedus laste mängualale). Külastajate arvu valimine on vajalik tegevus, et käivitada laudade soovitamine. Need soovitused on tähistatud erksa rohelise värviga ning on animeeritud pulseerima. Samas on tähele panna ka tekkinud oranže laudu, mis tähistavad laudade ebasobivust antud külastajate arvule. Siinpuhul kui toole on vähem kui külalisi, siis laudu ei saa broneerida. Sama kehtib ka siis, kui on 1-2 inimest, siis 4- ja 6-kohaline laud on neile liiga suur ning kui on 3 inimest, siis 6-kohaline laud on neile samuti liiga suur. Samas kui ühtegi muud vaba lauda ei ole, siis saab väike grupp ka suurema laua, kui on ette nähtud.
Seejärel saab valida spetsiaalseid mugavusi (valikus on vaikne nurk, aknavaade ja lähedus laste mängualale). Valida võib ükskõik kui palju. Samuti ei pea üldse valima. Tehes valiku, tekib laudadele ruumiplaanis rohelise värvi gradient, milles tumedamad värvid tähistavad soovidele paremini vastavaid laudu ning heledamad värvid soovidele vähem vastavaid. Kui laud soovidele üldse ei vasta, siis seda ei soovitata üldse.

Valiku tegemiseks tuleb lauale vajutada. Ning kui ollakse selles kindel, siis tuleb vajutada nuppu "Confirm the booking", milles avaneb broneeringu kinnitus kõikide andmetega. Seejärel saab kas tagasi minna või broneeringu lõplikult kinnitada. 

NB. Äpi lõplikus vormis viiksin ma kasutaja broneeringu kinnituse järkselt tagasi esilehele, kuid demo jaoks jäädakse samale lehele, et näha, kas valitud laud sai tõesti broneeritud (peaks olema nii küll).

Paremal üleval on UI element äpi teksti keele muutmiseks, kuid seda funktsiooni ei jõudnud ma veel implementeerida.



Kõigepealt alustasin ma backendiga, luues põhilised entity'd - table ja reservation. Ning seejärel lõin ma mõlemale Spring Bootile omase tüüpilise struktuuri. 
Selle osa põhiloogika kirjutasin ma ise, kuid samas on seal väga palju kordusi (palju korduvaid CRUD ja REST operatsioonide elemente), mistõttu pidasin loogiliseks kasutada seal AI genereerimist, et need kordused saaks kiiremini kirjutatud (kuid loomulikult valideerisin ma igat genereeritud rida isiklikult).
