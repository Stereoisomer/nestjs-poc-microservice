FROM node:latest AS development

RUN mkdir /microservice-instruments

WORKDIR /microservice-instruments

# COPY ["package.json", "yarn.lock"] /microservice-instruments

RUN npm install -g @nestjs/cli

COPY . /microservice-instruments

RUN yarn

# ENTRYPOINT ["tail", "-f", "/dev/null"]

CMD ["yarn", "start"]