Technologies utilisées
================
Dans le dossier `frontend` et `backend`
- RabbitMQ
- ExpressJS
- ReactJS
- MySQL, TypeORM
- Docker
- ViteJS
- Redux

Pour crypter les mdp on utilise bcryptJS
https://www.npmjs.com/package/bcrypt

## Les micro-services

- `product` : CRUD des produits
- `user` : CRUD des utilisateurs
- `order` : CRUD des commandes
- `payment` : CRUD gestion des paiements

# Depuis Docker

Se placer dans le dossier `SweetOrganic` et lancer la commande suivante :

```bash
docker-compose up
```
Redemarrer les containers (orders, users, products) une fois les services démarrer, soit dans un autre terminal avec la commande suivante soit en faisant `CTRL+C` et en relançant la commande précédente :

```bash
docker-compose restart
```
On peut également les redémarrer dans l'inteface de Docker Desktop.

Ne pas oublier de supprimer les containers et les images après utilisation :

```bash
docker-compose down
```

# En local

## Installation
```bash
npm i # dans le dossier backend (pour chaque micro-services) et frontend
```
## Ne pas oublier de lancer RabbitMQ et MySQL

créer une base de donnée `products`, `users`, `order_product` dans MySQL

## Lancement
```bash
npm start # dans le dossier backend (pour chaque micro-services)
```
```bash
npm run dev # dans le dossier frontend
```
# Pour tester

## Accès en mode utilisateur lambda :
- Nom d'utilisateur : rd3
- Mot de passe : 1234
## Accès en mode admin :
- Nom d'utilisateur : sweet
- Mot de passe : 13c6f3