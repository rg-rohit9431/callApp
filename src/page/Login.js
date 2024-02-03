import React from 'react'
import { useState } from 'react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

    const [Doctor, setDoctor] = useState(false);
    const [Patient, setPatient] = useState(true);
    const [razar, setRazar] = useState(false);


    const User = JSON.parse(localStorage.getItem("userInfo")) || {};
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    function changeHandler(event) {

        const { name, value } = event.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    // patient
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:4000/api/PlusCare/Home/userLogIn",
                formData,
                config
            );
            console.log(data);
            if (data.success) {
                // Display success notification
                toast.success("Login successful!");

                // setUser(data);
                localStorage.setItem("userInfo", JSON.stringify(data));
                // navigate("/dashboard");
                setRazar(true);
                setPatient(false);
            } else {
                // Display notification for existing user
                toast.error("User Not exists!");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };
    // doctor
    const submitDoctorHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:4000/api/PlusCare/Home/doctorLogin",
                formData,
                config
            );
            console.log(data);
            //setUser(data);

            if (data.success) {
                // Display success notification
                toast.success("Login successful!");

                // setUser(data);
                localStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/doctordashboard");
            } else {
                // Display notification for existing user
                toast.error("User not exists!");
            }


            // localStorage.setItem("userInfo", JSON.stringify(data));
            // navigate("/doctordashboard");
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    const [package_id, setPackage_id] = useState(null);
    const sid = 672331;
    const tid = package_id;
    const clickHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/PlusCare/Home/initializePayment",
                { amount: 500 }
            );
            const options = {
                key: "rzp_test_j3uMC3pJNVXJpR",
                amount: data.amount,
                currency: data.currency,
                name: "Service",
                description: "Test Transaction",
                order_id: data.id,
                handler: async (response) => {
                    try {
                        const verifyUrl = "http://localhost:4000/api/PlusCare/Home/verifyPayment";
                        const { data } = await axios.post(verifyUrl, {
                            ...response,
                            sid,
                            tid,
                        });
                        console.log(data);
                    } catch (error) {
                        console.log(error);
                    }
                },
                theme: {
                    color: "#3399cc",
                },
            };
            await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            
            navigate("/dashboard");
        }, 20000);

    };

    return (
        <div className='w-full h-fit relative'>

            <div className='px-2 z-[2] w-fit absolute right-3 top-3 rounded-md bg-darkGreen'>
                <button onClick={() => {
                    setPatient(true);
                    setDoctor(false);
                }} className='px-3 py-2 bg-white rounded-lg m-2 font-bold'>Patient</button>
                <button onClick={() => {
                    setDoctor(true);
                    setPatient(false);
                }} className='px-3 py-2 bg-white rounded-lg m-2 font-bold'>Doctor</button>
            </div>
            {
                Doctor &&
                <div className="relative w-[90%] flex md:flex-row flex-col justify-between items-center h-fit">
                    {/* Left Part */}

                    <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg?w=740&t=st=1706198290~exp=1706198890~hmac=7739a023ef1292e394f617ca3040fa0bb0f05e7506bb5966dfef9671edf8f3c2" alt="Vector" className="w-[80%] md:w-[40%] aspect-square" />

                    {/* Right Part */}
                    <form onSubmit={submitDoctorHandler} className="mb-4 flex flex-col justify-around items-center bg-white md:w-[40%] h-[90%]">
                        <div className='relative flex flex-col items-center mb-[130px] w-full h-[60px]'>
                            <img src={logo} alt='logo' className='h-[500%] w-fit mix-blend-multiply' />
                        </div>
                        <div className=' text-3xl text-center leading-10 font-semibold text-[#020617] -tracking-[2%]'>
                            Doctor Login
                        </div>
                        <div className='font-normal  text-center text-[#020617]  w-[90%] -tracking-[2%]'>
                            If you are Id & Password you can login with your email address and password.
                        </div>
                        <div className='flex flex-col items-center w-[100%] '>
                            <label
                                className='w-full py-[.5rem]'
                                htmlFor='email'>
                                <p
                                    className='text-xl font-medium  text-[#020617] pl-[3rem]'
                                >Email address
                                </p>
                            </label>
                            <input
                                type='email'
                                name='email'
                                onChange={changeHandler}
                                value={formData.email}
                                className='border-none outline-slate-200 ring-1 p-2 rounded-lg h-14 w-[85%]'
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>
                        <div className='flex items-center flex-col w-[100%] relative'>
                            <label
                                className='w-full py-[.5rem]'
                                htmlFor='password'>
                                <p
                                    className='text-xl font-medium text-[#020617] pl-[3rem]'
                                >Password:
                                </p>
                            </label>
                            <input
                                type='password'
                                name='password'
                                onChange={changeHandler}
                                value={formData.password}
                                className='border-none  outline-slate-200 ring-1 p-2 rounded-lg h-14 w-[85%]'
                                placeholder="Enter The Password"
                                required
                            />
                        </div>
                        <button className=' h-14 w-[85%] ml-3 mt-6 bg-darkGreen border rounded-lg px-5 py-3 flex justify-center items-center text-[#ffffff]  text-base font-semibold tracking-tighter '>
                            Login
                        </button>
                        <div className="text-slate-950 ml-3">
                            Don't have an account ? <Link to="/subscription" className="font-bold">Register</Link>
                        </div>
                    </form>
                </div>
            }
            {
                Patient &&
                <div className="relative w-[90%] flex md:flex-row flex-col justify-between items-center h-fit">
                    {/* Left Part */}

                    <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg?w=740&t=st=1706198290~exp=1706198890~hmac=7739a023ef1292e394f617ca3040fa0bb0f05e7506bb5966dfef9671edf8f3c2" alt="Vector" className="w-[80%] md:w-[40%] aspect-square" />

                    {/* Right Part */}
                    <form onSubmit={submitHandler} className="mb-4 flex flex-col justify-around items-center bg-white md:w-[40%] h-[90%]">
                        <div className='relative flex flex-col items-center mb-[130px] w-full h-[60px]'>
                            <img src={logo} alt='logo' className='h-[500%] w-fit mix-blend-multiply' />
                        </div>
                        <div className=' text-3xl text-center leading-10 font-semibold text-[#020617] -tracking-[2%]'>
                            Patient Login
                        </div>
                        <div className='font-normal  text-center text-[#020617]  w-[90%] -tracking-[2%]'>
                            If you are Id & Password you can login with your email address and password.
                        </div>
                        <div className='flex flex-col items-center w-[100%] '>
                            <label
                                className='w-full py-[.5rem]'
                                htmlFor='email'>
                                <p
                                    className='text-xl font-medium  text-[#020617] pl-[3rem]'
                                >Email address
                                </p>
                            </label>
                            <input
                                type='email'
                                name='email'
                                onChange={changeHandler}
                                value={formData.email}
                                className='border-none outline-slate-200 ring-1 p-2 rounded-lg h-14 w-[85%]'
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>
                        <div className='flex items-center flex-col w-[100%] relative'>
                            <label
                                className='w-full py-[.5rem]'
                                htmlFor='password'>
                                <p
                                    className='text-xl font-medium text-[#020617] pl-[3rem]'
                                >Password:
                                </p>
                            </label>
                            <input
                                type='password'
                                name='password'
                                onChange={changeHandler}
                                value={formData.password}
                                className='border-none  outline-slate-200 ring-1 p-2 rounded-lg h-14 w-[85%]'
                                placeholder="Enter The Password"
                                required
                            />
                        </div>
                        <button className=' h-14 w-[85%] ml-3 mt-6 bg-darkGreen border rounded-lg px-5 py-3 flex justify-center items-center text-[#ffffff]  text-base font-semibold tracking-tighter '>
                            Login
                        </button>
                        <div className="text-slate-950 ml-3">
                            Don't have an account ? <Link to="/subscription" className="font-bold">Register</Link>
                        </div>
                    </form>



                </div>
            }

            {
                razar &&
                <div className='flex items-center flex-col'>
                    <div className='flex justify-center p-4 gap-[3rem]'>
                        <div className='text-darkGreen text-[2.4rem] '>Name: <span className='text-black text-[2rem]'>{User.user.childName}</span></div>
                        <div className='text-darkGreen text-[2.4rem] '>Email: <span className='text-black text-[2rem]'>{User.user.email}</span></div>
                    </div>

                    <div className='flex justify-center p-4 gap-[3rem]'>
                        <div className='text-darkGreen text-[2.4rem] '>Pnone No: <span className='text-black text-[2rem]'>{User.user.contact}</span></div>
                        <select onChange={(e) => {
                            setPackage_id(e.target.value);
                        }} className="border-b-2 border-b-darkGreen  p-2" name="package_id" id='package_id' >
                            <option className='py-1' value="">Select Package</option>
                            <option value="male">child</option>
                            <option value="female">female</option>
                            <option value="other">old man</option>
                        </select>

                    </div>
                    <div className='text-darkGreen my-2 text-[2.4rem]'>Your payment is: 500</div>
                    <button className='px-9 py-3 bg-blue rounded-md' onClick={clickHandler}>Purchase</button>
                </div>
            }
        </div>
    )
}

export default Login