import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import OpportunityCard from "../Components/OpportunityCard";
import ProfileSidebar from "../Components/ProfileSidebar";
import { OPPORTUNITIES } from "../data/Constants";

const Recommended = () => {
  const volunteer = useSelector((state) => state.volunteer);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = OPPORTUNITIES;
    if (filter !== "All") list = list.filter((o) => o.type === filter);
    if (volunteer.skills && volunteer.skills.length) {
      list = [...list].sort((a, b) => {
        const aMatch = a.skills.filter((s) => volunteer.skills.includes(s)).length;
        const bMatch = b.skills.filter((s) => volunteer.skills.includes(s)).length;
        return bMatch - aMatch;
      });
    }
    return list;
  }, [filter, volunteer.skills]);

  return (
    <div className="container" style={{ marginTop: "110px", maxWidth: "1200px" }}>
      <div className="row g-4 justify-content-center"> 
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
            <div>
              <h3 className="section-heading mb-0" style={{ fontWeight: "700" }}>Recommended Opportunities</h3>
              <p className="section-subtitle mb-0 text-muted">Curated based on your preferences.</p>
            </div>
            <div className="mt-3 mt-md-0">
              <select
                className="form-select shadow-sm"
                style={{ minWidth: 160, borderRadius: "10px" }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
          </div>

          {loading ? (
             <div className="row g-3">
               {Array.from({ length: 4 }).map((_, i) => (
                 <div className="col-md-6" key={i}>
                   <div className="lav-card skeleton-card"></div>
                 </div>
               ))}
             </div>
          ) : (
            <div className="row g-4">
              {filtered.map((opp) => (
                <div className="col-md-6" key={opp.id}>
                  <OpportunityCard opp={opp} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <ProfileSidebar volunteer={volunteer} />
        </div>
      </div>
    </div>
  );
};

export default Recommended;