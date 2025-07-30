<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Gerador de Sinais Bac Bo</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background-color: #000;
      color: #fff;
      font-family: Arial, sans-serif;
      overflow: hidden;
    }

    iframe {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      border: none;
      z-index: 0;
    }

    #toggleMenu {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 5;
      background-color: #222;
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 20px;
      cursor: pointer;
    }

    #menu {
      position: fixed;
      bottom: 70px;
      right: 20px;
      z-index: 5;
      background: #111;
      padding: 10px;
      border-radius: 8px;
      display: none;
    }

    #menu input {
      width: 250px;
      padding: 5px;
      background: #222;
      border: 1px solid #444;
      color: white;
    }

    #menu button {
      margin-top: 5px;
      padding: 5px 10px;
      background: #444;
      border: none;
      color: white;
      cursor: pointer;
    }

    #signalBtn {
      position: fixed;
      bottom: 100px;
      left: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: none;
      background: #222;
      color: white;
      font-size: 28px;
      z-index: 10;
      cursor: pointer;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
      }
    }

    #dashboard {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #111;
      padding: 20px;
      border-radius: 10px;
      z-index: 15;
      display: none;
      text-align: center;
    }

    .percentage {
      font-size: 18px;
      margin: 10px 0;
    }

    .blue { color: #00f; }
    .red { color: #f00; }
    .yellow { color: #ff0; }

    #greenMsg {
      position: fixed;
      top: 20px;
      left: 20px;
      background: green;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      font-weight: bold;
      display: none;
      z-index: 20;
      animation: fadeInOut 4s ease forwards;
    }

    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(-20px); }
      10% { opacity: 1; transform: translateY(0); }
      90% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-20px); }
    }
  </style>
</head>
<body>

<iframe id="casinoFrame" src="https://m.reals.bet.br/live-casino"></iframe>

<!-- Botão de mudar o link do iFrame -->
<button id="toggleMenu">⇨</button>
<div id="menu">
  <input type="text" id="iframeLink" placeholder="Novo link do iFrame">
  <button onclick="changeIframe()">Atualizar</button>
</div>

<!-- Botão flutuante com dado -->
<button id="signalBtn">🎲</button>

<!-- Dashboard -->
<div id="dashboard">
  <p id="status">Calculando...</p>
  <div id="result"></div>
</div>

<!-- GREEN -->
<div id="greenMsg">✅ GREEN</div>

<script>
  const menuBtn = document.getElementById('toggleMenu');
  const menu = document.getElementById('menu');
  const iframe = document.getElementById('casinoFrame');
  const iframeInput = document.getElementById('iframeLink');

  menuBtn.onclick = () => {
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  };

  function changeIframe() {
    const newLink = iframeInput.value.trim();
    if (newLink) {
      iframe.src = newLink;
    }
  }

  const dashboard = document.getElementById('dashboard');
  const signalBtn = document.getElementById('signalBtn');
  const result = document.getElementById('result');
  const status = document.getElementById('status');
  const greenMsg = document.getElementById('greenMsg');

  let clickCount = 0;
  let timer;

  signalBtn.onclick = () => {
    dashboard.style.display = 'block';
    status.textContent = 'Calculando...';
    result.innerHTML = '';
    setTimeout(() => {
      const tie = +(Math.random() * 10).toFixed(1); // Tie mais raro
      const banker = +(Math.random() * (100 - tie)).toFixed(1);
      const player = +(100 - tie - banker).toFixed(1);
      result.innerHTML = `
        <div class="percentage blue">DADO PLAYER: ${player}%</div>
        <div class="percentage red">DADO BANKER: ${banker}%</div>
        <div class="percentage yellow">DADO TIE: ${tie}%</div>
      `;
      status.textContent = 'SINAL GERADO';
    }, 3000);
  };

  dashboard.onclick = () => {
    clickCount++;
    signalBtn.click();
    clearTimeout(timer);
    timer = setTimeout(() => { clickCount = 0 }, 2000);
    if (clickCount === 2) {
      greenMsg.style.display = 'block';
      setTimeout(() => { greenMsg.style.display = 'none'; }, 4000);
    }
  };
</script>

</body>
</html>
