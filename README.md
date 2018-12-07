## Pré-requis

- NodeJS: (>=8.9.0) - https://nodejs.org/
- Wamp : http://www.wampserver.com/en/download-wampserver-64bits/
- Sequelize: npm install -g sequelize sequelize-cli mysql2
- Nodemon: npm install -g nodemon
## Launch api

1. Run in terminal ```npm run win_debug```

##Ajout d'une nouvelle table / model ou juste faire une migration

/!\ Il est nécessaire de créer les bases de données qui sont utilisée par cau-sports-news-api !
(database_development_mandareen, database_test_mandareen, database_production_mandareen)

-  sequelize db:migrate

ceci va exécuter le SQL de db.sql et va mettre en place les bases de données
