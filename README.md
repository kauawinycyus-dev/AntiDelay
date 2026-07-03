# 🚀 Anti-Delay 

Uma extensão web leve, eficiente e construída sob a especificação **Manifest V3** para reduzir drasticamente a latência e o atraso (delay) em transmissões ao vivo no YouTube. Ideal para assistir a jogos de futebol e grandes eventos sem sofrer com o famoso "spoiler do vizinho".

---

## 💡 Créditos e Inspiração

**Este projeto não foi idealizado do zero por mim.** A ideia central e o conceito de desenvolvimento foram fortemente inspirados e baseados no excelente trabalho de **[joaogfc/ZeroDelay](https://github.com/joaogfc/ZeroDelay)**, uma extensão que reduz a latência de lives do YouTube acelerando a reprodução para alcançar o tempo real do ao vivo. 

Este repositório busca aplicar conceitos similares utilizando técnicas modernas de controle do elemento de vídeo HTML5 e manipulação assíncrona do DOM.

---

## 📊 Tabela de Comparação de Atraso (Latência)

O atraso no streaming ocorre devido à arquitetura de distribuição de pacotes de vídeo na internet. Abaixo está um comparativo prático do tempo de resposta de cada mídia em relação aos acontecimentos reais no gramado do estádio:

| Meio de Transmissão | Atraso Médio (vs. Estádio) | Chance de Spoiler do Vizinho | Como Funciona? |
| :--- | :--- | :--- | :--- |
| **TV Aberta (Digital)** | ~1 a 3 segundos | **Zero (Você grita antes)** | Sinal transmitido via radiofrequência direto para a antena. Sem buffers de internet. |
| **YouTube COM Extensão** | **~6 a 8 segundos** | **Muito Baixa** | Remove a "gordura" do buffer de segurança, acelerando o vídeo dinamicamente para colar no limite máximo do sinal recebido. |
| **YouTube SEM Extensão** | ~20 a 35 segundos | **Altíssima** | O player cria um buffer gigante (gordura) de segurança para evitar travamentos, acumulando atraso crônico. |

---

## 🛠️ Como o Código Funciona (Explicação Técnica)

A extensão é dividida em dois arquivos principais de script:

### 1. `manifest.json`
Define os metadados da extensão usando a especificação moderna **Manifest V3** exigida pelo ecossistema Chromium. Ele instrui o navegador a injetar o nosso script `content.js` exclusivamente em páginas que correspondam à URL `https://www.youtube.com/*`.

### 2. `content.js` (O Motor de Sincronização)
Diferente de abordagens antigas que realizavam "saltos" mecânicos na linha do tempo (gerando cortes secos no áudio e vídeo), este script adota um algoritmo de **Sincronização Suave (Smooth Sync)**.

* **`MutationObserver`:** O YouTube renderiza componentes de forma dinâmica (Single Page Application). O script utiliza um observador de mutações que monitora o carregamento da página e injeta os gatilhos assim que o elemento `<video>` surge na tela, garantindo estabilidade mesmo se você navegar entre diferentes vídeos.
* **`video.seekable`:** Através da API nativa de vídeo do HTML5, o script lê a propriedade `seekable.end()`, que aponta exatamente o último milissegundo de transmissão que o servidor do YouTube conseguiu descarregar na sua máquina.
* **Controle Dinâmico de `playbackRate`:** * Se o script detecta que seu player está com mais de **2 segundos** de atraso em relação ao buffer máximo, ele aumenta a velocidade de reprodução para **`1.15x`** (15% mais rápido, o que é praticamente imperceptível ao ouvido humano).
  * Assim que o vídeo "alcança" o tempo real (atraso menor ou igual a 1 segundo), a velocidade retorna instantaneamente para **`1.0x`**.
  * Se o atraso for crítico (maior que 10 segundos causados por queda de conexão), o script faz um ajuste forçado (`currentTime = tempoReal`) para reestabelecer o fluxo imediatamente.
  * **Respeito ao Usuário:** O script valida o estado `.paused`. Se você pausar a live voluntariamente, a extensão respeita o comando e interrompe a perseguição do tempo real até que você clique no play novamente.

---

## 🚀 Como Instalar e Testar Localmente (Gratuito)

Você não precisa pagar taxas para testar ou utilizar esta extensão no seu próprio navegador:

1. Faça o download dos arquivos deste repositório (ou clone usando `git clone`).
2. Abra o Google Chrome (ou Edge/Brave) e acesse a página de gerenciamento de extensões digitando `chrome://extensions/` na barra de endereços.
3. No canto superior direito da tela, ative a chave **"Modo do desenvolvedor"**.
4. No canto superior esquerdo, clique no botão **"Carregar sem compactação"** (Load unpacked).
5. Selecione a pasta onde estão localizados os arquivos do projeto.
6. Pronto! Abra qualquer transmissão ao vivo no YouTube e faça o teste.

---

## 📄 Licença

Este projeto é open-source e distribuído sob a licença MIT. Sinta-se livre para estudar, modificar e distribuir o código.
