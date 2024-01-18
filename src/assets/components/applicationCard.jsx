import { Link } from "react-router-dom";

export function ApplicationCard({ img, name, id, status, category, platform, group, group_area }) {
    return (
        <Link to={`/application/${id}`} className="" >
            <div className="card hover:bg-gray-200 hover:shadow-2xl hover:border-secondary border bg-base-100 ">
                <div className="flex justify-end">
                    {(status === "UP") ? (
                        <div className="badge badge-success text-xs p-1 m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z" clipRule="evenodd" />
                        </svg>UP
                        </div>
                    ) : (
                        <div className="badge badge-error text-xs p-1 m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.22 3.22V2.75A.75.75 0 0 1 8 2Z" clipRule="evenodd" />
                        </svg>DOWN
                        </div>
                    )}

                </div>


                <figure className="my-4">
                    <img src="/img/sig.png" className="w-3/5" />
                    {/* {(img === null) ?
                    <img src="/img/sig.png" className="w-3/5" /> : <img
                        src={"/img/" + img}
                        alt={img + "_image"}
                        className="w-3/5 "
                    />} */}
                </figure>
                <div className="card-body p-4">
                    <span className="font-semibold text-lg">
                        {name}
                    </span>
                    <div className="card-actions justify-start">

                        {platform && <div className="badge bg-[#fecdd3] text-primary font-bold text-xs">{platform}</div>}
                        {category && <div className="badge bg-[#d1d5db] text-neutral font-bold text-xs">{category}</div>}
                        {group_area && <div className="badge badge-info p-1 text-xs font-bold">{group_area}</div>}
                    </div>
                    <div className="rating rating-xs join py-1">
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-accent" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-accent" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-accent" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-accent" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-accent" />
                        <span className="text-xs"> &nbsp;(4.5)</span>
                    </div>
                </div>
            </div>

        </Link >
    );
}


export default ApplicationCard;
