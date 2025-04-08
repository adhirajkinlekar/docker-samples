import http from 'k6/http';
import { check, sleep } from 'k6';

// 10 VUs × 30 requests each = 300 total requests
export let options = {
  vus: 10, // virtual users
  duration: '30s',
};

export default function () {
  let res = http.get('http://api:3000/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
