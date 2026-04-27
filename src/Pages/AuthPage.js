import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { updateUser, setSelectedRole as setReduxRole } from '../redux/UserSlice';
import Logo from '../Components/Logo';

// React Bits
import ShinyText from '../Components/Bits/ShinyText';
import FadeContent from '../Components/Bits/FadeContent';
import CountUp from '../Components/Bits/CountUp';

import './Login.css';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // login, role-select, register
  const [role, setRole] = useState(null); // volunteer, organization
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/register') {
      setMode('role-select');
    } else {
      setMode('login');
      setRole(null);
    }
  }, [location.pathname]);

  const handleCreateAccountClick = () => {
    setMode('role-select');
    navigate('/register');
  };

  const handleBackToLogin = () => {
    setMode('login');
    navigate('/login');
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    dispatch(setReduxRole(selectedRole));
    setMode('register');
  };

  // --- Forms Logic ---
  const loginFormik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(updateUser({ name: "Amr Sameh", role: "volunteer", email: values.email }));
        setIsLoading(false);
        navigate('/');
      }, 1500);
    },
  });

  const volunteerFormik = useFormik({
    initialValues: { name: '', email: '', specialty: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      specialty: Yup.string().required('Please select your specialty'),
      password: Yup.string().min(6, 'Password is too short').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(updateUser({ name: values.name, role: 'volunteer', email: values.email }));
        setIsLoading(false);
        navigate('/');
      }, 1500);
    },
  });

  const orgFormik = useFormik({
    initialValues: { orgName: '', email: '', industry: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      orgName: Yup.string().required('Organization name is required'),
      email: Yup.string().email('Invalid email address').required('Business email is required'),
      industry: Yup.string().required('Industry is required'),
      password: Yup.string().min(6, 'Password is too short').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(updateUser({ name: values.orgName, role: 'organization', email: values.email }));
        setIsLoading(false);
        navigate('/');
      }, 1500);
    },
  });

  const isFlipped = mode === 'role-select';

  return (
    <div className="login-page-v2">
      {/* Background stays simple */}
      <div className="login-bg-simple" />

      <div className="login-wrapper-v2">
        <FadeContent duration={1.2} threshold={0.1} blur={true}>
          <motion.div 
            className="login-container-split shadow-lg overflow-hidden"
            animate={{ 
              flexDirection: isFlipped ? 'row-reverse' : 'row',
            }}
            transition={{ 
              duration: 0.6, 
              ease: "easeInOut"
            }}
            layout
          >
            
            {/* Action Side (Forms or Role Selection) */}
            <motion.div layout className="login-form-side">
              <AnimatePresence mode="wait">
                {mode === 'login' && (
                  <motion.div 
                    key="login"
                    className="login-inner"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="login-header-v2">
                      <Logo size={55} className="mb-4" />
                      <h1 className="decrypt-title fw-black">WELCOME BACK</h1>
                      <p className="text-secondary small">Access your volunteer dashboard</p>
                    </div>
                    <form onSubmit={loginFormik.handleSubmit}>
                      <div className={`input-group-v2 ${loginFormik.touched.email && loginFormik.errors.email ? 'has-error' : ''}`}>
                        <label>Email Address</label>
                        <input type="email" {...loginFormik.getFieldProps('email')} placeholder="name@example.com" />
                        {loginFormik.touched.email && loginFormik.errors.email && <div className="error-msg">{loginFormik.errors.email}</div>}
                      </div>
                      <div className={`input-group-v2 ${loginFormik.touched.password && loginFormik.errors.password ? 'has-error' : ''}`}>
                        <label>Password</label>
                        <input type="password" {...loginFormik.getFieldProps('password')} placeholder="••••••••" />
                        {loginFormik.touched.password && loginFormik.errors.password && <div className="error-msg">{loginFormik.errors.password}</div>}
                      </div>
                      <button type="submit" className="login-btn-v2" disabled={isLoading}>
                        {isLoading ? <div className="loader-v2" /> : <ShinyText text="SIGN IN" />}
                      </button>
                    </form>
                    <div className="login-footer-v2">
                      <p>Don't have an account? <button onClick={handleCreateAccountClick} className="btn-link">Create Account</button></p>
                    </div>
                  </motion.div>
                )}

                {mode === 'role-select' && (
                  <motion.div 
                    key="role-select"
                    className="role-grid-v2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <button className="role-option-full volunteer" onClick={() => handleRoleSelect('volunteer')}>
                      <div className="role-content-full">
                        <span className="role-icon-lg">👤</span>
                        <h2 className="fw-black">I AM A VOLUNTEER</h2>
                        <p className="small opacity-75">I want to make a difference</p>
                      </div>
                    </button>
                    <button className="role-option-full organization" onClick={() => handleRoleSelect('organization')}>
                      <div className="role-content-full">
                        <span className="role-icon-lg">🏢</span>
                        <h2 className="fw-black">WE ARE AN ORG</h2>
                        <p className="small opacity-75">We need passionate people</p>
                      </div>
                    </button>
                    <button onClick={handleBackToLogin} className="back-btn-floating">Back</button>
                  </motion.div>
                )}

                {mode === 'register' && role === 'volunteer' && (
                  <motion.div 
                    key="register-volunteer"
                    className="login-inner"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="login-header-v2">
                      <Logo size={55} className="mb-3" />
                      <h1 className="decrypt-title fw-black">VOLUNTEER SIGNUP</h1>
                      <p className="text-secondary small">Join as a skilled individual</p>
                    </div>
                    <form onSubmit={volunteerFormik.handleSubmit}>
                      <div className={`input-group-v2 ${volunteerFormik.touched.name && volunteerFormik.errors.name ? 'has-error' : ''}`}>
                        <label>Full Name</label>
                        <input type="text" {...volunteerFormik.getFieldProps('name')} placeholder="Your name" />
                        {volunteerFormik.touched.name && volunteerFormik.errors.name && <div className="error-msg">{volunteerFormik.errors.name}</div>}
                      </div>
                      <div className={`input-group-v2 ${volunteerFormik.touched.email && volunteerFormik.errors.email ? 'has-error' : ''}`}>
                        <label>Email Address</label>
                        <input type="email" {...volunteerFormik.getFieldProps('email')} placeholder="name@example.com" />
                        {volunteerFormik.touched.email && volunteerFormik.errors.email && <div className="error-msg">{volunteerFormik.errors.email}</div>}
                      </div>
                      <div className={`input-group-v2 ${volunteerFormik.touched.specialty && volunteerFormik.errors.specialty ? 'has-error' : ''}`}>
                        <label>Specialty</label>
                        <select {...volunteerFormik.getFieldProps('specialty')} className="form-select-v2">
                          <option value="">Select your track</option>
                          <option value="frontend">Frontend Developer</option>
                          <option value="backend">Backend Developer</option>
                          <option value="fullstack">Database</option>
                        </select>
                        {volunteerFormik.touched.specialty && volunteerFormik.errors.specialty && <div className="error-msg">{volunteerFormik.errors.specialty}</div>}
                      </div>
                      <div className={`input-group-v2 ${volunteerFormik.touched.password && volunteerFormik.errors.password ? 'has-error' : ''}`}>
                        <label>Password</label>
                        <input type="password" {...volunteerFormik.getFieldProps('password')} placeholder="Create password" />
                        {volunteerFormik.touched.password && volunteerFormik.errors.password && <div className="error-msg">{volunteerFormik.errors.password}</div>}
                      </div>
                      <div className={`input-group-v2 ${volunteerFormik.touched.confirmPassword && volunteerFormik.errors.confirmPassword ? 'has-error' : ''}`}>
                        <label>Confirm Password</label>
                        <input type="password" {...volunteerFormik.getFieldProps('confirmPassword')} placeholder="Repeat password" />
                        {volunteerFormik.touched.confirmPassword && volunteerFormik.errors.confirmPassword && <div className="error-msg">{volunteerFormik.errors.confirmPassword}</div>}
                      </div>
                      <button type="submit" className="login-btn-v2" disabled={isLoading}>
                        {isLoading ? <div className="loader-v2" /> : <ShinyText text="JOIN COMMUNITY" />}
                      </button>
                    </form>
                    <div className="login-footer-v2">
                      <button onClick={() => setMode('role-select')} className="btn-link">Change Role</button>
                    </div>
                  </motion.div>
                )}

                {mode === 'register' && role === 'organization' && (
                  <motion.div 
                    key="register-org"
                    className="login-inner"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="login-header-v2">
                      <Logo size={55} className="mb-3" />
                      <h1 className="decrypt-title fw-black">ORG REGISTRATION</h1>
                      <p className="text-secondary small">Partner with talent</p>
                    </div>
                    <form onSubmit={orgFormik.handleSubmit}>
                      <div className={`input-group-v2 ${orgFormik.touched.orgName && orgFormik.errors.orgName ? 'has-error' : ''}`}>
                        <label>Organization Name</label>
                        <input type="text" {...orgFormik.getFieldProps('orgName')} placeholder="Company name" />
                        {orgFormik.touched.orgName && orgFormik.errors.orgName && <div className="error-msg">{orgFormik.errors.orgName}</div>}
                      </div>
                      <div className={`input-group-v2 ${orgFormik.touched.email && orgFormik.errors.email ? 'has-error' : ''}`}>
                        <label>Business Email</label>
                        <input type="email" {...orgFormik.getFieldProps('email')} placeholder="contact@org.com" />
                        {orgFormik.touched.email && orgFormik.errors.email && <div className="error-msg">{orgFormik.errors.email}</div>}
                      </div>
                      <div className={`input-group-v2 ${orgFormik.touched.industry && orgFormik.errors.industry ? 'has-error' : ''}`}>
                        <label>Business Field</label>
                        <select {...orgFormik.getFieldProps('industry')} className="form-select-v2">
                          <option value="">Select project field</option>
                          <option value="frontend">Frontend Development</option>
                          <option value="backend">Backend Development</option>
                          <option value="fullstack">Database</option>
                          
                        </select>
                        {orgFormik.touched.industry && orgFormik.errors.industry && <div className="error-msg">{orgFormik.errors.industry}</div>}
                      </div>
                      <div className={`input-group-v2 ${orgFormik.touched.password && orgFormik.errors.password ? 'has-error' : ''}`}>
                        <label>Password</label>
                        <input type="password" {...orgFormik.getFieldProps('password')} placeholder="Create password" />
                        {orgFormik.touched.password && orgFormik.errors.password && <div className="error-msg">{orgFormik.errors.password}</div>}
                      </div>
                      <div className={`input-group-v2 ${orgFormik.touched.confirmPassword && orgFormik.errors.confirmPassword ? 'has-error' : ''}`}>
                        <label>Confirm Password</label>
                        <input type="password" {...orgFormik.getFieldProps('confirmPassword')} placeholder="Repeat password" />
                        {orgFormik.touched.confirmPassword && orgFormik.errors.confirmPassword && <div className="error-msg">{orgFormik.errors.confirmPassword}</div>}
                      </div>
                      <button type="submit" className="login-btn-v2" disabled={isLoading}>
                        {isLoading ? <div className="loader-v2" /> : <ShinyText text="REGISTER ORG" />}
                      </button>
                    </form>
                    <div className="login-footer-v2">
                      <button onClick={() => setMode('role-select')} className="btn-link">Change Role</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Decoration Side */}
            <motion.div layout className={`login-decoration-side d-none d-lg-flex ${role ? role : ''}`}>
              <div className="decoration-content-v2 text-white p-5 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={role || 'default'}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="display-5 fw-bold mb-3">
                      {role === 'volunteer' ? 'Start Your Journey' : role === 'organization' ? 'Find Your Talent' : 'Make an Impact'}
                    </h2>
                    <p className="lead opacity-80 mb-5">
                      {role === 'volunteer' 
                        ? 'Connect with organizations that need your skills.' 
                        : role === 'organization' 
                          ? 'Find dedicated volunteers for your cause.' 
                          : 'Join our growing community.'}
                    </p>
                    <div className="stats-grid-v3">
                      <div className="stat-card">
                        <CountUp to={12450} from={0} duration={2} className="h3 d-block fw-bold" />
                        <span className="small opacity-70 uppercase tracking-wider">Volunteers</span>
                      </div>
                      <div className="stat-card">
                        <CountUp to={850} from={0} duration={2.5} className="h3 d-block fw-bold" />
                        <span className="small opacity-70 uppercase tracking-wider">Organizations</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

          </motion.div>
        </FadeContent>
      </div>
    </div>
  );
}
