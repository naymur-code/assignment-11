import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddRequest = () => {
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const { user } = useContext(AuthContext)

    const axiosSecure = useAxiosSecure()

    console.log(user);

    useEffect(() => {
        axios.get('/districts.json')
            .then(res => setDistricts(res.data?.districts))
        axios.get('/upazilas.json')
            .then(res => setUpazilas(res.data?.upazilas))
    }, [])


    const handleRequest = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value
        const email = form.email.value
        const hospitalName = form.hospitalName.value
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;
        const address = form.address.value;

        const formData = {
            name,
            email,
            hospitalName,
            district,
            upazila,
            bloodGroup,
            address,
            donation_status: 'panding'
        }

        axiosSecure.post('/requests', formData)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className="hero bg-base-200 py-40">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                        <div className="card-body w-96">
                            <form className="fieldset" onSubmit={handleRequest} >
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    placeholder="User Name"
                                    defaultValue={user?.displayName}
                                    readOnly
                                />

                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Email"
                                    defaultValue={user?.email}
                                    readOnly
                                />

                                <label className="label">Hospital name</label>
                                <input
                                    type="text"
                                    name="hospitalName"
                                    className="input"
                                    placeholder="Dhaka Medical Collage"
                                />

                                <label className="label">Full Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="input"
                                    placeholder="address...."
                                />

                                <label className="label">Select Blood Group</label>
                                <select name="bloodGroup" className="select" required>
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>

                                <label className="label">Select Your District</label>

                                <select name="district" className="select" required defaultValue="">
                                    <option value="" disabled>
                                        Select Your District
                                    </option>

                                    {districts?.map((district) => (
                                        <option value={district.name} key={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>


                                <label className="label">Select Your Upazila</label>
                                <select name="upazila" className="select" required defaultValue="">
                                    <option value="" disabled>
                                        Select Your Upazila
                                    </option>

                                    {upazilas?.map((upazila) => (
                                        <option key={upazila.id} value={upazila.name}>
                                            {upazila.name}
                                        </option>
                                    ))}
                                </select>



                                <button className="btn btn-neutral mt-4">Requests</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRequest;