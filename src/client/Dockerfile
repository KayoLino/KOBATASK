FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de definição primeiro para otimizar o cache das camadas
COPY package*.json ./

# Instala as dependências dentro do Linux do container
RUN npm install

# Copia o resto dos arquivos
COPY . .

EXPOSE 3000

# Rodando em modo desenvolvimento
CMD ["npm", "run", "dev"]
