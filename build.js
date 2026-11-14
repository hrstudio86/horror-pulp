// Genera index.html della vetrina. Per aggiungere una maglietta: nuova voce in `prodotti`
// + immagini in img/<slug>.jpg (illustrazione) e img/<slug>-maglia.png (foto maglia), poi `node build.js`.
const fs = require('fs');
const path = require('path');

const NEGOZIO = 'https://helldrivenstore.teetaly.com/IT/';
const prodotti = [
  { slug: 'strega-scarlatta', url: 't-shirt-strega-scarlatta-horror-pulp', nome: 'Strega Scarlatta', testo: 'La strega scarlatta avanza con due fiamme tra le mani davanti a una luna di sangue.' },
  { slug: 'cavalieri-dellinferno', url: 't-shirt-cavalieri-dellinferno-horror-pulp', nome: "Cavalieri dell'Inferno", testo: 'Tre motociclisti attraversano il cimitero sotto la luna, scortati da due streghe dal volto verde.' },
  { slug: 'luna-di-sangue', url: 't-shirt-luna-di-sangue-horror-pulp', nome: 'Luna di Sangue', testo: 'Luna piena, rami neri, rose rosse e una dama in nero.' },
  { slug: 'scorta-di-spettri', url: 't-shirt-scorta-di-spettri-horror-pulp', nome: 'Scorta di Spettri', testo: 'Un biker solitario e la sua scorta di spettri e teschi.' },
  { slug: 'la-congrega', url: 't-shirt-la-congrega-horror-pulp', nome: 'La Congrega', testo: 'Tre streghe, una candela, un patto.' },
  { slug: 'strada-dei-morti', url: 't-shirt-strada-dei-morti-horror-pulp', nome: 'Strada dei Morti', testo: 'Tre moto escono dal cimitero al tramonto, tra alberi spogli e lapidi.' },
  { slug: 'notte-di-sangue', url: 't-shirt-notte-di-sangue-horror-pulp', nome: 'Notte di Sangue', testo: 'Lei cammina sotto la luna rossa, giacca di pelle e sguardo da non incrociare.' },
  { slug: 'luna-dottobre', url: 't-shirt-luna-dottobre-horror-pulp', nome: "Luna d'Ottobre", testo: "Un biker tra le lapidi sotto la luna piena d'ottobre." },
  { slug: 'rosa-nera', url: 't-shirt-rosa-nera-horror-pulp', nome: 'Rosa Nera', testo: 'Mandala gotico di rose rosse e trafori scuri, tono su tono.' },
];
const PREZZO = '21,90 €';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const schede = prodotti.map((p, i) => `
    <article class="scheda${i % 2 ? ' inversa' : ''}" id="${p.slug}">
      <a class="arte" href="${NEGOZIO}${p.url}" target="_blank" rel="noopener">
        <img src="img/${p.slug}.jpg" alt="Illustrazione ${esc(p.nome)}" loading="${i < 2 ? 'eager' : 'lazy'}">
      </a>
      <div class="info">
        <p class="num">N. ${String(i + 1).padStart(2, '0')}</p>
        <h2>${esc(p.nome)}</h2>
        <p class="testo">${esc(p.testo)}</p>
        <img class="maglia" src="img/${p.slug}-maglia.png" alt="T-shirt nera ${esc(p.nome)}" loading="lazy">
        <p class="dettagli">T-shirt nera uomo (S&ndash;3XL) e donna (S&ndash;XL) &middot; stampa fronte</p>
        <p class="prezzo">${PREZZO}</p>
        <div class="tasti"><a class="compra" href="${NEGOZIO}${p.url}" target="_blank" rel="noopener">Compra uomo</a>
        <a class="compra chiaro" href="${NEGOZIO}${p.url.replace('t-shirt-', 't-shirt-donna-')}" target="_blank" rel="noopener">Compra donna</a></div>
      </div>
    </article>`).join('\n');

