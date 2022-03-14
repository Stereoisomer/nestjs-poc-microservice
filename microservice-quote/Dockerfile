FROM node:latest AS development

RUN mkdir /microservice-quote

WORKDIR /microservice-quote

# COPY ["package.json", "yarn.lock"] /microservice-quote

RUN npm install -g @nestjs/cli

COPY . /microservice-quote

RUN yarn

# ENTRYPOINT ["tail", "-f", "/dev/null"]

CMD ["yarn", "start"]