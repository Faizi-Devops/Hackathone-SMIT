import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/fire";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from '../styles/Reset.module.css'

const Reset = () => {
    const router = useRouter();
    const [email,setEmail]=useState("")
    const [loader,setLoader]=useState(false)

    const alpha = (e:any) =>{
    setEmail(e.target.value);
        
    }

    const onResetHandler = async() =>{
        setLoader(true)
        await sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success("Reset Password Email Send")
    router.push('/Login')
    setEmail("")
    setLoader(false)
    
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
    setEmail("")
    setLoader(false)
    // ..
  });


    }
    return (
        <div className={styles.background}>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className={`card ${styles.backcard}`} style={{ width: "24rem" }}>

                    <div className="card-body">
                        <h5 className="card-title text-center">Reset Password</h5>
                        <div className="mb-3 mt-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Reset Password</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="fa16947@gmail.com" onChange={alpha}/>
                        </div>
                        <div className="text-center">
                            {
                                loader?<button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </button>:
                            
                        <button type="button" className="btn btn-primary" onClick={onResetHandler}>Reset Password</button>}

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
export default Reset;