## Run

```
yarn
yarn dev # use postman on http://localhost:3000/api/email/send
```

## Usage

```
curl -X POST \
  http://localhost:3000/api/email/send \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{"to": "Brady Watkinson <brady@watkinson.io>"}'
```

## Email Service Proxy

This project is a email service proxy that forwards incoming well formed emails to an email service, and if it fails, retries using a different service. The advantage of this type of service is that a simple interface can be used for both services and maintained as a centralised point, rather than at each microservice. This makes it easier to add new features and upgrade dependencies.

## Discussion

I decided to make this service stateless so that it could be horizontally scaled. The tradeoff is that the service is dumb, it will continually hit a service provider and fail whilst any encountered problems exist. If I were to use some sort of memory, perhaps a cache layer, I would implement exponential backoff as part of the failover protocol.

## Testing

### To run

`npm test:unit`

### Unit Tests

- Added unit tests for MailgunAPI.spec.js: this is perhaps the most important thing to test, aside from the SendEmail operation itself.

## Future Features

- IMPORTANT: Better secret management...
- flip a coin to see which service to use
- -add query string param overwrites to coerce a specific service-
