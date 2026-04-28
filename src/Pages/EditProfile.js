import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateVolunteer } from "../redux/VolunteerSlice";

const EditProfile = () => {
  const volunteer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State محلي للفورم
  const [formData, setFormData] = useState({
    userName: volunteer.userName || "",
    gender: volunteer.gender || "Female",
    profilePic: volunteer.profilePic || null, 
  });

  // معالجة اختيار الملف
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // حجم 2 ميجا بالكتير
        alert("Image is too large! Please choose an image under 2MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result }); // تحويل الصورة لـ Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateVolunteer(formData));
    navigate("/profile");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px", marginTop: "100px" }}>
      <div className="lav-card p-4 shadow-sm" style={{ borderRadius: "20px" }}>
        <h3 className="section-heading mb-4 text-center">Edit Personal Info</h3>
        
        <form onSubmit={handleSave}>
          <div className="text-center mb-4">
             {/* عرض الصورة المختارة أو الحروف الأولى لو مفيش صورة */}
             <div className="position-relative d-inline-block">
                {formData.profilePic ? (
                  <img 
                    src={formData.profilePic} 
                    alt="Profile" 
                    className="avatar-circle"
                    style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <div className="avatar-circle mx-auto" style={{ width: "120px", height: "120px", fontSize: "3rem", backgroundColor: "var(--color-lavender)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                    {formData.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                
                {/* زرار الكاميرا الصغير اللي فوق الصورة */}
                <button 
                  type="button" 
                  className="btn btn-sm btn-lav position-absolute bottom-0 end-0 rounded-circle shadow"
                  style={{ width: "35px", height: "35px" }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <i className="bi bi-camera-fill" />
                </button>
             </div>
             
             <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: "none" }} 
                accept="image/*"
                onChange={handleFileChange}
             />
             <p className="text-muted small mt-2">Click the camera icon to change photo</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Gender</label>
            <select
              className="form-select"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn-lav w-100 py-2">Save Changes</button>
            <button type="button" className="btn-lav-outline w-100 py-2 d-flex align-items-center justify-content-center" onClick={() => navigate("/profile")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;