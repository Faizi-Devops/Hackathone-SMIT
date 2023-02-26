import Navbar from "@/components/Navbar/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/config/fire";


const Join = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        orReadData()


    },[])


    const orReadData = async () => {
        try {

            const querySnapshot = await getDocs(collection(db, "attendies"));
            let todosList: any = []
            querySnapshot.forEach((doc) => {
                todosList.push({
                    Title: doc.data().Title,
                    Description: doc.data().Description,
                    Location: doc.data().Location,
                    id: doc.id,
                    Time: doc.data().Time,
                    Date: doc.data().Date

                });
                
            });
            setData(todosList)

            console.log('todos', todosList);

          


        } catch (error) {
            console.log(error);

        }


    }
    return (
        <div>
            <Navbar />
            <div className="text-center mt-5">
                <h1>All Attendies</h1>

            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Location</th>
                        <th scope="col">Event Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Time</th>
                        <td>Status</td>
                    </tr>
                </thead>
                {
                    data.map((value:any, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{value.id}</td>
                                    <td>{value.Title}</td>
                                    <td>{value.Location}</td>
                                    <td>{value.Date}</td>
                                    <td>{value.Description}</td>
                                    <td>{value.Time}</td>
                                    <td>
                                    <button type="button" className="btn btn-primary rounded-pill">True</button>
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
export default Join;