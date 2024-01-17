import { Link } from "react-router-dom";

export function ApplicationCard({ img, name, id, status, category, platform }) {
    return (
        <Link to={`/applications/detail/${id}`} className="" >
            <div className="card hover:bg-gray-300 hover:shadow-xl bg-base-100">
                {(status === "UP") ? (
                    <div className="badge badge-success p-0 m-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>UP
                    </div>
                ) : (
                    <div className="badge badge-error p-0 m-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>DOWN
                    </div>
                )}

                <figure>
                    <img src="/img/sig.png" className="w-1/2" />
                    {/* {(img === null) ?
                    <img src="/img/sig.png" className="w-3/5" /> : <img
                        src={"/img/" + img}
                        alt={img + "_image"}
                        className="w-3/5 "
                    />} */}
                </figure>
                <div className="card-body p-6">
                    <h2 className="text-xl font-bold">
                        {name} Exceleent Production
                    </h2>
                    <div className="card-actions justify-start">

                        <div className="badge badge-outline badge-primary text-xs">{platform}</div>
                        <div className="badge badge-outline text-xs">{category}</div>

                    </div>

                    <div className="rating rating-xs join mt-2 ">
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-warning" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-warning" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-warning" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-warning" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-warning" />
                        <span className="text-xs"> &nbsp;(4.5)</span>
                    </div>
                </div>
            </div>

        </Link >
    );
}


export default ApplicationCard;
