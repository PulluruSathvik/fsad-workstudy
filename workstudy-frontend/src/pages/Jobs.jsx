import { useEffect, useState } from "react";
import { getJobs, applyJob } from "../services/api";

export default function Jobs() {

 const [jobs,setJobs]=useState([]);
 const user = JSON.parse(localStorage.getItem("user"));

 useEffect(()=>{
   getJobs().then(setJobs);
 },[]);

 const apply = async(id)=>{
   try{
     const job = jobs.find(j=>j.id===id);

     if(!job.file){
       alert("Please upload resume first");
       return;
     }

     await applyJob(user.id,id,job.file);
     alert("Applied Successfully");

   }catch{
     alert("Already applied or upload failed");
   }
 };

 return(
 <div className="container">

   <h2>Available Jobs</h2>

   <div className="grid">

   {jobs.map(j=>(
     <div key={j.id} className="card">

       <h3>{j.title}</h3>
       <p>{j.description}</p>

       <input 
         type="file"
         accept=".pdf,.doc,.docx"
         onChange={e=>j.file=e.target.files[0]}
       />

       <button onClick={()=>apply(j.id)}>Apply</button>

     </div>
   ))}

   </div>

 </div>
 );
}
