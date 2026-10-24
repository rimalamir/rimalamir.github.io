import {agentGuidance} from '../../lib/agent-content';
export const dynamic='force-static';
export function GET(){return new Response(agentGuidance,{headers:{'Content-Type':'text/markdown; charset=utf-8'}});}
