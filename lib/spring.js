// Exact solution of x'' + damping*x' + stiffness*(x-target) = 0.
// Keeping velocity in px/s makes this independent of refresh rate.
export function spring(state,target,dt,stiffness=180,damping=16){
 const displacement=state.x-target,half=damping*.5,frequency=Math.sqrt(Math.max(.0001,stiffness-half*half));
 const decay=Math.exp(-half*dt),s=Math.sin(frequency*dt),c=Math.cos(frequency*dt),velocity=state.v;
 state.x=target+decay*(displacement*c+(velocity+half*displacement)/frequency*s);
 state.v=decay*(velocity*c-(half*velocity+stiffness*displacement)/frequency*s);
 return state;
}
export function atRest(state,target=0){return Math.abs(state.x-target)<.015&&Math.abs(state.v)<.04;}
