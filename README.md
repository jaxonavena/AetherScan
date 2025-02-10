## Get started:

1. `npm run dev` in `AetherScan/server` to start backend server @ `http://localhost:8080/api`
2. Create another tab in your terminal...
3. `npm run dev` in `AetherScan/client` to start frontend server @ `http://localhost:5173/`

You might have to do `npm install` for dependencies somewhere along the way...

[Video used to init the repo](https://www.youtube.com/watch?v=mKmxc8TcWQ8)


## To run DB migrations:

1. `npx knex migrate:latest` from `server` directory

### To check on the DB schema

1. `./scripts/check-schema.js` from `server` directory