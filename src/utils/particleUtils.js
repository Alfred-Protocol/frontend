import { pJS } from 'particles.js';

function initParticle() {
  particlesJS.load('particles-js', 'assets/particles.json', function () {
    console.log('callback - particles.js config loaded');
  });
}
