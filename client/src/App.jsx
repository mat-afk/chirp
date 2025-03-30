import { useState } from "react";
import useChirp from "./useChirp";
import ProfileIcon from "./assets/profile.jpeg";
import "./App.css";

const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  });
  return formatter.format(new Date(date));
};

function App() {
  const { chirps, setChirps, loading, createChirp } = useChirp();

  const [form, setForm] = useState({
    content: "",
    author: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.content || !form.author) return;

    const newChirp = await createChirp(form);
    if (newChirp) {
      setChirps([newChirp, ...chirps]);
    }

    setForm({ content: "", author: "" });
  };

  return (
    <div className="container">
      <aside>
        <section className="sticky">
          <h1>Chirps</h1>

          <form onSubmit={handleSubmit}>
            <textarea
              name="content"
              placeholder="Estou pensando em..."
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              value={form.content}
            ></textarea>

            <input
              type="text"
              name="author"
              placeholder="Autor"
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              value={form.author}
            />

            <button type="submit">Enviar</button>
          </form>
        </section>
      </aside>

      <hr />

      <main className="chirps">
        {loading ? (
          <h3>Carregando...</h3>
        ) : (
          chirps.map((chirp, i) => {
            return (
              <>
                <div key={chirp.id} className="chirp">
                  <span className="content">{chirp.content}</span>
                  <span className="author">
                    Feito por <strong>{chirp.author}</strong>
                  </span>
                  <span className="createdAt">
                    {formatDate(chirp.createdAt)}
                  </span>
                </div>
                {i < chirps.length - 1 && <hr />}
              </>
            );
          })
        )}
      </main>

      <hr />

      <aside>
        <section className="sticky">
          <span>Feito por Mateus Cruzatto :)</span>
          <img src={ProfileIcon} alt="icon" />
        </section>
      </aside>
    </div>
  );
}

export default App;
