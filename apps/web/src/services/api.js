const API='/api';
const json=async(res)=>{if(!res.ok){let m='Erro na API';try{m=(await res.json()).error||m}catch{}throw new Error(m)}return res.status===204?null:res.json()};
export const api={
 list:(r)=>fetch(`${API}/${r}`).then(json), get:(r,id)=>fetch(`${API}/${r}/${id}`).then(json),
 create:(r,data)=>fetch(`${API}/${r}`,{method:'POST',headers:{'Content-Type':'application/json',...adminHeader()},body:JSON.stringify(data)}).then(json),
 update:(r,id,data)=>fetch(`${API}/${r}/${id}`,{method:'PUT',headers:{'Content-Type':'application/json',...adminHeader()},body:JSON.stringify(data)}).then(json),
 remove:(r,id)=>fetch(`${API}/${r}/${id}`,{method:'DELETE',headers:adminHeader()}).then(json),
 stats:()=>fetch(`${API}/admin/stats`,{headers:adminHeader()}).then(json),
 login:(token)=>fetch(`${API}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})}).then(json),
 approveSubmission:(id,admin_notes='')=>fetch(`${API}/event-submissions/${id}/approve`,{method:'POST',headers:{'Content-Type':'application/json',...adminHeader()},body:JSON.stringify({admin_notes})}).then(json),
 rejectSubmission:(id,admin_notes='')=>fetch(`${API}/event-submissions/${id}/reject`,{method:'POST',headers:{'Content-Type':'application/json',...adminHeader()},body:JSON.stringify({admin_notes})}).then(json),
 upload:async(file)=>{const b64=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result).split(',')[1]);r.onerror=reject;r.readAsDataURL(file)});return fetch(`${API}/uploads`,{method:'POST',headers:{'Content-Type':'application/json',...adminHeader()},body:JSON.stringify({name:file.name,type:file.type,data:b64})}).then(json)}
};
function adminHeader(){const token=localStorage.getItem('sumare_admin_token');return token?{'X-Admin-Token':token}:{}}
