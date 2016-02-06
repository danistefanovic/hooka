# ![hooka](media/logo.png)

[![Build Status][travis-image]][travis-url]
[![Dependency status][david-dm-image]][david-dm-url]

[travis-url]: https://travis-ci.org/danistefanovic/hooka
[travis-image]: http://img.shields.io/travis/danistefanovic/hooka.svg
[david-dm-url]:https://david-dm.org/danistefanovic/hooka
[david-dm-image]:https://david-dm.org/danistefanovic/hooka.svg

**[Work in progress] Hooka** is a webhook server written in Node, which allows you to easily create HTTP endpoints to trigger the execution of configured commands.

## Installation

```
$ npm install -g hooka
```

## Basic usage

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

Open [http://localhost:3000/hello](http://localhost:3000/hello) in your browser. Now if you go back to your terminal, you should see something like:
```
1452973827230 started: echo hello world
1452973827230 | hello world
1452973827230 exited with code 0
````

## Documentation

* [CLI options](docs/cli.md)
* [Webhooks JSON](docs/webhooks.md)
* Recipes
  * [Bitbucket](docs/recipes/bitbucket.md)
  * [GitHub](docs/recipes/github.md)
  * [Slack](docs/recipes/slack.md)

## License

MIT -  Do whatever you want with it, but don't blame me for anything that goes wrong.
