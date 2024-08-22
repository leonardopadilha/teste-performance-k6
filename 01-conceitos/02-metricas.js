import http from 'k6/http';
import { check } from 'k6';
import { Counter, Gauge, Rate, Trend } from 'k6/metrics'

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter('chamadas')
const myGauge = new Gauge('bloqueio')
const myRate = new Rate('requisicoes')
const myTrend = new Trend('Espera')

export default function() {
    const req = http.get('http://test.k6.io/')

    chamadas.add(1) // Contador
    myGauge.add(req.timings.blocked) // Medidor
    myRate.add(req.status === 200) // Taxa
    myTrend.add(req.timings.waiting) // Tendência
}