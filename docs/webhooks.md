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
    },
    {
        "method": "POST",
        "path": "/greet-second-user",
        "command": "echo $GREETING $NAME",
        "parseJson": [
            {
                "query": "payload.users.1.greeting",
                "variable": "GREETING"
            },
            {
                "query": "payload.users.1.name",
                "variable": "NAME"
            }
        ]
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

### parseJson

Map JSON values to environment variables. Array of objects. Object schema:
* `query`: JSON path in dot-notatation. String.
* `variable`: Environment variable name. String.

```
"parseJson": [
    {
        "query": "payload.users.1.greeting",
        "variable": "GREETING"
    }
]
```

The variable can then be accessed in the `"command"` field:

```
"command": "echo $GREETING"
```
