const BASE = "/api";

/* ================= REGISTER ================= */

export const registerStudent = async (data) => {
  const res = await fetch(`${BASE}/students/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Registration failed");

  return res.json();
};

/* ================= LOGIN ================= */

export const loginStudent = async (data) => {
  const res = await fetch(`${BASE}/students/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Invalid login");

  return res.json();
};

export const oauthLoginStudent = async (data) => {
  const res = await fetch(`${BASE}/students/oauth-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("OAuth login failed");

  return res.json();
};

export const verifyMfaStudent = async (data) => {
  const res = await fetch(`${BASE}/students/verify-mfa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Invalid MFA code");

  return res.json();
};

export const sendForgotPasswordOtp = async (data) => {
  const res = await fetch(`${BASE}/students/forgot-password-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Could not send OTP");

  return res.json();
};

export const resetPasswordWithOtp = async (data) => {
  const res = await fetch(`${BASE}/students/reset-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Could not verify OTP or reset password");

  return res.json();
};

export const uploadMasterResume = async (studentId, file) => {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/students/${studentId}/master-resume`, {
    method: "POST",
    body: form
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
};

/* ================= JOBS ================= */

export const getJobs = async () => {
  const res = await fetch(`${BASE}/jobs`);
  return res.json();
};

export const getRecommendedJobs = async (studentId) => {
  try {
    const res = await fetch(`${BASE}/jobs/recommendations/${studentId}`);
    if (!res.ok) throw new Error("Recommendations endpoint unavailable");
    return await res.json();
  } catch (err) {
    console.warn("Backend not yet restarted for AI features. Falling back to all jobs:", err);
    return getJobs();
  }
};

export const addJob = async (job) => {
  const res = await fetch(`${BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });

  if (!res.ok) throw new Error("Job creation failed");

  return res.json();
};

export const deleteJob = async(id)=>{
  const res = await fetch(`${BASE}/jobs/${id}`,{
    method:"DELETE"
  });

  if(!res.ok) throw new Error("Delete job failed");
};

/* ================= APPLICATIONS ================= */

export const applyJob = async (sid, jid, file) => {

  const form = new FormData();
  form.append("studentId", sid);
  form.append("jobId", jid);
  form.append("resume", file);

  const res = await fetch(`${BASE}/applications/apply`, {
    method:"POST",
    body: form
  });

  if (!res.ok) throw new Error("Apply failed");

  return res.json();
};

export const getApplications = async () => {
  const res = await fetch(`${BASE}/applications`);
  return res.json();
};

export const approveApp = async (id, status="APPROVED") => {
  const res = await fetch(
    `${BASE}/applications/${id}?status=${status}`,
    { method: "PUT" }
  );

  if (!res.ok) throw new Error("Approve failed");
};

export const getStudentApps = async (sid) => {
  const res = await fetch(`${BASE}/applications/student/${sid}`);
  return res.json();
};

/* ================= HOURS ================= */

export const addHours = async (sid, jid, hours) => {
  const res = await fetch(
    `${BASE}/hours?studentId=${sid}&jobId=${jid}&hours=${hours}`,
    { method: "POST" }
  );

  if (!res.ok) throw new Error("Add hours failed");

  return res.json();
};

export const getStudentHours = async (sid) => {
  const res = await fetch(`${BASE}/hours/student/${sid}`);
  return res.json();
};

export const getAllHours = async () => {
  const res = await fetch(`${BASE}/hours`);
  return res.json();
};

export const approveHours = async (id) => {
  const res = await fetch(`${BASE}/hours/${id}/approve`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to approve hours");
  return res.json();
};

export const payHours = async (id) => {
  const res = await fetch(`${BASE}/hours/${id}/pay`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to process payment");
  return res.json();
};

/* ================= DELETE ACCOUNT ================= */

export const deleteAccount = async(id)=>{
  const res = await fetch(`${BASE}/students/${id}`,{
    method:"DELETE"
  });

  if(!res.ok) throw new Error("Delete failed");
};

export const getStudents = async () => {
  const res = await fetch(`${BASE}/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};
