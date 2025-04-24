# Système d'Information (SI) - API & SPA

Ce dépôt contient le Système d'Information (SI) externe, conçu pour s'intégrer de manière centralisée avec divers CMS (WordPress, Joomla, WebsiteBaker) via des appels AJAX et une architecture SPA (Single Page Application).

## 📥 1. Téléchargement

Cloner la branche **SI-fini** depuis GitHub :

```bash
git clone --branch SI-fini https://github.com/Clovelahuiss/CMS-SI.git
cd CMS-SI/API_SYS_INFORMATION
```

## ⚙️ 2. Prérequis

- **PHP >= 7.4** avec extensions : `pdo`, `pdo_mysql`, `mbstring`, `json`
- **Composer** pour gérer les dépendances PHP
- **Apache2** (ou Nginx) avec module SSL
- **MySQL / MariaDB** pour la base de données

## 💾 3. Installation des dépendances

1. Installer Composer et les bibliothèques :
   ```bash
   composer install
   ```
2. Créer le fichier de configuration des variables d'environnement :
   ```bash
   cp api/.env.example api/.env
   ```
3. Éditer `api/.env` :
   ```ini
   DB_HOST=localhost
   DB_NAME=tennis_reservation
   DB_USER=apiuser
   DB_PASS=apipassword
   SECRET_KEY=votre_super_secret_key
   ```

## 🗄️ 4. Base de données

1. Créer la base de données :
   ```sql
   CREATE DATABASE tennis_reservation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'apiuser'@'localhost' IDENTIFIED BY 'apipassword';
   GRANT ALL PRIVILEGES ON tennis_reservation.* TO 'apiuser'@'localhost';
   FLUSH PRIVILEGES;
   ```
2. Importer le schéma/table(s) (s’il existe un fichier SQL) :
   ```bash
   mysql -u apiuser -p tennis_reservation < tennis_reservation.sql
   ```

## 🔐 5. Configuration Apache (VirtualHost)

Exemple de VirtualHost HTTPS :

```apache
<VirtualHost *:443>
  ServerName si.local
  DocumentRoot /var/www/CMS-SI/API_SYS_INFORMATION/spa-php

  SSLEngine on
  SSLCertificateFile /etc/ssl/certs/si.crt
  SSLCertificateKeyFile /etc/ssl/private/si.key

  <Directory /var/www/CMS-SI/API_SYS_INFORMATION/spa-php>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>

  Alias /api /var/www/CMS-SI/API_SYS_INFORMATION/api
  <Directory /var/www/CMS-SI/API_SYS_INFORMATION/api>
    Require all granted
  </Directory>

  ErrorLog ${APACHE_LOG_DIR}/si-ssl-error.log
  CustomLog ${APACHE_LOG_DIR}/si-ssl-access.log combined
</VirtualHost>
```{}

:N’oubliez pas d’ajouter `si.local` dans votre fichier `/etc/hosts` :
```
192.168.1.77 si.local
```

## 🚀 6. Démarrage & Tests

1. Redémarrer Apache :
   ```bash
   sudo systemctl reload apache2
   ```
2. Accéder à la SPA : https://si.local
3. Tester les endpoints API avec `curl` ou Postman :
   ```bash
   curl -X POST https://si.local/api/login.php -d '{"email":"test@example.com","password":"pass"}' -H 'Content-Type: application/json'
   ```

## 🛠️ 7. Débogage & Logs

- Les erreurs sont journalisées dans : `/var/log/apache2/si-ssl-error.log`
- Activer/désactiver l’affichage des erreurs dans `php.ini` : `display_errors` / `log_errors`

## 📖 8. Structure du projet

```bash
API_SYS_INFORMATION/
├── api/         # Endpoints PHP (login, register, etc.)
├── spa-php/     # Vues HTML/CSS/JS + router.js + style.css
└── tennis_reservation.sql (ou .db)
```

---

> **Note :** Conservez `SECRET_KEY` confidentiel et ne le versionnez pas dans Git.

