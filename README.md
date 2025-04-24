⚠️ PROJET EN COURS


# 🎯 CMS-SI : Système d’Information décorrélé d’un CMS WordPress

Ce projet permet de connecter un CMS (comme WordPress) à un Système d’Information (SI) indépendant développé en PHP, pour gérer l’authentification, les réservations et les profils utilisateurs via une API REST sécurisée.

---

## 📦 Contenu du projet

```bash
API_SYS_INFORMATION/
├── api/                 # API REST PHP (login, register, mon-compte, reserver)
│   ├── .htaccess
│   ├── db.php
│   ├── login.php
│   ├── register.php
│   ├── mon-compte.php
│   ├── reserver.php
│   └── utils.php
├── spa-php/             # Pages SPA injectées dans WordPress
│   ├── login.html / login.js
│   ├── register.html / register.js
│   ├── compte.html / mon-compte.js
│   ├── reservation.html / reservation.js
│   └── tennis_reservation.db
├── composer.json / composer.lock
└── vendor/              # Librairie JWT (Firebase PHP-JWT)
```

---

## ⚙️ Installation (sur Debian / Apache)

1. **Placer le code dans** `/home/vboxuser/SI-backup/API_SYS_INFORMATION`

2. **Configurer Apache** (`/etc/apache2/sites-available/000-default.conf`) :

```apache
Alias /api /home/vboxuser/SI-backup/API_SYS_INFORMATION/api

<Directory /home/vboxuser/SI-backup/API_SYS_INFORMATION/api>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
</Directory>

<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /home/vboxuser/SI-backup/API_SYS_INFORMATION/spa-php

    <Directory /home/vboxuser/SI-backup/API_SYS_INFORMATION/spa-php>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        Header set Access-Control-Allow-Origin "*"
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

3. **Appliquer les droits** :
```bash
sudo chmod o+x /home/vboxuser
sudo chmod -R o+rx /home/vboxuser/SI-backup
sudo systemctl restart apache2
```

---

## 🧩 Intégration CMS (WordPress)

1. Installer le plugin **Head, Footer and Post Injections (HFCM)**.
2. Créer un bloc "Global Header" contenant :

```html
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("jwt");

    const loginLink = document.querySelector('a[href*="/login"]');
    const registerLink = document.querySelector('a[href*="/inscription"]');
    const compteLink = document.querySelector('a[href*="/mon-compte"]');
    const reservationLink = document.querySelector('a[href*="/reserver"]');
    const bookButton = document.querySelector('a[href*="/reserver/"].wp-block-button__link');

    if (token) {
      if (loginLink) loginLink.style.display = "none";
      if (registerLink) registerLink.style.display = "none";
      if (compteLink) compteLink.style.display = "inline-block";
      if (reservationLink) reservationLink.style.display = "inline-block";
      if (bookButton) bookButton.style.display = "inline-block";
    } else {
      if (loginLink) loginLink.style.display = "inline-block";
      if (registerLink) registerLink.style.display = "inline-block";
      if (compteLink) compteLink.style.display = "none";
      if (reservationLink) reservationLink.style.display = "none";
      if (bookButton) bookButton.style.display = "none";
    }
  });
</script>
```

---

## 🔐 Fonctionnalités

- 🔑 Authentification JWT
- 📝 Inscription et connexion
- 👤 Profil utilisateur (`mon-compte`)
- 📅 Réservation de terrain
- 🔁 SPA dynamique injectée dans le CMS (WordPress)

---

## ✅ Compatibilité future

Ce système est **CMS-agnostique** : il peut être intégré à **d'autres CMS** (Joomla, Drupal...) en injectant les pages HTML de `spa-php/` dynamiquement et en appelant les routes `/api/*`.

---

## 🧠 Auteurs

- Projet conçu pour démontrer la séparation **front CMS / back SI**
- Initialement développé dans le cadre d'un projet étudiant
