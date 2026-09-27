'use client'

import { useMemo, useState } from 'react'
import { Bell, CircleHelp, Clock3, LogOut, Menu, Search, ShieldCheck, Trophy, UserRound, Users, X } from 'lucide-react'

const matches = [
  { time: '09:30', home: 'HC Rotterdam', away: 'Kampong', score: '3 : 2', status: 'LIVE', field: 'Field 1' },
  { time: '11:15', home: 'Den Bosch', away: 'Bloemendaal', score: '— : —', status: 'UPCOMING', field: 'Field 2' },
  { time: '13:00', home: 'Pinoké', away: 'Amsterdam', score: '— : —', status: 'UPCOMING', field: 'Field 1' },
  { time: '15:30', home: 'HGC', away: 'Oranje-Rood', score: '1 : 1', status: 'FINISHED', field: 'Field 3' },
]

const competitions = [
  { name: 'Euro Hockey League', meta: 'International · 24 teams', dates: 'Oct 7–10, 2026', place: 'Barcelona', type: 'Senior Men', matches: '48', state: 'In progress' },
  { name: 'Hoofdklasse Men', meta: 'National league · 12 teams', dates: 'Oct 7–10, 2026', place: 'Amsterdam', type: 'Senior Men', matches: '132', state: 'In progress' },
  { name: 'EHL Women 2026', meta: 'International · 16 teams', dates: 'Oct 9–11, 2026', place: 'Barcelona', type: 'Senior Women', matches: '32', state: 'Upcoming' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('In progress')
  const filteredMatches = useMemo(() => matches.filter((match) => Object.values(match).join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  const visibleCompetitions = competitions.filter((competition) => activeTab === 'Previous' || competition.state === activeTab || (activeTab === 'In progress' && competition.state === 'In progress'))

  return (
    <div className="portal-shell">
      <header className="topbar"><a className="brand-small">Altius<span>rt</span></a><div className="top-actions"><span className="user-link"><UserRound /> Ahmadov Ozodbek</span><span className="top-divider" /><button className="plain-action"><ShieldCheck /> Admin</button><button className="plain-action"><Bell /> <span className="desktop-only">Notifications</span></button><button className="plain-action"><LogOut /> <span className="desktop-only">Logout</span></button><button className="plain-action"><CircleHelp /> <span className="desktop-only">Help</span></button><span className="help-count">0/4</span></div></header>
      <div className="brandbar"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu /></button><div className="fih-mark">FI<span>H</span></div><nav className={menuOpen ? 'main-nav open' : 'main-nav'}><button className="selected" onClick={() => setMenuOpen(false)}>Dashboard</button><button onClick={() => setMenuOpen(false)}>Teams</button><button onClick={() => setMenuOpen(false)}>Competitions</button><button onClick={() => setMenuOpen(false)}>Matches</button><button onClick={() => setMenuOpen(false)}>Score list</button><button className="nav-close" onClick={() => setMenuOpen(false)}><X /></button></nav></div>
      <main>
        <section className="hero"><div><span className="eyebrow">FIELD HOCKEY OPERATIONS</span><h1>Competition control centre</h1><p>Manage tournaments, teams, officials and match results from one place.</p></div><button className="profile-button"><UserRound /> View profile</button></section>
        <section className="quick-stats"><div><span className="stat-icon green"><Trophy /></span><div><b>8</b><small>Active competitions</small></div></div><div><span className="stat-icon violet"><Users /></span><div><b>36</b><small>Registered teams</small></div></div><div><span className="stat-icon amber"><Clock3 /></span><div><b>4</b><small>Pending actions</small></div></div><div><span className="stat-icon blue"><ShieldCheck /></span><div><b>6</b><small>Assigned officials</small></div></div></section>
        <div className="content-grid"><aside className="left-column"><section className="panel search-panel"><div className="panel-heading"><span>Find something</span><Search /></div><div className="search-box"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people, teams or competitions" aria-label="Search people, teams or competitions" /></div><div className="search-hints"><span>⌘ K</span> Search across FieldFlow</div></section><section className="panel welcome-panel"><div className="panel-heading"><span>Notifications</span><b>0 unread</b></div><div className="empty-note"><Bell /><div><strong>You&apos;re all caught up</strong><small>No new notifications right now.</small></div></div></section><section className="panel role-panel"><div className="panel-heading"><span>Your access</span><a>Manage</a></div><div className="role-card"><div className="avatar">AO</div><div><strong>Technical delegate</strong><small>Full competition access</small></div><span>ACTIVE</span></div></section></aside><section className="panel competition-panel"><div className="panel-heading"><div><span>Competition listing</span><small>Track active tournaments and seasons</small></div><button>View all <span>→</span></button></div><div className="tabs">{['Previous', 'In progress', 'Upcoming'].map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="table-wrap"><table><thead><tr><th>Competition</th><th>Dates</th><th>Location</th><th>Type</th><th>Matches</th></tr></thead><tbody>{visibleCompetitions.map((competition) => <tr key={competition.name}><td><a>{competition.name}</a><small>{competition.meta}</small></td><td>{competition.dates}</td><td>{competition.place}</td><td>{competition.type}</td><td><b>{competition.matches}</b></td></tr>)}</tbody></table></div></section></div>
        <section className="lower-grid"><section className="panel list-panel"><div className="panel-heading"><div><span>Score list</span><small>Match centre and results</small></div><a>View all →</a></div><div className="score-list">{filteredMatches.map((match) => <div className="score-row" key={match.time}><strong>{match.time}</strong><span className={match.status.toLowerCase()}>{match.status}</span><div><b>{match.home}</b><small>{match.field}</small></div><em>{match.score}</em><div className="away"><b>{match.away}</b></div></div>)}</div></section><section className="panel help-panel"><div className="panel-heading"><span>Need a hand?</span><CircleHelp /></div><div><strong>Explore the FieldFlow guide</strong><p>Learn how roles, permissions and score reporting work.</p><button>Open help centre <span>→</span></button></div></section></section>
      </main><footer><span>2026 © International Hockey Federation</span><strong>Altius<span>rt</span></strong><span>Terms of Service</span></footer>
    </div>
  )
}
