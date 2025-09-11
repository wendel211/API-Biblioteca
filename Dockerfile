# Usar Node LTS
FROM node:18

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json primeiro (melhor cache)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta da API
EXPOSE 3000

# Comando padrão: iniciar a API
CMD ["npm", "start"]
