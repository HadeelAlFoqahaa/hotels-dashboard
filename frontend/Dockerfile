# Dockerfile

FROM node:13.10.1-alpine
RUN mkdir -p /opt/ui
WORKDIR /opt/ui
RUN adduser -S app
COPY . .
RUN npm install
RUN chown -R app /opt/ui
USER app
EXPOSE 8080
CMD [ "npm", "run", "serve"]