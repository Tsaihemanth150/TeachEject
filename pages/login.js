import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Link from "next/link";
import { GrPowerCycle } from "react-icons/gr";



const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0); 
  const [captcha, setCaptcha] = useState(null);
  const [captchaInput, setCaptchaInput] = useState('');

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    setCaptcha({ num1, num2 });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captcha.num1 + captcha.num2) {
      toast.error('Invalid captcha', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const data = { username, password };
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


    const blockUser = async (username) => {

      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/block`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      // Handle response as needed
    };



    let response = await res.json();
    setUsername('');
    setPassword('');
    if (response.success) {
      localStorage.setItem('token', response.token);
      toast.success('Login successful', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/admindashboard`);
      }, 2000);
    } else {

      if (response.error === "Incorrect details") {
        setLoginAttempts(prev => prev + 1); // Increment login attempts
      
        const maxAttempts = process.env.NEXT_PUBLIC_NUMBER_OF_ATTEMPTS ; // Get maximum attempts from environment variable or default to 3
      
        if (loginAttempts >= maxAttempts) { // Check if attempts exceed limit
            blockUser(username); // Call function to block user
        }
    }
    

      toast.error(response.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

    
    return(
        <main>
        <Head>
    <title>login</title>
  </Head>
  <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
 <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-29 rounded-full w-auto" src="techweb.jpeg" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6"  method="POST">
      <div>
        <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div className="mt-2">
          <input value={username} onChange={handleChange} id="username" name="username" type="text" autoComplete="eusernamemail" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link href="/forgotpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
 <div>
  <div className="flex items-center">
    <label htmlFor="captcha" className="text-sm font-medium leading-6 text-gray-900 mr-2">
      Captcha: {captcha ? `${captcha.num1} + ${captcha.num2} = ?` : ''}
    </label>
    <GrPowerCycle onClick={generateCaptcha} className="mr-2" />
  </div>
  <div className="mt-2">
    <input 
      value={captchaInput} 
      onChange={(e) => setCaptchaInput(e.target.value)} 
      id="captcha" 
      name="captcha" 
      type="text" 
      required 
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
</div>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> signup to be part jofull family</Link>
    </p>
  </div>
</div>
       </main>
    )

}



export default Login;