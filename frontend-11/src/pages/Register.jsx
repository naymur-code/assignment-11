import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { setUser, setLoading, loading } = useContext(AuthContext);
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])

  useEffect(() => {
    axios.get('districts.json')
      .then(res => setDistricts(res.data?.districts))
    axios.get('upazilas.json')
      .then(res => setUpazilas(res.data?.upazilas))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const bloodGroup = form.bloodGroup.value;
    const photoUrl = form.photoUrl;
    const file = photoUrl.files[0];
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=d57038d1bb0012ba418be365dc12a3b6`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const mainPhotoUrl = res.data.data.display_url;

    const fromData = {
      name,
      photoUrl: mainPhotoUrl,
      email,
      password,
      district,
      upazila,
      bloodGroup
    };
    console.log(fromData);


    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: mainPhotoUrl,
        });
        // Update context user correctly
        setUser({
          ...result.user,
          displayName: name,
          photoURL: mainPhotoUrl,
        });

        // user data save for DB
        axios
          .post("http://localhost:5000/users", fromData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => console.log(error));

        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <p className="text-center py-5 text-2xl">loading...</p>;
  }

  return (
    <div>
      <div className="hero bg-base-200 py-40">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <div className="card-body w-96">
              <form className="fieldset" onSubmit={handleSubmit}>
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="User Name"
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />

                <label className="label">PhotoUrl</label>
                <input
                  type="file"
                  name="photoUrl"
                  className="input"
                  placeholder="PhotoUrl"
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

                  {districts.map((district) => (
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

                  {upazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>


                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />

                <button className="btn btn-neutral mt-4">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
