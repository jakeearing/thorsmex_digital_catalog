import React, { useState } from 'react';
import '../assets/styles/email-form.css';

export default function ClaimForm() {
    const [zipCode, setZipCode] = useState('');
    const [inquiryType, setInquiryType] = useState('Purchase');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    };

    const handleInquiryTypeChange = (event) => {
        setInquiryType(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            formType: 'default',
            inquiryType,
            subject,
            message,
            fullName: event.target.elements['full-name'].value,
            email: event.target.elements.email.value,
            phone: event.target.elements.phone.value,
            company: event.target.elements.company.value,
            city: event.target.elements.city.value,
            state: event.target.elements.state.value,
            country: event.target.elements.country.value,
        };

        // Determine the API URL based on the environment
        const apiUrl = process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_API_URL_DEV_EMAIL
            : process.env.REACT_APP_API_URL_PROD_EMAIL;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    alert(content.formStatus.success);
                    console.log('Email sent!');
                    // Clear the form after successful submission
                    setClaimType('');
                    setClaimStatus('');
                    setZipCode('');
                    // Reset the form fields
                    event.target.reset();
                } else {
                    alert(content.formStatus.fail);
                    console.log('Error sending email', error);
                }
            })
            .catch((error) => {
                console.log('Server responded with an error:', response.status);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="inquiry-type">Nature of Inquiry:</label>
                            <select id="inquiry-type" onChange={handleInquiryTypeChange} value={inquiryType}>
                                <option value="Purchase">Purchase</option>
                                <option value="Product Availability">Product Availability</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" id="subject" onChange={handleSubjectChange} value={subject} required />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" onChange={handleMessageChange} value={message} required />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="full-name">Full Name:</label>
                            <input type="text" id="full-name" required />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="email">Email Address:</label>
                            <input type="email" id="email" required />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="tel" id="phone" required />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="company">Company:</label>
                            <input type="text" id="company" required />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" required />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="state">State:</label>
                            <input type="text" id="state" required />
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="country">Country:</label>
                            <input type="text" id="country" required />
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <button className="form-button" type="submit">Submit</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}
