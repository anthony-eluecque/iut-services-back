# iut-services-back


## Migrations

```bash
# Créer une migration
$ npm run migration:create --name=foo

# Générer une migration depuis un changement dans les schémas
$ npm run migration:generate --name=bar

# Run migrations
$ npm run migration:run

# Revert migrations
$ npm run migration:revert