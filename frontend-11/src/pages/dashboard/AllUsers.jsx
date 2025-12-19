import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([])

    const fetchUsers = () => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }
    useEffect(() => {
        fetchUsers()

    }, [axiosSecure])

    // update status
    const handleStatusChange = (email, status) => {
        axios.patch(`http://localhost:5000/update/users/status?email=${email}&&status=${status}`)
            .then(res => {
                console.log(res.data)
                fetchUsers()
            })
            .catch(error=>console.log(error))

    }
    return (
        <div>
            <h2>all users</h2>
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
                            <th>Role</th>
                            <th>status</th>
                            <th>Edit status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map(user => <tr>
                                <th key={user._id}>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user?.photoUrl}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.role}
                                </td>
                                <td>{user?.status}</td>
                                <th>
                                    {
                                        user.status == 'active' ? <button onClick={() => handleStatusChange(user?.email, 'blocked')} className="btn btn-xs btn-error">Blocked</button>
                                            : <button onClick={() => handleStatusChange(user?.email, 'active')} className="btn btn-xs btn-xs btn-success">Active</button>


                                    }
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;