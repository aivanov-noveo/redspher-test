### Build layer

FROM node:16-alpine as build

WORKDIR /app

COPY ./package*.json ./
# Install app dev dependencies
RUN npm ci --ignore-scripts --no-audit --no-progress
COPY ./src ./src
COPY ./tsconfig.json ./

# Build and install app production dependencies
RUN npm run build && \
  rm -r ./node_modules && \
  npm ci --ignore-scripts --no-audit --no-progress --only=production

### Production layer

FROM node:16-alpine

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

ENV NODE_OPTIONS --enable-source-maps

EXPOSE 4000

CMD [ "node", "/app/dist/index.js"]
