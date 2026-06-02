import { useContext } from "react";
import { CVContext } from "../context/CVContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function nivelToNumero(nivel){
    if(nivel=== 'Básico') return 1;
    if(nivel=== 'Intermedio') return 2;
    if(nivel=== 'Avanzado') return 3;
    return 0;
}


function SkillChart(){
    const {habilidades} = useContext(CVContext);

    const datos=habilidades.map(h=>({
        nombre:h.nombre,
        nivel:nivelToNumero(h.nivel)
    }));

    if(habilidades.length === 0) {
        return <p>No hay habilidades para mostrar.</p>
    }

    return (
        <div className="skill-chart">
            <h2>Habilidades</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datos}>
                    <XAxis dataKey="nombre" />
                    <YAxis 
                        domain={[0, 3]} 
                        ticks={[1,2,3]}
                        tickFormatter={(valor)=>{
                            if(valor===1)return 'Básico'
                            if(valor===2)return 'Intermedio'
                            if(valor===3)return 'Avanzado'
                            return '';
                        }}
                    />
                    <Tooltip 
                        formatter={(valor)=>{
                            if(valor===1)return 'Básico'
                            if(valor===2)return 'Intermedio'
                            if(valor===3)return 'Avanzado'
                        }}
                    />
                    <Bar dataKey="nivel" fill="rgb(209, 118, 65)" radius={[6,6,0,0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SkillChart;