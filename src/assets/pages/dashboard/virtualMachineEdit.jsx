import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../../../axios";

export function VirtualMachineEdit() {
    const [virtualMachine, setVirtualMachine] = useState([]);
    const [applications, setApplications] = useState([]);

    const fetchDataApplications = async () => {
        //fetch data from API with Axios
        await instance.get("/applications").then((response) => {
            setApplications(response.data.data);
            // setLoadPage(true);
        });
    };

    const [load, setLoad] = useState(true);
    //destruct ID
    const { id } = useParams();
    //define method
    const fetchDataVirtualMachine = async () => {
        await instance.get('/user')
            .then((response) => {
                //set response user to state
                (response.data.role !== "admin" ?
                    navigate('/dashboard') : "")
            })


        //fetch data from API with Axios
        await instance.get(`/virtual_machines/${id}`).then((response) => {
            setVirtualMachine(response.data.data);
            setData(response.data.data);
            setLoad(false);
        });
    };

    //run hook useEffect
    useEffect(() => {
        fetchDataVirtualMachine();
        fetchDataApplications()
    }, []);

    const navigate = useNavigate();
    const [data, setData] = useState({
        // Define the structure of your item
        // You might get this data from an API call or other sources
        id: '',
        name: '',
        environment: '',
        description: '',
        server_migration: '',
        ip_address: '',
        app_id: '',
        notes: ''
    });
    console.log(data)
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a PUT or PATCH request to update the item
            await instance.put(`/virtual_machines/${id}`, data);

            // Handle success (you can redirect or perform other actions)
            console.log('data updated successfully');
            navigate('/dashboard/virtual_machines');
        } catch (error) {
            // Handle error
            console.log('Error updating data');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="container mx-auto p-4">
            <div className="font-bold text-lg">Edit Virtual Machine Data</div>
                <div className="grid grid-cols-1 gap-4 py-2">
                    <div >
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">Name</span>
                            <input type="text" defaultValue={virtualMachine.name} onChange={handleChange} name="name" className="input input-bordered input-sm w-full" />
                        </label>
                    </div>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    <div className="md:mt-0 mt-2 w-full">
                        <label className="form-control w-full max-w-lg">
                            <span className="label-text text-xs font-semibold">Environment</span>
                            <select className="select select-bordered select-sm" name="environment" defaultValue={virtualMachine.environment} onChange={handleChange}>
                                <option value={virtualMachine.environment}>{virtualMachine.environment}{" "}</option>
                                {virtualMachine.environment === "production" ? <option value="development">development</option> : <option value="production">production</option>}
                            </select>
                        </label>
                    </div>



                    {[[virtualMachine.ip_address, "ip_address"], [virtualMachine.server_migration, "server_migration"], [virtualMachine.description, "description"]].map(
                        (el) => (
                            <div key={el}>
                                <label className="form-control w-full ">
                                    <span className="label-text text-xs font-semibold">{el[1]}</span>
                                    <input type="text" name={el[1]} defaultValue={el[0]} onChange={handleChange} className="input input-bordered input-sm w-full " />
                                </label>
                            </div>
                        )
                    )}
                    <div>
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">Application</span>
                            <select className="select select-bordered select-sm" required name="app_id" value={data.app_id} onChange={handleChange} defaultValue={virtualMachine.app_id}>
                                <option value="" disabled>-- Select Application --</option>
                                {applications.map((el, index) => (
                                    <option key={index} value={el.id}>{el.id}-{el.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                </div>

                <div className="flex items-center justify-end my-4 gap-4">

                    <button className="btn btn-success btn-sm" type="submit" value="submit  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Submit
                    </button>
                    <Link to={"/dashboard/users"}>
                        <button className="btn btn-error btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            Cancel
                        </button>
                    </Link>
                </div>
            </form>
        </>
    )
}