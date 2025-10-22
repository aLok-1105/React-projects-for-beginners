import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="section hero">
        <div className="container hero-grid">
          <div>
            <div className="badge badge-cyan">Discover. Connect. Celebrate.</div>
            <h1 className="hero-title">Find the most exciting events around you</h1>
            <p className="hero-sub">Colorful, professional, and a little funky — BuzzHub curates concerts, meetups, and festivals with stunning visuals and real community vibes.</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="/events">Browse Events</a>
              <a className="btn btn-ghost" href="/register">Create Account</a>
            </div>
          </div>
          <div className="poster glass card">
            <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop" alt="Crowd cheering at a concert" />
            <div className="poster-overlay"></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="badge badge-pink">Trending now</div>
          <div className="grid" style={{ marginTop: 16 }}>
            {[{
              title: 'Neon Nights Festival',
              cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600&auto=format&fit=crop',
              tag: 'Music'
            },{
              title: 'Creators Meetup 2025',
              cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
              tag: 'Community'
            },{
              title: 'Street Food Carnival',
              cover: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1600&auto=format&fit=crop',
              tag: 'Food'
            },{
              title: 'Indie Film Showcase',
              cover: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
              tag: 'Film'
            }].map((e,i)=> (
              <article key={i} className="card event-card glass">
                <img className="cover" src={e.cover} alt={e.title} />
                <div className="body">
                  <span className="badge">{e.tag}</span>
                  <h3 style={{ margin: '10px 0 6px 0' }}>{e.title}</h3>
                  {/* <Link to={`/event/${i+1}`} className="btn">View details</Link> */}

                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
