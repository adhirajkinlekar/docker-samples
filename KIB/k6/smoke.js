import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 1,
  duration: '5s',
};

export default function () {
  const res = http.get('http://api:3000/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
