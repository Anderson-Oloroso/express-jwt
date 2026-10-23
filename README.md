# API JWT Passport

API REST desarrollada con Node.js, Express y Passport. Incluye autenticacion local, emision de tokens JWT y autorizacion de una ruta para administradores.

## Requisitos

- Node.js 20 o superior
- npm

## Instalacion y ejecucion

Instala las dependencias:

```bash
npm install
```

Configura las variables de entorno. El archivo `.env.example` sirve como plantilla; copia sus valores a `.env` y define un `JWT_SECRET` aleatorio, unico y de al menos 32 bytes.

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

En macOS o Linux:

```bash
cp .env.example .env
```

Inicia el servidor:

```bash
npm start
```

Por defecto, la API queda disponible en `http://localhost:3000`. Puedes cambiar el puerto mediante `PORT`.

## Variables de entorno

| Variable | Requerida | Descripcion |
| --- | --- | --- |
| `PORT` | No | Puerto HTTP. Por defecto es `3000`. |
| `JWT_SECRET` | Si | Secreto usado para firmar y verificar los JWT. |

No compartas ni agregues `.env` al control de versiones. `.gitignore` excluye ese archivo y `node_modules`.

## Rutas

Todas las rutas de la API, excepto la comprobacion de salud, usan el prefijo `/api/v1`.

### Comprobacion de salud

`GET /health`

No requiere autenticacion. Devuelve el estado y la version de la API.

### Iniciar sesion

`POST /api/v1/user/authenticate`

Valida las credenciales y devuelve un token Bearer.

```json
{
  "username": "satinder",
  "password": "12345"
}
```

Usuarios de demostracion:

| Usuario | Contrasena | Administrador |
| --- | --- | --- |
| `satinder` | `12345` | Si |
| `kael` | `54321` | No |
| `nxy` | `99999` | Si |

Estas credenciales son solo datos de ejemplo y no deben usarse en produccion.

### Listar usuarios

`GET /api/v1/user/list`

Requiere el encabezado `Authorization: Bearer <token>`. Devuelve los perfiles sin contrasenas.

### Crear recompensa

`POST /api/v1/boveda/recompensa`

Requiere un token de administrador en el encabezado `Authorization: Bearer <token>`.

```json
{
  "mision": "Explorar la mazmorra",
  "cristales": 250
}
```

La mision debe tener entre 3 y 80 caracteres; los cristales deben ser un entero entre 1 y 100000. La API responde con `201 Created`.

## Coleccion Bruno

La coleccion se encuentra en `bruno/` y contiene las tres peticiones de la API:

1. `Autenticar usuario`: inicia sesion y guarda el token como variable de ejecucion.
2. `Listar usuarios`: consulta los perfiles usando ese token.
3. `Crear recompensa`: registra una recompensa con el token de administrador.

Las peticiones usan directamente `http://localhost:3000`. Selecciona el entorno `Local` en Bruno y ejecuta primero `Autenticar usuario`; el token de la respuesta se guarda en ese entorno para usarlo en las otras dos peticiones.

## Datos y persistencia

Los cazadores de demostracion y las recompensas se guardan en memoria. Los datos creados se pierden al reiniciar el servidor. Aunque el proyecto define un esquema de Mongoose, esta API de demostracion no conecta ni persiste datos en MongoDB.
