import {useState} from 'react'
import {Routes,Route,Navigate,NavLink,Link,Outlet,useNavigate} from 'react-router-dom'
import {GraduationCap,Search,Bell,ChevronDown,Home as H,LayoutGrid,FileText,MessageSquare,Heart,Users,BookOpen,Send,Settings as S,HelpCircle,Plus} from 'lucide-react'
import {useApp} from './store'
import {Login,Signup,Verified} from './Auth'
import {Home,Browse,Listing,Saved,Graduating,Settings,Post,Soon} from './Pages'
const NAV=[['/',H,'Home'],['/browse',LayoutGrid,'Browse'],['/my-listings',FileText,'My Listings'],['/messages',MessageSquare,'Messages'],['/saved',Heart,'Saved'],['/services',Users,'Services'],['/guides',BookOpen,'Guides'],['/graduating',Send,'Graduating Sale'],null,['/settings',S,'Settings'],['/help',HelpCircle,'Help & Support']]
function Layout(){const {user,setMe}=useApp();const nav=useNavigate();const [q,setQ]=useState('')
if(!user)return <Navigate to="/login" replace/>
return <><header className="top"><Link to="/" className="logo"><GraduationCap color="#2fd08a" size={30}/>Uni<b>Mart</b></Link>
<form className="search" onSubmit={e=>{e.preventDefault();nav('/browse?q='+encodeURIComponent(q))}}><Search size={18}/><input placeholder="Search for books, laptops, services, and more..." value={q} onChange={e=>setQ(e.target.value)}/></form>
<span className="pill">{user.uni} <ChevronDown size={14}/></span><Bell size={20}/><div className="me" onClick={()=>nav('/settings')}><div className="av">{user.name[0]}</div><div><b>{user.name}</b><br/><small>{user.role}</small></div></div>
<Link to="/post" className="btn hi"><Plus size={16}/> Post Listing</Link></header>
<div className="shell"><nav className="side">{NAV.map((n,i)=>n?<NavLink key={n[0]} to={n[0]} end={n[0]==='/'} className={({isActive})=>isActive?'active':''}>{(()=>{const I=n[1];return <I size={19}/>})()}{n[2]}</NavLink>:<hr key={i}/>)}<div className="quote">A Stronger University Community Together</div></nav><main className="main"><Outlet/></main></div></>}
export default function App(){return <Routes><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/verified" element={<Verified/>}/>
<Route element={<Layout/>}><Route index element={<Home/>}/><Route path="browse" element={<Browse/>}/><Route path="my-listings" element={<Browse mine/>}/><Route path="services" element={<Navigate to="/browse?cat=Services" replace/>}/>
<Route path="listing/:id" element={<Listing/>}/><Route path="saved" element={<Saved/>}/><Route path="graduating" element={<Graduating/>}/><Route path="settings" element={<Settings/>}/><Route path="post" element={<Post/>}/>
<Route path="messages" element={<Soon t="Messages"/>}/><Route path="guides" element={<Soon t="Guides"/>}/><Route path="help" element={<Soon t="Help & Support"/>}/></Route></Routes>}
