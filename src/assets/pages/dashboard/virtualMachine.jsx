import { useEffect, useState } from "react";
import instance from "../../../axios";
import { NavbarDashboard } from "../../components/navbarDashboard";
import { Link, useNavigate } from "react-router-dom";

export function VirtualMachine() {
    const [virtualMachine, setVirtualMachine] = useState([]);
    const [virtualMachineSpecified, setVirtualMachineSpecified] = useState([]);

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [load, setLoad] = useState(true);

    const handleOpen = async (el) => {
        setOpen(open === true ? false : true);
        setId(el)
        console.log(el, id)
        await instance.get(`/virtual_machines/${el}`).then((response) => {
            setVirtualMachineSpecified(response.data.data)
            console.log(response.data.data)
        })
    };

    const fetchDataVirtualMachine = async () => {
        //fetch data from API with Axios
        await instance.get("/virtual_machines").then((response) => {
            setVirtualMachine(response.data.data);
            setLoad(false)
        });
    };

    const deleteVirtualMachine = async (id) => {
        await instance.delete(`/virtual_machines/${id}`).then((response) => {
            setVirtualMachine(
                virtualMachine.filter((virtualMachine) => {
                    return virtualMachine.id !== id;
                })
            )
        });
    };

    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the range of items to display based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the data array to get the items for the current page
    const currentData = virtualMachine.slice(startIndex, endIndex);

    const totalPages = Math.ceil(virtualMachine.length / itemsPerPage);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const [userLogin, setUserLogin] = useState({});
    const navigate = useNavigate();
    const [loadPage, setLoadPage] = useState(false)

    const fetchData = async () => {

        //fetch user from API
        await instance.get('/user')
            .then((response) => {

                //set response user to state
                (response.data.role !== "admin" ?
                    navigate('/dashboard/') : (setLoadPage(true), setUserLogin(response.data)))

            })
    }
    //run hook useEffect
    useEffect(() => {
        fetchData();
        fetchDataVirtualMachine();
    }, []);

    return (
        <>{loadPage ? 
        <section className='flex gap-4'>
            <div className={(open) ? "w-full lg:w-9/12" : "w-full"}>
                <div className="overflow-x-auto p-2">
                    <h1 className='font-bold p-2 text-xl'>Virtual Machine Table</h1>
                    {load === true ?
                        <div className="flex items-center p-2"><span className="loading loading-bars loading-md"></span>&emsp;Loading data</div>
                        : <>
                            <div className='flex justify-between p-2'>
                                <Link to="add">
                                    <button className='btn btn-success btn-sm'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>Add
                                    </button>
                                </Link>
                            </div>
                            <table className="w-full table-xs overflow-x-auto">
                                <thead>
                                    <tr>
                                        {["environment", "name", "ip_address", "server_migration"].map(
                                            (el) => (
                                                <td key={el}
                                                    className="text-left font-semibold capitalize text-sm border-y border-neutral py-2">
                                                    {el}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((virtualMachine, index) => (
                                        <tr key={index} onClick={() => handleOpen(virtualMachine.id)} className="hover:bg-gray-300 border-b border-gray-400">
                                            <td>
                                                {virtualMachine.environment === "production" && (<div className="badge badge-error font-semibold capitalize">{virtualMachine.environment}</div>)}
                                                {virtualMachine.environment === "development" && (<div className="badge badge-info font-semibold capitalize">{virtualMachine.environment}</div>)}
                                                
                                            </td>

                                            <td >
                                                {virtualMachine.name}

                                            </td>

                                            <td>
                                                {virtualMachine.ip_address}
                                            </td>

                                            <td>
                                                {virtualMachine.server_migration}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex items-center justify-between my-4">

                                <p>Total data {virtualMachine.length ? virtualMachine.length : 0} entries</p>

                                {virtualMachine.length > 10 && (<div className="join">
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
                        </>}

                </div>
            </div>
            <div className={(open) ? "hidden md:block lg:w-3/12 shadow-xl p-4 min-h-screen" : "hidden"}>
                <div className="flex justify-between my-2 pb-4 ">
                    <span className='text-2xl font-bold'>Detail</span>
                    {virtualMachineSpecified.id === id && <div className="flex gap-1">
                        <Link to={`edit/${virtualMachineSpecified.id}`}>
                            <button className="btn btn-warning btn-sm p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>Edit </button>
                        </Link>
                        <button className="btn btn-primary btn-sm p-1" onClick={() => document.getElementById('my_modal_1').showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>Delete
                        </button>

                    </div>}

                </div>

                <div role="tablist" className="tabs tabs-boxed bg-base-100 mt-4">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold " aria-label="Spesifikasi" defaultChecked />
                    <div role="tabpanel" className="tab-content rounded-box">
                        <div className="overflow-x-auto py-4">
                            <table className="table table-xs table-bordered">
                                <thead className="hidden">
                                    <tr>
                                        <th >Field</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {[[virtualMachineSpecified.name, "name"], [virtualMachineSpecified.description, "description"], [virtualMachineSpecified.ip_address, "ip_address"], [virtualMachineSpecified.server_migration, "server migration"], [virtualMachineSpecified.environment, "environment"], [virtualMachineSpecified.app_id, "app id"],[virtualMachineSpecified.notes, "notes"]].map(
                                        (el) => (
                                            (el[0] && <div key={el}><tr>
                                                <td className="font-bold text-sm capitalize">{el[1]}</td>
                                            </tr>
                                                <tr>
                                                    <td >{el[0]}  </td>
                                                </tr></div>)
                                        )
                                    )}


                                </tbody>
                            </table>

                        </div>
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold" aria-label="More" />
                    <div role="tabpanel" className="tab-content bg-base-100 ">

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
                            <button className="btn btn-success btn-sm mr-2" onClick={() => (deleteVirtualMachine(virtualMachineSpecified.id), document.getElementById('my_modal_1').close())} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
        </section >:<div className="flex items-center justify-center min-h-screen bg-secondary"><span className="loading loading-bars loading-lg items-center text-primary"></span><span className="text-2xl font-bold text-primary">&emsp;LOADING</span></div>}

        </>
    )
}


