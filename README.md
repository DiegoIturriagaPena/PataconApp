# PataconAPP_G1_netflix-chill
## Autores
- Nicolas Hervias
- Diego Iturriaga
- Christian Marchant
- Diego Matus
- Patricio Quezada
- Roberto Ureta
- Raimundo Vásquez
### Tecnologias e Instalación
 Descargar e instalar node: https://nodejs.org/es/
 Abrir la terminal e instalar typescript: 

```sh
$ npm install -g typescript
```

Luego, instalar loopback 4:
```sh
$ npm install -g @loopback/cli
```

Luego, iniciar el servicio MySQL y crear la base de datos para la app: 
`CREATE DATABASE db_patacon;`
`CREATE USER 'node_user'@'localhost' IDENTIFIED BY '123456';`
`GRANT ALL PRIVILEGES ON * . * TO 'node_user'@'localhost';`

Clonar el repositorio de la aplicacion y ejecutar los siguientes comandos:
```sh
$ cd Front
$ npm install
$ cd ..
$ cd backend
$ npm install
$ npm run migrate
$ npm run seeder
```

### Iniciar la aplicación web
Abrir una consola en la ruta del repositorio de la aplicacion y ejecutar los siguientes comandos:
```sh
$ cd Front
$ npm start
```

Luego, abrir otra consola en la ruta del repositorio y ejecutar los siguientes comandos:
```sh
$ cd backend
$ npm start
```

