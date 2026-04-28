import React from "react";
import { computeBadges } from "../utils/badges";

const ProfileSidebar = ({ volunteer }) => {
  // استخراج الحروف الأولى للاسم
  const initials = (volunteer.userName || "V")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  
  // حساب الـ Badges بناءً على الساعات
  const badges = computeBadges(volunteer.hours || 0);

  return (
    /* استخدمنا main-preference-card عشان ياخد البرواز والظل اللي ظبطناه */
    <div className="main-preference-card p-4">
      
      {/* الـ Avatar - تم التعديل هنا ليدعم عرض الصورة المختارة */}
      <div className="text-center mb-3">
        {volunteer.profilePic ? (
          <img 
            src={volunteer.profilePic} 
            alt="Profile" 
            style={{ 
              width: "70px", 
              height: "70px", 
              objectFit: "cover", 
              borderRadius: "50%",
              boxShadow: "0 4px 12px rgba(139, 122, 214, 0.2)",
              border: "2px solid var(--color-lavender)"
            }} 
          />
        ) : (
          <div 
            className="avatar-circle mx-auto" 
            style={{
              width: "70px", 
              height: "70px", 
              fontSize: "24px",
              backgroundColor: "var(--color-lavender)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              boxShadow: "0 4px 12px rgba(139, 122, 214, 0.2)"
            }}
          >
            {initials}
          </div>
        )}
      </div>

      <h5 className="text-center fw-bold mb-1" style={{ color: "var(--color-text)" }}>
        {volunteer.userName || "Volunteer"}
      </h5>
      <p className="text-center mb-3" style={{ color: "#888", fontSize: "14px" }}>
        {volunteer.track || "Track not set"}
      </p>

      <hr style={{ borderColor: "rgba(139, 122, 214, 0.1)", margin: "20px 0" }} />

      {/* قسم المهارات - Skills */}
      <div className="mb-4">
        <div className="fw-bold mb-2" style={{ fontSize: "12px", color: "var(--color-lavender-dark)", letterSpacing: "1px" }}>
          SKILLS
        </div>
        <div className="d-flex flex-wrap gap-2">
          {volunteer.skills && volunteer.skills.length > 0 ? (
            volunteer.skills.map((s) => (
              <span 
                key={s} 
                className="badge" 
                style={{ 
                  backgroundColor: "#f3f0ff", 
                  color: "var(--color-lavender-dark)",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: "12px"
                }}
              >
                {s}
              </span>
            ))
          ) : (
            <small className="text-muted">No skills selected yet.</small>
          )}
        </div>
      </div>

      {/* قسم الـ Badges */}
      <div>
        <div className="fw-bold mb-2" style={{ fontSize: "12px", color: "var(--color-lavender-dark)", letterSpacing: "1px" }}>
          EARNED BADGES
        </div>
        <div className="d-flex flex-wrap gap-2">
          <span className={`badge-pill d-flex align-items-center gap-1 ${badges.bronze ? "badge-bronze" : "badge-locked"}`} 
                style={{ padding: "5px 10px", borderRadius: "20px", fontSize: "12px", border: "1px solid #eee" }}>
            <i className="bi bi-award-fill" style={{ color: badges.bronze ? "#cd7f32" : "#ccc" }} /> Bronze
          </span>
          
          <span className={`badge-pill d-flex align-items-center gap-1 ${badges.silver ? "badge-silver" : "badge-locked"}`}
                style={{ padding: "5px 10px", borderRadius: "20px", fontSize: "12px", border: "1px solid #eee" }}>
            <i className="bi bi-award-fill" style={{ color: badges.silver ? "#c0c0c0" : "#ccc" }} /> Silver
          </span>
          
          <span className={`badge-pill d-flex align-items-center gap-1 ${badges.gold ? "badge-gold" : "badge-locked"}`}
                style={{ padding: "5px 10px", borderRadius: "20px", fontSize: "12px", border: "1px solid #eee" }}>
            <i className="bi bi-trophy-fill" style={{ color: badges.gold ? "#ffd700" : "#ccc" }} /> Gold
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;