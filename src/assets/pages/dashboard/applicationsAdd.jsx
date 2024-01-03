import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import instance from "../../../axios";

export function ApplicationsAdd() {

    const [loadPage, setLoadPage] = useState(false);

    const fetchData = async () => {
        //fetch user from API
        await instance.get('/user')
            .then((response) => {
                //set response user to state
                (response.data.role !== "admin" ?
                    navigate('/dashboard') : setLoadPage(true))
            })
    }
    useEffect(() => {
        fetchData();
    }, []);

    const [data, setData] = useState({
        // Define the fields you want to add
        name: '',
        status: 'UP',
        platform: 'website',
        category: '',
        image: '',
        login_app: '',
        group: '',
        group_area: '',
        priority: '',
        impact: '',
        web_server: 'active',
        db_server: 'active',
        url_dev: '',
        url_prod: '',
        frontend: '',
        backend: '',
        database: '',
        db_connection_path: '',
        sap_connection_path: '',
        git_path: '',
        pic_sisi: '',
        pic_ict: '',
        description: '',
        business_process: '',
        user_login: '',
        notes: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.files[0] });

    }
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your API endpoint
            const response = await instance.post('/applications', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log('Data added successfully', response.data);
            navigate('/dashboard/applications');
        } catch (error) {
            // Handle error
            console.log('Error adding data');
        }
    };

    return (
        <>
            {loadPage ? (<form onSubmit={handleSubmit} className="m-4 p-4 ">
            <h2 className="font-bold text-lg my-2">Add Application Data</h2>
                <div className="grid grid-cols-1 gap-4 py-2">
                    <div >
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">Name</span>
                            <input type="text" value={data.name} onChange={handleChange} name="name" className="input input-bordered input-sm w-full" />
                        </label>
                    </div>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    <div >
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">Pick a file*</span>
                            <input type="file" className="file-input file-input-sm file-input-bordered w-full " aria-describedby="file_input_help" name="image" onChange={handleFileChange} />
                        </label>
                    </div>

                    <div>
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">platform</span>
                            <select className="select select-bordered select-sm" name="platform" value={data.platform} onChange={handleChange}>

                                <option value="website">Website</option>
                                <option value="mobile">Mobile</option>
                                <option value="dekstop">Dekstop</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-lg">
                            <span className="label-text text-xs font-semibold">status</span>
                            <select className="select select-bordered select-sm" name="status" value={data.status} onChange={handleChange}>
                                <option value="UP">UP</option>
                                <option value="DOWN">DOWN</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">priority</span>
                            <select className="select select-bordered select-sm" name="priority" value={data.priority} onChange={handleChange}>

                                <option value=""></option>
                                <option value="low">low</option>
                                <option value="medium">medium</option>
                                <option value="high">high</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">impact</span>
                            <select className="select select-bordered select-sm" name="impact" value={data.impact} onChange={handleChange}>

                                <option value=""></option>
                                <option value="low">low</option>
                                <option value="medium">medium</option>
                                <option value="high">high</option>
                            </select>
                        </label>
                    </div>
                    {["category", "login_app", "group", "group_area", "business_process"].map(
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    {["url_dev", "url_prod", "git_path"].map(
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">

                    <div>
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">web server</span>
                            <select className="select select-bordered select-sm" name="web_server" value={data.web_server} onChange={handleChange}>
                                <option value="active">active</option>
                                <option value="non active">non active</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full ">
                            <span className="label-text text-xs font-semibold">DB server</span>
                            <select className="select select-bordered select-sm" name="db_server" value={data.db_server} onChange={handleChange}>
                                <option value="active">active</option>
                                <option value="non active">non active</option>
                            </select>
                        </label>
                    </div>


                    {["frontend", "backend", "database", "db_connection_path", "sap_connection_path"].map(
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


                <div>
                    <h3 className="py-2 font-bold">Description</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["description", "user_login", "notes"].map((el) => (
                            <div key={el}>
                                <label className="form-control">
                                    <span className="label-text">{el}</span>
                                    <textarea className="textarea textarea-bordered h-36" name={el} value={data.el} onChange={handleChange} placeholder={"Write your " + el + " here..."}></textarea>
                                </label>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="flex items-center justify-end my-4 gap-4">
                    <button className="btn btn-success btn-sm" value="submit" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Submit
                    </button>
                    <Link to={"/dashboard/applications"}>
                        <button className="btn btn-error btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </button>
                    </Link>
                </div>
            </form>) : <div className="flex items-center justify-center min-h-screen bg-secondary"><span className="loading loading-bars loading-lg items-center text-primary"></span><span className="text-2xl font-bold text-primary">&emsp;LOADING</span></div>}


        </>
    )
}