import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import instance from "../../../axios";
import axios from "axios";

export function Applications() {
    const [applications, setApplications] = useState([]);
    const [virtualMachine, setVirtualMachine] = useState([]);
    const [applicationSpecified, setApplicationSpecified] = useState([]);

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [load, setLoad] = useState(true);

    const handleOpen = async (el) => {
        setOpen(open === true ? false : true);
        setId(el)
        await instance.get(`/applications/${el}`).then((response) => {
            setApplicationSpecified(response.data.data)
        })
    };

    //define method
    const fetchDataApplications = async () => {
        //fetch data from API with Axios
        await instance.get("/applications").then((response) => {
            setApplications(response.data.data);
            setLoad(false)
        });
        await instance.get("/virtual_machines").then((response) => {
            setVirtualMachine(response.data.data);
        });
    };

    const deleteApplication = async (id) => {
        await instance.delete(`/applications/${id}`).then((response) => {
            setApplications(
                applications.filter((applications) => {
                    return applications.id !== id;
                })
            )
        });
    };



    const itemsPerPage = 15; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the range of items to display based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the data array to get the items for the current page
    const currentData = applications.slice(startIndex, endIndex);

    const totalPages = Math.ceil(applications.length / itemsPerPage);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const navigate = useNavigate();
    const [loadPage, setLoadPage] = useState(false)

    const fetchData = async () => {

        //fetch user from API
        await instance.get('/user')
            .then((response) => {

                //set response user to state
                (response.data.role !== "admin" ?
                    navigate('/dashboard') : (setLoadPage(true)))

            })
    }

    //run hook useEffect
    useEffect(() => {
        fetchData();
        fetchDataApplications();
    }, []);

    return (
        <>{loadPage ? (
            <section className='flex gap-4'>
                <div className={(open) ? "w-full lg:w-9/12" : "w-full"}>
                    <div className=" p-2">
                        <h1 className='font-bold text-xl p-2'>Applications Table</h1>
                        {load === true ?
                            <div className="flex items-center p-2"><span className="loading loading-infinity loading-md"></span>&emsp;Loading data</div>
                            : <div >
                                <div className='flex justify-between p-2'>
                                    <div className="flex gap-2">
                                        <Link to="add">
                                            <button className='btn btn-success btn-sm'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 animate-bounce">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>Add
                                            </button>
                                        </Link>
                                        <button className='btn btn-info btn-sm' onClick={() => document.getElementById('my_modal_2').showModal()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 animate-bounce">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>Upload
                                        </button>
                                    </div>

                                    <div className='badge badge-outline text-error'>
                                        *click row for detail
                                    </div>
                                </div>
                                <table className="w-full table-auto my-2 table-xs">
                                    <thead>
                                        <tr>
                                            {["application", "platform", "category", "group", "group_area", "status"].map(
                                                (el) => (
                                                    <td key={el}
                                                        className="text-left font-semibold capitalize text-md border-b border-neutral py-2">
                                                        {el}
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((applications, index) => (
                                            <tr key={applications.id} onClick={() => handleOpen(applications.id)} className="hover:bg-gray-300 hover:shadow-lg">

                                                <td className="px-4 align-middle">
                                                    <div className="flex items-center gap-4">
                                                        <img src="/img/sig.png" alt="sig" className="h-10" />
                                                        {/* {(applications.image === null) ? <img src="/img/sig.png" alt="sig" className="h-12" /> : <img className="h-12" src={"/img/" + applications.image} />} */}

                                                        <div>
                                                            <p className="font-semibold text-md capitalize "
                                                            >
                                                                {applications.name}
                                                            </p>
                                                            <p className="text-xs italic">
                                                                {applications.url_prod}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td >
                                                    {applications.platform}
                                                </td>
                                                <td >
                                                    {applications.category}
                                                </td>
                                                <td >
                                                    {applications.group}
                                                </td>
                                                <td >
                                                    {applications.group_area}
                                                </td>

                                                <td>
                                                    {(applications.status === "UP") ? (
                                                        <div className="badge badge-success">Up</div>
                                                    ) : (
                                                        <div className="badge badge-error">Down</div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between my-4">

                                    <p>Total data {applications.length ? applications.length : 0} entries</p>

                                    {applications.length > 15 && (<div className="join">
                                        <button className="join-item btn btn-primary btn-sm p-1 rounded-none" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                        </svg>
                                        </button>
                                        <p className="join-item btn btn-base-100 btn-sm">{`${currentPage} of ${totalPages}`}</p>
                                        <button className="join-item btn btn-primary btn-sm p-1 rounded-none" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                        </svg>
                                        </button>
                                    </div>)}

                                </div>
                            </div>}

                    </div>
                </div>


                <div className={(open) ? "hidden md:block lg:w-3/12 shadow-xl px-2 py-4 min-h-screen bg-gray-200" : "hidden"}>
                    <div className="flex justify-between p-2 rounded-xl bg-gray-200">
                        <h1 className='text-2xl font-bold'>Detail</h1>
                        {applicationSpecified.id === id && <div className="flex gap-1">
                            <Link to={`edit/${applicationSpecified.id}`}>
                                <button className="btn btn-warning btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>Edit</button>
                            </Link>
                            <button className="btn btn-error btn-sm p-1" onClick={() => document.getElementById('my_modal_1').showModal()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>Delete
                            </button>

                        </div>}

                    </div>

                    <div role="tablist" className="tabs tabs-boxed mt-4 bg-gray-200 ">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab tab-secondary font-bold" aria-label="Spesifikasi" defaultChecked />
                        <div role="tabpanel" className="tab-content border border-primary px-2">
                            <div className="flex justify-between items-center">
                                <img src="/img/sig.png" alt="sig" className="h-24" />
                                {/* {(applicationSpecified.image === null) ? <img src="/img/sig.png" alt="sig" className="h-28" /> : <img src={"/img/" + applicationSpecified.image} className="h-24" />} */}
                                <div className="btn btn-info btn-xs  text-white capitalize" onClick={() => document.getElementById('modal-vm').showModal()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
                                    </svg>
                                    Show VM</div>

                            </div>
                            <div className=" ">
                                <table className="table table-bordered table-xs">
                                    <thead className="hidden">
                                        <tr>
                                            <th>Field</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {[[applicationSpecified.url_prod, "url_prod"], [applicationSpecified.url_dev, "url_dev"]].map(
                                            (el) => (
                                                (el[0] &&
                                                    <tr className="my-2" key={el}>
                                                        <td className="font-bold capitalize bg-gray-300">{el[1]}
                                                        </td>
                                                        <td className="border border-gray-300">
                                                            <Link to={"//" + el[0]} target="_blank" className="italic underline text-primary ">
                                                                {el[0]}
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        )}

                                        {[[applicationSpecified.name, "name"], [applicationSpecified.category, "category"], [applicationSpecified.platform, "platform"], [applicationSpecified.login_app, "login app"], [applicationSpecified.group, "group"], [applicationSpecified.group_area, "group area"], [applicationSpecified.business_process, "business"], [applicationSpecified.priority, "priority"], [applicationSpecified.impact, "impact"], [applicationSpecified.status, "status"], [applicationSpecified.frontend, "frontend"], [applicationSpecified.backend, "backend"], [applicationSpecified.database, "database"], [applicationSpecified.web_server, "web server"], [applicationSpecified.db_server, "db server"], [applicationSpecified.db_connection_path, "DB Connect"], [applicationSpecified.sap_connection_path, "SAP Connect"], [applicationSpecified.pic_sisi, "PIC SISI"], [applicationSpecified.pic_ict, "PIC ICT"]].map(
                                            (el) => (
                                                (el[0] && <tr key={el} >
                                                    <td className="font-bold capitalize bg-gray-300">{el[1]}</td>
                                                    <td className="border border-gray-300">{el[0]} </td>
                                                </tr>)
                                            )
                                        )}

                                        {[[applicationSpecified.description, "description"], [applicationSpecified.user_login, "User Login"], [applicationSpecified.notes, "Notes"]].map(
                                            (el) => (
                                                (el[0] && <tr key={el} >
                                                    <td className="font-bold capitalize bg-gray-300 " colSpan={2}>{el[1]}

                                                        <p className="font-normal text-justify py-2">{el[0]} </p>
                                                    </td>
                                                </tr>)
                                            )
                                        )}
                                    </tbody>
                                </table>

                            </div>

                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold " aria-label="VM" />
                        <div role="tabpanel" className="tab-content ">
                            <div className="join join-vertical w-full">
                                {virtualMachine.map((el, index) =>
                                (el.app_id == id ?
                                    <div key={index} className="collapse collapse-arrow join-item">
                                        <input type="radio" name="my-accordion-4" />
                                        <div className="collapse-title text-sm font-semibold">
                                            {el.environment === "production" && (<span className="badge badge-warning font-bold rounded-none p-1">P</span>)}
                                            {el.environment === "development" && (<span className="badge badge-accent font-bold rounded-none p-1">D</span>)}
                                            <span> &nbsp;{el.name}</span>
                                        </div>
                                        <div className="collapse-content text-justify">
                                            <p><b>Server</b> : {el.server_migration}</p>
                                            <p><b>IP Address</b> : {el.ip_address}</p>
                                            <p><b>Environment</b> : <span className="badge badge-secondary">{el.environment}</span></p>
                                            <p><b>Description</b> : {el.description}</p>
                                            <p><b>Notes</b> : {el.notes}</p>
                                        </div>
                                    </div>

                                    : <div key={index} ></div>)

                                )}


                            </div>


                        </div>
                        <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold" aria-label="Document" />
                        <div role="tabpanel" className="tab-content border border-gray-300 p-4 items-center h-64">
                            <ul>
                                <li>
                                    <button className="btn btn-secondary btn-sm"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                        Technical Documents
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-info btn-sm my-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                        User Guide
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-outline btn-info btn-sm"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                        More Documents
                                    </button>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete</h3>
                        <p className="pt-4">Are you sure to delete the data?</p>
                        <div className="modal-action">
                            <div method="dialog">
                                {/* if there is a button in form, it will close the modal */}

                                <button className="btn btn-success btn-sm mr-2" onClick={() => (deleteApplication(applicationSpecified.id), document.getElementById('my_modal_1').close())} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                    Yes</button>
                                <button className="btn btn-error btn-sm" onClick={() => document.getElementById('my_modal_1').close()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                    No</button>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box ">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-2xl">Upload Data</h3>
                            <a href="" className="btn btn-info btn-sm">Download Template</a>
                        </div>
                        <form className="py-6">
                            <div className="">Update data via file Excel</div>
                            <input type="file" className="file-input file-input-sm w-full max-w-xs my-4" />
                            {/* <br/> */}
                            <div className="text-error text-xs w-full">important to download template first before submit</div>
                            <a href="" className="btn btn-success btn-sm mt-2 w-full">Submit</a>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                <dialog id="modal-vm" className="modal">
                    <div className="modal-box max-w-6xl w-full">
                        <h3 className="font-bold text-xl mb-2">Virtual Machine</h3>
                        <div className="join join-vertical w-full">
                            {virtualMachine.map((el, index) =>
                            (el.app_id == id ?
                                <div key={index} className="collapse collapse-arrow join-item">
                                    <input type="radio" name="my-accordion-4" />
                                    <div className="collapse-title text-sm font-semibold">
                                        {el.environment === "production" && (<span className="badge badge-warning font-bold rounded-none p-1">P</span>)}
                                        {el.environment === "development" && (<span className="badge badge-accent font-bold rounded-none p-1">D</span>)}
                                        <span> &nbsp;{el.name}</span>
                                    </div>
                                    <div className="collapse-content text-justify">
                                        <table className="table table-bordered">
                                            <tr className="border border-secondary">
                                                <td>Server</td>
                                                <td>IP Address</td>
                                                <td>Environment</td>
                                                <td>Description</td>
                                                <td>Notes</td>
                                            </tr>
                                            <tr className="border border-secondary">
                                                <td >{el.server_migration}</td>
                                                <td >{el.ip_address}</td>
                                                <td ><span className="badge badge-secondary">{el.environment}</span></td>
                                                <td >{el.description}</td>
                                                <td >{el.notes}</td>

                                            </tr>
                                        </table>

                                    </div>
                                </div>

                                : <div key={index} ></div>)

                            )}


                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

            </section >) : <div className="flex items-center justify-center min-h-screen bg-base-100 "><span className="loading loading-infinity loading-lg items-center text-primary animate-bounce"></span><span className="animate-bounce text-xl font-bold text-primary capitalize">&nbsp;loading</span></div>}

        </>
    )
}