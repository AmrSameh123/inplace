import React from "react";
import { motion } from "framer-motion";

const StaticPage = ({ title, content, icon }) => {
  return (
    <div className="page" style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="card border-0 shadow-sm rounded-4 p-5"
        >
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="rounded-circle bg-lavender d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
              <i className={`bi ${icon} fs-2 text-lavender-dark`}></i>
            </div>
            <h1 className="display-5 fw-bold text-dark mb-0">{title}</h1>
          </div>
          <hr className="opacity-10 mb-4" />
          <div className="content-area text-muted lh-lg">
            {content}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StaticPage;
