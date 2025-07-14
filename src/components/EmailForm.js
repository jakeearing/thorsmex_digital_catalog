import React, { useState } from 'react';
import '../assets/styles/email-form.css';

export default function ContactForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            formType: 'default',
            fullName,
            email,
            subject,
            message,
        };

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
                    alert("Form submitted successfully! We will reach out to you within 24 hours!");
                    setFullName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                } else {
                    alert("Error submitting form.");
                }
            })
            .catch((error) => {
                console.log('Server responded with an error:', error);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <input
                                type="text"
                                id="full-name"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                placeholder="Subject"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <textarea
                                id="message"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Message"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <button className="default-button form-button" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
