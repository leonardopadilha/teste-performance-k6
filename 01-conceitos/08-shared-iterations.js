import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    scenarios: {
        contacts: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 200,
            maxDuration: '30s' 
        }
    }
}

export default function() {
    http.get('http://test.k6.io/contacts.php')
    sleep(0.5)
}

/*
Um número fixo de VUs completa um número fixo de iterações. As iterações não são distribuidas 
de maneira uniforme entre os VUs. 

Executor adequado quando desejamos que um número específico de VUs complete um número específico
de iterações. 
Quantidade de iterações por VU não é importante.
Tempo para concluir uma série de iterações é importante.
*/