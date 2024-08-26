import http from 'k6/http'; // default

import {
    AWSConfig,
    SecretsManagerClient,
  } from 'https://jslib.k6.io/aws/0.12.3/aws.js'; // remoto

  import runTest from './test1.js' // local



export default function() {
    const res = http.get('http://test.k6.io/')

    check(res, {
        'status code é 200': (r) => r.status === 200
    })
}