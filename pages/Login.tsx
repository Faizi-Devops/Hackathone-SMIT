import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/fire";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Link from 'next/link'

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loader, setLoader] = useState(false)
    



    const alpha = (e:any) =>{
        setEmail(e.target.value);
       
        

    }
    const beta = (e:any) =>{
        setPassword(e.target.value);
        

    }

    const onLoginHandler = async () => {
        try {
            setLoader(true)
            await signInWithEmailAndPassword(auth, email, password)
            setEmail("")
            setPassword("")
            toast.success('👍 Login Successfully done', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                setLoader(false)
            router.push('/Maining')



        } catch (error:any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                setEmail("")
                setPassword("")
                setLoader(false)


        }



    }

    return (
        <div className={styles.back}>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className={`card ${styles.backcard}`} style={{ width: "24rem" }}>

                    <div className="card-body">
                        <h5 className="card-title text-center mt-3">Login</h5>
                        <div className="mb-3 mt-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} id="exampleFormControlInput1" placeholder="name@example.com" onChange={alpha}/>
                        </div>
                        <div className="mb-3 mt-4">
                            <label htmlFor="exampleFormPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} id="exampleFormPassword" placeholder="********" onChange={beta}/>
                        </div>
                        <div>
                            <p>Don't have account. <span className={styles.blinking}><Link href="/Register" className={styles.texttra}>Register!</Link></span></p>

                        </div>
                        <div>
                        <p><span ><Link href="/Reset" className={styles.texttra}>Reset Password</Link></span></p>
                        </div>
                        <div className="text-center mt-5 mb-3">
                            {
                                loader?<button type="button" className="btn btn-primary w-50"><div className="spinner spinner-grow spinner-grow-sm"></div></button>:
                            
                            <button type="button" className="btn btn-primary w-50" onClick={onLoginHandler}>Login</button>}

                        </div>

                    </div>
                </div>

            </div>



        </div>
    )
}
export default Login;