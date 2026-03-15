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
- After booking submission you will not be re-navigated to home page, but you will be able to see the room plan again with your previous booking shown as `occupied` for demo purposes.

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

## History

You can see commit histories in various forms, but I will break down the production history here as well (with amount of time it took):

- Initialization of the vite/react framework tree structures 
- Initialization of Spring Boot backend
- Development of backend entities: `Reservation`, `Table`, `Recommendation` (3 hours)
    - Not very difficult. Wrote the core logic myself, but I also used AI to speed up the process by generating the repetitive parts of the code.
- Development of backend services and controllers of the named entities (3 hours)
    - Also not very difficult. Wrote the core logic myself.
- Development of `Tableplan` - graphic UI elements of the restaurant room plan (5 hours)
    - Had to learn Konva framework, which I was not familiar with. Was not really hard. The entire graphic UI part of this I drew myself.
- Initialization of pages `StartPage`, `ReservationPage` (3 hours)
    - Just writing of core aspects of React and TS
- Development of `TimeTable` logic (6 hours)
    - This one was slightly harder at times, I also sometimes used AI for ideas and sometimes out of convienence some generation. I wish I had developed the possibility to change the duration of the booking for the users or something adjacent. For the latter I conducted a research around the booking websites and I could tell that many of them did not have any way to set an end time or duration (which does make sense). But the variation that caught my eye the most was the possibility to check for bookings longer than 3 hours (so the "unchecked" would be below 3 hours). That is something I would have wanted to implement.
- Development of initial backend data randomizer logic (3 hours)
    - This was also slightly harder. If there was a function I wasn't aware of, I used AI to get a stronger understanding of the topic.
- Development of guest and comfort selection (3 hours)
    - Simple React Select elements, most of the logic I wrote myself. I also read documentation.
- Development of recommendation logic (4 hours)
    - Some parts were easy and intuitive, some parts were hard. The hard parts here were probably the hardest things in this project, so out of calculative decision I used AI generation for some parts of this.
- Development of confirmation system (4 hours)
    - The core ideas here are not really hard (so I wrote them mostly myself), but as a very covering and finalizing part in the project, I also used AI generation to polish a few edges of this part of the project, so there would be less errors.

The StartPage could also be more stylish, but I put most of my effort to the most functional parts of this project.