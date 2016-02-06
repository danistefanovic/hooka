# GitHub

* See [Github: Webhooks](https://developer.github.com/webhooks/)

```json
[
    {
        "method": "POST",
        "path": "/github-commit",
        "command": "echo New commit from $COMMIT_AUTHOR_NAME: $COMMIT_MESSAGE",
        "validate": [
            {
                "source": "header",
                "find": "X-Hub-Signature",
                "match": "hmac-sha1",
                "value": "supersecret"
            }
        ],
        "parseJson": [
            {
                "query": "payload.head_commit.message",
                "variable": "COMMIT_MESSAGE"
            },
            {
                "query": "payload.head_commit.author.name",
                "variable": "COMMIT_AUTHOR_NAME"
            }
        ]
    }
]
```
