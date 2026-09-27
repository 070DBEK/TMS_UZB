'use client'

import { useMemo, useState } from 'react'
import { Bell, CalendarDays, ChevronDown, ChevronRight, CircleHelp, ClipboardList, FileText, LogOut, Menu, Search, Settings, Shield, Trophy, Users, UserRound, X } from 'lucide-react'

type View = 'overview' | 'teams' | 'matches' | 'officials' | 'competitions'

const competitions = [
  { code: 'UZB-2026-01', name: 'O‘zbekiston chempionati — erkaklar', dates: '12–18 may 2026', venue: 'Toshkent, Milliy stadion', status: 'Faol', teams: '8 jamoa', matches: '28 ta o‘yin' },
  { code: 'UZB-2026-02', name: 'O‘zbekiston kubogi — ayollar', dates: '04–09 iyun 2026', venue: 'Samarqand sport majmuasi', status: 'Ro‘yxatdan o‘tish', teams: '6 jamoa', matches: '15 ta o‘yin' },
  { code: 'UZB-2026-03', name: 'Yoshlar ligasi U-18', dates: '22–27 iyul 2026', venue: 'Toshkent viloyati', status: 'Rejalashtirilgan', teams: '10 jamoa', matches: '45 ta o‘yin' },
]
const matches = [
  { date: '18 MAY', time: '16:00', home: 'Toshkent Dinamo', away: 'Samarqand HC', comp: 'O‘zbekiston chempionati', place: 'Milliy stadion · 1-maydon', state: 'Kutilmoqda' },
  { date: '19 MAY', time: '14:30', home: 'Navbahor', away: 'Andijon HC', comp: 'O‘zbekiston chempionati', place: 'Milliy stadion · 2-maydon', state: 'Kutilmoqda' },
  { date: '20 MAY', time: '17:00', home: 'Bunyodkor', away: 'Farg‘ona HC', comp: 'O‘zbekiston chempionati', place: 'Milliy stadion · 1-maydon', state: 'Kutilmoqda' },
]
const teams = [
  ['Toshkent Dinamo', 'Toshkent', 'Erkaklar', '12'], ['Samarqand Hockey Club', 'Samarqand', 'Erkaklar', '10'], ['Navbahor HC', 'Namangan', 'Ayollar', '9'], ['Andijon Hockey Club', 'Andijon', 'Erkaklar', '8'], ['Bunyodkor', 'Toshkent', 'Ayollar', '11'], ['Farg‘ona HC', 'Farg‘ona', 'U-18', '14'],
]
const officials = [
  ['Jasur Karimov', 'Umpire', 'Toshkent', 'Faol'], ['Madina Islomova', 'Judge', 'Samarqand', 'Faol'], ['Rustam Qodirov', 'Technical delegate', 'Toshkent', 'Faol'], ['Dilshod Rahimov', 'Umpire manager', 'Buxoro', 'Tekshiruvda'], ['Sevara Tursunova', 'Judge', 'Andijon', 'Faol'],
]

const labels: Record<View, string> = { overview: 'Bosh sahifa', teams: 'Jamoalar', matches: 'Uchrashuvlar', officials: 'Rasmiylar', competitions: 'Musobaqalar' }

