import {useState} from 'react'
import {Link,useNavigate,useParams,useSearchParams} from 'react-router-dom'
import {Heart,MapPin,Eye,Clock,ShieldCheck,Check,ArrowRight,Plus,GraduationCap,Search,Laptop,Cpu,BookOpen,Plug,Armchair,Wrench,ShoppingBag} from 'lucide-react'
import {useApp} from './store'
import {CATS,GRADS,EVENTS,UNIS} from './data'
const src=l=>l.img.startsWith('data:')?l.img:`/img/${l.img}.jpg`
export const tk=n=>'৳ '+Number(n).toLocaleString()
const ICON={Laptops:Laptop,'PC Components':Cpu,Books:BookOpen,Electronics:Plug,Furniture:Armchair,Services:Wrench,Others:ShoppingBag}
export function Card({l}){const {saved,toggleSave}=useApp();const on=saved.includes(l.id)
return <div className="card"><div className="ph"><Link to={`/listing/${l.id}`}><img src={src(l)} alt={l.title}/></Link><button className={'heart'+(on?' on':'')} onClick={()=>toggleSave(l.id)}><Heart size={16} fill={on?'currentColor':'none'}/></button></div>
<Link to={`/listing/${l.id}`} className="t">{l.title}</Link><b className="price">{tk(l.price)}</b><div className="tags"><i>{l.cat}</i><i>{l.cond}</i></div><small><MapPin size={12}/> BAUST · {l.posted}</small></div>}
export function Home(){const {listings,user,saved}=useApp();const mine=listings.filter(l=>l.owner===user?.email).length
return <div className="cols"><div>
<div className="hero"><h2>Same Campus.<br/><span>Bigger Opportunities.</span></h2><p>Buy, sell, and access services within your university community.</p><Link to="/browse" className="btn" style={{background:'#fff',color:'#0a6c3b'}}>Explore Marketplace <ArrowRight size={16}/></Link></div>
<div className="sec"><h3>Browse Categories</h3><Link to="/browse">View All →</Link></div>
<div className="cats">{CATS.map(c=>{const I=ICON[c];return <Link key={c} to={`/browse?cat=${c}`} className="cat"><I color="#0a6c3b"/><br/>{c}<small>{listings.filter(l=>l.cat===c).length} items</small></Link>})}</div>
<div className="sec"><h3>Recent Listings</h3><Link to="/browse">View All →</Link></div><div className="grid">{listings.slice(0,4).map(l=><Card key={l.id} l={l}/>)}</div>
<div className="box gl row sp" style={{marginTop:20}}><div><b>Offer Your Skills. Help Your Peers.</b><br/><small className="muted">From Windows installation to assignment help — list your services.</small></div><Link to="/post" className="btn">Get Started <ArrowRight size={16}/></Link></div></div>
<div><div className="box"><h3>Welcome back, {user?.name} 👋</h3><p className="muted" style={{fontSize:14}}>“Good things happen in university communities.”</p><div className="stats"><span><b>{mine}</b>My Listings</span><span><b>12</b>Offers</span><span><b>{saved.length}</b>Wishlist</span><span><b>2</b>Messages</span></div></div>
<div className="box"><div className="row sp"><div className="row"><ShieldCheck color="#0a6c3b" size={30}/><div><b>Verified Member</b><br/><small className="muted">{user?.uni}</small></div></div></div></div>
<div className="box"><h3>Need Help?</h3><p className="muted" style={{fontSize:14}}>Get help, share your skills, or request a service.</p><Link to="/browse?cat=Services" className="btn lt full">Browse Services</Link></div>
<div className="box"><h3>Upcoming Events</h3>{EVENTS.map(e=><div className="ev" key={e[2]}><div className="d">{e[0]}<b>{e[1]}</b></div><div><b>{e[2]}</b><br/><small className="muted">{e[3]} · {e[4]}</small></div></div>)}</div></div></div>}
export function Browse({mine}){const {listings,user}=useApp();const [p,setP]=useSearchParams();const q=(p.get('q')||'').toLowerCase(),cat=p.get('cat')||''
const r=listings.filter(l=>(!cat||l.cat===cat)&&l.title.toLowerCase().includes(q)&&(!mine||l.owner===user?.email))
return <><h1>{mine?'My Listings':cat||'Browse'}</h1><p className="muted">{r.length} listing(s){q&&` for “${q}”`}</p><div className="chips">{['',...CATS].map(c=><button key={c} className={c===cat?'on':''} onClick={()=>setP(c?{cat:c}:{})}>{c||'All'}</button>)}</div>
<div className="grid">{r.map(l=><Card key={l.id} l={l}/>)}</div>{!r.length&&<div className="box">Nothing here yet. <Link to="/post" className="g">Post a listing</Link></div>}</>}
export function Listing(){const {id}=useParams();const nav=useNavigate();const {listings,saved,toggleSave}=useApp();const l=listings.find(x=>x.id==id)
if(!l)return <div className="box">Listing not found. <Link to="/browse" className="g">Back to browse</Link></div>
const sim=listings.filter(x=>x.id!==l.id).sort((a,b)=>(b.cat===l.cat)-(a.cat===l.cat)).slice(0,5),on=saved.includes(l.id)
return <div className="detail"><div><p className="muted" style={{fontSize:14}}><Link to="/">Home</Link> › <Link to={`/browse?cat=${l.cat}`}>{l.cat}</Link> › {l.title}</p>
<div className="row" style={{alignItems:'flex-start',gap:20,flexWrap:'wrap'}}><img className="big" style={{flex:'1 1 320px',maxWidth:420}} src={src(l)} alt={l.title}/>
<div style={{flex:'1 1 280px'}}><h1>{l.title}</h1><div className="tags"><i>{l.cond.includes('New')?'Like New':'Used'}</i><i>{l.cond}</i></div>
<b className="price" style={{fontSize:30}}>{tk(l.price)} {l.old&&<s className="muted" style={{fontSize:16,fontWeight:400}}>{tk(l.old)}</s>}</b>
<div className="row muted" style={{fontSize:13,gap:16}}><span><MapPin size={13}/> BAUST</span><span><Clock size={13}/> {l.posted}</span><span><Eye size={13}/> 124 views</span></div>
<p>{l.desc.split('. ')[0]}.</p><button className={'btn '+(on?'':'out')} onClick={()=>toggleSave(l.id)}><Heart size={16} fill={on?'currentColor':'none'}/> {on?'Saved':'Save'}</button></div></div>
{l.specs&&<div className="specs">{l.specs.map(([a,b])=><div key={a}>{a}<b>{b}</b></div>)}</div>}
<div className="box"><h3>Description</h3><p>{l.desc}</p>{l.specs&&['Original Charger Included','Backlit Keyboard','Fingerprint Reader'].map(x=><div key={x}><Check size={14} color="#0a6c3b"/> {x}</div>)}</div></div>
<div><div className="box"><div className="row"><div className="av" style={{width:56,height:56}}>{l.seller[0]}</div><div><b>{l.seller}</b> <Check size={14} color="#0a6c3b"/><br/><small className="muted">BAUST · Member since Mar 2023</small></div></div><button className="btn lt full" style={{margin:'14px 0 8px'}} onClick={()=>nav('/messages')}>Send Message</button><button className="btn out full">View Profile</button></div>
<div className="box"><h3>Stay Safe on UniMart</h3>{['Meet in public places (on campus)','Check the item before buying','Never share sensitive information','Report suspicious activity'].map(t=><p key={t} style={{margin:'8px 0',fontSize:14}}><ShieldCheck size={14} color="#0a6c3b"/> {t}</p>)}</div></div>
<div style={{gridColumn:'1/-1'}}><div className="sec"><h3>Similar Listings</h3><Link to="/browse">View All →</Link></div><div className="grid">{sim.map(x=><Card key={x.id} l={x}/>)}</div></div></div>}
export function Saved(){const {listings,saved}=useApp();const [t,setT]=useState('All');const all=listings.filter(l=>saved.includes(l.id))
const f={All:()=>true,Products:l=>!['Services','Books'].includes(l.cat),Services:l=>l.cat==='Services',Books:l=>l.cat==='Books'}
const r=all.filter(f[t]);return <div className="cols"><div><h1>Saved Items</h1><p className="muted">Your saved listings, all in one place.</p>
<div className="chips">{Object.keys(f).map(k=><button key={k} className={k===t?'on':''} onClick={()=>setT(k)}>{k} ({all.filter(f[k]).length})</button>)}</div>
<div className="grid">{r.map(l=><div key={l.id}><Card l={l}/></div>)}</div>{!r.length&&<div className="box">No saved items.</div>}</div>
<div><div className="box gl" style={{textAlign:'center'}}><h3>Never Miss a Good Deal!</h3><p className="muted" style={{fontSize:14}}>Save items you like and get notified if the price drops.</p></div>
<div className="box"><h3>Recently Viewed</h3>{listings.slice(0,4).map(l=><Link to={`/listing/${l.id}`} key={l.id} className="row" style={{margin:'10px 0'}}><img src={src(l)} width="52" height="42" style={{borderRadius:8,objectFit:'cover'}}/><div><b style={{fontSize:14}}>{l.title}</b><br/><b className="g" style={{fontSize:14}}>{tk(l.price)}</b></div></Link>)}</div>
<div className="box"><h3>Need Something Specific?</h3><p className="muted" style={{fontSize:14}}>Create a custom request and let the community help you.</p><button className="btn out full">Post a Request</button></div></div></div>}
export function Graduating(){const [u,setU]=useState('');const [q,setQ]=useState('');const r=GRADS.filter(g=>(!u||g.u===u)&&g.n.toLowerCase().includes(q.toLowerCase()))
return <div className="cols"><div><div className="hero" style={{padding:'30px 36px'}}><h2>Graduating Sale</h2><p style={{color:'#43dd9a',fontWeight:600,fontSize:20,margin:'0 0 6px'}}>Pass it forward, make a difference</p><p>Find great deals from graduating students and give these items a second home.</p></div>
<div className="chips">{['',...UNIS.slice(0,4)].map(c=><button key={c} className={c===u?'on':''} onClick={()=>setU(c)}>{c||'All Sales'}</button>)}</div>
<div className="f" style={{maxWidth:360}}><Search size={16}/><input placeholder="Search graduating sales..." value={q} onChange={e=>setQ(e.target.value)}/></div>
<div className="grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))'}}>{r.map(g=><div className="gcard" key={g.n}><div className="q"><div className="av">{g.n[0]}</div>“{g.q}”</div><div className="in"><div className="row sp"><div><b>{g.n}</b><br/><small className="muted">{g.d}</small><br/><small className="g"><GraduationCap size={11}/> Graduating {g.t}</small></div><b className="g">{g.items} items</b></div>
<div className="thumbs">{g.th.map(t=><img key={t} src={`/img/${t}.jpg`}/>)}</div><Link to="/browse" className="btn out full">View All Items →</Link></div></div>)}</div></div>
<div><div className="box gl"><h3>Are you graduating soon?</h3><p className="muted" style={{fontSize:14}}>List all your items in one place and help fellow students!</p><Link to="/post" className="btn full">Create Your Graduation Sale</Link></div>
<div className="box"><h3>How It Works?</h3>{['Create Your Sale','Get Verified','Sell & Help Others'].map((t,i)=><p key={t} className="row"><span className="av" style={{width:26,height:26,fontSize:13}}>{i+1}</span><b style={{fontSize:14}}>{t}</b></p>)}</div></div></div>}
export function Settings(){const {user,updateUser,setMe}=useApp();const [f,setF]=useState({...user,cur:'',n:'',c:''});const [m,setM]=useState('');const s=k=>e=>setF({...f,[k]:e.target.value})
const pw=()=>{if(f.cur!==user.password)return setM('Current password is wrong');if(f.n.length<6||f.n!==f.c)return setM('New passwords must match (min 6 chars)');updateUser({password:f.n});setF({...f,cur:'',n:'',c:''});setM('Password updated ✓')}
return <div className="cols"><div><h1>Settings</h1><p className="muted">Manage your account, preferences, and privacy settings.</p>
<div className="box"><h3>Profile Information</h3><div className="two"><div><span className="lab">Full Name</span><div className="f"><input value={f.name} onChange={s('name')}/></div></div><div><span className="lab">Email Address</span><div className="f" style={{background:'#f3f8f5'}}><input value={f.email} disabled/></div></div>
<div><span className="lab">Phone Number</span><div className="f"><input value={f.phone||''} onChange={s('phone')}/></div></div><div><span className="lab">User Type</span><div className="f"><input value={f.role} disabled/></div></div></div>
<span className="lab">Bio</span><textarea className="ta" maxLength={200} value={f.bio||''} onChange={s('bio')}/><p className="muted" style={{fontSize:12,textAlign:'right',margin:'2px 0 10px'}}>{(f.bio||'').length}/200</p>
<button className="btn" onClick={()=>{updateUser({name:f.name,phone:f.phone,bio:f.bio});setM('Saved ✓')}}>Save Changes</button></div>
<div className="box"><h3>University Information</h3><div className="two"><div><span className="lab">University</span><div className="f"><input value={user.uni} disabled/></div></div><div><span className="lab">Department</span><div className="f"><input value={user.dept} disabled/></div></div></div><div className="box gl row sp" style={{margin:0}}><span><Check size={14}/> Your university email is verified.</span><b className="g">Verified</b></div></div>
<div className="box"><h3>Change Password</h3><div className="two" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>{[['cur','Current'],['n','New'],['c','Confirm New']].map(([k,t])=><div key={k}><span className="lab">{t} Password</span><div className="f"><input type="password" value={f[k]} onChange={s(k)}/></div></div>)}</div><button className="btn" onClick={pw}>Update Password</button></div>{m&&<p className="g"><b>{m}</b></p>}</div>
<div><div className="box"><h3>Quick Actions</h3>{['Edit Profile','Change Password','Notification Settings','Privacy Settings','Transaction History'].map(a=><p key={a} style={{margin:'10px 0',fontSize:14}}>{a}</p>)}<button className="btn out full" onClick={()=>setMe(null)}>Log out</button></div></div></div>}
export function Post(){const {setListings,user}=useApp();const nav=useNavigate();const [f,setF]=useState({title:'',price:'',cat:CATS[0],cond:'Used',desc:'',img:'box'});const s=k=>e=>setF({...f,[k]:e.target.value})
const pick=e=>{const file=e.target.files[0];if(!file)return;if(file.size>600000)return alert('Image too large (max 600KB)');const r=new FileReader();r.onload=()=>setF(x=>({...x,img:r.result}));r.readAsDataURL(file)}
const go=e=>{e.preventDefault();setListings(ls=>[{id:Date.now(),title:f.title,price:+f.price,cat:f.cat,cond:f.cond,img:f.img,desc:f.desc,seller:user.name,owner:user.email,posted:'Just now'},...ls]);nav('/my-listings')}
return <form className="box" style={{maxWidth:640}} onSubmit={go}><h1>Post a Listing</h1><span className="lab">Title</span><div className="f"><input value={f.title} onChange={s('title')} required/></div>
<div className="two"><div><span className="lab">Price (৳)</span><div className="f"><input type="number" min="0" value={f.price} onChange={s('price')} required/></div></div><div><span className="lab">Category</span><div className="f"><select value={f.cat} onChange={s('cat')}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div></div></div>
<span className="lab">Condition</span><div className="f"><select value={f.cond} onChange={s('cond')}>{['Like New','Good Condition','Used'].map(c=><option key={c}>{c}</option>)}</select></div>
<span className="lab">Description</span><textarea className="ta" value={f.desc} onChange={s('desc')} required/><span className="lab" style={{marginTop:12}}>Photo</span><input type="file" accept="image/*" onChange={pick}/><br/><br/><button className="btn"><Plus size={16}/> Publish</button></form>}
export const Soon=({t})=><div className="box"><h1>{t}</h1><p className="muted">This section is coming soon.</p></div>
