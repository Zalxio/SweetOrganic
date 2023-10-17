Technology Stack
================
Dans le dossier `frontend` et `backend`
> RabbitMQ
> NodeJS
> ExpressJS
> ReactJS
> MySQL


> MongoDB (utiliser dans le dossier main)
> Docker (Prochainement)

## Installation
```bash
npm i # dans le dossier backend et frontend
```
## Ne pas oublier de lancer RabbitMQ et MySQL

créer une base de donnée `yt_node_admin` dans MySQL

## Lancement
```bash
npm start # dans le dossier backend
```
```bash
npm run dev # dans le dossier frontend
```

## Accéder aux service crud
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

react-router-dom