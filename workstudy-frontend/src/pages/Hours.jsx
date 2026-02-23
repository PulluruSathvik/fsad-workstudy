import { useEffect, useState } from "react";
import { getStudentApps, addHours, getStudentHours } from "../services/api";

export default function Hours(){

 const user = JSON.parse(localStorage.getItem("user"));

 const [apps,setApps] = useState([]);
 const [records,setRecords] = useState([]);
 const [hours,setHours] = useState("");
 const [jobId,setJobId] = useState("");

 useEffect(()=>{load()},[]);

 const load = async()=>{
   setApps(await getStudentApps(user.id));
   setRecords(await getStudentHours(user.id));
 };

 const handleAdd = async()=>{
   if(!hours || !jobId) return alert("Select job and hours");

   await addHours(user.id, jobId, hours);
   setHours("");
   load();
 };

 return(
 <div className="container">

  <h2>Work Hours</h2>

  <select onChange={e=>setJobId(e.target.value)}>
    <option value="">Select Approved Job</option>
    {apps.filter(a=>a.status==="APPROVED").map(a=>(
      <option key={a.id} value={a.job.id}>{a.job.title}</option>
    ))}
  </select>

  <input
    type="number"
    placeholder="Hours"
    value={hours}
    onChange={e=>setHours(e.target.value)}
  />

  <button onClick={handleAdd}>Add Hours</button>

  <h3>History</h3>

  {records.map(r=>(
    <div key={r.id} className="card">
      {r.job.title} → {r.hours} hours
    </div>
  ))}

 </div>
 );
}
