import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

function ForgetPass() {
    const [email, setEmail] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const resetPassword = async () => {
        setLoading(true)
        if (email === "") {
            return toast.error("Email field is required")
        }
        try {
            // Send a password reset email to the user
            await sendPasswordResetEmail(auth, email);
            // Show a message to the user to check their email
            toast.warning("Please check your email to reset your password.");
            navigate('/login');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                toast.warning("No user found with this email");
            } else {
                console.error(error);
            }
            setLoading(false);
        }
    }
    return (
        <div className='flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat bg-opacity-75' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl shadow-2xl bg-opacity-90 '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Forgot Password</h1>
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={resetPassword}
                        className=' bg-yellow-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Set Password
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-green-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}


export default ForgetPass
