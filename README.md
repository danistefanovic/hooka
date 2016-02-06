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

## Documentation

* [CLI options](docs/cli.md)
* [Webhooks JSON](docs/webhooks.md)
* [Recipes](docs/recipes.md)
  * [Bitbucket](docs/recipes/bitbucket.md)
  * [GitHub](docs/recipes/github.md)
  * [Slack](docs/recipes/slack.md)

## Basic usage

1. Create a `webhooks.json` file:

  ```json
  [
      {
          "method": ["GET", "POST"],
          "path": "/hello",
          "command": "echo Hello world"
      },
      {
          "method": "POST",
          "path": "/hello-again",
          "command": "echo Hello from the other side: $MESSAGE",
          "validate": [
              {
                  "source": "jsonBody",
                  "find": "payload.token",
                  "match": "exactly",
                  "value": "MySecret"
              }
          ],
          "parseJson": [
              {
                  "query": "payload.text",
                  "variable": "MESSAGE"
              }
          ]
      }
  ]
  ```

1. Start Hooka in the same directory:
  ```sh
  $ hooka
  ```

1. Open [http://localhost:3000/hello](http://localhost:3000/hello) in your browser to trigger the first hook.

1. Trigger the second hook with a POST request in a new terminal window:
  ```sh
  $ curl \
      -H "Content-Type: application/json" \
      -X POST \
      -d '{"text": "I love cupcakes", "token": "MySecret"}' \
      http://localhost:3000/hello-again
  ```

1. Now if you go back to your terminal, where Hooka is running, you should see something like:

<p align="center">
    <img src="media/screencast.gif" width="700" />
</p>


## License

MIT -  Do whatever you want with it, but don't blame me for anything that goes wrong.
