import http from 'k6/http'

export const options = {
    scenarios: {
        contacts: {
            executor: 'constant-arrival-rate',
            duration: '30s',
            rate: 30,
            timeUnit: '1s',
            preAllocatedVUs: 50
        }
    }
}

export default function() {
    http.get('http://test.k6.io/contacts.php')
}

/*
Número fixo de iterações iniciadas pelo k6;
Novas iterações iniciadas enquanto houver VUs disponíveis;
Novas iterações seguindo sempre a taxa configurada

Executor com foco em métricas como o RPS.
*/