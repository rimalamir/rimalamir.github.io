import {structuredPortfolio} from '../../lib/agent-content';
export const dynamic='force-static';
export function GET(){return new Response(JSON.stringify(structuredPortfolio(),null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});}
