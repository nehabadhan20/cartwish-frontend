import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
//1. 1st approach using useRef
// const LoginPage = () => {
//   const nameRef = useRef(null);
//   const phoneRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault(); //It will prevent to get page Refresh
//     const user = {
//       name: "",
//       phone: 0,
//     };
//     user.name = nameRef.current.value;
//     user.phone = parseInt(phoneRef.current.value);
//   };
//   return (
//     <section className="align_center form_page">
//       <form className="authentication_form" onSubmit={handleSubmit}>
//         <h2>Login Form</h2>
//         <div className="form_inputs">
//           <div>
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               ref={nameRef}
//               id="name"
//               className="form_text_input"
//               placeholder="Enter your name"
//             />
//           </div>
//           <div>
//             <label htmlFor="phone">Phone Number</label>
//             <input
//               type="number"
//               ref={phoneRef}
//               id="phone"
//               className="form_text_input"
//               placeholder="Enter your phone number"
//             />
//             <button type="button">Hide Password</button>
//             <button type="button">Show Password</button>
//           </div>
//           <button type="submit" className="search_button form_submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default LoginPage;

//2. Approach using useState

// const LoginPage = () => {
//   const [user, setUser] = useState({
//     name: "",
//     phone: "",
//   });
//   const handleSubmit = (e) => {
//     e.preventDefault(); //It will prevent to get page Refresh
//   };
//   return (
//     <section className="align_center form_page">
//       <form className="authentication_form" onSubmit={handleSubmit}>
//         <h2>Login Form</h2>
//         <div className="form_inputs">
//           <div>
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               className="form_text_input"
//               placeholder="Enter your name"
//               onChange={(e) => setUser({ ...user, name: e.target.value })}
//               value={user.name}
//             />
//           </div>
//           <div>
//             <label htmlFor="phone">Phone Number</label>
//             <input
//               type="number"
//               id="phone"
//               className="form_text_input"
//               placeholder="Enter your phone number"
//               onChange={(e) =>
//                 setUser({ ...user, phone: parseInt(e.target.value) })
//               }
//               value={user.phone}
//             />
//           </div>
//           <button type="submit" className="search_button form_submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default LoginPage;

//3. Now this approach is using Reac Hook Form

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters" }),
});

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const location = useLocation();
  // let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      const { state } = location;
      window.location = state ? state.form : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
