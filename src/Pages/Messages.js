import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { updateApplicationStatus, markAsRead } from "../redux/ApplicationsSlice";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);
  const selectedRole = useSelector((state) => state.user.selectedRole);
  const volunteer = useSelector((state) => state.volunteer);
  const organization = useSelector((state) => state.organization);
  const isOrg = selectedRole === "organization";

  const myMessages = isOrg 
    ? applications.filter(a => a.orgId === (organization.orgName || "org-1"))
    : applications.filter(a => a.volunteerId === (volunteer.userName || "v-1"));

  React.useEffect(() => {
    myMessages.forEach(msg => {
      if (!msg.read) {
        dispatch(markAsRead({ applicationId: msg.id }));
      }
    });
  }, [myMessages, dispatch]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="page" style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">Messages & Notifications</h2>
          {isOrg && (
            <Link to="/org/profile" className="btn btn-sm btn-lav-outline rounded-pill">
              Go to Dashboard
            </Link>
          )}
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="d-flex flex-column gap-3">
          {myMessages.length > 0 ? (
            myMessages.map((msg) => (
              <motion.div 
                key={msg.id} 
                variants={item}
                className="card border-0 shadow-sm rounded-4 p-3 transition-all hover-up"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className={`rounded-circle d-flex align-items-center justify-content-center bg-light`} style={{ width: "48px", height: "48px" }}>
                    <i className={`bi ${isOrg ? 'bi-person-plus' : (msg.status === 'accepted' ? 'bi-check-circle-fill text-success' : msg.status === 'rejected' ? 'bi-x-circle-fill text-danger' : 'bi-hourglass-split text-warning')} fs-4`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-0 text-dark">
                      {isOrg ? `New Applicant: ${msg.volunteerName}` : `Application Update: ${msg.opportunityTitle}`}
                    </h6>
                    <p className="text-muted small mb-0">
                      {isOrg 
                        ? `A user has applied for "${msg.opportunityTitle}". Click to view details.` 
                        : msg.status === 'accepted' 
                          ? `Congratulations! Your application for "${msg.opportunityTitle}" has been accepted.`
                          : msg.status === 'rejected'
                            ? `We regret to inform you that your application for "${msg.opportunityTitle}" was not successful.`
                            : `Your application for "${msg.opportunityTitle}" is currently under review.`}
                    </p>
                  </div>
                  {isOrg && (
                    <button 
                      className="btn btn-primary btn-sm rounded-pill px-3"
                      onClick={() => navigate("/org/profile")}
                    >
                      Dashboard
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-chat-left-text display-1 text-muted opacity-25"></i>
              <p className="mt-3 text-muted">No messages yet. Stay tuned!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Messages;
