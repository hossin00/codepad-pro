import { useState } from 'react';
import { Code2, Plus, Trash2, Search, Copy, Check, X } from 'lucide-react';
const C='#6366f1';
interface Snippet { id:string; title:string; code:string; lang:string; tags:string[]; createdAt:number; }
const LANGS=['JavaScript','TypeScript','Python','Bash','SQL','CSS','HTML','Rust','Go','Other'];
const SK='cp_snippets_v1';
const ld=():Snippet[]=>{try{return JSON.parse(localStorage.getItem(SK)||'[]')}catch{return[]}};
export default function App() {
  const [snippets,setSnippets]=useState<Snippet[]>(ld);
  const [view,setView]=useState<'list'|'edit'>('list');
  const [cur,setCur]=useState<Snippet|null>(null);
  const [search,setSearch]=useState('');
  const [copied,setCopied]=useState('');
  const sv=(items:Snippet[])=>{setSnippets(items);localStorage.setItem(SK,JSON.stringify(items))};
  const filtered=snippets.filter(s=>!search||s.title.toLowerCase().includes(search.toLowerCase())||s.lang.toLowerCase().includes(search.toLowerCase())||s.code.toLowerCase().includes(search.toLowerCase()));
  const inp={width:'100%',background:'#080810',border:`1px solid ${C}20`,borderRadius:'10px',padding:'10px 14px',color:'white',fontSize:'14px',outline:'none',fontFamily:'Inter'};
  const save=()=>{if(!cur)return;const u=snippets.find(s=>s.id===cur.id)?snippets.map(s=>s.id===cur.id?cur:s):[cur,...snippets];sv(u);setView('list');};
  const copy=(id:string,code:string)=>{navigator.clipboard.writeText(code);setCopied(id);setTimeout(()=>setCopied(''),2000);};
  if(view==='edit'&&cur) return (
    <div style={{minHeight:'100vh',background:'#060610',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'14px 20px',borderBottom:`1px solid ${C}20`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={()=>setView('list')} style={{color:C,background:'none',border:'none',cursor:'pointer',fontSize:'14px',fontFamily:'Inter'}}>← Back</button>
        <div style={{display:'flex',flexWrap:'wrap',gap:'4px',flex:1,justifyContent:'center',padding:'0 10px'}}>
          {LANGS.map(l=><button key={l} onClick={()=>setCur({...cur,lang:l})} style={{padding:'2px 8px',borderRadius:'10px',border:`1px solid ${cur.lang===l?C:C+'30'}`,background:cur.lang===l?`${C}20`:'transparent',color:cur.lang===l?C:`${C}50`,fontSize:'10px',cursor:'pointer',fontFamily:'Inter'}}>{l}</button>)}
        </div>
        <button onClick={save} style={{padding:'6px 14px',borderRadius:'8px',background:C,border:'none',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter'}}>Save</button>
      </div>
      <div style={{flex:1,overflow:'auto',padding:'16px 20px',display:'flex',flexDirection:'column',gap:'10px'}}>
        <input value={cur.title} onChange={e=>setCur({...cur,title:e.target.value})} placeholder="Snippet title..." style={{...inp,fontSize:'18px',fontWeight:'600'}}/>
        <textarea value={cur.code} onChange={e=>setCur({...cur,code:e.target.value})} placeholder="Paste your code here..." rows={18}
          style={{...inp,resize:'none',fontFamily:'"JetBrains Mono","Fira Code","Courier New",monospace',lineHeight:'1.7',fontSize:'13px',background:'#0a0a16'}} autoFocus/>
      </div>
    </div>
  );
  return (
    <div style={{minHeight:'100vh',background:'#060610',display:'flex',flexDirection:'column'}}>
      <header style={{padding:'16px 20px',borderBottom:`1px solid ${C}20`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'36px',height:'36px',borderRadius:'10px',background:`linear-gradient(135deg,${C},#4f46e5)`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 14px ${C}30`}}><Code2 size={16} color="white"/></div>
          <div><div style={{fontWeight:'700',fontSize:'16px',color:'white',lineHeight:1}}>CodePad Pro</div>
          <div style={{fontSize:'11px',color:`${C}60`,marginTop:'2px'}}>{snippets.length} snippets</div></div>
        </div>
        <button onClick={()=>{const n:Snippet={id:crypto.randomUUID(),title:'',code:'',lang:'JavaScript',tags:[],createdAt:Date.now()};setCur(n);setView('edit');}} style={{display:'flex',alignItems:'center',gap:'5px',padding:'8px 14px',borderRadius:'9px',background:C,border:'none',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter',boxShadow:`0 4px 12px ${C}30`}}><Plus size={13}/> New</button>
      </header>
      <div style={{padding:'12px 20px',borderBottom:`1px solid ${C}15`}}>
        <div style={{position:'relative'}}>
          <Search size={13} style={{position:'absolute',left:'11px',top:'50%',transform:'translateY(-50%)',color:`${C}60`}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search snippets..." style={{width:'100%',background:`${C}08`,border:`1px solid ${C}20`,borderRadius:'10px',padding:'9px 12px 9px 34px',color:'white',fontSize:'13px',outline:'none',fontFamily:'Inter'}}/>
        </div>
      </div>
      <div style={{flex:1,overflow:'auto',padding:'14px 20px'}}>
        {filtered.length===0?(<div style={{textAlign:'center',padding:'60px 20px'}}>
          <div style={{fontSize:'52px',marginBottom:'16px'}}>💻</div>
          <h3 style={{fontSize:'20px',fontWeight:'700',color:'white',marginBottom:'8px'}}>{snippets.length===0?'Save code snippets':'No matches'}</h3>
          <p style={{color:`${C}60`,fontSize:'14px',lineHeight:'1.6',maxWidth:'240px',margin:'0 auto 24px'}}>{snippets.length===0?'Build your personal code library offline.':''}</p>
          {snippets.length===0&&<button onClick={()=>{const n:Snippet={id:crypto.randomUUID(),title:'',code:'',lang:'JavaScript',tags:[],createdAt:Date.now()};setCur(n);setView('edit');}} style={{padding:'12px 24px',borderRadius:'10px',background:C,border:'none',color:'white',fontSize:'14px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter'}}>Add first snippet</button>}
        </div>):(<div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {[...filtered].sort((a,b)=>b.createdAt-a.createdAt).map(s=>(
            <div key={s.id} style={{background:`${C}08`,border:`1px solid ${C}20`,borderRadius:'12px',padding:'12px 14px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}} onClick={()=>{setCur(s);setView('edit');}}>
                  <span style={{fontSize:'9px',padding:'2px 7px',borderRadius:'8px',background:`${C}20`,color:C,fontWeight:'600'}}>{s.lang}</span>
                  <span style={{color:'white',fontSize:'13px',fontWeight:'500'}}>{s.title||'Untitled'}</span>
                </div>
                <div style={{display:'flex',gap:'4px'}}>
                  <button onClick={()=>copy(s.id,s.code)} style={{padding:'5px',borderRadius:'6px',background:copied===s.id?'#10b98115':'transparent',border:'none',cursor:'pointer',color:copied===s.id?'#34d399':`${C}60`}}>{copied===s.id?<Check size={12}/>:<Copy size={12}/>}</button>
                  <button onClick={()=>sv(snippets.filter(x=>x.id!==s.id))} style={{padding:'5px',background:'none',border:'none',cursor:'pointer',color:`${C}40`}}><Trash2 size={12}/></button>
                </div>
              </div>
              <pre style={{margin:0,color:`${C}90`,fontSize:'12px',fontFamily:'"JetBrains Mono","Fira Code",monospace',lineHeight:'1.5',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical'}}>{s.code}</pre>
            </div>
          ))}
        </div>)}
      </div>
    </div>
  );
}