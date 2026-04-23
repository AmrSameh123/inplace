import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../redux/UserSlice';
import Logo from '../Components/Logo';
import './Login.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        dispatch(updateUser({
          name: "Amr Sameh",
          role: "volunteer",
          email: values.email
        }));
        setIsLoading(false);
        navigate('/');
      }, 1500);
    },
  });

  return (
    <div className="login-page fade-up">
      <div className="login-container">
        <div className="login-card card">
          <div className="login-header">
            <Link to="/" className="login-logo">
              <Logo size={60} />
            </Link>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Log in to your account to continue your journey</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="name@example.com"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="form-group">
              <div className="label-row">
                <label className="form-label" htmlFor="password">Password</label>
                <a href="#reset" className="forgot-password">Forgot?</a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>    // if there is an error, show the error message below the input field come from formik validation, if not show nothing
              ) : null}
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary login-submit ${isLoading ? 'loading' : ''}`} // if isLoading is true, add the loading class to the button, if not add nothing
              disabled={isLoading}  // if isLoading is true, disable the button, if not enable it
            >
              {isLoading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Create an account</Link></p>
          </div>
        </div>

        <div className="login-decoration">
          <div className="decoration-blob blob-1"></div> 
          <div className="decoration-blob blob-2"></div>
          <div className="decoration-content">
            <h2>Make an Impact</h2>
            <p>Join thousands of volunteers making a difference every day.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
