import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    scenarios: {
        contacts: {
            executor: 'constant-vus',
            vus: 10,
            duration: '30s' 
        }
    }
}

export default function() {
    http.get('http://test.k6.io/contacts.php')
    sleep(0.5)
}

/*
Um número fixo de VUs executam quantas requisições forem possíveis.

Número específico de VUs seja executado em um período especificado de tempo.
*/