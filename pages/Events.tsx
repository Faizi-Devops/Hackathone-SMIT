import Navbar from "@/components/Navbar/Navbar";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/fire";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


const Events = () => {
    const [data, setData] = useState<any[]>([])
    const [search,setSearch]=useState("")

    const alpha = (e:any) =>{
        setSearch(e.target.value)


    }

    useEffect(() => {
        getData()

    }, [])




    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Todo");
            console.log(response.data)
            setData(response.data);
            
        } catch (error) {
            console.log(error)
            
        }

    }
    const onAttendies = async () => {
        console.log("data mein kuch na kuch", ...data);

        try {
            const docRef = await addDoc(collection(db, "attendies"), {...data});
            toast.success("Data Successfully Distached")
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }
    return (
        <div>
            <Navbar />
            <h1 className="allevents">All Events</h1>

            <div className="mb-3">

                <input type="text" className="form-control" placeholder="Search" onChange={alpha}/>
            </div>

            <table className="table table-striped mt-5 ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Location</th>
                        <th scope="col">Event Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Time</th>
                        <th scope="col">Event Add</th>

                    </tr>
                </thead>
                {
                    data.filter((item)=>item.title.includes(search)).map((value:any, index) => {

                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value._id}</td>
                                    <td>{value.title}</td>
                                    <td>{value.location}</td>
                                    <td>{value.date}</td>
                                    <td>{value.description}</td>
                                    <td>{value.time}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary rounded-pill" onClick={onAttendies}>Join Event</button>
                                    </td>
                                </tr>
                            </tbody>

                        )
                    })
                }

            </table>

        </div>
    )
}
export default Events;