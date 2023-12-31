import { useEffect, useState } from "react";
import { Footer } from "../../components/footer";
import instance from "../../../axios";
import ApplicationCard from "../../components/applicationCard";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const [applications, setApplications] = useState([]);

    //define method
    const fetchDataApplications = async () => {
        //fetch data from API with Axios
        await instance.get("/applications").then((response) => {
            setApplications(response.data.data);
        });

    };
    //token
    const token = localStorage.getItem("token");

    //run hook useEffect
    useEffect(() => {
        //call method "fetchDataPosts"
        fetchDataApplications();
        (token ? fetchData() : "")

    }, []);

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

    const [user, setUser] = useState([]);

    const fetchData = async () => {
        //set header type Authorization + Bearer token
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

        //fetch user from API
        await instance.get('/user')
            .then((response) => {

                //set response user to state
                setUser(response.data);
            })
    }


    return (
        <>
            <div className="navbar px-8">
                <div className="flex-1">
                    <div className="p-2">

                        <a href="/" className="flex items-center">
                            <img src="/img/logo.png" className="w-10 mr-2" />
                            <span className="font-bold text-3xl text-red-600">MO</span>
                            <span className="font-bold text-3xl text-neutral">TOO</span>

                        </a>
                    </div>
                </div>
                <div className="flex-none">
                    <ul className="">
                        <li>{token ? <Link to={"/dashboard"} >
                            <button className="btn btn-primary font-bold btn-sm">{user.name}</button>
                        </Link> : <Link to={"/login"} >
                            <button className="btn btn-primary btn-sm">Login</button>
                        </Link>}
                        </li>
                    </ul>
                </div>
            </div>
            <section>
                <div className="hero min-h-screen -mt-16">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src="/img/hero.png" className="mx-8 max-w-sm md:max-w-lg" />
                        <div>
                            <h1 className="text-5xl font-bold">Monitoring Tools Office</h1>
                            <p className="py-6">This App to display catalogue and monitoring application in Manage Service <a href="https://tailwindcss.com" className="hover:underline">SISI</a> </p>
                            <button className="btn btn-primary">See all application</button>
                            <div className="md:flex mt-16 hidden">
                                <div className="max-w-screen-xl mx-auto">
                                    <div className="grid gap-2 md:grid-cols-10">
                                        {['product01.png', 'product02.png', 'product03.png', 'product04.png', 'product05.png', 'product06.png', 'product07.png', 'product08.png', 'product09.png', 'product10.png'].map(
                                            (el) => (
                                                <img src={"img/" + el} key={el} className="w-full hover:p-1" />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </section>

            <div className='w-full bg-base-100 '>
                {currentData.length > 0 ?
                    <section className="px-4 py-8 my-2 bg-gray-200" id="catalog">
                        <div className="container mx-auto">
                            <h1 className="text-3xl font-bold text-center">
                                All Applications
                            </h1>
                            <h3 className="text-lg text-center">
                                Our Application was managed by Sinergi Informatika Semen Indonesia
                            </h3>

                            <div>
                                {/* Render your data here using the currentData array */}
                                <div className="my-8 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 ">

                                    {currentData.map((applications, index) => (
                                        <ApplicationCard
                                            id={applications.id}
                                            name={applications.name}
                                            img={applications.image}
                                            key={index}
                                            status={applications.status}
                                            platform={applications.platform}
                                            category={applications.category}
                                            group={applications.group}
                                            group_area={applications.group_area}
                                        />
                                    )
                                    )}
                                </div>

                                {applications.length > 15 && (
                                    <div className='mt-8 text-right'>
                                        <div className="join px-2">
                                            <button className="join-item btn btn-primary btn-sm px-1 rounded-none" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                            </svg>
                                            </button>
                                            <p className="join-item btn btn-base-100 btn-sm ">{`${currentPage} of ${totalPages}`}</p>
                                            <button className="join-item btn btn-primary btn-sm px-1 rounded-none" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                            </svg>
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </section> : <></>}

            </div>
            <Footer />
        </>
    )
}