# Usa uma imagem leve do Node.js para build
FROM node:20.16-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY . .

# Instala dependências e faz o build do projeto
RUN corepack enable && corepack prepare pnpm@9.0 --activate && pnpm install && pnpm build

# Usa um servidor Nginx leve para servir os arquivos estáticos
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados do estágio anterior para o servidor
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
