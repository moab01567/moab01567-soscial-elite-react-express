FROM node:22.12.0 AS Elite

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE "3000"
CMD ["npm", "run", "start"]