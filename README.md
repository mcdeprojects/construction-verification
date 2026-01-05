# 🏙️ City Street Proposal

Aplicación para recibir propuestas de nombres de calles y almacenarlas en Supabase.  
Stack: **Vite 7 + React 19 + TypeScript + Tailwind CSS 4 + Supabase JS**

## 🗺️ Instrucciones de preparación de datos

1. Exportar las calles desde **QGIS** en formato **GeoJSON**:
   - Exportar en formato: **Default CRS: EPSG:4326 - WGS 84**
   - Nombre del archivo: `roads-wgs84.geojson`
   - Renombrar el archivo a `roads-wgs84.json`

2. Cargar los datos en el directorio: `src > data`


## 💻 Compatibilidad

Este proyecto requiere **Node.js >= 22**.  
Ha sido desarrollado en **Node 22.17.0**, pero versiones más recientes también deberían funcionar.


## ⚙️ Configuración

1) **Crear la tabla para las propuestas de calles (`streets`)**  

   Columnas:
   - `id` (int8, primary key, autoincremental)
   - `created_at` (timestamptz, default now())
   - `street_code` (varchar) – código de la calle
   - `full_name` (text) – nombre completo de quien propone el nombre
   - `email` (text) – correo electrónico de quien propone el nombre
   - `street_name` (text) – nombre propuesto para la calle
   - `reason` (text) – motivo o justificación de la propuesta

   Script SQL para crear la tabla:

   ```sql
   create table streets (
     id bigint generated always as identity primary key,
     created_at timestamptz default now(),
     street_code varchar not null,.
     full_name varchar(50) not null,
     phone varchar(10) not null,
     street_name varchar(100) not null,
     reason varchar(1000) not null,
     doc_number varchar(10) not null
   );
   ```

2) **Política de inserción**

    Crear la política que permita insertar datos en la tabla `streets` utilizando la anon key, y que realice validaciones sobre los datos antes de ser insertados:

    ```sql
    create policy "street_proposal_policy"
    on "public"."streets"
    as PERMISSIVE
    for INSERT
    to anon  
    with check (
    -- Validaciones
   (street_code IS NOT NULL) 
   AND (street_code::text <> '')
   
   AND (full_name IS NOT NULL) 
   AND (LENGTH(TRIM(full_name)) BETWEEN 2 AND 50)
   AND (TRIM(full_name) ~ '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$')
   
   AND (street_name IS NOT NULL) 
   AND (LENGTH(TRIM(street_name)) BETWEEN 3 AND 100)
   
   AND (reason IS NOT NULL) 
   AND (LENGTH(TRIM(reason)) BETWEEN 20 AND 1000)
   
   AND (phone IS NOT NULL) 
   AND (phone::text ~ '^09\d{8}$')
   
   AND (doc_number IS NOT NULL) 
   AND (LENGTH(TRIM(doc_number::text)) >= 6)
   AND (doc_number::text ~ '^[0-9]+$')
    );
    ```

3) **Variables de entorno**

   - Clonar el archivo `.env.local.template` y renombrarlo a `.env.local`
   - Obtener la **URL del proyecto**:
      - Ir a **Projects** > **Project Settings** > **General**
      - Copiar el **Project ID**
      - Reemplazar en el siguiente formato:  
        `https://xxxxxxxxxx.supabase.co`
   - Obtener la **anon key**:
      - Ir a **Projects** > **Project Settings** > **API Keys**
      - Copiar la **anon public**
   - Agregar las variables de entorno en el archivo `.env.local`:

      ```env
      VITE_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
      VITE_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
      ```



## 🚀 Instalación y ejecución de desarrollo

```bash
npm install && npm run dev
```