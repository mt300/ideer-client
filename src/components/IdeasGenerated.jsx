export default function IdeasGenerated(props) {
    const { ideas } = props;
    console.log(ideas.length)
    return (
        <section id="ideas-generated" className="mt-8">
            <div className="max-w-2xl mx-auto p-4">

            <h2 className="text-2xl font-bold mb-4">Ideias geradas</h2>
            {
                ideas && ideas.length > 0 ?
                <ul>
                    {ideas.map((idea, index) => (
                        <li key={index} className="p-4 border border-gray-200 mb-4">
                            <h3 className="text-xl font-bold">{idea.split('**')[1]}</h3>
                            <p className="text-lg">{idea.split('**')[2]}</p>
                            <h3 className="text-xl font-bold">{idea.split('**')[3]}</h3>
                            <p className="text-lg">{idea.split('**')[4]}</p>

                        </li>
                    ))}
                </ul>:
                <p className="text-lg">Nenhuma ideia gerada ainda.</p>
            }
            </div> 
        </section>
    )
}