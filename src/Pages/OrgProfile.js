import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OPPORTUNITIES, ORG_REQUIREMENT_QUESTIONS, ORG_CULTURE_QUESTIONS } from "../data/Constants";
import { updateOrganization } from "../redux/OrgSlice";
import { updateApplicationStatus } from "../redux/ApplicationsSlice";
import QuestionList from "../Components/QuestionList";

const OrgProfile = () => {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const user = useSelector((state) => state.user.user);
  const applications = useSelector((state) => state.applications.applications);

  const [showPostModal, setShowPostModal] = useState(false);
  const [newOpp, setNewOpp] = useState({ title: '', location: '', type: 'Part Time', requirements: {}, environment: {} });
  const [postedOpps, setPostedOpps] = useState([]);
  
  const fileInputRef = useRef(null);

  // Fallback data
  const orgName = organization.orgName || user?.name || "Your Organization";
  const industry = organization.industry || "General";
  const description = organization.description || "Empowering communities through technology and innovation.";
  const profilePic = organization.profilePic;

  // Filter opportunities for this org (from constants or local post)
  const activeOpportunities = [...postedOpps, ...OPPORTUNITIES.filter(o => o.org === orgName)];
  
  // Filter applications for this org
  const myApplicants = applications.filter(a => a.orgId === orgName);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateOrganization({ profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostOpp = () => {
    if(newOpp.title.trim()) {
      setPostedOpps([{ ...newOpp, id: Date.now() }, ...postedOpps]);
      setShowPostModal(false);
      setNewOpp({ title: '', location: '', type: 'Part Time', requirements: {}, environment: {} });
    }
  };

  const handleStatusUpdate = (appId, status) => {
    dispatch(updateApplicationStatus({ applicationId: appId, status }));
  };

  const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="page pb-5" style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "1000px", paddingTop: "100px" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="d-flex justify-content-between align-items-center mb-5"
        >
          <div>
            <h2 className="display-5 fw-bold text-dark mb-1">Organization Dashboard</h2>
            <p className="text-muted fs-5">Manage your profile, opportunities, and volunteer matches.</p>
          </div>
          <Link to="/org/preference" state={{ editMode: true }} className="btn btn-primary rounded-pill px-4 shadow-sm">
            <i className="bi bi-pencil-square me-2"></i> Edit Profile
          </Link>
        </motion.div>

        <div className="row g-4">
          <div className="col-lg-4">
            <motion.div 
              className="card border-0 shadow-sm rounded-4 p-4 h-100 position-relative"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-4">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  style={{ display: 'none' }} 
                  accept="image/*"
                />
                <div 
                  className="avatar-circle mx-auto mb-3 shadow position-relative" 
                  style={{ 
                    width: "120px", height: "120px", fontSize: "3rem", cursor: "pointer",
                    backgroundImage: profilePic ? `url(${profilePic})` : 'none',
                    backgroundSize: 'cover', backgroundPosition: 'center', color: profilePic ? 'transparent' : 'inherit'
                  }}
                  onClick={() => fileInputRef.current.click()}
                  title="Click to change profile picture"
                >
                  {!profilePic && orgName.charAt(0)}
                  <div className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", border: "2px solid white" }}>
                    <i className="bi bi-camera-fill" style={{ fontSize: "14px", color: "white" }}></i>
                  </div>
                </div>
                <h4 className="fw-bold text-dark">{orgName}</h4>
                <span className="badge bg-lavender text-lavender-dark rounded-pill px-3 py-2 mt-2">
                  <i className="bi bi-building me-1"></i> {industry}
                </span>
              </div>
              
              <hr className="opacity-10 my-4" />
              
              <div className="mb-4">
                <h6 className="fw-bold text-secondary text-uppercase tracking-wider mb-3">About Us</h6>
                <p className="text-muted small lh-lg">{description}</p>
              </div>

              <div>
                <h6 className="fw-bold text-secondary text-uppercase tracking-wider mb-3">Required Tech Stack</h6>
                <div className="d-flex flex-wrap gap-2">
                  {organization.requiredSkills?.length > 0 ? (
                    organization.requiredSkills.map(skill => (
                      <span key={skill} className="badge bg-light text-dark border px-2 py-1">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted small">No specific skills listed.</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-8">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Stats Row */}
              <motion.div variants={fadeUp} className="row g-3">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-gradient-primary text-white" style={{ background: "linear-gradient(135deg, var(--color-lavender), var(--color-lavender-dark))" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-1 text-white-50 fw-bold text-uppercase">Active Opportunities</p>
                        <h2 className="display-4 fw-bold mb-0">{activeOpportunities.length}</h2>
                      </div>
                      <i className="bi bi-briefcase fs-1 text-white-50 icon-float"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-1 text-muted fw-bold text-uppercase">Total Applicants</p>
                        <h2 className="display-4 fw-bold text-dark mb-0">{myApplicants.length}</h2>
                      </div>
                      <i className="bi bi-people fs-1 text-lavender icon-pulse"></i>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Assessment Summary Section (NEW) */}
              <motion.div variants={fadeUp} className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Setup Progress & Culture</h5>
                  <span className="badge bg-primary rounded-pill px-3">Matching Readiness</span>
                </div>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="p-3 rounded-4 bg-light border">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small fw-bold text-secondary">Work Culture</span>
                        <span className="small fw-bold">
                          {Object.keys(organization.environment || {}).length}/{ORG_CULTURE_QUESTIONS.length}
                        </span>
                      </div>
                      <div className="progress mb-2" style={{ height: "6px" }}>
                        <div 
                          className="progress-bar bg-primary" 
                          style={{ width: `${(Object.keys(organization.environment || {}).length / ORG_CULTURE_QUESTIONS.length) * 100}%` }}
                        ></div>
                      </div>
                      <p className="small text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                        Helps match volunteer personalities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="p-3 rounded-4 bg-light border">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small fw-bold text-secondary">Gen. Requirements</span>
                        <span className="small fw-bold">
                          {Object.keys(organization.requirements || {}).length}/3+
                        </span>
                      </div>
                      <div className="progress mb-2" style={{ height: "6px" }}>
                        <div 
                          className="progress-bar bg-info" 
                          style={{ width: `${Math.min(100, (Object.keys(organization.requirements || {}).length / 3) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="small text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                        Essential for technical matching.
                      </p>
                    </div>
                  </div>
                </div>

                { (Object.keys(organization.environment || {}).length < ORG_CULTURE_QUESTIONS.length || 
                   Object.keys(organization.requirements || {}).length < 3) && (
                  <div className="mt-3">
                    <Link to="/org/preference" state={{ editMode: true }} className="btn btn-sm btn-lav-outline w-100 rounded-pill">
                      Complete Setup for Better Matching
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Applicants Dashboard Section (NEW) */}
              <motion.div variants={fadeUp} className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Applicants Dashboard</h5>
                  <span className="badge bg-light text-muted border px-3">Review Candidates</span>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-hover align-middle border-0">
                    <thead>
                      <tr className="text-muted small text-uppercase">
                        <th className="border-0 px-0">Volunteer</th>
                        <th className="border-0">Opportunity</th>
                        <th className="border-0">Status</th>
                        <th className="border-0 text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myApplicants.length > 0 ? (
                        myApplicants.map((app) => (
                          <tr key={app.id}>
                            <td className="px-0 py-3">
                              <div className="d-flex align-items-center gap-2">
                                <div className="avatar-circle-sm" style={{ width: "32px", height: "32px", fontSize: "0.8rem" }}>{app.volunteerName.charAt(0)}</div>
                                <span className="fw-medium">{app.volunteerName}</span>
                              </div>
                            </td>
                            <td><span className="small text-muted">{app.opportunityTitle}</span></td>
                            <td>
                              <span className={`badge rounded-pill px-3 ${app.status === 'accepted' ? 'bg-success-subtle text-success' : app.status === 'rejected' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'}`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="text-end px-0">
                              {app.status === 'pending' ? (
                                <div className="d-flex gap-2 justify-content-end">
                                  <button 
                                    className="btn btn-sm btn-success rounded-pill px-3" 
                                    onClick={() => handleStatusUpdate(app.id, 'accepted')}
                                  >
                                    Accept
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-outline-danger rounded-pill px-3" 
                                    onClick={() => handleStatusUpdate(app.id, 'rejected')}
                                  >
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <span className="text-muted small">Processed</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-muted small">No applications received yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Active Opportunities List */}
              <motion.div variants={fadeUp} className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Your Active Opportunities</h5>
                  <button className="btn btn-sm btn-outline-primary rounded-pill" onClick={() => setShowPostModal(true)}>
                    <i className="bi bi-plus-lg me-1"></i> Post New
                  </button>
                </div>
                
                <div className="list-group list-group-flush">
                  {activeOpportunities.map((op) => (
                    <motion.div 
                      key={op.id}
                      whileHover={{ scale: 1.01, backgroundColor: "var(--color-lavender-bg)" }}
                      className="list-group-item px-0 py-3 border-bottom-0 rounded-3 mb-2 px-3 transition-all"
                      style={{ border: "1px solid var(--color-border-strong)" }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold text-dark mb-1">{op.title}</h6>
                          <div className="text-muted small d-flex align-items-center gap-3">
                            <span><i className="bi bi-geo-alt me-1"></i> {op.location || 'Remote'}</span>
                            <span><i className="bi bi-clock me-1"></i> {op.type}</span>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-lav-outline rounded-pill px-3">
                          View Matches
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Post Opportunity Modal */}
        <AnimatePresence>
          {showPostModal && (
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
              <motion.div 
                className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="modal-content rounded-4 border-0 shadow-lg">
                  <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title fw-bold text-dark">Post New Opportunity</h5>
                    <button type="button" className="btn-close" onClick={() => setShowPostModal(false)}></button>
                  </div>
                  <div className="modal-body px-4">
                    <div className="row g-3 mb-4">
                      <div className="col-md-12">
                        <label className="form-label fw-semibold">Opportunity Title</label>
                        <input type="text" className="form-control" value={newOpp.title} onChange={(e) => setNewOpp({...newOpp, title: e.target.value})} placeholder="e.g. Frontend Developer Volunteer" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Location</label>
                        <input type="text" className="form-control" value={newOpp.location} onChange={(e) => setNewOpp({...newOpp, location: e.target.value})} placeholder="e.g. Cairo or Remote" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Type</label>
                        <select className="form-select" value={newOpp.type} onChange={(e) => setNewOpp({...newOpp, type: e.target.value})}>
                          <option>Part Time</option>
                          <option>Full Time</option>
                          <option>Project Based</option>
                        </select>
                      </div>
                    </div>

                    <h6 className="fw-bold text-primary mb-3">Opportunity specific matching:</h6>
                    <p className="text-muted small">Help us match the right volunteer for THIS specific task.</p>
                    
                    <div className="mb-4">
                      <h6 className="fw-bold text-dark">Requirements</h6>
                      <QuestionList
                        questions={ORG_REQUIREMENT_QUESTIONS.slice(0, 3)}
                        answers={newOpp.requirements}
                        onChange={(id, val) => setNewOpp({ ...newOpp, requirements: { ...newOpp.requirements, [id]: val } })}
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-0 pt-0">
                    <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowPostModal(false)}>Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill px-4" onClick={handlePostOpp} disabled={!newOpp.title}>Post Opportunity</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default OrgProfile;
