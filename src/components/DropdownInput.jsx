import React from 'react';
import Select from 'react-select';



function DropdownInput(props) {
    const {options} = props
  const handleChange = (selectedOption) => {
    console.log('Selecionado:', selectedOption);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <label className="block text-sm font-medium text-gray-700">Escolha uma categoria</label>
      <Select
        options={options}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite ou escolha uma categoria"
      />
    </div>
  );
}

export default DropdownInput;
