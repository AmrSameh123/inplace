import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { applyOpportunity, removeOpportunity } from "../redux/VolunteerSlice";
import { addApplication } from "../redux/ApplicationsSlice";

const OpportunityCard = ({ opp }) => {
  const dispatch = useDispatch();
  const volunteer = useSelector((state) => state.volunteer);
  const isApplied = volunteer.appliedOpportunities?.some(a => a.id === opp.id);

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleApply = () => {
    if (!user) {
      navigate("/register");
      return;
    }
    
    if (isApplied) {
      dispatch(removeOpportunity(opp.id));
    } else {
      dispatch(applyOpportunity(opp));
      dispatch(addApplication({
        volunteerId: user.name || "v-1",
        volunteerName: user.name || "Volunteer",
        opportunityId: opp.id,
        opportunityTitle: opp.title,
        orgId: opp.org,
        status: 'pending'
      }));
    }
  };
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
        <button 
          className={`w-100 ${isApplied ? 'btn-outline-danger' : 'btn-lav'}`} 
          style={{ 
            borderRadius: "12px", 
            padding: "10px", 
            border: isApplied ? "1px solid #dc3545" : "none",
            backgroundColor: isApplied ? "transparent" : "var(--color-lavender)",
            color: isApplied ? "#dc3545" : "white",
            transition: "all 0.3s ease"
          }}
          onClick={handleApply}
        >
          {isApplied ? 'Unapply' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;