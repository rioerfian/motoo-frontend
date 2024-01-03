import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../../../axios";

export function AppDetail() {
    const [applications, setApplications] = useState([]);
    const [review, setReview] = useState([]);
    //destruct ID
    const { id } = useParams();
    const [loadPage, setLoadPage] = useState(false);

    //define method
    const fetchDataApplications = async () => {
        //fetch data from API with Axios
        await instance.get(`/applications/${id}`).then((response) => {
            setApplications(response.data.data);
            setLoadPage(true);
        });
        await instance.get('/reviews').then((response) => {
            setReview(response.data.data);
        })

    };

    //token
    const token = localStorage.getItem("token");

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

    const [data, setData] = useState({
        // Define the fields you want to add
        review_text: '',
        reviewer_name: '',
        rating: '',
        review_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        app_id: id,
    });


    const getDateNow = () => {
        new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    console.log(data);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const handleSubmitReview = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your API endpoint
            const response = await instance.post('/reviews', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log('Data added successfully', response.data);
            // navigate(`/applications/detail/${id}`);
            window.location.reload()
        } catch (error) {
            // Handle error
            console.log('Error adding data', error);
        }
    };

    //run hook useEffect
    useEffect(() => {
        //call method "fetchDataPosts"
        fetchDataApplications();
        fetchData();

    }, []);

    return (
        <>{loadPage && (<div >
            {applications && (
                <section className="">

                    <div>
                        <div className="block md:flex md:p-4 p-2">
                            <div className="w-full md:w-4/12">
                                <div className="flex items-center justify-center">
                                    {(applications.image === null) ? <img src="/img/sig.png" className="w-4/5 p-4" /> : <img
                                        src={"/img/" + applications.image}
                                        alt={applications.image}
                                        className="w-1/2 md:w-4/5 p-2 md:p-4"
                                    />}

                                </div>
                            </div>
                            <div className="w-full md:w-8/12 px-4">
                                <h1 className="p-2 font-bold text-3xl">{applications.name}</h1>
                                <div className="p-2">
                                    {(applications.status === "UP") ? (
                                        <div className="badge badge-success text-lg">UP</div>
                                    ) : (
                                        <div className="badge badge-error text-lg">DOWN</div>
                                    )}
                                    <div className="badge badge-outline text-lg ml-2">{applications.platform}</div>
                                </div>
                                <div className="p-2">
                                    <h3 className="font-semibold">Descriptions</h3>
                                    <p>{applications.description}</p>
                                </div>
                                <div className="px-2 py-4 border-gray-300 border-b border-t">
                                    <button className="btn btn-secondary btn-sm "> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                        Technical Documents</button>
                                    <button className="btn btn-info btn-sm m-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                        User Guide</button>
                                    <button className="btn btn-outline btn-info btn-sm"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>

                                        More Documents</button>
                                </div>
                                <div className="p-2">
                                    {[[applications.business_process, "business_process"], [applications.login_app, "login user"], [applications.category, "category"]].map((el) => (
                                        (el[0] && (
                                            <div key={el}>
                                                <span>{el[1]}</span>
                                                <span className="mx-2">:</span>
                                                <span>{el[0]}</span>
                                            </div>))
                                    ))}

                                </div>

                                <div className="px-2 py-6">
                                    <Link to={"//" + applications.url_prod} target="_blank" rel="noreferrer">
                                        <div className="tooltip mr-2" data-tip={applications.url_prod}>
                                            <button className="btn btn-primary btn-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                                </svg>
                                                Open Applications
                                            </button>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                        </div>
                        <div className="p-4 text-center">
                            <div role="tablist" className="tabs tabs-lifted tabs-lg">
                                <input type="radio" name="my_tabs_2" role="tab" className="tab text-md font-bold [--tab-border-color:#e11d48] " aria-label="Informasi" defaultChecked />
                                <div role="tabpanel" className="tab-content bg-base-100 border-primary rounded-box p-6">
                                    {applications && (
                                        <div className="overflow-x-auto">

                                            <table className="table">
                                                <thead>
                                                    <tr className="font-bold capitalize text-md">
                                                        <th>Field</th>
                                                        <th>Value</th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {[[applications.url_prod, "url"], [applications.category, "category"], [applications.platform, "platform"], [applications.login_app, "login app"], [applications.group, "group"], [applications.group_area, "group area"], [applications.priority, "priority"], [applications.impact, "impact"], [applications.pic_sisi, "pic sisi"], [applications.pic_ict, "pic_ict"]].map((el) => (
                                                        (el[0] && (
                                                            <tr key={el}>
                                                                <td className="font-semibold capitalize">
                                                                    {el[1]}
                                                                </td>
                                                                <td >
                                                                    {el[0]}
                                                                </td>
                                                            </tr>))
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>)}
                                </div>

                                <input type="radio" name="my_tabs_2" role="tab" className="tab text-md font-semibold [--tab-border-color:#e11d48]" aria-label="Teknisi" />
                                <div role="tabpanel" className="tab-content bg-base-100 border-primary rounded-box p-6">
                                    {applications && (<table className="table">
                                        <thead>
                                            <tr className="font-bold capitalize text-md">
                                                <th>Field</th>
                                                <th>Value</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {[[applications.pic_sisi, "pic sisi"], [applications.pic_ict, "pic ict"]].map((el) => (

                                                (<tr key={el}>
                                                    <td className="font-semibold capitalize">
                                                        {el[1]}
                                                    </td>
                                                    <td >
                                                        {el[0]}
                                                    </td>
                                                </tr>)
                                            ))}
                                        </tbody>
                                    </table>)}

                                </div>

                                <input type="radio" name="my_tabs_2" role="tab" className="tab text-md font-semibold [--tab-border-color:#e11d48]" aria-label="Reviews" />
                                <div role="tabpanel" className="tab-content bg-base-100 border-primary rounded-box p-6">
                                    <div className="block md:flex gap-4">
                                        <div className="block w-full lg:w-4/12 ">
                                            <div className="bg-base-100 py-6 shadow-xl mb-4">
                                                <div className="flex items-center p-4 gap-4">
                                                    <div>
                                                        <span className="font-bold text-2xl">5.0</span>
                                                        <span className="text-md"> / 5.0 </span>
                                                    </div>
                                                    <div className="rating rating-md">
                                                        <input type="radio" name={"ratingTotal"} value={1} className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name={"ratingTotal"} value={2} className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name={"ratingTotal"} value={3} className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name={"ratingTotal"} value={4} className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name={"ratingTotal"} value={5} className="mask mask-star-2 bg-orange-400" />
                                                    </div>
                                                    <div className=""> (32) </div>
                                                </div>
                                                <div className="flex items-center gap-2 px-4">
                                                    <div className="rating rating-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <progress className="progress progress-primary w-full" value="100" max="100"></progress>
                                                    <div className="text-sm">(32)</div>
                                                </div>
                                                <div className="flex items-center gap-2 px-4">
                                                    <div className="rating rating-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                    </div>
                                                    <progress className="progress progress-primary w-full" value="0" max="100"></progress>
                                                    <div className="text-sm">(0)</div>
                                                </div>
                                                <div className="flex items-center gap-2 px-4">
                                                    <div className="rating rating-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>

                                                    </div>
                                                    <progress className="progress progress-primary w-full" value="0" max="100"></progress>
                                                    <div className="text-sm">(0)</div>
                                                </div>
                                                <div className="flex items-center gap-2 px-4">
                                                    <div className="rating rating-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                    </div>
                                                    <progress className="progress progress-primary w-full" value="0" max="100"></progress>
                                                    <div className="text-sm">(0)</div>
                                                </div>
                                                <div className="flex items-center gap-2 px-4">
                                                    <div className="rating rating-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                    </div>
                                                    <progress className="progress progress-primary w-full" value="0" max="100"></progress>
                                                    <div className="text-sm">(0)</div>
                                                </div>

                                            </div>
                                            <div className="bg-base-100 p-6 shadow-xl">
                                                <form onSubmit={handleSubmitReview}>
                                                    <div className="join justify-start flex py-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="p-1 w-16 text-primary join-item">
                                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                                        </svg>

                                                        <input type="text" defaultValue={data.reviewer_name} value={user.name} onChange={handleChange} name="reviewer_name" className="join-item input input-bordered w-full max-w-xs font-bold" />

                                                    </div>

                                                    {/* <input type="text" placeholder="input name here" className="mb-2 input input-bordered w-full " /> */}
                                                    <textarea name="review_text" value={data.review_text} onChange={handleChange} className="textarea textarea-secondary w-full mb-2" placeholder="write your review here ..."></textarea>
                                                    <div className="join-item rating rating-md mb-2">
                                                        <input type="radio" value={0} name="rating" defaultChecked={data.rating} onChange={handleChange} className="mask mask-star-2 bg-orange-400 hidden" />
                                                        <input type="radio" name="rating" onChange={handleChange} value="1" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name="rating" onChange={handleChange} value="2" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name="rating" onChange={handleChange} value="3" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name="rating" onChange={handleChange} value="4" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name="rating" onChange={handleChange} value="5" className="mask mask-star-2 bg-orange-400" />
                                                    </div>
                                                    <input type="text" name="review_date" defaultValue={getDateNow} className="hidden" />
                                                    <button className="btn btn-primary w-full" value="submit" type="submit">submit</button>
                                                </form>
                                            </div>

                                        </div>

                                        <div className="mt-4 md:mt-0 block w-full lg:w-8/12 overflow-y-auto max-h-screen">
                                            {review.map((el, index) =>
                                            (el.app_id == id ?
                                                <div key={index} className="mb-2 rounded-2xl border border-gray-300 shadow-xl">
                                                    <div className="p-6 items-start text-left">
                                                        <div className="flex justify-between border-b border-neutral py-2">
                                                            <span className="text-lg">{el.review_text}</span>
                                                            <span className="badge badge-info italic">{el.review_date}</span>
                                                        </div>
                                                        <div className="flex gap-2 mt-2">
                                                            <div className="badge badge-primary text-md font-semibold">
                                                                {el.reviewer_name}
                                                            </div>
                                                            <div className="badge badge-warning text-xs">
                                                                rating:&nbsp;({el.rating})
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div> : <div key={index}></div>)
                                            )}
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </section >)}




        </div>)}

        </>
    );
}

export default AppDetail;
