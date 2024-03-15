import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className="error-container">
            <h1 className="error-title">404 Error - Page Not Found</h1>
            <p className="error-message">
                Oops! The page you are looking for does not exist.
            </p>
        </div>
    );
}

export default ErrorPage;