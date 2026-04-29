import React from "react";

const Rating = ({ value, onChange }) => {
  // تعريف الألوان كمتغيرات لتسهيل قراءتها
  const colorGreen = "#5ab394"; // اللون الأخضر اللي في الصورة (badge-success)
  const colorLavender = "var(--lav-500)"; // اللون اللافندر الأساسي بتاعك

  return (
    <div className="d-flex align-items-center justify-content-center gap-3 my-3 px-3">
      
      {/* 1. كلمة Agree على الشمال باللون الأخضر */}
      <span 
        onClick={() => onChange(1)}
        style={{ 
          color: colorGreen, 
          fontWeight: 600, 
          fontSize: "14px", 
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'opacity 0.2s'
        }}
        className="hover-opacity"
      >
        Agree
      </span>

      <div className="d-flex align-items-center justify-content-center gap-2" style={{ flexGrow: 1 }}>
        {[1, 2, 3, 4, 5].map((num) => {
          // حساب الحجم (معكوس زي ما طلبتي قبل كده: الأطراف صغيرة واللي في النص كبيرة)
          const size = num === 3 ? '40px' : (num === 2 || num === 4 ? '32px' : '24px');
          const isSelected = value === num;

          // 2. حساب اللون بناءً على رقم الدائرة: 1 و 2 أخضر، 3 و 4 و 5 لافندر
          const baseColor = (num === 1 || num === 2) ? colorGreen : colorLavender;

          return (
            <div
              key={num}
              onClick={() => onChange(num)}
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: size,
                height: size,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                
                // التعديل الأساسي هنا:
                // الدائرة الفاضية: حدودها ملونة، خلفيتها شفافة
                // الدائرة المختارة: حدودها ملونة، خلفيتها ملونة بالكامل
                border: `2px solid ${baseColor}`,
                backgroundColor: isSelected ? baseColor : 'transparent', 
                
                // إضافة ظل خفيف عند الاختيار
                boxShadow: isSelected ? `0 0 10px rgba(139, 122, 214, 0.2)` : 'none'
              }}
            >
              {/* 3. علامة الصح البيضاء لما الدايرة تختار */}
              {isSelected && (
                <i className="bi bi-check" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}></i>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. كلمة Disagree على اليمين باللون اللافندر */}
      <span 
        onClick={() => onChange(5)}
        style={{ 
          color: colorLavender, 
          fontWeight: 600, 
          fontSize: "14px", 
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'opacity 0.2s'
        }}
        className="hover-opacity"
      >
        Disagree
      </span>
    </div>
  );
};

export default Rating;