import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { computeBadges } from "../utils/badges";

const Profile = () => {
  const navigate = useNavigate(); 
  const volunteer = useSelector((state) => state.volunteer);

  const badges = computeBadges(volunteer.hours || 0);
  
  // استخراج أول حرف من الاسم عشان نستخدمه كـ Avatar
  const initials = (volunteer.userName || "V")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="container py-4 py-md-5" style={{ maxWidth: 1000, marginTop: "100px" }}>
      <div className="row g-4">
        
        {/* 1. Header Card (Top Section) */}
        <div className="col-12">
          <div className="lav-card d-flex align-items-center p-4 shadow-sm" style={{ borderRadius: "20px" }}>
            
            {/* دائرة الصورة (Avatar) - تم التعديل هنا لتدعم عرض الصورة الحقيقية */}
            <div className="me-4 shadow-sm" style={{ flexShrink: 0 }}>
              {volunteer.profilePic ? (
                <img 
                  src={volunteer.profilePic} 
                  alt="Profile" 
                  style={{ 
                    width: "100px", 
                    height: "100px", 
                    objectFit: "cover", 
                    borderRadius: "50%",
                    border: "3px solid var(--color-lavender)"
                  }} 
                />
              ) : (
                <div className="avatar-circle" 
                     style={{ 
                        width: "100px", 
                        height: "100px", 
                        fontSize: "2.2rem", 
                        backgroundColor: "var(--color-lavender)", 
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        fontWeight: "bold"
                     }}>
                  {initials}
                </div>
              )}
            </div>

            {/* بيانات المستخدم الأساسية */}
            <div>
              <h1 className="fw-bold mb-1" style={{ color: "var(--color-text)", fontSize: "2.2rem" }}>
                {volunteer.userName || "Kenzy"}
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "1.1rem" }}>
                <i className="bi bi-gender-ambiguous me-2" />
                {volunteer.gender || "Female"}
              </p>
            </div>

            {/* أزرار التعديل على اليمين */}
            <div className="ms-auto d-flex flex-column gap-2" style={{ minWidth: "200px" }}>
              <button 
                className="btn-lav w-100 py-2"
                style={{ borderRadius: "12px", fontSize: "0.95rem" }}
                onClick={() => navigate("/edit-profile")}
              >
                <i className="bi bi-person-gear me-2" />
                Edit Profile
              </button>

              <button 
                className="btn-lav-outline w-100 py-2"
                style={{ borderRadius: "12px", fontSize: "0.95rem" }}
                onClick={() => navigate("/Volunteer/preference", { state: { editMode: true } })}
              >
                <i className="bi bi-pencil-square me-2" />
                Update Preferences
              </button>
            </div>
          </div>
        </div>

        {/* 2. Professional Info (Middle Section) */}
        <div className="col-md-7">
          <div className="lav-card h-100 p-4">
            <h5 className="section-heading mb-4">
              <i className="bi bi-code-slash me-2 text-primary" /> Programming
            </h5>
            <div className="mb-4">
              <label className="text-muted small text-uppercase fw-bold mb-2 d-block">Track</label>
              <h6 className="fw-bold">{volunteer.track || "Frontend"}</h6>
            </div>
            <div>
              <label className="text-muted small text-uppercase fw-bold mb-2 d-block">Skills</label>
              <div className="d-flex flex-wrap gap-2">
                {volunteer.skills && volunteer.skills.length > 0 ? (
                  volunteer.skills.map((skill, index) => (
                    <span key={index} className="skill-chip border-0" style={{ backgroundColor: "#f0eeff", color: "#6b6785" }}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-muted small">No skills added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Experience Card */}
        <div className="col-md-5">
          <div className="lav-card h-100 p-4">
            <h5 className="section-heading mb-4">
              <i className="bi bi-briefcase me-2 text-primary" /> Experience
            </h5>
            <label className="text-muted small text-uppercase fw-bold mb-2 d-block">Years of Experience</label>
            <div className="d-flex align-items-baseline">
              <h2 className="fw-bold text-primary mb-0">{volunteer.experienceYears || 0}</h2>
              <span className="ms-2 text-muted fw-bold">yrs</span>
            </div>
          </div>
        </div>

        {/* 4. Rewards Section (Bottom Section) */}
        <div className="col-12">
          <div className="lav-card p-4">
            <h5 className="section-heading mb-2">
              <i className="bi bi-trophy me-2 text-warning" /> Rewards
            </h5>
            <p className="text-muted small mb-4">You've contributed <strong>{volunteer.hours || 42} hours</strong> so far.</p>
            
            <div className="row g-3">
              {/* Bronze Badge */}
              <div className="col-md-4">
                <div className={`reward-badge-card text-center p-3 ${volunteer.hours >= 10 ? 'earned' : 'locked'}`} 
                     style={{ border: "1px solid #f0f0f0", borderRadius: "15px", backgroundColor: "#fff" }}>
                  <div className="badge-icon bronze mb-2">
                     <i className="bi bi-patch-check-fill fs-3" style={{ color: "#cd7f32" }} />
                  </div>
                  <h6 className="mb-1 fw-bold">Bronze</h6>
                  <p className="small text-muted mb-1">10+ hours</p>
                  <span className={`badge ${volunteer.hours >= 10 ? 'bg-success-subtle text-success' : 'bg-light text-muted'}`}>
                    {volunteer.hours >= 10 ? 'Earned' : 'Locked'}
                  </span>
                </div>
              </div>

              {/* Silver Badge */}
              <div className="col-md-4">
                <div className={`reward-badge-card text-center p-3 ${volunteer.hours >= 30 ? 'earned' : 'locked'}`}
                     style={{ border: "1px solid #f0f0f0", borderRadius: "15px", backgroundColor: "#fff" }}>
                  <div className="badge-icon silver mb-2">
                     <i className="bi bi-patch-check-fill fs-3" style={{ color: "#c0c0c0" }} />
                  </div>
                  <h6 className="mb-1 fw-bold">Silver</h6>
                  <p className="small text-muted mb-1">30+ hours</p>
                  <span className={`badge ${volunteer.hours >= 30 ? 'bg-success-subtle text-success' : 'bg-light text-muted'}`}>
                    {volunteer.hours >= 30 ? 'Earned' : 'Locked'}
                  </span>
                </div>
              </div>

              {/* Gold Badge */}
              <div className="col-md-4">
                <div className={`reward-badge-card text-center p-3 ${volunteer.hours >= 60 ? 'earned' : 'locked'}`}
                     style={{ border: "1px solid #f0f0f0", borderRadius: "15px", backgroundColor: "#fff" }}>
                  <div className="badge-icon gold mb-2">
                     <i className="bi bi-patch-check-fill fs-3" style={{ color: "#ffd700" }} />
                  </div>
                  <h6 className="mb-1 fw-bold">Gold</h6>
                  <p className="small text-muted mb-1">60+ hours</p>
                  <span className={`badge ${volunteer.hours >= 60 ? 'bg-success-subtle text-success' : 'bg-light text-muted'}`}>
                    {volunteer.hours >= 60 ? 'Earned' : 'Locked'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;