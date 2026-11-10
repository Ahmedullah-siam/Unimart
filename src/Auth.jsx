import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {GraduationCap,Mail,Lock,Eye,EyeOff,User,Phone,Building2,BookOpen,Briefcase,ArrowRight,Check,ShoppingCart,Users,ShieldCheck} from 'lucide-react'
import {useApp} from './store'
import {UNIS,DEPTS} from './data'
const Logo=()=><div className="logo dk"><GraduationCap color="#0a6c3b" size={32}/>Uni<b style={{color:'#0a6c3b'}}>Mart</b></div>
function Shell({children}){return <div className="auth"><div className="l"><Logo/><p className="muted">University Community Marketplace</p>
<h1>Same Campus.<br/><span className="g">Bigger Opportunities.</span></h1><p className="muted" style={{maxWidth:420}}>Buy, sell, and access services within your university community. A trusted marketplace for students and teachers.</p>
<div className="row" style={{gap:24,marginTop:20}}>{[[ShoppingCart,'Buy & Sell'],[Users,'Trusted Community'],[ShieldCheck,'Safe & Verified']].map(([I,t])=><div key={t} className="row"><I size={18} color="#0a6c3b"/><b style={{fontSize:13}}>{t}</b></div>)}</div></div>
<div className="r"><Link to="/" style={{position:'absolute',top:24,right:32}} className="muted">← Back to Home</Link>{children}</div></div>}
const Field=({icon:I,type='text',...p})=>{const [s,setS]=useState(false);const pw=type==='password';return <div className="f"><I size={18}/><input type={pw&&s?'text':type} {...p}/>{pw&&<span onClick={()=>setS(!s)} style={{cursor:'pointer'}}>{s?<EyeOff size={18}/>:<Eye size={18}/>}</span>}</div>}
export function Login(){const {users,setMe}=useApp();const nav=useNavigate();const [e,setE]=useState('');const [p,setP]=useState('');const [err,setErr]=useState('')
const go=ev=>{ev.preventDefault();const u=users.find(u=>u.email===e.trim().toLowerCase()&&u.password===p);if(!u)return setErr('Invalid email or password');setMe(u.email);nav('/')}
return <Shell><form className="form" onSubmit={go}><h2>Welcome to UniMart</h2><p className="ctr" style={{margin:'0 0 18px'}}>Log in to your account</p>
<div className="box gl" style={{textAlign:'center'}}><b>Student / Teacher</b><br/><small className="muted">Buy, sell and access services</small></div>
<Field icon={Mail} placeholder="Enter your university email" value={e} onChange={x=>setE(x.target.value)} required/><Field icon={Lock} type="password" placeholder="Enter your password" value={p} onChange={x=>setP(x.target.value)} required/>
{err&&<p className="err">{err}</p>}<div className="row sp" style={{marginBottom:14,fontSize:14}}><label><input type="checkbox"/> Remember me</label><a className="g" href="#">Forgot password?</a></div>
<button className="btn full">Log In <ArrowRight size={16}/></button><p className="ctr">Don’t have an account? <Link to="/signup">Sign Up</Link></p></form></Shell>}
export function Signup(){const {users,setUsers}=useApp();const nav=useNavigate();const [f,setF]=useState({role:'Student',name:'',email:'',uni:'',dept:'',desig:'',phone:'',password:'',c:'',ok:false});const [err,setErr]=useState('')
const s=k=>e=>setF({...f,[k]:e.target.value})
const go=ev=>{ev.preventDefault();const em=f.email.trim().toLowerCase()
if(!/\.edu(\.bd)?$/.test(em))return setErr('Please use your university email (.edu / .edu.bd)');if(users.some(u=>u.email===em))return setErr('This email is already registered')
if(f.password.length<6)return setErr('Password must be at least 6 characters');if(f.password!==f.c)return setErr('Passwords do not match');if(!f.ok)return setErr('Please accept the Terms & Conditions')
setUsers([...users,{role:f.role,name:f.name,email:em,uni:f.uni,dept:f.dept,desig:f.desig,phone:f.phone,password:f.password,bio:''}]);sessionStorage.setItem('um_pending',em);nav('/verified')}
return <Shell><form className="form" onSubmit={go}><h2>Create Your UniMart Account</h2><p className="ctr" style={{margin:'0 0 4px'}}>Join your university community marketplace</p>
<div className="role">{[['Student',GraduationCap,'Buy, sell and access services'],['Teacher',User,'Teach, support and share']].map(([r,I,d])=><label key={r} className={f.role===r?'on':''}><input type="radio" onChange={()=>setF({...f,role:r})}/><I size={22} color="#0a6c3b"/> <b>{r}</b><br/><small className="muted">{d}</small></label>)}</div>
<div className="two"><div><span className="lab">Full Name *</span><Field icon={User} placeholder="Enter your full name" value={f.name} onChange={s('name')} required/></div><div><span className="lab">University Email *</span><Field icon={Mail} type="email" placeholder="yourname@university.edu" value={f.email} onChange={s('email')} required/></div>
<div><span className="lab">University *</span><div className="f"><Building2 size={18}/><select value={f.uni} onChange={s('uni')} required><option value="">Select your university</option>{UNIS.map(u=><option key={u}>{u}</option>)}</select></div></div>
<div><span className="lab">Department *</span><div className="f"><BookOpen size={18}/><select value={f.dept} onChange={s('dept')} required><option value="">Select your department</option>{DEPTS.map(u=><option key={u}>{u}</option>)}</select></div></div>
{f.role==='Teacher'&&<div><span className="lab">Designation *</span><Field icon={Briefcase} placeholder="e.g. Lecturer" value={f.desig} onChange={s('desig')} required/></div>}
<div><span className="lab">Phone Number *</span><Field icon={Phone} placeholder="e.g. 01XXXXXXXXX" value={f.phone} onChange={s('phone')} required/></div>
<div><span className="lab">Password *</span><Field icon={Lock} type="password" placeholder="Create a password" value={f.password} onChange={s('password')} required/></div>
<div><span className="lab">Confirm Password *</span><Field icon={Lock} type="password" placeholder="Confirm your password" value={f.c} onChange={s('c')} required/></div></div>
<label style={{fontSize:14}}><input type="checkbox" checked={f.ok} onChange={e=>setF({...f,ok:e.target.checked})}/> I agree to the <span className="g">Terms & Conditions</span> and <span className="g">Privacy Policy</span></label>
{err&&<p className="err" style={{marginTop:10}}>{err}</p>}<button className="btn full" style={{marginTop:14}}>Create Account <ArrowRight size={16}/></button><p className="ctr">Already have an account? <Link to="/login">Log In</Link></p></form></Shell>}
export function Verified(){const {setMe}=useApp();const nav=useNavigate()
return <Shell><div className="form" style={{textAlign:'center'}}><div style={{width:100,height:100,borderRadius:'50%',background:'var(--gl)',display:'grid',placeItems:'center',margin:'0 auto 18px'}}><Check size={50} color="#0a6c3b"/></div>
<h2>Email Verified Successfully!</h2><p className="muted">Your UniMart account has been created and your email has been verified.</p><div className="box gl" style={{margin:'18px 0'}}>You’re now one step closer to your university community. Let’s get started!</div>
<button className="btn full" onClick={()=>{setMe(sessionStorage.getItem('um_pending'));nav('/')}}>Continue to UniMart <ArrowRight size={16}/></button></div></Shell>}
