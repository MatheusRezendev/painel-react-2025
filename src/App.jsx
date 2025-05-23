import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [personagens, setPersonagem] = useState([]);
  const [personagensFiltrados, setPersonagensFiltrados] = useState([]);
  const [detalhesVisiveis, setDetalhesVisiveis] = useState([]);

  // Função para filtrar personagens
  const filtrarPersonagens = (filtro) => {
    if (filtro === 'todos') {
      setPersonagensFiltrados(personagens);
    } else {
      setPersonagensFiltrados(
        personagens.filter(personagem =>
          personagem.race?.toLowerCase().includes(filtro.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    axios.get("https://dragonball-api.com/api/characters")
      .then(resposta => {
        const dados = resposta.data.items;
        setPersonagem(dados);
        setPersonagensFiltrados(dados); // Inicializa com todos os personagens
      })
      .catch(error => console.error("Erro ao carregar personagens:", error));
  }, []);

  // Função para criar grupos de 3 personagens
  const getPersonagensPorGrupo = (grupo) => {
    const inicio = grupo * 3;
    const fim = inicio + 3;
    return personagensFiltrados.slice(inicio, fim);
  };

  // Calcula o número total de grupos
  const totalGrupos = Math.ceil(personagensFiltrados.length / 3);

  return (
    <>
      <div className="container mt-4">
        <h1 className="titulo mb-4">Personagens de Dragon Ball Z</h1>

        {/* Botões de Filtro */}
        <div className="d-flex gap-2 mb-4">
          <button className="btn btn-primary" onClick={() => filtrarPersonagens('todos')}>
            Mostrar Todos
          </button>
          <button className="btn btn-primary" onClick={() => filtrarPersonagens('saiyan')}>
            Mostrar Saiyan
          </button>
          <button className="btn btn-primary" onClick={() => filtrarPersonagens('android')}>
            Mostrar Android
          </button>
          <button className="btn btn-primary" onClick={() => filtrarPersonagens('namekian')}>
            Mostrar Namekian
          </button>
          <button className="btn btn-primary" onClick={() => filtrarPersonagens('frieza race')}>
            Mostrar Frieza Race
          </button>
          <button className="btn btn-primary" onClick={() => filtrarPersonagens('Human')}>
            Mostrar Humano
          </button>
        </div>

        {/* Carrossel */}
        {personagensFiltrados.length > 0 ? (
          <div id="personagensCarousel" className="carousel slide" data-bs-interval="false" data-bs-ride="false">
            <div className="carousel-indicators">
              {Array.from({ length: totalGrupos }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#personagensCarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? 'active' : ''}
                />
              ))}
            </div>

            <div className="carousel-inner">
              {Array.from({ length: totalGrupos }, (_, grupo) => (
                <div key={grupo} className={`carousel-item ${grupo === 0 ? 'active' : ''}`}>
                  <div className="row">
                    {getPersonagensPorGrupo(grupo).map((personagem) => (
                      <div key={personagem.id} className="col-md-4 mb-3">
                        <div className="card h-100">
                          <img
                            src={personagem.image || 'https://via.placeholder.com/400x400'}
                            className="card-img-top img-fluid"
                            alt={personagem.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{personagem.name}</h5><br />
                            <p className="card-text text-light">Ki: {personagem.ki || 'Não informado'}</p>
                            <p className="card-text text-light">maxKi: {personagem.maxKi || 'Não informado'}</p>
                            <p className="card-text text-light">Raça: {personagem.race || 'Não informado'}</p>
                            <p className="card-text text-light">Genêro: {personagem.gender || 'Não informado'}</p>
                            <p className="card-text text-light">Afiliação: {personagem.affiliation || 'Não informado'}</p>
                            <button
                              className="btn btn-primary mt-3"
                              onClick={() =>
                                setDetalhesVisiveis(prev => ({
                                  ...prev,
                                  [personagem.id]: !prev[personagem.id]
                                }))
                              }
                            >
                              {detalhesVisiveis[personagem.id] ? 'Ocultar' : 'Ver Mais'}
                            </button>
                            {detalhesVisiveis[personagem.id] && (
                              <div className="mt-3 text-light">
                                <p>Descricao: {personagem.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#personagensCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#personagensCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Próximo</span>
            </button>
          </div>
        ) : (
          <p>Nenhum personagem encontrado.</p>
        )}
      </div>
    </>
  );
}

export default App;
