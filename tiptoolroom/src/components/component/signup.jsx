'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import styles from "./signup.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import logo from '../../../public/logo.png';

export function Signup() {

 const [email, setEmail] = useState("");
 const [userPass, setUserPass] = useState(""); 
 const router = useRouter();
 const handleSubmit = async (email, userPass) => {
  const existingToken = sessionStorage.getItem('jwt');
       
  if (existingToken) {
      alert('Another user is already logged in.');
      return; 
  }
  
  if (email.trim() === "" || userPass.trim() === "") {
      alert("Email and password cannot be empty.");
      return;
  }
  
  if (!email.includes("@")) {
      alert("Invalid email: Email must contain '@'.");
      return;
  }
  
  try {
      // First, check the role_id
      const roleResponse = await fetch(`http://localhost:6969/check/accounts?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!roleResponse.ok) {
        throw new Error(`HTTP error! status: ${roleResponse.status}`);
      }
  
      const roleResult = await roleResponse.json();
  
      if (roleResult.role_id === 2) {
        router.push('/professor/Login');
        return;
      }       if (roleResult.role_id !== 1) {
        alert("Unauthorized access. Only students role");
        router.push('/');
        return;
      }
  
      const response = await fetch('http://localhost:6969/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: userPass,
        }),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      localStorage.setItem('ID', result.ID);
      sessionStorage.setItem('jwt', result.token);
      localStorage.setItem('S_ID', result.s_id);
    
      console.log("USER LOGIN WITH ID : ", localStorage.getItem('ID'));
      console.log("STUDENT ID : ", localStorage.getItem('S_ID'));
    
      router.push('/profile'); 
  } catch (e) {
      alert("Wrong Credentials");
      router.push('/');
  }
 };
 
 


  
return (
  <main className={[styles.pageWrapper]} style={{width:window.innerWidth,height:window.innerHeight,marginTop:-96,marginBottom:-100}}>
     <Image src={logo} alt="Logo" className="logo" width={75} height={20} />
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', maxWidth: '500px', backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <h1 className="text-3xl font-bold mb-4">Welcome to the T.I.P. Toolroom</h1>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Log In</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your email to get started</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@tip.edu.ph" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="password" required type="password" value={userPass} onChange={e => setUserPass(e.target.value)} />
          </div>
          <Button onClick={() => handleSubmit(email, userPass)} className="w-full" type="submit">Continue</Button>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          <Link href="/registration">Not Register yet?</Link>
        </p>
      </div>
    </main>
  );
}
