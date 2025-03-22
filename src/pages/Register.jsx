import { useState } from 'react';

export default function Register(){
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };
    const [errors, setErrors] = useState({});
    const validate = () => {
        let newErrors = {};
        console.log('valite-form',form);
        if (form.name.length < 3) {
            newErrors.name = "O nome deve ter pelo menos 3 caracteres.";
        }
        
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            newErrors.email = "Digite um e-mail válido.";
        }
        
        if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/.test(form.password)) {
            newErrors.password = "A senha deve ter pelo menos 6 caracteres, incluindo letras e números.";
        }
        
        if (form.password !== form.passwordConfirm) {
            newErrors.passwordConfirm = "As senhas não coincidem.";
        }
        console.log('newErrors',newErrors);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validate()) return;
        console.log('form',form);
        // alert("Cadastro realizado com sucesso!");
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
                method: "POST",
                body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            console.log(data);
            if(data.message === "Usuário registrado com sucesso!"){
                alert('Cadastro realizado com sucesso!');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container flex flex-col items-center mx-auto p-4 mt-10">
            <div className="glass-card  p-4 mt-4 flex flex-col items-center ">

                <h1 className="text-3xl font-bold mb-4">Cadastro</h1>
                <p className="text-lg">
                    Crie uma conta para acessar o conteúdo privado.
                </p>
                <label htmlFor="name" className="block mt-4">Nome</label>
                <input onChange={handleChange} type="text" id="name" placeholder="Nome..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                <label htmlFor="email" className="block mt-4">Email</label>
                <input onChange={handleChange} placeholder='Email...' type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <label htmlFor="password" className="block mt-4">Senha</label>
                <input type="password" placeholder='Senha...' onChange={handleChange} id="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <label htmlFor="passwordConfirm" className="block mt-4">Confirme a senha</label>
                <input type="password" onChange={handleChange} id="passwordConfirm" placeholder='Repita sua Senha...' className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"  />
                {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>}
                <p className="text-sm mt-2">Já tem uma conta? <a href="/login" className="text-blue-500">Faça login</a></p> 
                <br />
                <br />
                <button onClick={handleRegister} className="button">Cadastrar</button>
            </div>
        </div>
    )
}