export default function Home() {
  const [view, setView] = useState<View>('overview')
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const filteredCompetitions = useMemo(() => competitions.filter((item) => Object.values(item).join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  const filteredTeams = useMemo(() => teams.filter((item) => item.join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  const filteredOfficials = useMemo(() => officials.filter((item) => item.join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  const navigate = (next: View) => { setView(next); setQuery(''); setNavOpen(false) }

  return <div className="federation-app">
    <header className="site-header"><div className="header-inner">
      <button className="mobile-toggle" aria-label="Menyuni ochish" onClick={() => setNavOpen(true)}><Menu /></button>
      <button className="federation-brand" onClick={() => navigate('overview')}><span className="brand-mark">UZ</span><span><b>O‘zbekiston</b><small>Chim ustida xokey federatsiyasi</small></span></button>
      <nav className={navOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Asosiy menyu">
        {(Object.keys(labels) as View[]).map((item) => <button key={item} className={view === item ? 'nav-active' : ''} onClick={() => navigate(item)}>{labels[item]}</button>)}
        <button className="mobile-close" onClick={() => setNavOpen(false)}><X /> Yopish</button>
      </nav>
      <div className="header-tools"><button aria-label="Qidiruv"><Search /></button><button aria-label="Bildirishnomalar"><Bell /><i>2</i></button><button className="profile-menu"><span className="profile-initials">AO</span><span className="profile-name">Ahmadov Ozodbek</span><ChevronDown /></button></div>
    </div></header>

    <main id="top">
      <div className="page-title"><div><p className="breadcrumb">Bosh sahifa <ChevronRight /> {labels[view]}</p><h1>{view === 'overview' ? 'Federatsiya boshqaruv paneli' : labels[view]}</h1><p className="subtitle">{view === 'overview' ? 'O‘zbekiston chim ustida xokey federatsiyasining yagona boshqaruv portali.' : `${labels[view]} reyestri va boshqaruv ma’lumotlari.`}</p></div><div className="page-actions"><button className="secondary-button"><FileText /> Hisobotlar</button><button className="primary-button"><CalendarDays /> Kalendar</button></div></div>
      {view === 'overview' ? <Overview navigate={navigate} filteredCompetitions={filteredCompetitions} query={query} setQuery={setQuery} /> : <Registry view={view} query={query} setQuery={setQuery} competitions={filteredCompetitions} teams={filteredTeams} officials={filteredOfficials} />}
    </main>
    <footer><div><span className="footer-mark">UZ</span><span>O‘zbekiston Chim Ustida Xokey Federatsiyasi</span></div><span>2026 · Ichki boshqaruv portali</span><button><CircleHelp /> Yordam markazi</button><button><LogOut /> Chiqish</button></footer>
  </div>
}

function Overview({ navigate, filteredCompetitions, query, setQuery }: { navigate: (v: View) => void; filteredCompetitions: typeof competitions; query: string; setQuery: (v: string) => void }) {
  return <>
    <section className="overview-grid"><Metric icon={<Trophy />} tone="green" label="Faol musobaqalar" value="8" note="+2 bu mavsumda" /><Metric icon={<Users />} tone="blue" label="Ro‘yxatdagi jamoalar" value="36" note="5 ta hududdan" /><Metric icon={<ClipboardList />} tone="gold" label="Jami uchrashuvlar" value="124" note="18 tasi yakunlangan" /><Metric icon={<Shield />} tone="violet" label="Tayinlangan rasmiylar" value="42" note="6 ta yangi so‘rov" /></section>
    <div className="dashboard-grid"><section className="card competitions-card"><div className="card-header"><div><p className="overline">ASOSIY REYESTR</p><h2>Musobaqalar</h2><p className="card-desc">Federatsiya kalendaridagi musobaqalar</p></div><button className="text-button" onClick={() => navigate('competitions')}>Barchasini ko‘rish <ChevronRight /></button></div><div className="filter-bar"><div className="search-field"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Musobaqa nomi yoki kodi bo‘yicha qidirish" aria-label="Musobaqa qidirish" /></div></div><div className="competition-list">{filteredCompetitions.map((item) => <article className="competition-row" key={item.code}><div className="competition-code">{item.code}</div><div className="competition-info"><a>{item.name}</a><span>{item.dates} <b>·</b> {item.venue}</span></div><div className="competition-meta"><span className={'status status-' + item.status.replaceAll(' ', '-').toLowerCase()}>{item.status}</span><small>{item.teams} &nbsp; {item.matches}</small></div><ChevronRight className="row-arrow" /></article>)}</div></section>
      <aside className="side-column"><section className="card activity-card"><div className="card-header compact"><div><p className="overline">TIZIM HOLATI</p><h2>So‘nggi faoliyat</h2></div><button className="more-button">•••</button></div><div className="activity-list"><div><span className="activity-dot green-dot" /><p><b>Yangi uchrashuv tasdiqlandi</b><small>O‘zbekiston chempionati · 14 daqiqa avval</small></p></div><div><span className="activity-dot blue-dot" /><p><b>Jamoa ro‘yxatdan o‘tdi</b><small>Samarqand Hockey Club · 2 soat avval</small></p></div><div><span className="activity-dot gold-dot" /><p><b>Rasmiy tayinlandi</b><small>U-18 Yoshlar ligasi · Kecha</small></p></div></div></section><section className="card access-card"><div className="card-header compact"><div><p className="overline">SIZNING ROLINGIZ</p><h2>Technical delegate</h2></div><Settings /></div><p>Musobaqalar, uchrashuvlar va rasmiylar bo‘yicha to‘liq boshqaruv huquqi.</p><button className="outline-button">Profil va huquqlar</button></section></aside></div>
    <section className="card matches-card"><div className="card-header"><div><p className="overline">MUSOBAQA KALENDARI</p><h2>Keyingi uchrashuvlar</h2><p className="card-desc">Rejalashtirilgan uchrashuvlar ro‘yxati</p></div><button className="text-button" onClick={() => navigate('matches')}>Uchrashuvlar markazi <ChevronRight /></button></div><div className="match-table"><div className="match-head"><span>SANA</span><span>UCHRASHUV</span><span>MUSOBAQA</span><span>O‘TKAZILISH JOYI</span><span>HOLAT</span></div>{matches.map((match) => <div className="match-row" key={match.date + match.time}><div><b>{match.date}</b><small>{match.time}</small></div><div className="teams"><strong>{match.home}</strong><span>vs</span><strong>{match.away}</strong></div><span>{match.comp}</span><span>{match.place}</span><span className="match-state">{match.state}</span></div>)}</div></section>
  </>
}

function Metric({ icon, tone, label, value, note }: { icon: React.ReactNode; tone: string; label: string; value: string; note: string }) { return <article className="metric-card"><span className={`metric-icon ${tone}`}>{icon}</span><div><small>{label}</small><strong>{value}</strong><em>{note}</em></div></article> }

function Registry({ view, query, setQuery, competitions, teams, officials }: { view: View; query: string; setQuery: (v: string) => void; competitions: typeof competitions; teams: string[][]; officials: string[][] }) {
  const title = labels[view]
  return <section className="card registry-card"><div className="card-header"><div><p className="overline">FEDERATSIYA REYESTRI</p><h2>{title}</h2><p className="card-desc">Ma’lumotlarni ko‘rish, izlash va boshqarish</p></div><button className="primary-button">+ Yangi qo‘shish</button></div><div className="filter-bar"><div className="search-field"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`${title} bo‘yicha qidirish`} aria-label={`${title} qidirish`} /></div><button className="filter-button">Barchasi <ChevronDown /></button></div>{view === 'competitions' && <div className="registry-table"><div className="registry-head"><span>KOD</span><span>MUSOBAQA</span><span>SANA VA JOY</span><span>HOLAT</span><span></span></div>{competitions.map((item) => <div className="registry-row" key={item.code}><b>{item.code}</b><strong>{item.name}<small>{item.teams} · {item.matches}</small></strong><span>{item.dates}<small>{item.venue}</small></span><span className="status status-faol">{item.status}</span><ChevronRight /></div>)}</div>}{view === 'teams' && <Directory headers={['JAMOA', 'HUDUD', 'TOIFA', 'O‘YINCHILAR']} rows={teams} icon={<Users />} />}{view === 'officials' && <Directory headers={['RASMIY', 'ROL', 'HUDUD', 'HOLAT']} rows={officials} icon={<UserRound />} />}{view === 'matches' && <div className="registry-match-list">{matches.map((m) => <div className="registry-match" key={m.date}><span className="date-block"><b>{m.date}</b><small>{m.time}</small></span><div><strong>{m.home} <span>vs</span> {m.away}</strong><small>{m.comp} · {m.place}</small></div><span className="match-state">{m.state}</span><ChevronRight /></div>)}</div>}</section>
}
function Directory({ headers, rows, icon }: { headers: string[]; rows: string[][]; icon: React.ReactNode }) { return <div className="directory"><div className="registry-head">{headers.map((h) => <span key={h}>{h}</span>)}<span /></div>{rows.map((row) => <div className="directory-row" key={row[0]}><strong><span className="directory-icon">{icon}</span>{row[0]}</strong>{row.slice(1).map((cell, i) => <span key={i} className={i === row.length - 2 ? 'status status-faol' : ''}>{cell}</span>)}<ChevronRight /></div>)}</div> }

