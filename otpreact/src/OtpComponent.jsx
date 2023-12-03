import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const OtpComponent = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState(null); // Define otpValue state
  const sendOTP = () => {
    // Generating a random number as OTP
    const generatedOtp = Math.floor(Math.random() * 10000);
    
    // Compose the email body
    const emailBody = `
    Your OTP is ${generatedOtp}
    `;
    emailjs.init('qKisx7V6wVccVa9oE');

    // Send the email using emailjs-com
    emailjs
      .send('service_x9aqjl7', 'template_kyubk3o', {
        to_email: email,
        message_html: emailBody,
      })
      .then((response) => {
        console.log('EmailJS Response:', response, 'generated otp :', generatedOtp);
    
        if (response.status === 200) {
          alert(`OTP sent to your email ${email}`);
          setOtpValue(generatedOtp);
          setOtpSent(true);
        } else {
          console.error('EmailJS Error:', response);
        }
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
      });
  };

  const verifyOTP = () => {
    if (otp === '') {
      alert('Please enter the OTP.');
      return;
    }

    // Check whether the entered OTP is valid
    if (parseInt(otp) === otpValue) {
      alert('Email address verified...');
    } else {
      alert('Invalid OTP');
    }
  };

  const handleEmailKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      sendOTP(); // Call the sendOTP function when Enter is pressed in the email input
    }
  };

  const handleOTPKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      verifyOTP(); // Call the verifyOTP function when Enter is pressed in the OTP input
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center">OTP Verification</h1>
        {!otpSent && (<div className="mb-4">
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500"
            type="email"
            placeholder="Enter Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleEmailKeyPress}
          />
        </div>)}
  
        {otpSent && (
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500"
              type="text"
              placeholder="Enter the OTP sent to your Email..."
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyPress={handleOTPKeyPress}
            />
          </div>
        )}
  
        <div className="flex justify-center">
          {otpSent ? (
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring"
              onClick={verifyOTP}
            >
              Verify
            </button>
          ) : (
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring"
              onClick={sendOTP}
            >
              Send OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}  

export default OtpComponent;
