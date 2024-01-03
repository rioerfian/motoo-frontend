import { useEffect, useState } from "react";
import instance from "../../../axios";
import { Link, useNavigate } from "react-router-dom";

export function VirtualMachineAdd() {
    const [loadPage, setLoadPage] = useState(false);
    const [applications, setApplications] = useState([]);

    const fetchDataApplications = async () => {
        //fetch data from API with Axios
        await instance.get("/applications").then((response) => {
            setApplications(response.data.data);
            setLoadPage(true);
        });
    };

    const fetchData = async () => {
        //fetch user from API
        await instance.get('/user')
            .then((response) => {
                //set response user to state
                (response.data.role !== "admin" ?
                    navigate('/dashboard') : "")
            })
    }
    useEffect(() => {
        fetchData();
        fetchDataApplications();
    }, []);

    const [data, setData] = useState({
        // Define the fields you want to add
        name: '',
        environment: '',
        description: '',
        server_migration: '',
        ip_address: '',
        app_id: '',
        notes: ''
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    console.log(data)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your API endpoint
            const response = await instance.post('/virtual_machines', data);

            // Handle success (you can redirect or perform other actions)
            console.log('Data added successfully');
            navigate('/dashboard/virtual_machines');
        } catch (error) {
            // Handle error
            console.log('Error adding data');
        }
    };
    return (
        <>{loadPage ?
            <form onSubmit={handleSubmit} className="m-4 p-4 ">
                <h2 className="font-bold text-lg my-2">Add Virtual Machine Data</h2>
                <div className="grid grid-cols-1 gap-4 py-2">
                    <div >
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">Name</span>
                            <input type="text" required value={data.name} onChange={handleChange} name="name" className="input input-bordered input-sm w-full" />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    <div >
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">environment</span>
                            <select className="select select-bordered select-sm" required name="environment" value={data.environment} onChange={handleChange}>
                                <option value="" disabled>-- Select Environment --</option>
                                <option value="production">Production</option>
                                <option value="development">Development</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">Application</span>
                            <select className="select select-bordered select-sm" required name="app_id" value={data.app_id} onChange={handleChange}>
                                <option value="" disabled>-- Select Application --</option>
                                {applications.map((el, index) => (
                                    <option key={index} value={el.id}>{el.id}-{el.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>


                    {["description", "ip_address", "server_migration"].map(
                        (el) => (
                            <div key={el}>
                                <label className="form-control w-full ">
                                    <span className="label-text text-xs font-semibold">{el}</span>
                                    <input type="text" value={data.el} onChange={handleChange} name={el} className="input input-bordered input-sm w-full " />
                                </label>
                            </div>
                        )
                    )}

                </div>
                <div className="grid grid-cols-1 gap-4 py-2">
                    <div>
                        <label className="form-control w-full">
                            <span className="label-text">notes : </span>
                            <textarea className="textarea textarea-bordered h-36" name="notes" value={data.notes} onChange={handleChange} placeholder={"Write your notes here..."}></textarea>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end my-4 gap-4">
                    <button className="btn btn-success btn-sm" value="submit" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Submit
                    </button>
                    <Link to={"/dashboard/virtual_machines"}>
                        <button className="btn btn-error btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </button>
                    </Link>
                </div>
            </form> : <div className="flex items-center justify-center min-h-screen bg-secondary"><span className="loading loading-bars loading-lg items-center text-primary"></span><span className="text-2xl font-bold text-primary">&emsp;LOADING</span></div>}

        </>
    )
}