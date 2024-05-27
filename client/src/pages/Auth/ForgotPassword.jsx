import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";


const ForgotPassword = () => {

    const [email,setEmail] = useState("")    
    const [newPassword,setNewPassword] = useState("")
    const [answer,setAnswer] = useState("")

    const navigate = useNavigate()

    //form function
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/forgot-password`,
            { email, newPassword, answer});
            console.log(res);
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    };

  return (
    <Layout title={"Forgot Password-Ecommerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h4 className="title">RESET PASSWORD</h4>
            <div className="mb-3">
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' className="form-control" required />
            </div>
            <div className="mb-3">
                <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder='Enter Your Favourite Sport' className="form-control" required />
            </div>
            <div className="mb-3">
                <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='Enter Your Password' className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Reset</button>
        </form>

      </div>
    </Layout>
  )
}

export default ForgotPassword