import http from 'k6/http';
import { check, sleep } from 'k6';

// options in a K6 script is how you configure the test execution behavior, 
// like how many virtual users to simulate, how long to run, how to ramp up/down, thresholds, and more.
export let options = {
  vus: 10,         // 10 virtual users
  duration: '30s', // for 30 seconds
};

export default function () {
  const res = http.get('http://api:3000/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);  
}
