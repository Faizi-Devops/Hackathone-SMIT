import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/config/fire";
import axios from "axios";
const Showevents = () =>{
    const [data, setData] = useState([])
   
    useEffect(() => {
        orReadData()


    },[])


    const orReadData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Todo");
            console.log(response.data)
            setData(response.data);
            
        } catch (error) {
            console.log(error)
            
        }


    }
    return(
        <div>
            <Header />
            <div className="text-center pt-3 pb-3">
                <h1>All Events</h1>


            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        
                        <th scope="col">Title</th>
                        <th scope="col">Location</th>
                        <th scope="col">Event Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Time</th>
                        
                    </tr>
                </thead>
                {
                    data.map((value:any, index) => {
                        return (
                            <tbody key = {index}>
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    
                                    <td>{value.title}</td>
                                    <td>{value.location}</td>
                                    <td>{value.date}</td>
                                    <td>{value.description}</td>
                                    <td>{value.time}</td>
                                    
                                </tr>

                            </tbody>

                        )

                    })
                }

            </table>

        </div>
    )
}
export default Showevents;