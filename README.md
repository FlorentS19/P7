<h2>Prérequis</h2>
MongoDB, Express, React, NodeJs

<h1>Frontend</h1>
Ouvrez le dossier Frontend dans le terminal de votre éditeur pour exécuter la commande:

<pre><code>npm install</code></pre> 

puis 

<pre><code>npm start</code></pre>

si le navigateur ne s'ouvre pas automatiquement allez à : 

<ul><li>http://localhost:5000/</li></ul>

<h1>Backend</h1>
Ouvrez le dossier Backend dans le terminal de votre éditeur pour exécuter la commande:

<pre><code>npm install</code></pre>

puis

<pre><code>npm start ou nodemon</code></pre>

<h1>Base de données</h1>
Veillez a avoir au préalable un compte MongoDB ainsi qu'un cluster de créer.<br>
Insérer ensuite votre propre adresse SRV dnas le fichier App.js pour pouvoir avec accéder à l'API depuis votre base de données.<br> 
Tout cela doit être ajouté dans un fichier .env grâce au package dotenv.<br>
De plus, veuillez mettre dans celui ci le SECRET_TOKEN_KEY=" ".
