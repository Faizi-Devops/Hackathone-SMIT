import { useEffect, useState } from 'react'
import styles from '../styles/Dashboard.module.css'
import { collection, addDoc, deleteDoc, doc,updateDoc } from "firebase/firestore";
import { db } from '@/config/fire'
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar/Navbar';
import { getDocs } from 'firebase/firestore';

type A = {
    Title: string,
    Description: string,
    Location: string,
    Date: string,
    Time: string,
    id?: any
}

const Dashboard = () => {
    const [updated, setUpdated] = useState()
    const [data, setData] = useState<A[]>([])
    const [titling, setTitling] = useState("")
    const [descripting, setDescripting] = useState("")
    const [locating, setLocating] = useState("")
    const [dating, setDating] = useState("")
    const [timing, setTiming] = useState("")
    const [flag, setFlag] = useState(false)
    const [indexing, setIndexing] = useState("")


    useEffect(() => {
        onFetchData()
    })
    const onFetchData = async () => {
        try {

            const querySnapshot = await getDocs(collection(db, "events"));
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
                Title: titling,
                Description: descripting,
                Location: locating,
                Date: dating,
                Time: timing
            }

            try {
                const docRef = await addDoc(collection(db, "events"), adding);


                console.log("Document written with ID: ", docRef.id);
                setData([...data, { ...adding, id: docRef.id }])

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


    const onDeleteHandler = async (valueing: string) => {
        let DeletedStudents = data.filter((valu) => {
            if (valueing !== valu.id) {
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
        try {
            await deleteDoc(doc(db, "events", `${valueing}`));
        } catch (error) {
            console.log(error);


        }


    }
    const onEditHandler = (val:any) => {
        setFlag(true)
        setIndexing(val.id)
        setDating(val.Date)
        setDescripting(val.Description)
        setLocating(val.Location)
        setTiming(val.Time)
        setTitling(val.Title)


    }
    const onUpdateHandler = async() => {
        setFlag(false)
        let AddStudent: A = {
            Title: titling,
            Description: descripting,
            Location: locating,
            Date: dating,
            Time: timing


        }
        let UpdatedStudents = data.map((value) => {
            if (indexing === value.id) {
                return AddStudent;
            }
            else {
                return value
            }

        })
        setData([...UpdatedStudents])

        setDescripting("")
        setTitling("")
        setLocating("")
        setTiming("")
        setDating("")

        try {
            const washingtonRef = doc(db, "events", `${indexing}`);

            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, AddStudent);

        } catch (error) {
            console.log(error)

        }

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
                                flag ? <button type="button" className="btn btn-warning  rounded-pill" onClick={onUpdateHandler}>Add Event</button> :

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
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.Title}</td>
                                    <td>{value.Description}</td>
                                    <td>{value.Location}</td>
                                    <td>{value.Time}</td>
                                    <td>{value.Date}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={() => onDeleteHandler(value.id)}>Delete</button>
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