'use client'

import { useMemo, useState } from 'react'
import { Bell, CalendarDays, ChevronDown, ChevronRight, CircleHelp, ClipboardList, FileText, LogOut, Menu, Search, Settings, Shield, Trophy, Users, X } from 'lucide-react'

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

export default function Home() {
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const filtered = useMemo(() => competitions.filter((item) => Object.values(item).join(' ').toLowerCase().includes(query.toLowerCase())), [query])

  return <div className="federation-app">
    <header className="site-header">
      <div className="header-inner">
        <button className="mobile-toggle" aria-label="Menyuni ochish" onClick={() => setNavOpen(true)}><Menu /></button>
        <a className="federation-brand" href="#top"><span className="brand-mark">UZ</span><span><b>O‘zbekiston</b><small>Chim ustida xokey federatsiyasi</small></span></a>
        <nav className={navOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Asosiy menyu">
          <button className="nav-active">Bosh sahifa</button><button>Musobaqalar</button><button>Uchrashuvlar</button><button>Jamoalar</button><button>Rasmiylar</button><button className="mobile-close" onClick={() => setNavOpen(false)}><X /> Yopish</button>
        </nav>
        <div className="header-tools"><button aria-label="Qidiruv"><Search /></button><button aria-label="Bildirishnomalar"><Bell /><i>2</i></button><button className="profile-menu"><span className="profile-initials">AO</span><span className="profile-name">Ahmadov Ozodbek</span><ChevronDown /></button></div>
      </div>
    </header>

    <main id="top">
      <div className="page-title"><div><p className="breadcrumb">Bosh sahifa <ChevronRight /> Boshqaruv paneli</p><h1>Federatsiya boshqaruv paneli</h1><p className="subtitle">Musobaqalar, uchrashuvlar va jamoalar faoliyatini nazorat qilish markazi.</p></div><div className="page-actions"><button className="secondary-button"><FileText /> Hisobotlar</button><button className="primary-button"><CalendarDays /> Kalendar</button></div></div>

      <section className="overview-grid" aria-label="Umumiy ko‘rsatkichlar">
        <article className="metric-card"><span className="metric-icon green"><Trophy /></span><div><small>Faol musobaqalar</small><strong>8</strong><em>+2 bu mavsumda</em></div></article>
        <article className="metric-card"><span className="metric-icon blue"><Users /></span><div><small>Ro‘yxatdagi jamoalar</small><strong>36</strong><em>5 ta hududdan</em></div></article>
        <article className="metric-card"><span className="metric-icon gold"><ClipboardList /></span><div><small>Jami uchrashuvlar</small><strong>124</strong><em>18 tasi yakunlangan</em></div></article>
        <article className="metric-card"><span className="metric-icon violet"><Shield /></span><div><small>Tayinlangan rasmiylar</small><strong>42</strong><em>6 ta yangi so‘rov</em></div></article>
      </section>

      <div className="dashboard-grid">
        <section className="card competitions-card"><div className="card-header"><div><p className="overline">ASOSIY REYESTR</p><h2>Musobaqalar</h2><p className="card-desc">Federatsiya kalendaridagi musobaqalar</p></div><button className="text-button">Barchasini ko‘rish <ChevronRight /></button></div><div className="filter-bar"><div className="search-field"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Musobaqa nomi yoki kodi bo‘yicha qidirish" aria-label="Musobaqa qidirish" /></div><button className="filter-button">Barchasi <ChevronDown /></button></div><div className="competition-list">{filtered.map((item) => <article className="competition-row" key={item.code}><div className="competition-code">{item.code}</div><div className="competition-info"><a>{item.name}</a><span>{item.dates} <b>·</b> {item.venue}</span></div><div className="competition-meta"><span className={'status status-' + item.status.replaceAll(' ', '-').toLowerCase()}>{item.status}</span><small>{item.teams} &nbsp; {item.matches}</small></div><ChevronRight className="row-arrow" /></article>)}</div></section>
        <aside className="side-column"><section className="card activity-card"><div className="card-header compact"><div><p className="overline">TIZIM HOLATI</p><h2>So‘nggi faoliyat</h2></div><button className="more-button">•••</button></div><div className="activity-list"><div><span className="activity-dot green-dot" /><p><b>Yangi uchrashuv tasdiqlandi</b><small>O‘zbekiston chempionati · 14 daqiqa avval</small></p></div><div><span className="activity-dot blue-dot" /><p><b>Jamoa ro‘yxatdan o‘tdi</b><small>Samarqand Hockey Club · 2 soat avval</small></p></div><div><span className="activity-dot gold-dot" /><p><b>Rasmiy tayinlandi</b><small>U-18 Yoshlar ligasi · Kecha</small></p></div></div><button className="full-link">Faoliyat jurnalini ko‘rish <ChevronRight /></button></section><section className="card access-card"><div className="card-header compact"><div><p className="overline">SIZNING ROLINGIZ</p><h2>Technical delegate</h2></div><Settings /></div><p>Musobaqalar, uchrashuvlar va rasmiylar bo‘yicha to‘liq boshqaruv huquqi.</p><button className="outline-button">Profil va huquqlar</button></section></aside>
      </div>

      <section className="card matches-card"><div className="card-header"><div><p className="overline">MUSOBAQA KALENDARI</p><h2>Keyingi uchrashuvlar</h2><p className="card-desc">Rejalashtirilgan uchrashuvlar ro‘yxati</p></div><button className="text-button">Uchrashuvlar markazi <ChevronRight /></button></div><div className="match-table"><div className="match-head"><span>SANA</span><span>UCHRASHUV</span><span>MUSOBAQA</span><span>O‘TKAZILISH JOYI</span><span>HOLAT</span></div>{matches.map((match) => <div className="match-row" key={match.date + match.time}><div><b>{match.date}</b><small>{match.time}</small></div><div className="teams"><strong>{match.home}</strong><span>vs</span><strong>{match.away}</strong></div><span>{match.comp}</span><span>{match.place}</span><span className="match-state">{match.state}</span></div>)}</div></section>
    </main>
    <footer><div><span className="footer-mark">UZ</span><span>O‘zbekiston Chim Ustida Xokey Federatsiyasi</span></div><span>2026 · Ichki boshqaruv portali</span><button><CircleHelp /> Yordam markazi</button><button><LogOut /> Chiqish</button></footer>
  </div>
}
