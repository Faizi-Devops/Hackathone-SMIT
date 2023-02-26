import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/fire";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css';
import { collection, addDoc } from "firebase/firestore"; 
import Link from 'next/link'
import { db } from "@/config/fire";

const Register = () => {
    const router = useRouter();
    const [naming,setNaming]=useState("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loader, setLoader] = useState(false)




    const alpha = (e: any) => {
        setEmail(e.target.value);


    }
    const beta = (e: any) => {
        setPassword(e.target.value);


    }
    const gema = (e:any) =>{
        setNaming(e.target.value)

    }

    const onRegisterHandler = async () => {
        setLoader(true)
        try {

            const userCredential= await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            const uid = user.uid;

            let usersAdding = {
                Name:naming,
                Email:email,
                userId:uid
            }
             await addDoc(collection(db, "users"),usersAdding);



            setEmail("")
            setPassword("")
            // try {
               
            //     console.log("Document written with ID: ", docRef.id);
            //   } catch (e) {
            //     console.error("Error adding document: ", e);
            //   }
            toast.success('👍 Registration Successfully done', {
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

            router.push('/Login')



        } catch (error: any) {
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
                        <h5 className="card-title text-center mt-3">Register</h5>
                        <div className="mb-3">
                            <label htmlFor="exampleusername" className="form-label">Username</label>
                            <input type="text" className="form-control" id="exampleusername" value={naming} placeholder="Faizan Ali" onChange={gema}/>
                        </div>

                        <div className="mb-3 mt-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} id="exampleFormControlInput1" placeholder="name@example.com" onChange={alpha} />
                        </div>
                        <div className="mb-3 mt-4">
                            <label htmlFor="exampleFormPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} id="exampleFormPassword" placeholder="********" onChange={beta} />
                        </div>
                        <div>
                            <p>Already have account. <span className={styles.blink}><Link href="/Login" className={styles.no}>Login!</Link></span></p>
                        </div>
                        <div className="text-center mt-5 mb-3">
                            {
                                loader ? <button type="button" className="btn btn-primary w-50" disabled={true}><div className="spinner spinner-grow spinner-grow-sm"></div></button> :

                                    <button type="button" className="btn btn-primary w-50" onClick={onRegisterHandler}>Register</button>}

                        </div>

                    </div>
                </div>

            </div>



        </div>
    )
}
export default Register;