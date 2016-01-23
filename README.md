# ![hooka](media/logo.png) 

[![Build Status][travis-image]][travis-url] 
[![Dependency status][david-dm-image]][david-dm-url]

[travis-url]: https://travis-ci.org/danistefanovic/hooka
[travis-image]: http://img.shields.io/travis/danistefanovic/hooka.svg
[david-dm-url]:https://david-dm.org/danistefanovic/hooka
[david-dm-image]:https://david-dm.org/danistefanovic/hooka.svg

**Hooka** is a webhook server written in Node, which allows you to easily create HTTP endpoints to trigger the execution of configured commands.

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

## CLI options

### --config, -c

Provide a custom path to your webhooks file.

```sh
$ hooka --config /path/to/your/webhooks/config.json
```

### --help, -h

Display help.

```sh
$ hooka --help
```

### --port, -p

Set a custom port.

```sh
$ hooka --port 1337
```

### --secret, -s

Set a secret token. If set, every (POST) request needs to provide this token via the `HOOKA_SECRET` data field.

```sh
$ hooka --secret MySuperSecretToken
```

```sh
$ curl --data "HOOKA_SECRET=MySuperSecretToken" http://example.com:3000/hello-again
```

### --tlc-cert & --tls-key 

Enable secure connections via HTTPS.

```sh
$ hooka --tls-cert path/to/cert.pem --tls-key path/to/key.pem
```

### --version, -v

Print Hooka version.

```sh
$ hooka --version
```

## License

MIT -  Do whatever you want with it, but don't blame me for anything that goes wrong.
