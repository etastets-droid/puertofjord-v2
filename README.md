# Puerto Fjord v2

Sitio web oficial de Puerto Fjord Adventure Retreat & Marina, Patagonia.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS (diseño propio, sin shadcn)
- Supabase (auth + base de datos)
- React Router v6
- date-fns

## Estructura

```
src/
├── components/
│   ├── layout/     Nav, Footer
│   └── sections/   Hero, Intro, Residences, Experiences, Location, Contact
├── hooks/          useLang (EN/ES), useAuth (Supabase)
├── i18n/           translations.ts — textos EN y ES
├── lib/            supabase.ts, houses.ts
├── pages/          Home, OwnerLogin, OwnerDashboard, AdminDashboard
└── main.tsx
supabase/
└── schema.sql      — ejecutar en Supabase SQL Editor
```

## Rutas

| URL | Descripción |
|-----|-------------|
| `/` | Sitio público (EN/ES) |
| `/owners/login` | Login propietarios |
| `/owners` | Dashboard propietario |
| `/admin` | Dashboard administrador |

## Setup

### 1. Variables de entorno

Crear `.env` con:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
```

### 2. Base de datos

Ejecutar `supabase/schema.sql` en Supabase → SQL Editor.

### 3. Crear usuarios

En Supabase → Authentication → Users, crear:
- Un usuario administrador
- Un usuario por propietario (hay 4 propietarios: Nest, Cliff, Woods, y uno que tiene Icefield + Loft)

Luego asignar roles ejecutando:
```sql
INSERT INTO pf_user_roles (user_id, role) VALUES ('<uuid_admin>', 'admin');
INSERT INTO pf_user_roles (user_id, role) VALUES ('<uuid_owner>', 'owner');
-- Para el propietario con 2 casas:
UPDATE pf_properties SET owner_user_id = '<uuid_owner_icefield_loft>' WHERE slug IN ('icefield','loft');
```

### 4. Instalar y correr

```bash
npm install
npm run dev
```

### 5. Deploy en Vercel

Conectar repositorio GitHub → agregar variables de entorno → Deploy.
