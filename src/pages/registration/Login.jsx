import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/loader/Loader';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const context = useContext(myContext)
    const { loading, setLoading } = context

    const signin = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem('user', JSON.stringify(result));
            toast.success('Signin Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                window.location.href = '/'
                setLoading(false);
            }, 800);
        } catch (error) {
            toast.error('Sigin Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        }
    }
    return (
        <div className='flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat bg-opacity-75' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529154691717-3306083d869e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl shadow-2xl bg-opacity-90 '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signin}
                        className=' bg-green-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-red-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
                <br />
                <div>
                    <h2 className='text-white'><Link className=' text-yellow-500 font-bold' to={'/forgetpass'}>Forgot Password</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login