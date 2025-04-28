# Picture of the day

## Setup

Just clone the repository with

```git
git clone https://github.com/stefanisarie/nasapictureoftheday
```

Then

```text
cd nasapictureoftheday
yarn install
yarn dev
```

The development server should run at `http://localhost:3000`.

You will be able to toggle between dark and light mode with the button placed in the top left corner.

Switching between HTD and SD image is done with the button found in the top right corner.

The date when the last fetched image happened is in human readble format.

## Build the application

To build the application:

```text
yarn build
```

Run built application with the following command:

```tezxt
node .output/server/index.mjs 
```

Open a browser at `http://localhost:3000`.