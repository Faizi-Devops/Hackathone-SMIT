import Link from 'next/link';
import { getAuth, signOut } from "firebase/auth";
import { auth } from '@/config/fire';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
const Navbar = () => {
    const router = useRouter();


    const onSignoutHandler = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            toast.success("User Sign Out Successfully")
            router.push('/Landing')

            
        }).catch((error) => {
            toast.error(error)
        });


    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Event Management System</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <a className="nav-link" href="Events"><Link href="/Events" className='nostyle'>Events</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><Link href="/Dashboard" className='nostyle'>Create My Events</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><Link href="/Join" className='nostyle'>Join Events</Link></a>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">

                            <button className="btn btn-success rounded-pill" type="button" onClick={onSignoutHandler}>SignOut</button>
                        </form>

                    </div>
                </div>
            </nav>

        </div>
    )

}
export default Navbar;