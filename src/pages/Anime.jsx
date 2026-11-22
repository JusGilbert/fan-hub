import { useState } from "react";

const SEARCH_QUERY = `
  query ($search: String) {
    Page(perPage: 8) {
      media(search: $search, type: ANIME, isAdult: false) {
        id
        title {
          english
          romaji
        }
        episodes
        averageScore
        genres
      }
    }
  }
`;

function Anime () {
  const [term, setTerm] = useState("");
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState("idle");

  async function handleSearch(event) {
    event.preventDefault();
    const trimmed = term.trim();
    if (trimmed === "") return;

    setStatus("loading");
    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: SEARCH_QUERY,
          variables: { search: trimmed },
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      setShows(data.data.Page.media);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-sky-300"> Anime</h2>

      <form onSubmit={handleSearch} className="mt-4 flex gap-2">
        <input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="search for an anime..."
          className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-400 focus:border-sky-300 focus:outline-hidden"
          />
          <button
            type="submit"
            className="rounded-lg bg-sky-300 px-4 py-2 font-semibold text-slate-900 hover:bg-sky-200"
            >
              Search
            </button>
        </form>

        {status === "loading" && (
          <p className="mt-4 text-slate-300"> Searching...</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-pink-300">
              Something went wrong. Try again in a moment.
            </p>
          )}
          {status === "done" && shows.length === 0 && (
            <p className="mt-4 text-slate-300"> No anime found. Try another title!</p>
          )}

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {shows.map ((show) => (
              <li
                key={show.id}
                className="rounded-xl border border-slate-700 bg-slate-800 p-4"
                >
                  <h3 className="font-semibold text-sky-200">
                    {show.title.english ?? show.title.romaji}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    {show.episodes ?? "?"} episodes · Score:{" "}
                    {show.averageScore ?? "N/A"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {show.genres.join(", ")}
                  </p>
                </li>
            ))}
          </ul>
    </section>
  );
}

export default Anime;