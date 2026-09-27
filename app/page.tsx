'use client'

import { useMemo, useState } from 'react'
import {
  Bell, ChevronDown, CircleHelp, Clock3, FileText, HelpCircle, LogOut,
  Menu, Search, Settings, Shield, Trophy, UserRound, Users, X,
} from 'lucide-react'

const fixtures = [
  ['09:30', 'HC Rotterdam', 'Kampong', '3', '2', 'LIVE', 'Field 1'],
  ['11:15', 'Den Bosch', 'Bloemendaal', '—', '—', 'UPCOMING', 'Field 2'],
  ['13:00', 'Pinoké', 'Amsterdam', '—', '—', 'UPCOMING', 'Field 1'],
  ['15:30', 'HGC', 'Oranje-Rood', '1', '1', 'FINISHED', 'Field 3'],
]

const competitions = [
  ['Euro Hockey League', 'International · 24 teams', 'In progress', '48'],
  ['Hoofdklasse Men', 'National league · 12 teams', 'In progress', '132'],
  ['EHL Women 2026', 'International · 16 teams', 'Upcoming', '32'],
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('In progress')
  const filteredFixtures = useMemo(() => fixtures.filter((item) => item.join(' ').toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <div className="portal-shell">
      <header className="topbar">
        <div className="brand-small">Altius<span>rt</span></div>
        <div className="top-actions">
          <span className="user-link"><UserRound /> Ahmadov Ozodbek</span>
          <span className="divider" />
          <button className="plain-action"><Shield /> Admin</button>
          <button className="plain-action"><Search /></button>
          <button className="plain-action"><LogOut /> <span className="desktop-only">Logout</span></button>
          <button className="plain-action"><CircleHelp /> <span className="desktop-only">Help</span> <ChevronDown /></button>
          <span className="help-count">0/4</span>
        </div>
      </header>

      <div className="brandbar">
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></button>
        <div className="fih-mark" aria-label="Field hockey management">FI<span>H</span></div>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          <button onClick={() => setMenuOpen(false)}>Home</button>
          <button onClick={() => setMenuOpen(false)}>Teams</button>
          <button onClick={() => setMenuOpen(false)}>Competitions</button>
          <button onClick={() => setMenuOpen(false)}>Matches</button>
          <button onClick={() => setMenuOpen(false)}>Score list</button>
          <button className="nav-close" onClick={() => setMenuOpen(false)}><X /></button>
        </nav>
      </div>

      <main>
        <section className="welcome-strip"><strong>?</strong> Help for this page (4) <span>⌃</span></section>
        <section className="fixture-strip" aria-label="Upcoming matches">
          {fixtures.slice(0, 6).map((item, index) => <article className="fixture-card" key={index}>
            <a>20th Asian Games Aichi-Nagoya<br />2026 - Men&apos;s Competition</a>
            <div className="fixture-teams"><b>{index % 2 ? 'SRI' : 'CHN'}</b><span>vs</span><b>{index % 2 ? 'INA' : 'MAS'}</b></div>
            <strong>{index + 10} hours from now</strong><small>Pool {index % 2 ? 'A' : 'B'}</small>
          </article>)}
        </section>

        <div className="content-grid">
          <aside className="left-column">
            <section className="panel welcome-panel"><div className="panel-heading"><span><UserRound /> Welcome Ozodbek Ahmadov</span><button>Your Profile</button></div><div className="notification-row"><b>Notifications</b><span>Unread <strong>0</strong></span></div></section>
            <section className="panel search-panel"><div className="panel-heading"> <span><Search /> Search</span></div><div className="search-box"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for People or Competitions" /><button aria-label="Search"><Search /></button></div></section>
            <section className="panel bookmarks"><div className="panel-heading"><span>▮ Bookmarks</span></div></section>
            <button className="disclaimer">Data Disclaimer</button>
          </aside>

          <section className="panel competition-panel"><div className="panel-heading"><span>Competition Listing</span><button>▦ View All</button></div><div className="tabs">{['Previous', 'In progress', 'Upcoming'].map(tab => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="table-wrap"><table><thead><tr><th>Competition</th><th>Dates</th><th>Location</th><th>Type</th><th>Matches</th></tr></thead><tbody>{competitions.map((competition, index) => <tr key={competition[0]}><td><a>{competition[0]}</a><small>{competition[1]}</small></td><td>{index === 2 ? '9 - 11 Oct 2026' : '7 - 10 Oct 2026'}</td><td>{index === 2 ? 'Sport Facilitation Center' : 'Managua'}</td><td>{index === 2 ? 'Senior Womens Indoor' : index === 1 ? 'Senior Womens Hockey5s' : 'Senior Mens Hockey5s'}</td><td>{competition[3]}</td></tr>)}</tbody></table></div></section>
        </div>

        <section className="lower-grid"><section className="panel list-panel"><div className="panel-heading"><span><Clock3 /> Today&apos;s match score list</span><button>View all</button></div><div className="score-list">{filteredFixtures.map(item => <div className="score-row" key={item[0]}><strong>{item[0]}</strong><span className={item[5].toLowerCase()}>{item[5]}</span><div><b>{item[1]}</b><small>{item[6]}</small></div><em>{item[3]} : {item[4]}</em><div><b>{item[2]}</b></div></div>)}</div></section><section className="panel role-panel"><div className="panel-heading"><span><Shield /> Your role & access</span></div><div className="role-card"><div className="avatar">AO</div><div><b>Technical delegate</b><small>Full competition access</small></div><span>ACTIVE</span></div><div className="access-grid"><span>Matches <b>Edit</b></span><span>Teams <b>Manage</b></span><span>Reports <b>View</b></span></div></section></section>
      </main>
      <footer><span>2026 © International Hockey Federation</span><strong>Altius<span>rt</span></strong><span>Terms of Service</span></footer>
    </div>
  )
}
