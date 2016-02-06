# Webhooks JSON

You can paste your `webhooks.json` at [jsonlint.com](http://jsonlint.com/) to validate the JSON syntax.

## Example

```json
[
    {
        "method": "POST",
        "path": "/list-tmp-directory-content",
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
    },
    {
        "method": "POST",
        "path": "/github",
        "command": "echo hello github",
        "validate": [
            {
                "source": "header",
                "find": "X-Hub-Signature",
                "match": "hmac-sha1",
                "value": "MySuperSecret"
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

### validate

If set, the webhook will only be triggered if all validation rules match. Array of objects. Object schema:
* `source`: HTTP request part. String.
  * `jsonBody`: HTTP body application/json
  * `urlencodedBody`: HTTP body x-www-form-urlencoded
  * `header`: HTTP header
* `find`: Depends on `source`
  * `jsonBody` => JSON path in dot-notatation. String.
  * `urlencodedBody` => x-www-form-urlencoded key. String.
  * `header` => HTTP header field. String.
* `match`: Match type. String.
  * `exactly`: Match value exactly (strict equal). String.
  * `regexp`: Match regular expresssion. String.
  * `hmac-sha1`: Match computed HMAC SHA1. String 
* `value`: Depends on `match`
  * `exactly` => Expected value. Any.
  * `regexp` => Regular expression. String.
  * `hmac-sha1` => Secret key. String.

```
"validate": [
    {
        "source": "jsonBody",
        "find": "payload.users.1.name",
        "match": "exactly",
        "value": "Bob"
    },
    {
        "source": "urlencodedBody",
        "find": "foo",
        "match": "regexp",
        "value": "ar$"
    },
    {
        "source": "header",
        "find": "X-My-Header",
        "match": "hmac-sha1",
        "value": "MySecretToken"
    }
]
```
