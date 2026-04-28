import React from "react";

const OpportunityCard = ({ opp, onApply }) => {
  return (
    <div className="opp-card">
      <div className="d-flex justify-content-between align-items-start mb-1">
        <div>
          <div className="opp-title">{opp.title}</div>
          <div className="opp-org">
            <i className="bi bi-building me-1" />
            {opp.org}
          </div>
        </div>
        
        {/* التعديل هنا: إضافة الأيقونة ومنع الكلمة من الانفصال */}
        <span 
          className="opp-tag d-flex align-items-center gap-1" 
          style={{ 
            background: "var(--lav-100)", 
            whiteSpace: "nowrap", // بيخلي Full Time كلمة واحدة
            borderRadius: "50px"  // عشان تبقا مدورة زي ما طلبتي
          }}
        >
          <i className="bi bi-briefcase" style={{ fontSize: '12px' }}></i>
          {opp.type}
        </span>
      </div>

      <div className="mb-2">
        {opp.skills.map((s) => (
          <span key={s} className="opp-tag" style={{ borderRadius: "50px" }}>{s}</span>
        ))}
      </div>

      <div className="opp-meta mb-3">
        <i className="bi bi-geo-alt me-1" />
        {opp.location}
      </div>

      <div className="mt-auto">
        <button className="btn-lav w-100" onClick={() => onApply(opp)}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;