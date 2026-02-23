import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerStudent } from "../services/api";

export default function Register() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("student");

  const nav=useNavigate();

  const register = async () => {

    if(!name || !email || !password){
      alert("Fill all fields");
      return;
    }

    const res = await registerStudent({
      name,
      email,
      password,
      role
    });

    localStorage.setItem("user", JSON.stringify(res));

    if(res.role==="admin") nav("/admin");
    else nav("/student");
  };

  return (
    <div className="center">

      <div className="hero-card" style={{ width: 420 }}>

        {/* LOGO */}
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div className="logo-circle">💼</div>
          <h2>Create Account</h2>
          <small style={{ opacity:.6 }}>Join the work-study program</small>
        </div>

        {/* ROLE SELECT */}
        <div style={{ display:"flex", gap:10, marginBottom:15 }}>

          <button
            className={role==="student"?"role active":"role"}
            onClick={()=>setRole("student")}
          >
            🎓 Student
          </button>

          <button
            className={role==="admin"?"role active":"role"}
            onClick={()=>setRole("admin")}
          >
            🧑‍💼 Admin
          </button>

        </div>

        <label>Full Name</label>
        <input onChange={e=>setName(e.target.value)} />

        <label>Email</label>
        <input onChange={e=>setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" onChange={e=>setPassword(e.target.value)} />

        <button className="green-btn" onClick={register}>
          Create Account
        </button>

        <p style={{ textAlign:"center", marginTop:15 }}>
          Already registered? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}
