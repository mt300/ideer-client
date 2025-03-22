import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import DropdownInput from './DropDownInput';

const categories = ['Tecnologia', 'Saúde', 'Educação', 'Entretenimento'];


export default function IdeaGeneratorTool(props) {
    const {handleIdea} = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [customCategory, setCustomCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [existingCategory, setExistingCategory] = useState(true);
    const [loading, setLoading] = useState(false);

    const onToggleCategory = () => {
        setExistingCategory(!existingCategory);
    };
    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        try{

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/requests/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            console.log(response);
            if(response.ok){
                const idea = await response.json();
                handleIdea(idea.ideas);
            }
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    };
    return (
        <section id="idea-generator-form" className="mt-8">
            <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Preencha os campos abaixo</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Nome da Plataforma */}
                <div>
                <label htmlFor="platform" className="block text-sm font-medium ">Plataforma ou Rede Social</label>
                <input
                    id="platform"
                    type="text"
                    {...register('platform', { required: 'Este campo é obrigatório' })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.platform && <p className="text-red-500 text-sm">{errors.platform.message}</p>}
                </div>

                {/* Categoria */}
                <div>
                <label htmlFor="category" className="block text-sm font-medium ">Categoria</label>
                {existingCategory? <select
                    id="category"
                    {...register('category', { required: 'Selecione ou adicione uma categoria' })}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                    ))}
                </select>:
                <input
                    type="text"
                    {...register('category', { required: 'Selecione ou adicione uma categoria' })}
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                }
                
                {/* Checkbox "Nova Categoria" */}
                <div>
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    checked={!existingCategory}
                    onChange={onToggleCategory}
                    className="form-checkbox h-4 w-4 text-blue-500"
                    />
                    <span className="ml-2 text-sm ">Usar Categoria Customizada</span>
                </label>
                </div>
                {/* categoria */}
                

                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                {/* Tags */}
                <div>
                <label htmlFor="tags" className="block text-sm font-medium ">Tags (máximo 3)</label>
                {[1, 2, 3].map((_, index) => (
                    <input
                    key={index}
                    type="text"
                    {...register(`tags[${index}]`)}
                    placeholder={`Tag #${index + 1}`}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
                </div>

                {/* Checkbox "Conteúdo com Humor" */}
                <div>
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    {...register('humor')}
                    className="form-checkbox h-4 w-4 text-blue-500"
                    />
                    <span className="ml-2 text-sm ">Conteúdo com Humor</span>
                </label>
                </div>

                {/* Botão Gerar */}
                <div className="flex justify-center">
                <button
                    disabled={loading?true:false}
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {loading?"Carregando...":"Gerar"}
                </button>
                </div>
            </form>
            </div>
        </section>
    )
}