import http from 'k6/http'
import { check, sleep } from 'k6'

// para gerar o dashboard: K6_WEB_DASHBOARD=true k6 run 01-get_crocodilos.js
// para gerar o dashboard e o relatório html: K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=01-todos_crocodilos.html k6 run 01-get_crocodilos.js
// para visualizar o dashboard: http://localhost:5665/

/*
https://github.com/benc-uk/k6-reporter
https://github.com/grafana/xk6-dashboard
*/

/*
k6 login cloud --token <token> => Para conectar a cloud da grafana
k6 cloud .\06-get_crocodilos_cloud.js => Execução em cloud
k6 run --out cloud .\06-get_crocodilos_cloud.js => Execução em cloud => Execução local mas as informações são exibidas na cloud
*/

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    },
    ext: {
        loadimpact: {
            projectID: '3712200',
            name: 'POC curso-k6'
        }
    }
}

export default function() {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/'
    const res = http.get(BASE_URL)
    check(res, {
        'status code 200': (r) => r.status === 200
    })
    sleep(1)
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