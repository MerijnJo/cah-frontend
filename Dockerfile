# ---- build ----
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# CRA reads REACT_APP_* at build time; we call backend on host:8080
ARG REACT_APP_API_BASE=http://localhost:8080/api
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
RUN npm run build

# ---- serve ----
FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
