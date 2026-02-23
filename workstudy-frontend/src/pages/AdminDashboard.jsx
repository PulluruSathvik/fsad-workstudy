import { useEffect, useState } from "react";
import {
  getApplications,
  approveApp,
  addJob,
  getJobs,
  deleteJob,
  getAllHours
} from "../services/api";

export default function AdminDashboard(){

 const [apps,setApps]=useState([]);
 const [jobs,setJobs]=useState([]);
 const [hours,setHours]=useState([]);
 const [title,setTitle]=useState("");
 const [desc,setDesc]=useState("");
 const [tab,setTab]=useState("jobs");

 useEffect(()=>{ load(); },[]);

 const load = async()=>{
   setApps(await getApplications());
   setJobs(await getJobs());
   setHours(await getAllHours());
 };

 const approve = async(id,status)=>{
  await approveApp(id,status);
  load();
 };

 const createJob = async()=>{
  if(!title||!desc) return alert("Fill fields");
  await addJob({title,description:desc});
  setTitle(""); setDesc("");
  load();
 };

 const removeJob = async(id)=>{
   if(window.confirm("Delete job?")){
     await deleteJob(id);
     load();
   }
 };

 const totalHours = hours.reduce((s,h)=>s+h.hours,0);

 return(
 <div className="admin-page">

<header className="admin-header">
<h2>Admin Dashboard</h2>
</header>

{/* STATS */}
<div className="stats">
<div className="stat">Total Jobs <b>{jobs.length}</b></div>
<div className="stat">Applications <b>{apps.length}</b></div>
<div className="stat">Work Hours <b>{totalHours}</b></div>
</div>

{/* TABS */}
<div className="tabs">
<button onClick={()=>setTab("jobs")} className={tab==="jobs"?"active":""}>Jobs</button>
<button onClick={()=>setTab("apps")} className={tab==="apps"?"active":""}>Applications</button>
<button onClick={()=>setTab("hours")} className={tab==="hours"?"active":""}>Hours</button>
</div>

{/* JOBS */}
{tab==="jobs" && (
<>
<div className="create-job">
<input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
<input placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)}/>
<button onClick={createJob}>Create Job</button>
</div>

{jobs.map(j=>(
<div className="job-card" key={j.id}>
<b>{j.title}</b>
<p>{j.description}</p>
<button className="danger" onClick={()=>removeJob(j.id)}>Delete</button>
</div>
))}
</>
)}

{/* APPLICATIONS */}
{tab==="apps" && apps.map(a=>(
<div className="job-card" key={a.id}>
<b>{a.student.name}</b> → {a.job.title}
<p>Status: {a.status}</p>

<a target="_blank" rel="noreferrer"
href={`http://localhost:8080/api/applications/resume/${a.id}`}>
View Resume
</a>

{a.status==="PENDING" && (
<div>
<button onClick={()=>approve(a.id,"APPROVED")}>Approve</button>
<button className="danger" onClick={()=>approve(a.id,"REJECTED")}>Reject</button>
</div>
)}
</div>
))}

{/* HOURS */}
{tab==="hours" && hours.map(h=>(
<div className="job-card" key={h.id}>
{h.student.name} → {h.job?.title} → {h.hours} hrs
</div>
))}

</div>
 );
}
