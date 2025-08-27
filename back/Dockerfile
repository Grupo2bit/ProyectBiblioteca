# Imagen base Node.js
FROM node:18

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend (ajústalo si tu app usa otro)
EXPOSE 3000

# Comando de arranque
CMD ["npm", "start"]