import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrganization } from "../redux/OrgSlice";

import StepsProgress from "../Components/StepsProgress";
import QuestionList from "../Components/QuestionList";
import {
  TRACKS,
  SKILLS_BY_TRACK,
  ORG_REQUIREMENT_QUESTIONS,
  ORG_CULTURE_QUESTIONS,
  TRACK_QUESTIONS,
  SKILL_QUESTIONS,
} from "../data/Constants";
import { motion, AnimatePresence } from "framer-motion";

const STEP_LABELS = ["Organization Info", "Opportunity Needs", "Work Culture"];

const OrgPreferenceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);

  const [step, setStep] = useState(1);

  const isEditing = location.state?.editMode === true || organization.submitted === true;

  // Compute dynamic questions based on selection
  const dynamicQuestions = useMemo(() => {
    let questions = [...ORG_REQUIREMENT_QUESTIONS];
    
    // Add track-specific questions
    if (organization.industry && TRACK_QUESTIONS[organization.industry]) {
      questions = [...questions, ...TRACK_QUESTIONS[organization.industry]];
    }
    
    // Add skill-specific questions
    organization.requiredSkills?.forEach(skill => {
      if (SKILL_QUESTIONS[skill]) {
        questions = [...questions, ...SKILL_QUESTIONS[skill]];
      }
    });
    
    return questions;
  }, [organization.industry, organization.requiredSkills]);

  const availableSkills = useMemo(
    () => (organization.industry ? SKILLS_BY_TRACK[organization.industry] : []),
    [organization.industry]
  );

  const toggleSkill = (skill) => {
    const has = organization.requiredSkills?.includes(skill);
    const newSkills = has
      ? organization.requiredSkills.filter((s) => s !== skill)
      : [...(organization.requiredSkills || []), skill];
    dispatch(updateOrganization({ requiredSkills: newSkills }));
  };

  const step1Valid =
    organization.orgName?.trim() &&
    organization.industry;

  const step2Valid = 
    organization.requiredSkills?.length > 0 &&
    dynamicQuestions.every((q) => organization.requirements?.[q.id]);
    
  const step3Valid = ORG_CULTURE_QUESTIONS.every((q) => organization.environment?.[q.id]);

  const canNext =
    (step === 1 && step1Valid) ||
    (step === 2 && step2Valid) ||
    (step === 3 && step3Valid);

  const handleNext = () => {
    // For demo purposes, we allow moving forward even if not fully valid, 
    // but we still check step1 for basic identity.
    if (step === 1 && !step1Valid) {
      alert("Please enter organization name and industry first.");
      return;
    }
    
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    dispatch(updateOrganization({ submitted: true }));
    navigate("/org/profile");
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="container py-4 py-md-5" style={{ maxWidth: "850px", marginTop: "100px" }}>
      <motion.div 
        className="main-preference-card shadow-lg" 
        style={{ padding: "40px", borderRadius: "24px", background: "var(--color-surface)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="section-heading mb-2 display-6 fw-bold text-dark">
          <i className="bi bi-building me-3 text-primary icon-float"></i>
          Organization Setup
        </h3>
        <p className="section-subtitle mb-5 opacity-75">
          Tell us about your organization and the kind of volunteers you need.
        </p>

        <StepsProgress current={step} total={3} labels={STEP_LABELS} />

        {isEditing && (
          <div className="mt-4 mb-4 p-3 shadow-sm" style={{ 
              backgroundColor: "var(--color-lavender-softer)", 
              borderRadius: "16px", 
              border: "1px solid var(--color-lavender-light)" 
            }}>
            <label className="form-label fw-bold d-flex align-items-center" style={{ color: "var(--color-lavender-dark)", fontSize: "0.95rem" }}>
               <i className="bi bi-lightning-charge-fill me-2 text-warning fs-5 pulse-animation" /> 
               Quick Jump (Editing Mode):
            </label>
            <select 
              className="form-select border-0 shadow-sm mt-2" 
              style={{ borderRadius: "12px", padding: "10px 15px" }}
              onChange={(e) => setStep(parseInt(e.target.value))}
              value={step}
            >
              <option value={1}>1. Organization Information</option>
              <option value={2}>2. Opportunity Needs & Skills</option>
              <option value={3}>3. Work Culture Assessment</option>
            </select>
          </div>
        )}

        <hr className="my-5 opacity-10" />

        <div style={{ minHeight: "350px" }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" 
                variants={formVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
                className="row g-4"
              >
                <div className="col-md-12">
                  <label className="form-label fw-bold text-secondary">Organization Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light border-0 shadow-none"
                    value={organization.orgName || ""}
                    onChange={(e) => dispatch(updateOrganization({ orgName: e.target.value }))}
                    placeholder="e.g. CodeForGood"
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label fw-bold text-secondary">Opportunity Field (Track)</label>
                  <select
                    className="form-select form-select-lg bg-light border-0 shadow-none"
                    value={organization.industry || ""}
                    onChange={(e) =>
                      dispatch(updateOrganization({ industry: e.target.value, requiredSkills: [] }))
                    }
                  >
                    <option value="">Select industry</option>
                    {TRACKS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="form-label fw-bold text-secondary">Organization Description</label>
                  <textarea
                    className="form-control bg-light border-0 shadow-none"
                    rows="3"
                    value={organization.description || ""}
                    onChange={(e) => dispatch(updateOrganization({ description: e.target.value }))}
                    placeholder="Briefly describe your organization's mission..."
                  ></textarea>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2" 
                variants={formVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
              >
                <h5 className="section-heading mb-4 text-primary">Required Tech Stack</h5>
                <div className="d-flex flex-wrap gap-2 mb-5 p-4 rounded-4 bg-light">
                  {availableSkills.map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`skill-chip border-0 shadow-sm ${organization.requiredSkills?.includes(s) ? "selected bg-primary text-white" : "bg-white text-dark"}`}
                      style={{ cursor: "pointer", padding: "10px 18px", fontSize: "15px" }}
                      onClick={() => toggleSkill(s)}
                    >
                      {organization.requiredSkills?.includes(s) && <i className="bi bi-check-circle-fill me-2" />}
                      {s}
                    </motion.span>
                  ))}
                  {availableSkills.length === 0 && <p className="text-muted mb-0">Please select an Industry in Step 1 to see available skills.</p>}
                </div>

                <h5 className="section-heading mb-4 text-primary">Opportunity Requirements</h5>
                <QuestionList
                  questions={dynamicQuestions}
                  answers={organization.requirements || {}}
                  onChange={(id, val) =>
                    dispatch(updateOrganization({ requirements: { ...organization.requirements, [id]: val } }))
                  }
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3" 
                variants={formVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
              >
                <h5 className="section-heading mb-4 text-primary">Work Culture & Environment</h5>
                <p className="text-muted mb-4">Answering these accurately helps us find volunteers whose personality matches your team's vibe.</p>
                <QuestionList
                  questions={ORG_CULTURE_QUESTIONS}
                  answers={organization.environment || {}}
                  onChange={(id, val) =>
                    dispatch(updateOrganization({ environment: { ...organization.environment, [id]: val } }))
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="d-flex justify-content-between mt-5 pt-3 border-top">
          <button 
            className="btn btn-outline-secondary px-5 py-3 fw-bold rounded-pill" 
            onClick={handlePrev} 
            disabled={step === 1}
          >
            <i className="bi bi-arrow-left me-2" /> Back
          </button>
          
          <button 
            className="btn btn-primary px-5 py-3 fw-bold rounded-pill shadow" 
            onClick={handleNext}
            style={{ minWidth: "160px" }}
          >
            {step === 3 
              ? (isEditing ? "Save Setup" : "Finish Setup") 
              : "Continue"}
            {step !== 3 && <i className="bi bi-arrow-right ms-2" />}
            {step === 3 && <i className="bi bi-check-circle ms-2" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrgPreferenceForm;
