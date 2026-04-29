import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { computeBadges } from "../utils/badges";
import { updateVolunteer, removeOpportunity, applyOpportunity } from "../redux/VolunteerSlice";
import { OPPORTUNITIES, SOFT_SKILL_QUESTIONS, PERSONALITY_QUESTIONS } from "../data/Constants";

const Profile = () => {
  const navigate = useNavigate(); 
  const volunteer = useSelector((state) => state.volunteer);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);


  
  // استخراج أول حرف من الاسم عشان نستخدمه كـ Avatar
  const initials = (volunteer.userName || user?.name || "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateVolunteer({ profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container py-4 py-md-5" style={{ maxWidth: 1000, marginTop: "100px" }}>
      <div className="row g-4">
        
        {/* 1. Header Card (Top Section) */}
        <div className="col-12">
          <div className="lav-card d-flex align-items-center p-4 shadow-sm" style={{ borderRadius: "20px" }}>
            
            {/* دائرة الصورة (Avatar) - تم التعديل هنا لتدعم عرض الصورة الحقيقية ورفع صورة جديدة */}
            <div className="me-4 shadow-sm position-relative" style={{ flexShrink: 0, cursor: "pointer" }} onClick={() => fileInputRef.current?.click()} title="Click to change profile picture">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
                accept="image/*"
              />
              {volunteer.profilePic ? (
                <div style={{ position: "relative", width: "100px", height: "100px" }}>
                  <img 
                    src={volunteer.profilePic} 
                    alt="Profile" 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      borderRadius: "50%",
                      border: "3px solid var(--color-lavender)"
                    }} 
                  />
                  <div className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px", border: "2px solid white" }}>
                    <i className="bi bi-camera-fill" style={{ fontSize: "12px", color: "white" }}></i>
                  </div>
                </div>
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
                  <div className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px", border: "2px solid white" }}>
                    <i className="bi bi-camera-fill" style={{ fontSize: "12px", color: "white" }}></i>
                  </div>
                </div>
              )}
            </div>

            {/* بيانات المستخدم الأساسية */}
            <div>
              <h1 className="fw-bold mb-1" style={{ color: "var(--color-text)", fontSize: "2.2rem" }}>
                {volunteer.userName || user?.name || "User"}
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
                onClick={() => navigate("/volunteer/preference", { state: { editMode: true } })}
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

        {/* 5. Assessment Summary (New) */}
        <div className="col-12 mt-4">
          <div className="lav-card p-4">
            <h5 className="section-heading mb-4">
              <i className="bi bi-bar-chart-line me-2 text-primary" /> Assessment Summary
            </h5>
            
            <div className="row g-4">
              {/* Soft Skills Progress */}
              <div className="col-md-6">
                <div className="p-3 rounded-4 border bg-white shadow-sm h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-bold mb-0">Soft Skills Assessment</h6>
                    <span className="badge bg-lavender text-lavender-dark rounded-pill px-3">
                      {Object.keys(volunteer.softSkills || {}).length} / {SOFT_SKILL_QUESTIONS.length}
                    </span>
                  </div>
                  <div className="progress mb-3" style={{ height: "10px", borderRadius: "10px" }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ 
                        width: `${(Object.keys(volunteer.softSkills || {}).length / SOFT_SKILL_QUESTIONS.length) * 100}%`,
                        backgroundColor: "var(--color-lavender)"
                      }} 
                    ></div>
                  </div>
                  {Object.keys(volunteer.softSkills || {}).length < SOFT_SKILL_QUESTIONS.length ? (
                    <p className="text-muted small mb-0">
                      <i className="bi bi-exclamation-circle me-1 text-warning" />
                      Missing {SOFT_SKILL_QUESTIONS.length - Object.keys(volunteer.softSkills || {}).length} answers.
                    </p>
                  ) : (
                    <p className="text-success small mb-0">
                      <i className="bi bi-check-circle-fill me-1" />
                      All soft skills questions answered!
                    </p>
                  )}
                </div>
              </div>

              {/* Personality Progress */}
              <div className="col-md-6">
                <div className="p-3 rounded-4 border bg-white shadow-sm h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-bold mb-0">Personality Assessment</h6>
                    <span className="badge bg-lavender text-lavender-dark rounded-pill px-3">
                      {Object.keys(volunteer.personality || {}).length} / {PERSONALITY_QUESTIONS.length}
                    </span>
                  </div>
                  <div className="progress mb-3" style={{ height: "10px", borderRadius: "10px" }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ 
                        width: `${(Object.keys(volunteer.personality || {}).length / PERSONALITY_QUESTIONS.length) * 100}%`,
                        backgroundColor: "var(--color-lavender-dark)"
                      }} 
                    ></div>
                  </div>
                  {Object.keys(volunteer.personality || {}).length < PERSONALITY_QUESTIONS.length ? (
                    <p className="text-muted small mb-0">
                      <i className="bi bi-exclamation-circle me-1 text-warning" />
                      Missing {PERSONALITY_QUESTIONS.length - Object.keys(volunteer.personality || {}).length} answers.
                    </p>
                  ) : (
                    <p className="text-success small mb-0">
                      <i className="bi bi-check-circle-fill me-1" />
                      All personality questions answered!
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {(Object.keys(volunteer.softSkills || {}).length < SOFT_SKILL_QUESTIONS.length || 
              Object.keys(volunteer.personality || {}).length < PERSONALITY_QUESTIONS.length) && (
              <div className="mt-4 text-center">
                <button 
                  className="btn btn-lav rounded-pill px-4"
                  onClick={() => navigate("/volunteer/preference", { state: { editMode: true } })}
                >
                  Complete Your Assessment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 6. Applied Opportunities Section (New) */}
        <div className="col-12 mt-4">
          <div className="lav-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="section-heading mb-0">
                <i className="bi bi-file-earmark-check me-2 text-primary" /> Applied Opportunities
              </h5>
              <span className="badge bg-primary rounded-pill px-3">
                {volunteer.appliedOpportunities?.length || 0} Total
              </span>
            </div>

            {volunteer.appliedOpportunities && volunteer.appliedOpportunities.length > 0 ? (
              <div className="row g-3">
                {volunteer.appliedOpportunities.map((op) => (
                  <div key={op.id} className="col-md-6">
                    <div className="p-3 rounded-4 border shadow-sm h-100 d-flex justify-content-between align-items-center bg-white hover-up transition-all">
                      <div>
                        <h6 className="fw-bold mb-1 text-dark">{op.title}</h6>
                        <p className="text-muted small mb-0">
                          <i className="bi bi-building me-1"></i> {op.org} • {op.type}
                        </p>
                      </div>
                      <button 
                        className="btn btn-outline-danger btn-sm rounded-circle shadow-sm" 
                        style={{ width: "32px", height: "32px", padding: 0 }}
                        onClick={() => dispatch(removeOpportunity(op.id))}
                        title="Remove Application"
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 rounded-4 bg-light">
                <i className="bi bi-search fs-1 text-muted opacity-25 mb-3 d-block"></i>
                <p className="text-muted mb-3">You haven&apos;t applied to any opportunities yet.</p>
                <button 
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => navigate("/Opportunities")}
                >
                  Explore Opportunities
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;