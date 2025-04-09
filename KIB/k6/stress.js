import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '20s', target: 10 }, // ramp to 10 users
    { duration: '30s', target: 20 }, // sustain 20 users
    { duration: '10s', target: 0 },  // ramp down
  ],
};

export default function () {
  const res = http.get('http://api:3000/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
