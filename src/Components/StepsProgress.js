import React from "react";

const StepsProgress = ({ current, total, labels = [] }) => {
  return (
    <div className="mb-5">
      {/* السطر العلوي: Step X of Y */}
      <div className="d-flex justify-content-between mb-3 text-muted" style={{ fontSize: '14px' }}>
        <span>Step {current} of {total}</span>
        <span className="fw-bold" style={{ color: "var(--lav-600)" }}>
          {labels[current - 1]}
        </span>
      </div>

      {/* شريط التقدم والدوائر */}
      <div className="position-relative d-flex justify-content-between align-items-center">
        
        {/* الخط الرمادي الأساسي */}
        <div className="position-absolute w-100" style={{ height: '2px', backgroundColor: 'var(--lav-100)', top: '20px', zIndex: 0 }}></div>
        
        {/* الخط الملون المتحرك */}
        <div className="position-absolute" 
             style={{ 
               height: '2px', 
               backgroundColor: 'var(--lav-500)', 
               top: '20px', 
               zIndex: 0, 
               transition: 'width 0.3s ease',
               width: `${((current - 1) / (total - 1)) * 100}%` 
             }}>
        </div>

        {/* رسم الدوائر والخطوات */}
        {Array.from({ length: total }).map((_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === current;
          const isCompleted = stepNumber < current;

          return (
            <div key={i} className="text-center position-relative" style={{ zIndex: 1, flex: 1 }}>
              <div className="rounded-circle d-flex align-items-center justify-content-center mb-2 mx-auto"
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  fontWeight: 'bold',
                  fontSize: '16px',
                  // التعديل: موف عادي للحالي (lav-500) وموف أغمق للمنتهي (lav-600)
                  backgroundColor: isActive ? 'var(--lav-500)' : isCompleted ? 'var(--lav-600)' : '#fff',
                  color: isActive || isCompleted ? '#fff' : 'var(--color-text-soft)',
                  border: isActive || isCompleted ? 'none' : '2px solid var(--lav-200)',
                  transition: 'all 0.3s ease'
                }}>
                {/* التعديل: يظهر علامة صح لو الخطوة خلصت، والرقم لو هي الحالية أو اللي جاية */}
                {isCompleted ? '✓' : stepNumber}
              </div>
              
              {/* اسم الخطوة تحت الدايرة */}
              <div style={{ 
                fontSize: '12px', 
                fontWeight: isActive ? 'bold' : '500',
                color: isActive ? 'var(--color-text)' : 'var(--color-text-soft)' 
              }}>
                {labels[i]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepsProgress;