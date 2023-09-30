FROM node:12.22.9 

COPY . .

RUN npm install 

CMD [ "npm", "run","start" ]