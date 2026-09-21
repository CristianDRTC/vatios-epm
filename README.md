# Vatios EPM

Aplicación base para consultar lecturas de consumo energético.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Instalación

```bash
npm run install:all
cp backend/.env.example backend/.env
npm run db:setup
```

## Desarrollo

```bash
npm run dev
```

La interfaz queda disponible en `http://localhost:5173` y la API en `http://localhost:3001/api/health`.

## Producción

```bash
npm run build
npm start
```
