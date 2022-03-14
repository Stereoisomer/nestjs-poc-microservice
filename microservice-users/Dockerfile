FROM node:latest AS development

RUN mkdir /microservice-users

WORKDIR /microservice-users

# COPY ["package.json", "yarn.lock"] /microservice-users

RUN npm install -g @nestjs/cli

COPY . /microservice-users

RUN yarn

# ENTRYPOINT ["tail", "-f", "/dev/null"]

CMD ["yarn", "start"]