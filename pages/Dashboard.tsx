import { useEffect, useState } from 'react'
import styles from '../styles/Dashboard.module.css'
import { collection, addDoc, deleteDoc, doc,updateDoc } from "firebase/firestore";
import moment from 'moment';
import { db } from '@/config/fire'
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar/Navbar';
import { getDocs } from 'firebase/firestore';
import axios from 'axios';

type A = {
    title: string,
    description: string,
    location: string,
    date: any,
    time: string,
    _id?: any
}

const Dashboard = () => {
    const [updated, setUpdated] = useState()
    const [data, setData] = useState<A[]>([])
    const [titling, setTitling] = useState("")
    const [descripting, setDescripting] = useState("")
    const [locating, setLocating] = useState("")
    const [dating, setDating] = useState(useState(moment().format('YYYY-MM-DD')))
    const [timing, setTiming] = useState("")
    const [flag, setFlag] = useState(false)
    const [indexing, setIndexing] = useState("")


    useEffect(() => {
        onFetchData()
    },[])
    const onFetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Todo");
            console.log(response.data)
            setData(response.data);
            


            // const querySnapshot = await getDocs(collection(db, "events"));
            // let todosList: any = []
            // querySnapshot.forEach((doc) => {
            //     todosList.push({
            //         Title: doc.data().Title,
            //         Description: doc.data().Description,
            //         Location: doc.data().Location,
            //         id: doc.id,
            //         Time: doc.data().Time,
            //         Date: doc.data().Date

            //     });

            // });
            

            // console.log('todos', todosList);




        } catch (error) {
            console.log(error);

        }
    }

    const alpha = (e: any) => {
        setTitling(e.target.value)

    }
    const beta = (e: any) => {
        setDescripting(e.target.value);


    }
    const gema = (e: any) => {
        setLocating(e.target.value);


    }
    const peta = (e: any) => {
        setDating(e.target.value);


    }
    const tera = (e: any) => {
        setTiming(e.target.value);


    }
    const onAddHandler = async () => {
        if (titling && timing && locating && descripting && dating !== "") {
            let adding: A = {
                title: titling,
                description: descripting,
                location: locating,
                date: dating,
                time: timing
            }

            try {
                console.log("first log")
                 await axios.post("http://localhost:5000/Todo", adding)
                 console.log("second log")
                setData([...data,adding])

                setDating("")
                setDescripting("")
                setLocating("")
                setTitling("")
                setTiming("")
                toast.success('Data Added Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });



            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        else {
            toast.error("Please Fill All the Inputs")
        }


    }
    const onEditHandler = (valueing:A) =>{
        setIndexing(valueing._id)
        setFlag(true)
        setTitling(valueing.title);
        setDescripting(valueing.description)
        setLocating(valueing.location)
        setTiming(valueing.time);
        setDating(moment(valueing.date).format('YYYY-MM-DD'))
    }


    const onDeleteHandler = async (valueing: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/Todo/${valueing}`);
            let DeletedStudents = data.filter((valu) => {
                if (valueing !== valu._id) {
                    return valu;
    
                }
    
    
            })
            setData([...DeletedStudents])
            toast.warn('✌ Data successfully deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
        } catch (error) {
            
        }
        
      
       


    }

    
    const onUpdateHandler = async() => {
        setFlag(false)
        let AddStudent: A = {
            title: titling,
            description: descripting,
            location: locating,
            date: dating,
            time: timing


        }
        let UpdatedStudents = data.map((value) => {
            if (indexing === value._id) {
                return AddStudent;
            }
            else {
                return value
            }

        })
        try {
            const response = await axios.patch(`http://localhost:5000/Todo/${indexing}`, AddStudent);
            console.log(indexing)
            
        } catch (error) {
            console.log(error)
            
        }
        setData([...UpdatedStudents])

        setDescripting("")
        setTitling("")
        setLocating("")
        setTiming("")
        setDating("")

        

    }


    return (
        <div className={styles.backer}>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card" style={{ width: "24rem" }}>

                    <div className="card-body">
                        <h5 className="card-title text-center">Add Event</h5>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={titling} placeholder="Title" onChange={alpha} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={descripting} placeholder="Description" onChange={beta} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={locating} placeholder="Location" onChange={gema} />
                        </div>
                        <div className="mb-3">
                            <input type="date" className="form-control" value={dating} placeholder="Date" onChange={peta} />
                        </div>
                        <div className="mb-3">
                            <input type="time" className="form-control" value={timing} placeholder="Time" onChange={tera} />
                        </div>

                        <div className="text-center">
                            {
                                flag ? <button type="button" className="btn btn-warning  rounded-pill" onClick={onUpdateHandler}>Update Event</button> :

                                    <button type="button" className="btn btn-primary  rounded-pill" onClick={onAddHandler}>Add Event</button>}

                        </div>

                    </div>
                </div>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Location</th>
                        <th scope="col">Time</th>
                        <th scope="col">Date</th>
                        <th scope='col'>Delete</th>
                        <th scope='col'>Update</th>
                    </tr>
                </thead>
                {
                    data.map((value: A, index: number) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{value.title}</td>
                                    <td>{value.description}</td>
                                    <td>{value.location}</td>
                                    <td>{value.time}</td>
                                    <td>{value.date}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={() => onDeleteHandler(value._id)}>Delete</button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-warning" onClick={() => onEditHandler(value)}>Update</button>
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
export default Dashboard