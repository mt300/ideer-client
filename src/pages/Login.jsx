import { useState } from 'react';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try{

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            console.log(data);
            if(data.token){
                localStorage.setItem('authToken', data.token);
                // alert('Login realizado com sucesso!');
                window.location.href = '/';
            }

        }catch(error){
            console.error(error);
        }
    }
    return (
        <div className="container  mx-auto p-4 mt-10 ">
            <div className=' glass-card  p-4 mt-4 flex flex-col items-center'>
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <p className="text-lg w-full form-card">
                    Faça login para acessar o conteúdo privado.
                </p>
                <div className="form-card border p-10 space-y-4 mt-5">
                    <label htmlFor="email" className="block text-sm font-medium ">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        placeholder='Email...'
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    <label htmlFor="password" className="block text-sm font-medium ">Senha</label>
                    <input
                        id="password"
                        type="password"
                        placeholder='Senha...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                </div>
                <br />
                <button onClick={handleLogin}>Login</button>

            </div>
        </div>
    )
}