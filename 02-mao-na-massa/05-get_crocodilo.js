
import http from 'k6/http'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// 'https://test-api.k6.io/public'
// executar no terminal: k6 run .\05-get_crocodilo.js -e URL=https://test-api.k6.io/public

/*
https://github.com/benc-uk/k6-reporter
https://github.com/grafana/xk6-dashboard
*/

// k6 login cloud --token <token> => Para conectar a cloud da grafana

export const options = {
    scenarios: {
        listar: {
            executor: 'constant-arrival-rate',
            exec: 'listar',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVUs: 150,
            gracefulstop: '10s',
            tags: { test_type: 'listagem_de_crocodilos' }
        },
        buscar: {
            executor: 'per-vu-iterations',
            exec: 'buscar',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: { test_type: 'busca_de_crocodilos' }
        }
    }
}

export function listar() {
    http.get(__ENV.URL + '/crocodiles')
}

export function buscar() {
    if (__VU % 2 === 0) {
        http.get(__ENV.URL + '/crocodiles/2')
    } else {
        http.get(__ENV.URL + '/crocodiles/1')
    }
}

export function handleSummary(data) {
    return {
      "05-get_crocodilo.html": htmlReport(data),
    };
  }


/*
Critérios
    Realizar consulta a API de listagem de crocodilos e busca por id de crocodilos.
    É esperado um RPS de 200 REQ/S para a API de listagem de crocodilos durante 30 seg
    Para a busca por id, o sistema deve atender 50 usuários onde cada usuário realiza até 20 solicitações
    em até 1 min
        Usuário par devem realizar busca ao crocodilos de ID 2
        Usuário impar devem realizar busca ao crocodilos de ID 1
    Ambos os testes devem ser executados simultaneamente.
*/