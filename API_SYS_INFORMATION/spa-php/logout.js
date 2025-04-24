console.log("📤 Déconnexion en cours...");

(async () => {
  // Charge router.js si nécessaire
  if (typeof ROUTE_PREFIX === "undefined" || typeof ROUTE_SUFFIX === "undefined") {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      // Assurez-vous d'utiliser HTTPS ici si votre serveur est en HTTPS
      script.src = "https://192.168.1.77/router.js";
      script.onload = resolve;
      script.onerror = () => reject("❌ Échec de chargement de router.js");
      document.head.appendChild(script);
    });
  }
  
  console.log("📦 ROUTE_PREFIX détecté :", ROUTE_PREFIX, "ROUTE_SUFFIX:", ROUTE_SUFFIX);

  // Supprime le token d'authentification stocké dans le navigateur
  localStorage.removeItem("jwt");

  // Optionnel : affiche un message pour confirmer la déconnexion
  alert("Vous avez été déconnecté avec succès !");

  // Redirige vers la page login en utilisant les variables du router
  window.location.href = `${ROUTE_PREFIX}/login${ROUTE_SUFFIX}`;
})();
