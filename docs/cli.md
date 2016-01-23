# CLI options

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
