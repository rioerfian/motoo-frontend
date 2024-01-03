import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../../axios";

export function Login() {

    const [data, setData] = useState({
        // Define the fields you want to add
        email: '',
        password: '',
    });

    const [validation, setValidation] = useState([]);


    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    localStorage.removeItem('token')
    //hook useEffect
    useEffect(() => {

        //check token
        if (localStorage.getItem('token')) {

            //redirect page dashboard
            navigate('/dashboard');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your API endpoint
            const response = await instance.post('/login', data);

            //save token to localStorage
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            console.log(response.data.token)
        } catch (error) {
            // Handle error
            setValidation(error.response.data);
            console.log(validation)
        }
    };

    return (
        <>
            <div className="hero min-h-screen bg-gray-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold px-6">&nbsp;</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="bg-gradient-to-r from-primary to-base-100">&nbsp;</div>
                        <form className="card-body">
                            <a  className="flex items-center mb-2">
                                <img src="/img/logo.png" className="w-12 mr-2" />
                                <span className="font-bold text-4xl text-primary">MO</span>
                                <span className="font-bold text-4xl">TOO</span>
                            </a>
                            <span className="text-sm italic font-semibold">please login with your email</span>
                            <div className="py-4">
                                <div className="form-control mb-2">
                                    <div className="join">
                                        <button className="btn join-item btn-primary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                        </svg>
                                        </button>
                                        <input type="email" placeholder="email" className="join-item input w-full input-bordered" name="email" onChange={handleChange} value={data.email} required />
                                    </div>
                                    {
                                        validation.email && (
                                            <div className="text-error">
                                                {validation.email[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="form-control">
                                    <div className="join">
                                        <button className="btn btn-primary join-item "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                        </button>
                                        <input type="password" placeholder="password" className="input join-item w-full input-bordered" name="password" onChange={handleChange} value={data.password} required />
                                    </div>
                                    {
                                        validation.password && (
                                            <div className="text-error">
                                                {validation.password[0]}
                                            </div>
                                        )
                                    }
                                    {
                                        validation.message && (
                                            <div className="text-error">
                                                {validation.message}
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                            <div className="form-control">
                                <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
