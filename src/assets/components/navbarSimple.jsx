import { Link } from "react-router-dom";

export   function NavbarSimple() {
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
                        <li><Link to={"/login"} >
                            <button className="btn btn-primary btn-sm">Login</button>
                            </Link></li>
                    </ul>
                </div>
            </div>

        </>
    )
}