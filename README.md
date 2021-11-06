# thc-wrk-js
Base repository for thrivecoin workers in nodejs

## Setup

### Configuration
```
bash setup-config.sh
```

### Grapes
Run two Grapes:
```
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

### Boot workers
```
node index.js --worker=wrk.sample --env=development --port=7070
```

## Test
```
npm test
```

## Api

### action: helloWorld

**Request**
- `args<Array>` - empty array

**Response**
- `<String>`

**Example**
```
# request
[]

# response
'hello world from Thrive team'
```

### action: ping

**Request**
- `args<Array>`
  - `0<String>` - from
  - `1<String>` - message

**Response**
- `<Object>`
  - `to<String>` - response back to sender
  - `message<String>` - message sent back

**Example**
```
# request
['john', 'hello']

# response
{ to: 'john', message: 'hello' }
```

### action: getTime

**Request**
- `args<Array>` - empty array

**Response**
- `<Number>` - unix epoch time in server

**Example**
```
# request
[]

# response
1636220931185
```
