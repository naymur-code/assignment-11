import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { setUser, setLoading, loading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl;
    const role = form.role.value;
    console.log(role)

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
      role,
      email,
      password,
    };

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

                <label className="label">PhotoUrl</label>
                <input
                  type="file"
                  name="photoUrl"
                  className="input"
                  placeholder="PhotoUrl"
                />

                <label className="label">Role Select</label>
                <select name="role" defaultValue="Chose Role" className="select">
                  <option disabled={true}>Chose Role</option>
                  <option value='manager'>Manager</option>
                  <option value='buyer'>Buyer</option>
                </select>

                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />

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
