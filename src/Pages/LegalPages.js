import React from "react";
import StaticPage from "../Components/StaticPage";

export const PrivacyPage = () => (
  <StaticPage 
    title="Privacy Policy" 
    icon="bi-shield-lock"
    content={
      <>
        <p>Your privacy is important to us. At <strong>inpLace</strong>, we are committed to protecting your personal data and being transparent about how we collect and use it.</p>
        <h5 className="text-dark fw-bold mt-4">1. Data Collection</h5>
        <p>We collect information you provide directly to us when you create an account, such as your name, email, and technical skills.</p>
        <h5 className="text-dark fw-bold mt-4">2. Use of Information</h5>
        <p>The data we collect is used solely to match you with the most relevant volunteer opportunities and to improve our platform experience.</p>
        <h5 className="text-dark fw-bold mt-4">3. Data Security</h5>
        <p>We implement industry-standard security measures to protect your information from unauthorized access or disclosure.</p>
      </>
    }
  />
);

export const TermsPage = () => (
  <StaticPage 
    title="Terms of Service" 
    icon="bi-file-earmark-text"
    content={
      <>
        <p>By using <strong>inpLace</strong>, you agree to comply with and be bound by the following terms and conditions of use.</p>
        <h5 className="text-dark fw-bold mt-4">1. Acceptance of Terms</h5>
        <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use.</p>
        <h5 className="text-dark fw-bold mt-4">2. User Conduct</h5>
        <p>Users are expected to interact with organizations and other volunteers with professionalism and respect.</p>
        <h5 className="text-dark fw-bold mt-4">3. Disclaimer</h5>
        <p>The materials on inpLace's website are provided "as is". inpLace makes no warranties, expressed or implied.</p>
      </>
    }
  />
);

export const ContactPage = () => (
  <StaticPage 
    title="Contact Us" 
    icon="bi-envelope-paper"
    content={
      <>
        <p>Have questions or need support? We're here to help you make an impact.</p>
        <div className="card bg-light border-0 p-4 mt-4 rounded-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <i className="bi bi-geo-alt-fill text-primary"></i>
            <span>123 Tech Avenue, Innovation City</span>
          </div>
          <div className="d-flex align-items-center gap-3 mb-3">
            <i className="bi bi-envelope-fill text-primary"></i>
            <span>support@inplace.org</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-telephone-fill text-primary"></i>
            <span>+1 (555) 000-1234</span>
          </div>
        </div>
        <button className="btn btn-primary rounded-pill px-5 mt-4 py-3 shadow-sm">
          Send a Message
        </button>
      </>
    }
  />
);

export const AboutPage = () => (
  <StaticPage 
    title="About inpLace" 
    icon="bi-info-circle"
    content={
      <>
        <p><strong>inpLace</strong> is a platform where skills meet service. We believe that technology should be a force for good in the world.</p>
        <p className="mt-3">Founded in 2024, our mission is to connect passionate developers, designers, and tech professionals with organizations that are making a real difference in their communities.</p>
        <h5 className="text-dark fw-bold mt-4">Our Vision</h5>
        <p>A world where every non-profit has the technical resources they need to thrive, and every technologist has a path to meaningful contribution.</p>
      </>
    }
  />
);

export const HowItWorksPage = () => (
  <StaticPage 
    title="How It Works" 
    icon="bi-gear-wide-connected"
    content={
      <>
        <p>Getting started with <strong>inpLace</strong> is simple and designed to get you coding for good as quickly as possible.</p>
        <h5 className="text-dark fw-bold mt-4">1. Create Your Profile</h5>
        <p>Tell us about your skills in Frontend, Backend, or Database management. Your profile is your technical resume for non-profits.</p>
        <h5 className="text-dark fw-bold mt-4">2. Explore Opportunities</h5>
        <p>Browse through filtered roles that match your specific tech stack and interests.</p>
        <h5 className="text-dark fw-bold mt-4">3. Apply & Collaborate</h5>
        <p>Apply to roles you love. Once accepted, you'll work directly with the organization to make a real-world impact.</p>
      </>
    }
  />
);

export const ImpactPage = () => (
  <StaticPage 
    title="Our Global Impact" 
    icon="bi-graph-up-arrow"
    content={
      <>
        <p>Every line of code written on <strong>inpLace</strong> contributes to a larger mission. We measure our success by the success of our partner organizations.</p>
        <div className="row g-4 mt-3">
           <div className="col-md-6 text-center">
              <div className="p-3 bg-lavender rounded-4">
                 <h2 className="fw-bold text-primary">500+</h2>
                 <p className="small mb-0">Projects Completed</p>
              </div>
           </div>
           <div className="col-md-6 text-center">
              <div className="p-3 bg-lavender rounded-4">
                 <h2 className="fw-bold text-primary">2.5k</h2>
                 <p className="small mb-0">Volunteers Joined</p>
              </div>
           </div>
        </div>
        <h5 className="text-dark fw-bold mt-4">Stories of Change</h5>
        <p>From rebuilding educational portals to optimizing medical supply databases, our volunteers are changing the world one commit at a time.</p>
      </>
    }
  />
);
