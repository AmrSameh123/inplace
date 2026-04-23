import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../redux/UserSlice';
import Logo from '../Components/Logo';
import './RegisterForm.css';

export default function RegisterOrg() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    orgName: Yup.string()
      .min(3, 'At least 3 characters')
      .required('Organization Name is required'),
    email: Yup.string()
      .email('Invalid business email')
      .required('Business Email is required'),
    orgType: Yup.string()
      .required('Please select an organization type'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirmation is required'),
  });

  const formik = useFormik({
    initialValues: {
      orgName: '',
      email: '',
      orgType: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(updateUser({
          name: values.orgName,
          role: "organization",
          email: values.email,
          orgType: values.orgType
        }));
        setIsLoading(false);
        navigate('/');
      }, 1500);
    },
  });

  return (
    <div className="register-page fade-up">
      <div className="register-container mt-3">
        <Link to="/register" className="back-link ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to roles
        </Link>
        
        <div className="register-card card">
          <div className="register-header">
            <Link to="/" className="register-logo">
              <Logo size={54} />
            </Link>
            <h1 className="register-title">Sign Up Organization</h1>
            <p className="register-subtitle">Register your organization to start posting opportunities</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="register-form">
            <div className="form-group">
              <label className="form-label" htmlFor="orgName">Organization Name</label>
              <input
                id="orgName"
                name="orgName"
                type="text"
                className={`form-input ${formik.touched.orgName && formik.errors.orgName ? 'is-invalid' : ''}`}
                placeholder="Example Foundation"
                {...formik.getFieldProps('orgName')}
              />
              {formik.touched.orgName && formik.errors.orgName && (
                <div className="error-message">{formik.errors.orgName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Business Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="contact@org.com"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="orgType">Organization Type</label>
              <select
                id="orgType"
                name="orgType"
                className={`form-select ${formik.touched.orgType && formik.errors.orgType ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('orgType')}
              >
                <option value="" disabled>Select type</option>
                <option value="ngo">Non-Profit (NGO)</option>
                <option value="educational">Educational</option>
                <option value="corporate">Corporate</option>
                <option value="government">Government</option>
              </select>
              {formik.touched.orgType && formik.errors.orgType && (
                <div className="error-message">{formik.errors.orgType}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`form-input ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error-message">{formik.errors.password}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`form-input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  {...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="error-message">{formik.errors.confirmPassword}</div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary register-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Organization'}
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
