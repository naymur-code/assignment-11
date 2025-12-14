import { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../provider/AuthProvider";
import TableData from "../../components/TableData";

const MangeProducts = () => {
    const [products, setProducts] = useState([])
    const { user } = useContext(AuthContext)
    const axiosInstance = useAxios()
    useEffect(() => {
        axiosInstance.get(`/manager/products/:${user?.email}`)
            .then(res => setProducts(res.data))
    }, [axiosInstance, user])

    console.log('ppp', products);
    return (
        <div>
            <h1>MangeProducts</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            products.map((product) => <TableData key={product._id} product={product} />)
                        }



                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default MangeProducts;