import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import Layout from "../components/Layout/Layout";

function Contact() {

  const [selectedInquiry, setSelectedInquiry] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    generalInquiry: false,
    recipeAssistance: false,
    technicalInquiry: false,
    feedback: false,
    message: ""
  })

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData);

    const emailParams = {
      from_name: formData.firstName + " " + formData.lastName,
      from_email: formData.email,
      phone_number: formData.phoneNumber,
      message: formData.message,
      subject: selectedInquiry,
    };

    emailjs
      .send("service_wm5ej6r", "template_6u16bp6", emailParams, {
        publicKey: "barod1VE6oGwO1rac",
      })
      .then(
        (response) => {
          console.log('Email sent successfully:', response);

          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            generalInquiry: false,
            recipeAssistance: false,
            technicalInquiry: false,
            feedback: false,
            message: ""
          });

          setSelectedInquiry("");
        })
        .catch(error => {
          console.error('Error sending email:', error);
        });

    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phoneNumber: "",
    //   generalInquiry: false,
    //   recipeAssistance: false,
    //   technicalInquiry: false,
    //   feedback: false,
    //   message: ""
    // });
  }
  
  function handleChange(event) {
    const key = event.target.id
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    
    if (event.target.type === "checkbox" && value) {
      setFormData({
        ...formData,
        generalInquiry: false,
        recipeAssistance: false,
        technicalInquiry: false,
        feedback: false,
        [key]: value
      });
      setSelectedInquiry(event.target.nextSibling.textContent.trim());
    }
    else {
      setFormData({ 
        ...formData, 
        [key]: value
      })
    }
  }
  
  console.log(formData)
  console.log(selectedInquiry)

  return (
    <Layout>
      <div className="title-container">
        <h1 className="titleText">How can we help you out?</h1>
        <h1 className="titleText">Reach out to us or visit our nearest office.</h1>
      </div>

      <div className="main-container">
        <div className="info-container">
          <div className="info-container-heading">
            <h2 style={{ fontSize: '24px' }}>Contact Information</h2>
            <p>Say something to start a chat!</p>
          </div>

          <div className="info-container-content">
            <p className="content-p-tags">🕾 +1012 3456 789</p>
            <p className="content-p-tags">🖂 demo@gmail.com</p>
            <p className="content-p-tags">🖈 262 Tama Towers, Lubowitzshire, IA 49410</p>
          </div>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  id="generalInquiry"
                  checked={formData.generalInquiry}
                  onChange={handleChange}
                />
                General Inquiry
              </label>

              <label>
                <input
                  type="checkbox"
                  id="recipeAssistance"
                  checked={formData.recipeAssistance}
                  onChange={handleChange}
                />
                Recipe Assistance
              </label>

              <label>
                <input
                  type="checkbox"
                  id="technicalInquiry"
                  checked={formData.technicalInquiry}
                  onChange={handleChange}
                />
                Technical Inquiry
              </label>

              <label>
                <input
                  type="checkbox"
                  id="feedback"
                  checked={formData.feedback}
                  onChange={handleChange}
                />
                Feedback
              </label>
            </div>

            <div className="message-container">
              <label htmlFor="message">Message</label>
              <input
                type="text"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
              />
            </div>

            <button type="submit" className="submit-button">Send Message</button>

          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Contact;
