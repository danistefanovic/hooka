# Webhooks JSON

You can paste your `webhooks.json` at [jsonlint.com](http://jsonlint.com/) to validate the JSON syntax.

## Example

```json
[
    {
        "method": ["GET", "POST"],
        "path": "/hello",
        "command": "echo hello world"
    },
    {
        "method": "POST",
        "path": "/list-tmp-directory-contents",
        "command": "ls -la",
        "cwd": "/tmp"
    }
]
```

## Fields

\* = required

### method *

HTTP method. String.

```
"method": "POST"
```

HTTP methods. Array of strings.

```
"method": ["GET", "POST"]
```


### path *

Endpoint at which requests can be made. String.

```
"path": "/example"
```


### command *

Command that should be executed when the endpoint is triggered. String.

```
"command": "ls -l"
```


### cwd

Command working directory. String.

```
"cwd": "/tmp"
```
