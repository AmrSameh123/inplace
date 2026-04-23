import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../redux/UserSlice';
import Logo from '../Components/Logo';
import './RegisterForm.css';

export default function RegisterVolunteer() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, 'At least 3 characters')
      .required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirmation is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(updateUser({
          name: values.fullName,
          role: "volunteer",
          email: values.email
        }));
        setIsLoading(false);
        navigate('/');
      }, 1500);
    },
  });

  return (
    <div className="register-page fade-up">
      <div className="register-container mt-3">
        <Link to="/register" className="back-link">
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
            <h1 className="register-title">Sign Up as Volunteer</h1>
            <p className="register-subtitle">Create your account to start making an impact</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="register-form">
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`form-input ${formik.touched.fullName && formik.errors.fullName ? 'is-invalid' : ''}`}
                placeholder="John Doe"
                {...formik.getFieldProps('fullName')}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="error-message">{formik.errors.fullName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="john@example.com"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
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
              {isLoading ? 'Creating account...' : 'Create Volunteer Account'}
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
