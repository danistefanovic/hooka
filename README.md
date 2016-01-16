# ![hooka](media/logo.png)

[![Build Status][travis-image]][travis-url] 
[![Dependency status][david-dm-image]][david-dm-url] 
[![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[travis-url]: https://travis-ci.org/danistefanovic/hooka
[travis-image]: http://img.shields.io/travis/danistefanovic/hooka.svg
[david-dm-url]:https://david-dm.org/danistefanovic/hooka
[david-dm-image]:https://david-dm.org/danistefanovic/hooka.svg
[david-dm-dev-url]:https://david-dm.org/danistefanovic/hooka#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/danistefanovic/hooka/dev-status.svg

Work in progres...

## Installation

```
$ npm install -g hooka
```

## Usage

Create a `webhooks.json` file:

```
[
    {
        "method": "GET",
        "path": "/hello",
        "command": "echo hello world"
    },
    {
        "method": ["GET", "POST"],
        "path": "/hello-again",
        "command": "echo hello again"
    }
]
```

Start Hooka in the same directory:
```sh
$ hooka
```

Or provide a custom path to your webhooks file:
```sh
$ hooka --config /path/to/your/webhooks.json
```

Open [http://localhost:3000/hello](http://localhost:3000/hello) in your browser. Now if you go back to your terminal, you should see something like:
```
1452973827230 started: echo hello world
1452973827230 | hello world
1452973827230 exited with code 0
````

## License

MIT -  Do whatever you want with it, but don't blame me for anything that goes wrong.
