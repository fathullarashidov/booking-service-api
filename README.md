# Node.js 22.14

Create a .env file in the root directory and add the following variables:

```env
    PORT=3000
    MODE=production
    
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=postgres
```

The server will be running on port 3000 by default. You can change the port by modifying the `PORT` variable in the `.env` file.
You can also change the database connection settings by modifying the `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` variables in the `.env` file.
You can set the `MODE` variable to `production` or `development` to run the server in the desired mode. The default value is `production`.
## Install
```shell
    nvm install 22.14
```
```shell
    npm install -g pm2
```

## Setup
```shell
    npm install
```
```shell
    npm run build
```
```shell
    npm run start:prod
```

## Clean
```shell
    rm -rf dist
```

```shell
    rm -rf media
```

## PM2
```shell
    pm2 start "npm run start:prod" --name 'name of your app'
```

Then open the browser and go to `http://localhost:3000` to see the app running.
Documentation for the API is available at `http://localhost:3000/docs`.