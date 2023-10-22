Technologies utilisées
================
Dans le dossier `frontend` et `backend`
> RabbitMQ
> ExpressJS
> ReactJS
> MySQL
> Docker
> ViteJS

## Installation
```bash
npm i # dans le dossier backend (pour chaque micro-services) et frontend
```
## Ne pas oublier de lancer RabbitMQ et MySQL

créer une base de donnée `yt_node_admin`, `users` dans MySQL

## Lancement
```bash
npm start # dans le dossier backend (pour chaque micro-services)
```
```bash
npm run dev # dans le dossier frontend
```

## Accéder aux service crud

### Micro-service `product`

```bash	
http://localhost:5173/ProductList # (Dashboard de tous les produits)
```

```bash
http://localhost:5173/getProduct # GET (Récupérer tous les produits)
```
```bash
http://localhost:5173/createProduct # POST (Créer un produit)
```
```bash
http://localhost:5173/updateProduct # PUT (Modifier un produit)
```
```bash
http://localhost:5173/deleteProduct # DELETE (Supprimer un produit)
``` 

### Micro-service `user`

```bash	
http://localhost:5173/UserList # (Dashboard de tous les utilisateurs)
```

```bash	
http://localhost:5173/getUser # GET (Récupérer tous les utilisateurs)
```
```bash
http://localhost:5173/createUser # POST (Créer un utilisateur)
```
```bash
http://localhost:5173/updateUser # PUT (Modifier un utilisateur)
```
```bash
http://localhost:5173/deleteUser # DELETE (Supprimer un utilisateur)
```
