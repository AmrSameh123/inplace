import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { addTip, toggleLikeTip, addOpportunityComment, editOpportunityComment } from "../redux/CommunitySlice";
import { OPPORTUNITIES } from "../data/Constants";
import Logo from "../Components/Logo/Logo";

const Community = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tips, opportunityComments } = useSelector((state) => state.community);
  const user = useSelector((state) => state.user.user);
  
  const [activeTrack, setActiveTrack] = useState("frontend");
  const [newTip, setNewTip] = useState("");
  const [tipTrack, setTipTrack] = useState("frontend");
  
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const trackOpportunities = OPPORTUNITIES.filter(o => o.track === activeTrack);
  const [selectedOppId, setSelectedOppId] = useState("");

  useEffect(() => {
    if (trackOpportunities.length > 0) {
      setSelectedOppId(trackOpportunities[0].id);
    }
  }, [activeTrack]);

  const filteredTips = tips.filter(t => t.track === activeTrack);
  const currentOppComments = opportunityComments.filter(c => c.opportunityId === Number(selectedOppId));

  const handlePostTip = (e) => {
    e.preventDefault();
    if (!user) return navigate("/register");
    if (newTip.trim()) {
      dispatch(addTip({
        author: user?.name || "Volunteer",
        track: tipTrack,
        text: newTip
      }));
      setNewTip("");
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!user) return navigate("/register");
    if (newComment.trim()) {
      const opp = OPPORTUNITIES.find(o => o.id === Number(selectedOppId));
      dispatch(addOpportunityComment({
        opportunityId: Number(selectedOppId),
        opportunityTitle: opp?.title || "Opportunity",
        author: user?.name || "Volunteer",
        text: newComment
      }));
      setNewComment("");
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch(editOpportunityComment({ commentId: editingCommentId, newText: editText }));
      setEditingCommentId(null);
    }
  };

  const handleLike = (tipId) => {
    if (!user) return navigate("/register");
    dispatch(toggleLikeTip({ tipId, userId: user.name || "user-1" }));
  };

  const mockUsers = [
    { name: "Ahmed", role: "Volunteer", color: "#6366f1" },
    { name: "Sara", role: "Volunteer", color: "#ec4899" },
    { name: "TechOrg", role: "Organization", color: "#10b981" },
    { name: "Ali", role: "Volunteer", color: "#f59e0b" },
  ];

  const icon3DStyle = {
    filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.2))",
    transform: "translateZ(10px)"
  };

  return (
    <div className="page" style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px", fontSize: "1.1rem" }}>
      <div className="container">
        
        {/* HERO SECTION - FIXED LOGO */}
        <section className="row align-items-center mb-5 g-5">
          <div className="col-lg-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Logo size={32} />
                <span className="badge bg-lavender text-lavender-dark px-3 py-2 rounded-pill fw-bold">Community Hub</span>
              </div>
              <h1 className="display-3 fw-bold text-dark mb-4">Sharing Knowledge, <br/><span className="text-primary">Changing Lives.</span></h1>
              <p className="text-muted fs-4 lh-lg">Join specialized tech communities, share pro-level advice, and discuss the latest opportunities.</p>
            </motion.div>
          </div>
          <div className="col-lg-6 text-center">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               transition={{ duration: 1, type: "spring" }}
               style={{ filter: "drop-shadow(0 20px 40px rgba(99, 102, 241, 0.2))" }}
            >
               <Logo size={300} />
            </motion.div>
          </div>
        </section>

        {/* TRACK SELECTOR */}
        <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
          {["frontend", "backend", "database"].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTrack(t)} 
              className={`btn rounded-pill px-5 py-3 transition-all fw-bold text-uppercase tracking-wider border-0 shadow-lg ${activeTrack === t ? 'btn-primary' : 'btn-white text-muted'}`} 
              style={{ minWidth: "180px", fontSize: "1.1rem" }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {/* OPPORTUNITY DISCUSSIONS */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 p-4 h-100">
              <h4 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                <i className="bi bi-chat-quote-fill text-primary" style={icon3DStyle}></i> {activeTrack.toUpperCase()} Discussions
              </h4>

              <form onSubmit={handlePostComment} className="mb-4 d-flex gap-2">
                <input 
                  type="text" className="form-control rounded-pill border-light bg-light px-4 py-3" 
                  placeholder={`Discuss ${activeTrack} roles...`} 
                  value={newComment} onChange={(e) => setNewComment(e.target.value)}
                  style={{ fontSize: "1.1rem" }}
                />
                <button type="submit" className="btn btn-primary rounded-circle shadow-lg" style={{ width: "50px", height: "50px", minWidth: "50px" }}>
                  <i className="bi bi-send-fill" style={icon3DStyle}></i>
                </button>
              </form>

              <div className="d-flex flex-column gap-3 overflow-auto pe-2" style={{ maxHeight: "400px" }}>
                {currentOppComments.length > 0 ? currentOppComments.map(c => (
                  <div key={c.id} className="p-4 bg-light rounded-4 border-start border-primary border-5 position-relative group shadow-sm">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold text-dark">{c.author} {c.isEdited && <span className="text-muted fw-normal" style={{fontSize: "0.8rem"}}>(edited)</span>}</span>
                      <div className="d-flex align-items-center gap-2">
                         <span className="text-muted small"><i className="bi bi-eye me-1" style={icon3DStyle}></i>{c.views}</span>
                         <span className="text-muted small">{new Date(c.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {editingCommentId === c.id ? (
                      <div className="mt-2">
                        <textarea className="form-control mb-2 px-3 py-2" value={editText} onChange={(e) => setEditText(e.target.value)} style={{ fontSize: "1.1rem" }} />
                        <div className="d-flex gap-2">
                           <button className="btn btn-primary rounded-pill px-4" onClick={handleSaveEdit}>Save</button>
                           <button className="btn btn-light rounded-pill px-4" onClick={() => setEditingCommentId(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mb-0 text-muted lh-base">{c.text}</p>
                        {user?.name === c.author && (
                          <button 
                            className="btn btn-link p-0 text-primary text-decoration-none position-absolute top-0 end-0 mt-2 me-3 opacity-0 group-hover-opacity-100 transition-all fw-bold"
                            style={{ fontSize: "0.9rem" }}
                            onClick={() => handleStartEdit(c)}
                          >
                            <i className="bi bi-pencil me-1"></i>Edit
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )) : <div className="text-center py-5 opacity-25 fs-5">No comments yet.</div>}
              </div>
            </div>
          </div>

          {/* PRO TIPS FEED */}
          <div className="col-lg-4">
            <h4 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
              <i className="bi bi-lightning-charge-fill text-warning" style={icon3DStyle}></i> Community Advice
            </h4>
            
            <form onSubmit={handlePostTip} className="card border-0 shadow-lg rounded-4 p-4 mb-4 bg-lavender-light">
              <div className="d-flex gap-2 mb-3">
                {["frontend", "backend", "database"].map(t => (
                  <button type="button" key={t} onClick={() => setTipTrack(t)} className={`btn btn-sm rounded-pill flex-grow-1 border-0 fw-bold ${tipTrack === t ? 'btn-primary shadow' : 'btn-white text-muted'}`} style={{ fontSize: "0.9rem" }}>{t}</button>
                ))}
              </div>
              <textarea 
                className="form-control border-0 bg-white rounded-3 mb-3 shadow-sm px-3 py-2" rows="3" 
                placeholder={`Share a ${tipTrack} tip...`} value={newTip} onChange={(e) => setNewTip(e.target.value)}
                style={{ fontSize: "1.1rem" }}
              ></textarea>
              <button type="submit" className="btn btn-primary btn-lg rounded-pill w-100 py-3 shadow-lg fw-bold">Post to Community</button>
            </form>

            <div className="d-flex flex-column gap-3 overflow-auto pe-1" style={{ maxHeight: "500px" }}>
              {filteredTips.map(tip => (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={tip.id} className="card border-0 shadow-md rounded-4 p-4 hover-up">
                  <p className="mb-3 text-dark lh-base">{tip.text}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="text-muted small">By <strong>{tip.author}</strong></span>
                    <button 
                      className={`btn btn-link text-decoration-none p-0 ${tip.likedBy.includes(user?.name || "guest") ? 'text-danger' : 'text-muted'}`} 
                      onClick={() => handleLike(tip.id)}
                    >
                      <i className={`bi ${tip.likedBy.includes(user?.name || "guest") ? 'bi-heart-fill' : 'bi-heart'} me-1`} style={icon3DStyle}></i> 
                      {tip.likedBy.length}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ACTIVE MEMBERS */}
          <div className="col-lg-3">
             <div className="card border-0 shadow-lg rounded-4 p-4">
                <h4 className="fw-bold text-dark mb-4">Active Members</h4>
                <div className="d-flex flex-column gap-4">
                   {mockUsers.map(m => (
                      <div key={m.name} className="d-flex align-items-center gap-3">
                         <div className="avatar-circle shadow-lg" style={{ width: "50px", height: "50px", backgroundColor: m.color, fontSize: "1.2rem", color: "white" }}>
                            {m.name.charAt(0)}
                         </div>
                         <div>
                            <h6 className="mb-0 fw-bold text-dark">{m.name}</h6>
                            <span className="text-muted small">{m.role}</span>
                         </div>
                         <div className="ms-auto">
                            <span className="badge rounded-pill bg-success-subtle text-success border-0 px-2 py-1" style={{ fontSize: "0.7rem" }}>Online</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Community;
