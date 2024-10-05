
import http from 'k6/http'
import { check, sleep } from 'k6'
import {  uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'

export const options = {
    stages: [{ duration: '10s', target: 10 }],
    thresholds: {
        checks: ['rate > 0.95'], // requisições com sucesso 95%
        http_req_failed: ['rate < 0.01'], // requisições com falha < 1%
        http_req_duration: ['p(95) < 500'], // duração da requisição p(95) < 500
    }
}

export default function() {
    const BASE_URL = "https://test-api.k6.io"
    
    const USER = `${uuidv4().substring(0, 8)}@email.com`
    const PASS = 'user123'

    console.log(USER + PASS)

    const res = http.post(`${BASE_URL}/user/register/`, {
        username: USER,
        first_name: "crocodilo",
        last_name: "dino",
        email: USER,
        password: PASS
    })

    check(res, {
        'sucesso ao registrar': (r) => r.status === 201
    })
    sleep(1)
}
/*
Registration e auth: Registro
    Realizar o registro de um novo usuário
Critérios:
    Performance test
        Carga 10 VU por 10s
    Limites
        Requisição com falha inferior a 1%
        Duração da requisiçaõ p(95) < 500
        Requisição com sucesso superior a 95%
*/