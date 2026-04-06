import React,{useState} from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">WELCOME BACK</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your deatail to login</p>

        <form onSubmit={handleLogin}>

          <Input
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email address"
          placeholder="ex@gmail.com"
          type="text"
          />

          <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="MIN 8 Character "
          type="password"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