const html = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Horror Pulp – Magliette dark horror e heavy metal | Helldrivenstore</title>
<meta name="description" content="Magliette nere con illustrazioni dark horror, pulp e heavy metal: streghe, biker, cimiteri e lune di sangue. Stampate su ordinazione.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&family=Pirata+One&display=swap" rel="stylesheet">
<style>
  :root { --nero:#0a0908; --carbone:#161412; --osso:#ece4d2; --sangue:#c4161c; --grigio:#8d877b; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin:0; background:var(--nero); color:var(--osso); font-family:Oswald, 'Arial Narrow', sans-serif; font-size:18px; line-height:1.5; }
  a { color:inherit; }
  img { display:block; max-width:100%; }
  header { text-align:center; padding:72px 16px 56px; border-bottom:1px solid #2a2622;
    background: radial-gradient(ellipse at 50% 0%, #4a0b0e 0%, var(--nero) 62%); }
  header .sopra { letter-spacing:.42em; text-transform:uppercase; color:var(--sangue); font-size:14px; margin:0 0 12px; }
  header h1 { font-family:'Pirata One', 'Old English Text MT', serif; font-weight:400; font-size:clamp(64px, 13vw, 168px); line-height:.9; margin:0; }
  header .sotto { max-width:560px; margin:22px auto 30px; color:#c9c1af; }
  .tasto, .compra { display:inline-block; background:var(--sangue); color:#fff; text-decoration:none; text-transform:uppercase; letter-spacing:.16em;
    font-weight:600; padding:16px 42px; border:2px solid var(--sangue); transition:background .15s, color .15s; }
  .tasto:hover, .compra:hover, .tasto:focus-visible, .compra:focus-visible { background:transparent; color:var(--osso); }
  main { max-width:1240px; margin:0 auto; padding:0 16px; }
  .scheda { display:grid; grid-template-columns:minmax(0,1.25fr) minmax(0,1fr); gap:56px; align-items:center; padding:72px 0; border-bottom:1px solid #2a2622; }
  .scheda.inversa .arte { order:2; }
  .arte img { width:100%; border:1px solid #2a2622; box-shadow:0 30px 80px #000; }
  .num { color:var(--sangue); letter-spacing:.3em; font-size:14px; margin:0; }
  h2 { font-family:'Pirata One', 'Old English Text MT', serif; font-weight:400; font-size:clamp(44px, 6vw, 76px); line-height:1; margin:6px 0 14px; }
  .testo { color:#c9c1af; margin:0 0 8px; max-width:440px; }
  .maglia { width:min(100%, 300px); margin:18px 0 14px; border-radius:4px; }
  .dettagli { color:var(--grigio); font-size:15px; letter-spacing:.06em; text-transform:uppercase; margin:0; }
  .tasti { display:flex; flex-wrap:wrap; gap:12px; }
  .compra { padding:16px 28px; }
  .compra.chiaro { background:transparent; color:var(--osso); border-color:var(--osso); }
  .compra.chiaro:hover, .compra.chiaro:focus-visible { background:var(--osso); color:var(--nero); }
  @media (max-width:820px) { .tasti { justify-content:center; } }
  .prezzo { font-size:40px; font-weight:600; margin:8px 0 18px; }
  footer { text-align:center; padding:64px 16px 80px; color:var(--grigio); font-size:15px; }
  footer p { max-width:620px; margin:0 auto 22px; }
  @media (max-width:820px) {
    .scheda { grid-template-columns:1fr; gap:26px; padding:48px 0; }
    .scheda.inversa .arte { order:0; }
    .maglia { margin-left:auto; margin-right:auto; }
    .info { text-align:center; } .testo { margin-left:auto; margin-right:auto; }
  }
</style>
</head>
<body>
<header>
  <p class="sopra">Helldrivenstore presenta</p>
  <h1>Horror Pulp</h1>
  <p class="sotto">Magliette nere con illustrazioni dark horror, pulp e heavy metal. Streghe, biker, cimiteri e lune di sangue: nove grafiche, stampate una per una su ordinazione.</p>
  <a class="tasto" href="#${prodotti[0].slug}">Guarda la collezione</a>
</header>
<main>
${schede}
</main>
<footer>
  <p>Acquisto, pagamento e spedizione sono gestiti dal negozio Helldrivenstore su Teetaly: il tasto &ldquo;Compra&rdquo; apre la pagina del prodotto, dove scegli la taglia e completi l'ordine.</p>
  <a class="tasto" href="${NEGOZIO}horror-pulp" target="_blank" rel="noopener">Vai al negozio</a>
</footer>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html scritto,', prodotti.length, 'prodotti');
