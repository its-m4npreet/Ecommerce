
import React, { useState } from "react";
import { FaUserAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [errMsg, setErrMsg] = useState("");



    const handleSubmit = async(e) => {
        e.preventDefault();
  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword
      })
    });
    console.log(response);
    const data = await response.json();
    if (response.ok) {
      // Registration successful
      alert('Registration successful!');
    } else {
      // Show error from backend
      console.log(data);
        setErrMsg(data.message);
      setError(data.error || 'Registration failed');
    }
  } catch (err) {
      console.log('Network error', err);
    setError('Network error', err.message);
  
  }
};

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#23232a] px-4 ">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#23232a]/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-7 border border-gray-800 my-4"
                >
                    <div className="flex flex-col items-center mb-2">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#18181b] mb-2 shadow-lg">
                            <FaUserPlus  className="text-white text-3xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-200">Create Account</h2>
                    </div>
                    {error && (
                        <div className="bg-red-500/20 text-red-400 text-sm rounded px-3 py-2 text-center mb-2 animate-pulse">
                            {error}
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-gray-200 font-medium flex items-center gap-2">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="rounded px-4 py-2 bg-[#18181b] text-gray-100 border border-gray-700 focus:border-blue-400 outline-none transition placeholder:text-gray-500"
                            placeholder="Enter your name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            style={{ paddingTop: '0.5rem' ,paddingBottom: '0.5rem' }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-200 font-medium flex items-center gap-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="rounded px-4 py-2 bg-[#18181b] text-gray-100 border border-gray-700 focus:border-blue-400 outline-none transition placeholder:text-gray-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ paddingTop: '0.5rem' ,paddingBottom: '0.5rem' }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-200 font-medium flex items-center gap-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="rounded px-4 py-2 bg-[#18181b] text-gray-100 border border-gray-700 focus:border-blue-400 outline-none transition w-full placeholder:text-gray-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                style={{ paddingTop: '0.5rem' ,paddingBottom: '0.5rem' }}
                            />
                            <span
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-300 focus:outline-none cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                            </span>
                            {
                            
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-gray-200 font-medium flex items-center gap-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className="rounded px-4 py-2 bg-[#18181b] text-gray-100 border border-gray-700 focus:border-blue-400 outline-none transition w-full placeholder:text-gray-500"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                style={{ paddingTop: '0.5rem' ,paddingBottom: '0.5rem' }}
                            />
                            <span
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-300 focus:outline-none cursor-pointer"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                            </span>
                        </div>
                        {password && confirmPassword && password !== confirmPassword && (
                        <div className="text-red-500 text-sm text-center -mt-1 animate-pulse">
                            Passwords do not match
                        </div>
                    ) || (errMsg && (
                        <div className="text-red-500 text-sm text-center -mt-1 animate-pulse">
                            {errMsg}
                        </div>
                    ))}
                    </div>
                    
                    <button
                        type="submit"
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow transition-all text-lg tracking-wide"
                    >
                        Register
                    </button>
                    {/* <div className="flex items-center gap-2 my-2">
                        <div className="flex-1 h-px bg-gray-700" />
                        <span className="text-gray-500 text-xs">or</span>
                        <div className="flex-1 h-px bg-gray-700" />
                    </div> */}
                    <div className="text-center text-gray-400 text-sm mt-2">
                        Already have an account? <Link to="/auth/login" className="text-blue-400 hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        );
};

export default Register;
