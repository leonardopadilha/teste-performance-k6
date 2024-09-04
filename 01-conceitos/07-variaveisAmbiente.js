import http from 'k6/http'
import { sleep } from 'k6'

export default function() {
    const BASE_URL = __ENV.URL;

    const res = http.get(BASE_URL)
    sleep(1)
}

/*
k6 run --env URL=https://test-api.k6.io/public/crocodiles/ .\07-variaveisAmbiente.js 
ou
k6 run --e URL=https://test-api.k6.io/public/crocodiles/ .\07-variaveisAmbiente.js

k6 run --env URL=https://test-api.k6.io/public/crocodiles/ .\07-variaveisAmbiente.js --duration 5s --vus 10

k6 run --env URL=https://test-api.k6.io/public/crocodiles/ .\07-variaveisAmbiente.js --stage 5s:5,5s:5,5s:0
*/

