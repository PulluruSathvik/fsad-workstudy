import { useEffect, useState } from "react";
import { getJobs, getStudentApps, applyJob, deleteAccount } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard(){

 const nav = useNavigate();
 const user = JSON.parse(localStorage.getItem("user"));

 const [jobs,setJobs] = useState([]);
 const [apps,setApps] = useState([]);
 const [files,setFiles] = useState({});   // <-- NEW

 useEffect(()=>{
  if(!user) nav("/login");
  load();
 },[]);

 const load = async()=>{
  setJobs(await getJobs());
  setApps(await getStudentApps(user.id));
 };

 const apply = async(id)=>{
  try{

    if(!files[id]){
      alert("Please upload resume first");
      return;
    }

    await applyJob(user.id,id,files[id]);

    alert("Applied Successfully");
    load();

  }catch{
    alert("Already applied or upload failed");
  }
 };

 const handleDelete = async()=>{
  if(!window.confirm("Are you sure? This deletes your account permanently.")) return;

  await deleteAccount(user.id);

  localStorage.removeItem("user");
  alert("Account deleted");
  nav("/login");
 };

 return(
 <div className="container">

  <h2>Student Dashboard</h2>

  <button 
    className="red"
    onClick={handleDelete}>
    Delete My Account
  </button>

  <h3>Available Jobs</h3>

  {jobs.map(j=>{

    const applied = apps.find(a=>a.job.id===j.id);

    return(
      <div key={j.id} className="card">

        <b>{j.title}</b>
        <p>{j.description}</p>

        {!applied && (
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e=>
              setFiles(prev=>({...prev,[j.id]:e.target.files[0]}))
            }
          />
        )}

        {applied ? (
          <span style={{color:"#22c55e"}}>
            Applied ({applied.status})
          </span>
        ) : (
          <button onClick={()=>apply(j.id)}>Apply</button>
        )}

      </div>
    );
  })}

  <h3>My Applications</h3>

  {apps.map(a=>(
   <div key={a.id} className="card">
    {a.job.title} → {a.status}
   </div>
  ))}

 </div>
 );
}
