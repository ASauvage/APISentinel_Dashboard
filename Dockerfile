ARG NODE_VERSION=22.14.0
ARG PORT=3000

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production
ENV SRV_PORT=${PORT}


WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY . .


EXPOSE ${PORT}


CMD ["npm", "start"]