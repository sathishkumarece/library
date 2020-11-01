# library

## Project setup

### Dependencies installation
```
npm run install-client
npm run install-server
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Testing
```
npm run test-server
npm run test-client
```

## Architectural decisions
### Frontend choices
React  
Redux
### Backend choices
Node JS  
Express  
Mongoose
### Database
MongoDB

## Assumptions
1. For some of the actions, considered only postive results
2. Actions without relevant message. Ex: Book added to user cart but no message alerts the user
3. Tooltip to indicate the reason behind button disabled
