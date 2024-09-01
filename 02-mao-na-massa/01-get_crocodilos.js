import http from 'k6/http'
import { check } from 'k6'

// para gerar o dashboard: K6_WEB_DASHBOARD=true k6 run 01-get_crocodilos.js
// para gerar o dashboard e o relatório html: K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=01-todos_crocodilos.html k6 run 01-get_crocodilos.js
// para visualizar o dashboard: http://localhost:5665/

/*
https://github.com/benc-uk/k6-reporter
https://github.com/grafana/xk6-dashboard
*/

export const options = {
    vus: 1,
    duration: '30s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        checks: ['rate > 0.99']
    }
}

export default function() {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/'
    const res = http.get(BASE_URL)
    check(res, {
        'status code 200': (r) => r.status === 200
    })
}


/*
PUblic API: Exemplo 1
    Buscar todos os crocodilos
Critérios:
    Smoke test
        1 usuário por 30 segundos
    Limites
        Requisição com sucesso > 99%
*/