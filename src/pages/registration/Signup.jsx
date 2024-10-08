import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout'

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const signup = async () => {
        setLoading(true);
        if (firstName === "" || lastName === "" || email === "" || phone === "" || state === "" || city === "" || zipCode === "") {
            setLoading(false);
            return toast.error("All fields are required");
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, "temp1234");
            await sendPasswordResetEmail(auth, email);
            toast.info("Please check your email to set your password.");
            navigate('/login');
            
            const user = {
                firstName,
                lastName,
                email: userCredential.user.email,
                phone,
                state,
                city,
                zipCode,
                uid: userCredential.user.uid,
                time: Timestamp.now(),
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);

            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setState("");
            setCity("");
            setZipCode("");
        } catch (error) {
            setLoading(false);
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already exists");
                navigate('/login');
            } else {
                console.error(error);
            }
        }
    };

    const googleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = {
                firstName: user.displayName.split(" ")[0],
                lastName: user.displayName.split(" ")[1],
                email: user.email,
                phone: user.phoneNumber || "",
                state: "",
                city: "",
                zipCode: "",
                uid: user.uid,
                time: Timestamp.now(),
            };
            
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, userData);

            toast.success("Signed up with Google successfully");
            navigate('/dashboard');  // Redirect to dashboard or desired page
        } catch (error) {
            console.error(error);
            toast.error("Google signup failed");
        }
    };

    return (
        <Layout>
        <div className='flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat bg-opacity-75' style={{ backgroundImage: "url('https://img.freepik.com/free-photo/black-silhouettes-music-concert-poster-concept_1194-617147.jpg?t=st=1723655718~exp=1723659318~hmac=cf7cf94bb77de81ecdf590508b17698d96368ceac017ead2b656afdcf9c5f101&w=1060')" }}>
            {loading && <Loader />}
            <div className='bg-gray-800 px-8 py-8 rounded-xl shadow-2xl bg-opacity-90'>
                <div className="mb-6">
                    <h1 className='text-center text-white text-xl font-bold'>Signup</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <input type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        name='firstName'
                        className='bg-gray-600 px-2 py-2 rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='First Name'
                    />
                    <input type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        name='lastName'
                        className='bg-gray-600 px-2 py-2 rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Last Name'
                    />
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-600 px-2 py-2 rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                    <input type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        name='phone'
                        className='bg-gray-600 px-2 py-2 rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Phone Number'
                    />
                    <input type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        name='state'
                        className='bg-gray-600 px-2 py-2 rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='State'
                    />
                    <input type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        name='city'
                        className='bg-gray-600 px-2 py-2 rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='City'
                    />
                    <input type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        name='zipCode'
                        className='bg-gray-600 px-2 py-2 rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Zip Code'
                    />
                </div>
                <div className='flex justify-center mt-6'>
                    <button
                        onClick={signup}
                        className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
                        Verify Email
                    </button>
                </div>
                <div>
                    <h1 className='text-center text-white text-xl mb-2 mt-2'>or</h1>
                </div>
                <div className='flex justify-center mt-4'>
                    <button
                        onClick={googleSignup}
                        className='bg-blue-500 w-full text-white font-bold px-2 py-2 rounded-lg flex items-center justify-center'>
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" className='mr-2' />
                        Continue with Google
                    </button>
                </div>
                <div className='text-center mt-4'>
                    <h2 className='text-white'>Have an account? <Link className='text-green-500 font-bold' to={'/login'}>Login</Link></h2>
                    <h2 className='text-white mt-2'><Link className='text-yellow-500 font-bold' to={'/forgetpass'}>Forgot Password?</Link></h2>
                </div>
            </div>
            <footer className="absolute bottom-0 left-0 w-full text-center p-3 bg-gray-900 text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                After clicking verify email, please check your email to set your password.
            </footer>
        </div>
        </Layout>
    );
}

export default Signup;
