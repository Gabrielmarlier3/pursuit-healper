### **README.md**

# Backend de Roteamento em Tempo-Real (NestJS + OSRM + Redis)

Aplicação leve que:

1. Recebe em tempo real as posições de dois pontos móveis **A** e **B**  
2. Recalcula a rota A → B a cada 5 s usando **OSRM**  
3. Publica a rota (GeoJSON) no canal Redis `route-updates`  
4. Transmite o mesmo dado para clientes WebSocket  
5. No front-end você pode **arrastar** A ou B e ver a rota redesenhada sem perder o zoom

---

## Índice
- [Pré-requisitos](#pré-requisitos)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Clonagem e variáveis de ambiente](#clonagem-e-variáveis-de-ambiente)
- [Baixar e preparar o mapa](#baixar-e-preparar-o-mapa)
- [Subir tudo via Docker Compose](#subir-tudo-via-docker-compose)
- [Executar o backend](#executar-o-backend)
- [API REST](#api-rest)
- [Eventos WebSocket](#eventos-websocket)
- [Front-end de teste](#front-end-de-teste)
- [Notas de produção](#notas-de-produção)

---

## Pré-requisitos
| Ferramenta           | Versão mínima | Finalidade                    |
|----------------------|---------------|-------------------------------|
| **Node.js**          | 24.4.0        | Runtime NestJS                |
| **npm / pnpm / yarn**| Atual         | Gerenciar pacotes             |
| **Docker Desktop**   | 20 +          | Contêineres OSRM e Redis      |
| **curl / wget**      | —             | Download do arquivo PBF       |

---

## Estrutura de pastas
```

.
├─ data/                  # .osm.pbf e arquivos .osrm\* gerados
├─ src/                   # código NestJS
├─ frontend/index.html    # mapa Leaflet (arrastável)
├─ docker-compose.yml
└─ README.md

````

---

## Clonagem e variáveis de ambiente
```bash
git clone https://github.com/Gabrielmarlier3/pursuit-helper.git
cd pursuit-helper
npm install

# copie o template e ajuste se necessário
cp .env.example .env
````

Variáveis padrão (`.env`):

```ini
PORT=3000
OSRM_URL=http://localhost:5000
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Baixar e preparar o mapa

Escolha **um** dos espelhos e baixe o arquivo `.osm.pbf` da sua região, salvando em `./data` como `region.osm.pbf`.

### Opção A – Geofabrik

```bash
wget -O data/region.osm.pbf \
  https://download.geofabrik.de/south-america/brazil/minas-gerais-latest.osm.pbf
```

### Opção B – OpenStreetMap France

```bash
wget -O data/region.osm.pbf \
  https://download.openstreetmap.fr/extracts/south-america/brazil/southeast/minas-gerais.osm.pbf
```

### Gerar os arquivos OSRM

```bash
# extrai
docker run --rm -v $(pwd)/data:/data osrm/osrm-backend \
  osrm-extract  -p /opt/car.lua /data/region.osm.pbf

# contrata (pré-processa)
docker run --rm -v $(pwd)/data:/data osrm/osrm-backend \
  osrm-contract /data/region.osrm
```

Em `data/` devem aparecer:
`region.osrm`, `region.osrm.datasource_names`, `region.osrm.edges`, `region.osrm.nodes`, etc.
OBS: pode não aparecer pela IDE verifique pelo terminal ou pelos arquivos
---

## Subir tudo via Docker Compose

```bash
docker-compose up -d        # sobe OSRM (porta 5000) e Redis (porta 6379)
```

`docker-compose.yml` (simplificado):

```yaml
version: "3.8"
services:
  osrm:
    image: osrm/osrm-backend
    volumes: [ "./data:/data" ]
    command: osrm-routed /data/region.osrm
    ports: [ "5000:5000" ]
    restart: unless-stopped
  redis:
    image: redis:alpine
    ports: [ "6379:6379" ]
    restart: unless-stopped
```

---

## Executar o backend

```bash
npm run start:dev           # NestJS em http://localhost:3000
```

---

## API REST

#### `POST /location/update`

Envia a posição de um ponto, ponto este que é uma string

```json
{
  "id": "Moto0001",                
  "latitude":  -19.90,
  "longitude": -43.90
}
```

#### `GET /route`

Retorna a rota atual (GeoJSON) — útil para debug.

---

## Eventos WebSocket

| Evento         | Payload GeoJSON | Descrição                          |
| -------------- | --------------- |------------------------------------|
| `route-update` | LineString      | Rota nova a cada 5 s               |

Exemplo:

```js
const socket = io("http://localhost:3000");
socket.on("route-update", geo => console.log("Nova rota:", geo));
```

---

## Front-end de teste

```bash
# pasta frontend/ contém index.html
npx serve frontend -l 8080
# abre http://localhost:8080
```

Funcionalidades:

* Marcadores **A** e **B** são arrastáveis.
* Ao soltar, o script chama OSRM e redesenha a rota.
* Se você der zoom ou pan, o mapa não perde seu enquadramento.

---

## Notas de produção

* **Segurança** → proteja `/location/update` com JWT ou API-Key.
* **Logging** → use Winston/Pino em lugar de `console`.
* **Escala** → múltiplas instâncias NestJS podem usar o mesmo Redis Pub/Sub.
* **Atualização do mapa** → agende download do `.pbf` e reprocesso mensalmente.

MIT License
