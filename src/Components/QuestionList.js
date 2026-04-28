import React from "react";
import Rating from "./Rating";

const QuestionList = ({ questions, answers, onChange }) => {
  return (
    <div>
      {questions.map((q, idx) => {
        // بنشيك لو السؤال ده ليه قيمة متخزنة فعلاً
        const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "";

        return (
          <div 
            key={q.id} 
            // غيرنا الكلاس لـ question-box عشان يسمع في الـ CSS اللي ضفناه
            className={`question-box ${isAnswered ? 'answered' : ''}`}
          >
            <div className="d-flex align-items-start mb-3">
              <span 
                className="question-number" 
                style={{ color: "var(--color-lavender)", fontWeight: 700, marginRight: 12, fontSize: "1.1rem" }}
              >
                {idx + 1}.
              </span>
              <span style={{ fontWeight: 600, color: "var(--color-text)", fontSize: "15px", lineHeight: "1.5" }}>
                {q.text}
              </span>
            </div>

            <div className="rating-container py-2">
              <Rating
                value={answers[q.id]}
                onChange={(n) => onChange(q.id, n)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionList;