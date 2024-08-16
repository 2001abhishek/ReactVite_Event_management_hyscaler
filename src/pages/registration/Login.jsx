import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import Layout from '../../components/layout/Layout'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signin = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
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
                window.location.href = '/';
                setLoading(false);
            }, 800);
        } catch (error) {
            toast.error('Signin Failed', {
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
    };

    const handleGoogleSignin = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if the user already exists in the Firestore database
            const userRef = collection(fireDB, 'users');
            const userSnapshot = await addDoc(userRef, {
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1] || '',
                email: user.email,
                phone: user.phoneNumber || '',
                state: '',
                city: '',
                zipCode: '',
                uid: user.uid,
                time: Timestamp.now(),
            });

            localStorage.setItem('user', JSON.stringify(result));
            toast.success('Signin with Google Successfully', {
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
                window.location.href = '/';
                setLoading(false);
            }, 800);
        } catch (error) {
            toast.error('Google Signin Failed', {
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
    };

    return (
        <Layout>
        <div className='flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat bg-opacity-75' style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/welcome-typography-with-liquid-font-glowing-modern_115579-1767.jpg?w=1060')" }}>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl shadow-2xl bg-opacity-90'>
                <div>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={signin}
                        className='bg-green-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h1 className='text-center text-white text-xl mb-4'>or</h1>
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={handleGoogleSignin}
                        className='bg-blue-500 w-full text-white font-bold px-2 py-2 rounded-lg flex items-center justify-center'>
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" className='mr-2' />
                        Continue with Google
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account? <Link className='text-red-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
                <br />
                <div>
                    <h2 className='text-white'><Link className='text-yellow-500 font-bold' to={'/forgetpass'}>Forgot Password?</Link></h2>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Login;
