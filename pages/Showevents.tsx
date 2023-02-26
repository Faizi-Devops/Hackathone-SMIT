import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/config/fire";
const Showevents = () =>{
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
                    data.map((value, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    
                                    <td>{value.Title}</td>
                                    <td>{value.Location}</td>
                                    <td>{value.Date}</td>
                                    <td>{value.Description}</td>
                                    <td>{value.Time}</td>
                                    
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