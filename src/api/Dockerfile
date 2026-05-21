FROM php:8.4-fpm

# Instala extensões básicas para o MySQL funcionar
RUN apt-get update && apt-get install -y libpng-dev libonig-dev libxml2-dev zip unzip
RUN docker-php-ext-install pdo_mysql mbstring

WORKDIR /var/www
COPY . .

# Garante que o container tenha o Composer interno
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Porta padrão do PHP-FPM
EXPOSE 9000
CMD ["php-fpm"]