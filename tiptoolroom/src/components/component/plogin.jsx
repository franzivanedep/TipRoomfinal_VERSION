'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Plogin() {

 const [email, setEmail] = useState("");
 const [userPass, setUserPass] = useState(""); // renamed 'a' to 'setUserPass'
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
  
      if (roleResult.role_id === 1) {
        router.push('/');
        return;
      }       if (roleResult.role_id !== 2) {
        alert("Unauthorized access. Only students role");
        router.push('/');
        return;
      }
  
      const response = await fetch('http://localhost:6969/p/login', {
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
      localStorage.setItem('P_ID', result.p_id);
    
      console.log("USER LOGIN WITH ID : ", localStorage.getItem('ID'));
      console.log("STUDENT ID : ", localStorage.getItem('P_ID'));
    
      router.push('/professor/dashboard'); 
  } catch (e) {
      alert("Wrong Credentials");
      router.push('/');
  }
 };




  
return (
  <div className="flex items-center justify-center h-screen">
     <div className="bg-white p-6 border border-gray-300 shadow-lg rounded-lg max-w-[350px] space-y-6">
       <div className="space-y-2 text-center">
         <h1 className="text-3xl font-bold">Professor Log In</h1>
         <p className="text-gray-500 dark:text-gray-400">Enter your email to get started</p>
       </div>
       <div className="space-y-4">
         <div className="space-y-2">
           <Label htmlFor="email">Email</Label>
           <Input id="email" placeholder="m@tip.edu.ph" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
         </div>
         <div className="space-y-2">
           <Label htmlFor="Password">Password</Label>
           <Input id="password" placeholder="password" required type="password" value={userPass} onChange={e => setUserPass(e.target.value)} />
         </div>
         <Button onClick={() => handleSubmit(email, userPass)} className="w-full" type="submit">Continue</Button>
       </div>
       <p className="text-gray-500 dark:text-gray-400">
         <Link href="/professor/Register">Not Register yet?</Link>
       </p>
     </div>
  </div>
 );
 
}
