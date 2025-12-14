import axios from 'axios';
import React, { useContext, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const AddProduct = () => {
    const [showOnHome, setShowOnHome] = useState(false)
    const axiosInstance = useAxios()
    const { user } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const payment = form.payment.value;
        const showHome = showOnHome

        // image upload and url convert
        const image = form.image;
        const file = image.files[0]
        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=d57038d1bb0012ba418be365dc12a3b6`,
            { image: file },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        const photoUrl = res.data.data.display_url;

        const formData = {
            name,
            description,
            category,
            price: parseInt(price),
            quantity,
            photoUrl,
            payment,
            showHome,
            mangerEmail: user?.email
        };

        if (res.data.success == true) {
            axiosInstance.post('/products', formData)
                .then(result => console.log(result))

        }


    }
    return (
        <div>

            <div className="hero py-30 ">

                <div className="">
                    <h2 className='text-green-600 font-bold text-3xl text-center '>Add Product</h2>

                    <div className="card shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="fieldset">

                                <label className="label">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    placeholder="Product Name"
                                />

                                <label className="label">Description</label>
                                <textarea
                                    name="description"
                                    className="textarea"
                                    placeholder="Product Description"
                                ></textarea>

                                <label className="label">Category</label>
                                <select name="category" defaultValue="" className="select">
                                    <option disabled value="">
                                        Select Category
                                    </option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="grocery">Grocery</option>
                                </select>

                                <label className="label">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="input"
                                    placeholder="Product Price"
                                />

                                <label className="label">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    className="input"
                                    placeholder="Product Quantity"
                                />

                                <label className="label">Product Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    className="input"
                                />

                                <label className="label">Payment Option</label>
                                <select name="payment" defaultValue="cod" className="select">
                                    <option value="cod">Cash on Delivery</option>
                                </select>

                                {/* show on home */}
                                <div className='flex gap-1 my-2' onChange={() => setShowOnHome(!showOnHome)} >
                                    <input type="checkbox" />
                                    <label className="label">Show on home</label>
                                </div>

                                <button className="btn btn-neutral mt-4">
                                    Add Product
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;