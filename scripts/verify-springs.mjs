import assert from 'node:assert/strict';
import {spring} from '../lib/spring.js';
const states=[];
for(const hz of [30,60,120,144]){const state={x:100,v:500};for(let i=0;i<hz*2;i++)spring(state,0,1/hz,180,16);assert(Math.abs(state.x)<.001);assert(Math.abs(state.v)<.01);states.push(state);}
for(const state of states)assert(Math.abs(state.x-states[0].x)<1e-9);
const release={x:300,v:1600};for(let i=0;i<180;i++)spring(release,496,1/60,105,18);assert(Math.abs(release.x-496)<.01);assert(Math.abs(release.v)<.01);
console.log('Passed: frame-rate independent spring response and velocity-preserving snap settles.');
