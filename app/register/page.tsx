import { signUp } from "@/lib/auth-client";
import { useState } from "react";

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [role, setRole] = useState("buyer"); // ডিফল্ট বায়ার

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  
  await signUp.email({
    email,
    password,
    name,
    
    data: {
      role: role, 
      plan: "free"
    }
  }, {
    onSuccess: () => {
      alert("Registration Successful!");
      window.location.href = "/dashboard";
    },
    onError: (ctx) => {
      alert(ctx.error.message);
    }
  });
};