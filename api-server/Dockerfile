FROM node:latest AS development

RUN mkdir /api-server

WORKDIR /api-server

# COPY ["package.json", "yarn.lock"] /api-server

RUN npm install -g @nestjs/cli

COPY . /api-server

RUN yarn

# ENTRYPOINT ["tail", "-f", "/dev/null"]

CMD ["yarn", "start"]