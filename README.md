# RedSpher Simple Calculator Application

This application consists of two parts: **React client application** and
**Node.js service**.

## React application

Open `client` folder before continue.

### Installation

Run `npm i` to install required packages.

### Start the application

Run `npm start` to start the application (by default it will be on the port
**4000**).

If p.3 was successful you will see an output similar to this one:

```shell
Compiled successfully!

You can now view calculator-client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.18.238.190:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Usage

Enter a numerical expression to the input and press the **"Calculate"** button
to see the calculation result below the button.

## Node.js service

Open `service` folder before continue.

### Installation

1. Run `npm i` to install required packages
2. Run `npm run docker:build` to build a docker image with the name
   `calc-service:latest`

### Start the service

Run `npm run docker:run` to start a docker container from the image
`calc-service:latest` with the name `calc-service`.

If the docker container was run successfully was indicated you will see an
output similar to this one:

an interactive mode (`-it`):

```shell
Calculator service is now running at http://localhost:4000
```

a detached mode (`-d` by default):

```shell
755cdf1b701c1469bffd10c3336ff5c3c60d2ab2f1d4fe7850f0b46e3f28fd01
```

### Stop the service

Run `npm run docker:stop` to stop the docker container.
