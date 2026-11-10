import {useState,useEffect,createContext,useContext} from 'react'
import {SEED} from './data'
const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
export function useLS(k,d){const [v,s]=useState(()=>get(k,d));useEffect(()=>localStorage.setItem(k,JSON.stringify(v)),[k,v]);return [v,s]}
const Ctx=createContext()
export const useApp=()=>useContext(Ctx)
const DEMO={role:'Student',name:'Siam',email:'siam@student.baust.edu.bd',password:'siam1234',uni:'BAUST',dept:'Computer Science and Engineering',phone:'',bio:'CSE student at BAUST.'}
export function Provider({children}){
  const [users,setUsers]=useLS('um_users_v2',[DEMO])
  const [me,setMe]=useLS('um_me_v2',null)
  const [listings,setListings]=useLS('um_listings',SEED)
  const [saved,setSaved]=useLS('um_saved',[1,2,3,4,5,6])
  const user=users.find(u=>u.email===me)||null
  const toggleSave=id=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])
  const updateUser=p=>setUsers(us=>us.map(u=>u.email===me?{...u,...p}:u))
  return <Ctx.Provider value={{users,setUsers,me,setMe,user,updateUser,listings,setListings,saved,toggleSave}}>{children}</Ctx.Provider>
}
