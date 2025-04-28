# Updated Starter Code
# ReactSecurity - Orbit

<p>
  <a href="https://twitter.com/ryanchenkie" target="_blank">
    <img alt="Twitter: ryanchenkie" src="https://img.shields.io/twitter/follow/ryanchenkie.svg?style=social" />
  </a>
</p>

👋 Welcome to Orbit! This is a demo app for learning security for React applications. You can find out more at [ReactSecurity.io](https://reactsecurity.io).

## A Look at the App

Here's the dashboard for the app
![orbit dashboard](./images/orbit-dashboard.png)

For a more in-depth tour, check out this video:

[![orbit tour](./images/orbit-tour.jpg)](https://www.youtube.com/watch?v=cTAizIOENZw)

There are two parts to the app in this project: **orbit-app** and **orbit-api**. These are the front end React application and the backend Node API respectively.

## Install the Dependencies

We need to install dependencies for both **orbit-app** and **orbit-api**. Change directories into each and install with **npm**.

```bash
cd orbit-app
npm install
cd ../orbit-api
npm install
```

## Set Up the Environment Files

The React app contains a file called `.env.local`. This file has a single variable called `REACT_APP_API_URL` which is used to connect to the backend. You can leave this as is.

The backend contains a file called `.env.example`. This file needs to be renamed to `.env` and provided with values.

For `ATLAS_URL`, provide the connection string to your MongoDB Atlas cluster. You can use other MongoDB providers, or even use a local MongoDB connection. Learn how to create a MongoDB instance with Atlas [here](https://www.mongodb.com/download-center).

For `JWT_SECRET`, provide a long, strong, unguessable secret, much like you would in production.

## Run the Applications

### Option 1: Using Docker for MongoDB (Recommended for Local Development)

If you have Docker and Docker Compose installed, you can easily run the required MongoDB instance locally.

1.  **Start the MongoDB container:** In the root directory of the project, run:

    ```bash
    docker compose up -d
    ```

    This will start a MongoDB container in the background, using the configuration defined in `docker-compose.yaml`. The database will be accessible on `localhost:27019`. Ensure your `.env` file in `orbit-api` uses this connection string: `mongodb://user:pass@localhost:27019/?directConnection=true`.

2.  **Run the React App:**

    ```bash
    cd orbit-app
    npm start
    ```

3.  **Run the Node API:** Open a new terminal window.
    ```bash
    cd orbit-api
    npm run dev
    ```

### Option 2: Using Your Own MongoDB Instance

If you prefer not to use Docker, you can use your own MongoDB instance (local or cloud-based like Atlas).

1.  **Ensure MongoDB is running:** Make sure your MongoDB instance is running and accessible.
2.  **Update API Environment:** Update the `ATLAS_URL` in the `orbit-api/.env` file with the correct connection string for your MongoDB instance.
3.  **Run the React App:**
    ```bash
    cd orbit-app
    npm start
    ```
4.  **Run the Node API:** Open a new terminal window.
    ```bash
    cd orbit-api
    npm run dev
    ```

---

The Node API will be running at `http://localhost:3001`.

Navigate to `http://localhost:5173` to see the app running!

## License

MIT
