import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateVolunteer } from "../redux/VolunteerSlice";

import StepsProgress from "../Components/StepsProgress";
import QuestionList from "../Components/QuestionList";
import {
  TRACKS,
  SKILLS_BY_TRACK,
  SOFT_SKILL_QUESTIONS,
  PERSONALITY_QUESTIONS,
} from "../data/Constants";

const STEP_LABELS = ["Basic Info", "Soft Skills", "Personality"];

const PreferenceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const volunteer = useSelector((state) => state.volunteer);

  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState(false);

  // التعديل هنا: المنيو هتظهر لو جاية بـ editMode أو لو كنتِ عملتي submit قبل كدة
  const isEditing = location.state?.editMode === true || volunteer.submitted === true;

  const availableSkills = useMemo(
    () => (volunteer.track ? SKILLS_BY_TRACK[volunteer.track] : []),
    [volunteer.track]
  );

  const toggleSkill = (skill) => {
    const has = volunteer.skills.includes(skill);
    const newSkills = has
      ? volunteer.skills.filter((s) => s !== skill)
      : [...volunteer.skills, skill];
    dispatch(updateVolunteer({ skills: newSkills }));
  };

  const step1Valid =
    volunteer.userName.trim() &&
    volunteer.gender &&
    volunteer.track &&
    volunteer.skills.length > 0 &&
    volunteer.experienceYears !== "" &&
    !isNaN(Number(volunteer.experienceYears));

  const step2Valid = SOFT_SKILL_QUESTIONS.every((q) => volunteer.softSkills[q.id]);
  const step3Valid = PERSONALITY_QUESTIONS.every((q) => volunteer.personality[q.id]);

  const canNext =
    (step === 1 && step1Valid) ||
    (step === 2 && step2Valid) ||
    (step === 3 && step3Valid);

  const handleNext = () => {
    setTouched(true);
    if (!canNext) return;
    setTouched(false);
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handlePrev = () => {
    setTouched(false);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    dispatch(updateVolunteer({ submitted: true }));
    if (isEditing) {
      navigate("/profile");
    } else {
      navigate("/recommended");
    }
  };

  return (
    <div className="container py-4 py-md-5" style={{ maxWidth: "850px", marginTop: "100px" }}>
      <div className="main-preference-card step-fade" key={step} style={{ padding: "30px", borderRadius: "20px" }}>
        <h3 className="section-heading mb-1">Volunteer Preferences</h3>
        <p className="section-subtitle mb-4">
          Help us match you with the right opportunities.
        </p>

        <StepsProgress current={step} total={3} labels={STEP_LABELS} />

        {/* الـ Jump Menu الذكي */}
        {isEditing && (
          <div className="mt-4 mb-4 p-3" style={{ 
              backgroundColor: "#f8f7ff", 
              borderRadius: "15px", 
              border: "1px dashed var(--color-lavender-light)" 
            }}>
            <label className="form-label fw-bold" style={{ color: "var(--color-lavender-dark)", fontSize: "0.9rem" }}>
               <i className="bi bi-lightning-charge-fill me-1 text-warning" /> Quick Jump (Editing Mode):
            </label>
            <select 
              className="form-select shadow-sm" 
              style={{ borderRadius: "10px" }}
              onChange={(e) => setStep(parseInt(e.target.value))}
              value={step}
            >
              <option value={1}>1. Basic Information</option>
              <option value={2}>2. Soft Skills Assessment</option>
              <option value={3}>3. Personality Assessment</option>
            </select>
          </div>
        )}

        <hr className="my-4 opacity-25" />

        {step === 1 && (
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">User Name</label>
              <input
                type="text"
                className="form-control"
                value={volunteer.userName}
                onChange={(e) => dispatch(updateVolunteer({ userName: e.target.value }))}
                placeholder="e.g. Sara Ahmed"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Gender</label>
              <select
                className="form-select"
                value={volunteer.gender}
                onChange={(e) => dispatch(updateVolunteer({ gender: e.target.value }))}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Programming Track</label>
              <select
                className="form-select"
                value={volunteer.track}
                onChange={(e) =>
                  dispatch(updateVolunteer({ track: e.target.value, skills: [] }))
                }
              >
                <option value="">Select track</option>
                {TRACKS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Experience (Years)</label>
              <input
                type="number"
                className="form-control"
                value={volunteer.experienceYears}
                onChange={(e) =>
                  dispatch(updateVolunteer({ experienceYears: e.target.value }))
                }
                placeholder="e.g. 2"
              />
            </div>
            <div className="col-12 mt-4">
              <label className="form-label fw-semibold">Language Skills / Tech Stack</label>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {availableSkills.map((s) => (
                  <span
                    key={s}
                    className={`skill-chip ${volunteer.skills.includes(s) ? "selected" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleSkill(s)}
                  >
                    {volunteer.skills.includes(s) && <i className="bi bi-check-lg me-1" />}
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h5 className="section-heading mb-3">Soft Skills Assessment</h5>
            <QuestionList
              questions={SOFT_SKILL_QUESTIONS}
              answers={volunteer.softSkills}
              onChange={(id, val) =>
                dispatch(updateVolunteer({ softSkills: { ...volunteer.softSkills, [id]: val } }))
              }
            />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h5 className="section-heading mb-3">Personality Assessment</h5>
            <QuestionList
              questions={PERSONALITY_QUESTIONS}
              answers={volunteer.personality}
              onChange={(id, val) =>
                dispatch(updateVolunteer({ personality: { ...volunteer.personality, [id]: val } }))
              }
            />
          </div>
        )}

        <div className="d-flex justify-content-between mt-5">
          <button className="btn-lav-outline px-4" onClick={handlePrev} disabled={step === 1}>
            <i className="bi bi-arrow-left me-2" /> Previous
          </button>
          
          <button className="btn-lav px-5" onClick={handleNext}>
            {step === 3 
              ? (isEditing ? "Save Changes" : "Submit") 
              : "Next"}
            <i className="bi bi-arrow-right ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferenceForm;