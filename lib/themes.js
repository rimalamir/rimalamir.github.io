export const themeStorageKey='amir-portfolio-theme';
export const themes=[{primary:'#fff8ee',secondary:'#ecd7c4',contrast:'#302821'},{primary:'#ede6d3',secondary:'#e0a35d',contrast:'#2c2c2c'},{primary:'#e8efff',secondary:'#bdc9ef',contrast:'#23335e'},{primary:'#e2efe6',secondary:'#9fc5ab',contrast:'#203b2b'},{primary:'#f7e9f6',secondary:'#dbc0dc',contrast:'#442746'}];
export function applyTheme(root,themes,index){
 const theme=themes[index];
 for(const [key,value] of Object.entries({'--color-primary':theme.primary,'--color-secondary':theme.secondary,'--color-onPrimary':theme.contrast,'--color-onSecondary':theme.contrast}))root.style.setProperty(key,value);
 root.dataset.theme=String(index);
}
function initializeTheme(themes,key,apply){
 let index=null;
 try{const raw=localStorage.getItem(key);if(raw!==null&&raw.trim()!==''){const saved=Number(raw);if(Number.isInteger(saved)&&saved>=0&&saved<themes.length)index=saved;}}catch{}
 apply(document.documentElement,themes,index??Math.floor(Math.random()*themes.length));
}
export const themeBootstrap=`(${initializeTheme.toString()})(${JSON.stringify(themes)},${JSON.stringify(themeStorageKey)},${applyTheme.toString()});`;
