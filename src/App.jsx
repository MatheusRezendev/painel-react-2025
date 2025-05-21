import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [personagens, setPersonagem] = useState([])

    useEffect(() =>{
      axios.get("https://dragonball-api.com/api/characters")
        .then(resposta => {

          const personagem = resposta.data.items

          setPersonagem(personagem)
        })
    },[])

  const [planetas, setPlanetas] = useState([]) 

    useEffect(() =>{
      axios.get("https://dragonball-api.com/api/planets")
        .then(resposta => {

          const planeta = resposta.data.items.map(item => item.name)

          setPlanetas(planetas)
        })
    },[])

  const [transformacao, setTransformacao] = useState([]) 
    
    useEffect(() =>{
      axios.get("https://dragonball-api.com/api/transformations")
        .then(resposta => {

          const transformacoes = resposta.data.map(item => item.name)

          setTransformacao(transformacoes)
        })
    },[])

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Personagens de Dragon Ball</h1>
      <div className="row">
        {
          personagens.map(personagem => (
            <div key={personagem.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={personagem.image} className="card-img-top" alt={personagem.name} />
                <div className="card-body">
                  <h5 className="card-title">{personagem.name}</h5>
                  <p className="card-text">Raça: {personagem.image}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
