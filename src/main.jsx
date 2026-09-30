import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import html2canvas from 'html2canvas'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  Eraser,
  Gem,
  GripVertical,
  Info,
  Layers3,
  LoaderCircle,
  MapPin,
  Plus,
  RotateCcw,
  Sparkles,
  WandSparkles,
  X,
} from 'lucide-react'
import './styles.css'

const crystals = [
  { id: 'rose', name: '粉晶', english: 'Rose Quartz', tone: '玫瑰粉', hex: '#df9b9c', dark: '#8e4c55', keywords: ['关系', '温柔', '自我表达'], zodiac: ['天秤座', '金牛座', '双鱼座'], image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85' },
  { id: 'amethyst', name: '紫水晶', english: 'Amethyst', tone: '暮紫', hex: '#836dba', dark: '#413665', keywords: ['平静', '专注', '直觉'], zodiac: ['水瓶座', '双鱼座', '天蝎座'], image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85' },
  { id: 'clear', name: '白水晶', english: 'Clear Quartz', tone: '晶白', hex: '#d8dde0', dark: '#77818b', keywords: ['清晰', '平衡', '放大'], zodiac: ['狮子座', '处女座', '摩羯座'], image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=85' },
  { id: 'citrine', name: '黄水晶', english: 'Citrine', tone: '蜂蜜金', hex: '#d89a37', dark: '#7a4b12', keywords: ['能量', '行动', '丰盛'], zodiac: ['白羊座', '狮子座', '射手座'], image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=900&q=85' },
  { id: 'obsidian', name: '黑曜石', english: 'Obsidian', tone: '烟黑', hex: '#292a32', dark: '#111217', keywords: ['边界', '保护', '坚定'], zodiac: ['天蝎座', '摩羯座', '处女座'], image: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=900&q=85' },
  { id: 'moonstone', name: '月光石', english: 'Moonstone', tone: '月白', hex: '#c7c7d5', dark: '#65657d', keywords: ['节奏', '感受', '新开始'], zodiac: ['巨蟹座', '天秤座', '双鱼座'], image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85' },
  { id: 'green', name: '绿幽灵', english: 'Green Phantom', tone: '苔藓绿', hex: '#71917a', dark: '#345541', keywords: ['成长', '专注', '更新'], zodiac: ['金牛座', '处女座', '摩羯座'], image: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=900&q=85' },
  { id: 'aquamarine', name: '海蓝宝', english: 'Aquamarine', tone: '潮汐蓝', hex: '#82c6c8', dark: '#397a82', keywords: ['呼吸', '沟通', '松弛'], zodiac: ['双鱼座', '水瓶座', '双子座'], image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85' },
  { id: 'tiger', name: '虎眼石', english: "Tiger's Eye", tone: '焦糖棕', hex: '#aa723e', dark: '#51351c', keywords: ['勇气', '判断', '落地'], zodiac: ['狮子座', '射手座', '白羊座'], image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=85' },
  { id: 'strawberry', name: '草莓晶', english: 'Strawberry Quartz', tone: '莓果红', hex: '#c66f7f', dark: '#6c2839', keywords: ['心动', '愉悦', '连接'], zodiac: ['巨蟹座', '天秤座', '双鱼座'], image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85' },
  { id: 'labradorite', name: '拉长石', english: 'Labradorite', tone: '雾蓝灰', hex: '#6e818e', dark: '#33434e', keywords: ['洞察', '变化', '边界'], zodiac: ['天蝎座', '水瓶座', '双鱼座'], image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85' },
  { id: 'carnelian', name: '红玛瑙', english: 'Carnelian', tone: '朱砂橙', hex: '#bb5e43', dark: '#6d281d', keywords: ['生命力', '创造', '热情'], zodiac: ['白羊座', '狮子座', '射手座'], image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85' },
]

const materials = [
  ...crystals,
  { id: 'gold', name: '金色隔珠', english: 'Gold spacer', tone: '香槟金', hex: '#c49b61', dark: '#745228', keywords: ['暖意', '光泽'], type: 'spacer' },
  { id: 'silver', name: '银色隔珠', english: 'Silver spacer', tone: '银灰', hex: '#aeb1b5', dark: '#555b62', keywords: ['清爽', '秩序'], type: 'spacer' },
  { id: 'pearl', name: '珍珠隔珠', english: 'Pearl spacer', tone: '珍珠白', hex: '#e8ded3', dark: '#756657', keywords: ['柔光', '细节'], type: 'spacer' },
  { id: 'moon-charm', name: '月亮吊坠', english: 'Moon charm', tone: '古金', hex: '#b58c50', dark: '#654c29', keywords: ['节奏', '愿望'], type: 'charm' },
  { id: 'star-charm', name: '星星吊坠', english: 'Star charm', tone: '暖金', hex: '#d7b86a', dark: '#795b24', keywords: ['闪耀', '方向'], type: 'charm' },
]

const zodiacData = [
  ['白羊座', 'Aries', 3, 21, 4, 19], ['金牛座', 'Taurus', 4, 20, 5, 20], ['双子座', 'Gemini', 5, 21, 6, 21], ['巨蟹座', 'Cancer', 6, 22, 7, 22],
  ['狮子座', 'Leo', 7, 23, 8, 22], ['处女座', 'Virgo', 8, 23, 9, 22], ['天秤座', 'Libra', 9, 23, 10, 23], ['天蝎座', 'Scorpio', 10, 24, 11, 22],
  ['射手座', 'Sagittarius', 11, 23, 12, 21], ['摩羯座', 'Capricorn', 12, 22, 1, 19], ['水瓶座', 'Aquarius', 1, 20, 2, 18], ['双鱼座', 'Pisces', 2, 19, 3, 20],
]

const defaultSlots = Array.from({ length: 24 }, (_, index) => ({ id: `slot-${index}`, materialId: null }))
const defaultBirth = { date: '', time: '', place: '' }

function getZodiac(dateValue) {
  if (!dateValue) return zodiacData[6]
  const [, month, day] = dateValue.split('-').map(Number)
  const found = zodiacData.find(([, , startMonth, startDay, endMonth, endDay]) => {
    if (startMonth > endMonth) return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)
    return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay) || (month > startMonth && month < endMonth)
  })
  return found || zodiacData[6]
}

function getRecommendations(zodiacName) {
  const matching = crystals.filter((crystal) => crystal.zodiac.includes(zodiacName))
  const fallback = crystals.filter((crystal) => !matching.includes(crystal))
  return [...matching, ...fallback].slice(0, 3)
}

function App() {
  const [screen, setScreen] = useState('home')
  const [birth, setBirth] = useState(() => JSON.parse(localStorage.getItem('shui-jin-birth') || 'null') || defaultBirth)
  const [activeMaterial, setActiveMaterial] = useState(null)
  const [slots, setSlots] = useState(() => JSON.parse(localStorage.getItem('shui-jin-slots') || 'null') || defaultSlots)
  const [category, setCategory] = useState('crystal')
  const [mode, setMode] = useState('lucky')
  const [showBirth, setShowBirth] = useState(false)
  const [showComplete, setShowComplete] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [isDesigning, setIsDesigning] = useState(false)
  const cardRef = useRef(null)

  const zodiac = useMemo(() => getZodiac(birth.date), [birth.date])
  const recommendations = useMemo(() => getRecommendations(zodiac[0]), [zodiac])
  const materialsForCategory = useMemo(() => category === 'crystal' ? crystals : materials.filter((material) => material.type === category), [category])
  const selectedMaterials = slots.map((slot) => materials.find((material) => material.id === slot.materialId) || crystals.find((crystal) => crystal.id === slot.materialId)).filter(Boolean)
  const uniqueSelected = [...new Map(selectedMaterials.map((material) => [material.id, material])).values()]

  useEffect(() => localStorage.setItem('shui-jin-birth', JSON.stringify(birth)), [birth])
  useEffect(() => localStorage.setItem('shui-jin-slots', JSON.stringify(slots)), [slots])

  const beginJourney = () => setShowBirth(true)
  const generateResult = (event) => {
    event.preventDefault()
    setShowBirth(false)
    setScreen('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const putInSlot = (materialId, slotIndex = null) => {
    setSlots((current) => {
      const next = [...current]
      const target = slotIndex ?? next.findIndex((slot) => !slot.materialId)
      const resolvedTarget = target < 0 ? next.length - 1 : target
      next[resolvedTarget] = { ...next[resolvedTarget], materialId }
      return next
    })
  }

  const clearSlot = (slotIndex) => setSlots((current) => current.map((slot, index) => index === slotIndex ? { ...slot, materialId: null } : slot))
  const resetSlots = () => setSlots(defaultSlots)

  const autoDesign = () => {
    setIsDesigning(true)
    window.setTimeout(() => {
      const plan = Array.from({ length: 24 }, (_, index) => {
        const pattern = [recommendations[0], materials.find((item) => item.id === 'gold'), recommendations[1], materials.find((item) => item.id === 'pearl')]
        return { id: `slot-${index}`, materialId: pattern[index % pattern.length].id }
      })
      setSlots(plan)
      setMode('ai')
      setIsDesigning(false)
    }, 700)
  }

  const downloadCard = async () => {
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current, { backgroundColor: '#f6f1e9', scale: 2, useCORS: true })
    const anchor = document.createElement('a')
    anchor.download = `my-crystal-${zodiac[1].toLowerCase()}.png`
    anchor.href = canvas.toDataURL('image/png')
    anchor.click()
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => setScreen('home')} aria-label="回到首页">
          <span className="wordmark-mark"><Gem size={16} strokeWidth={1.8} /></span>
          <span><strong>水晶工作室</strong><small>CRYSTAL ATELIER</small></span>
        </button>
        <div className="header-actions">
          <span className="header-note">A little ritual for your everyday</span>
          <button className="icon-button" onClick={() => setShowHelp(true)} aria-label="查看说明"><CircleHelp size={18} /></button>
        </div>
      </header>

      {screen === 'home' && <Home onStart={beginJourney} />}
      {screen === 'result' && <Result zodiac={zodiac} recommendations={recommendations} onBack={() => setScreen('home')} onStart={() => setScreen('studio')} />}
      {screen === 'studio' && (
        <Studio
          zodiac={zodiac}
          recommendations={recommendations}
          slots={slots}
          activeMaterial={activeMaterial}
          setActiveMaterial={setActiveMaterial}
          category={category}
          setCategory={setCategory}
          materialsForCategory={materialsForCategory}
          putInSlot={putInSlot}
          clearSlot={clearSlot}
          resetSlots={resetSlots}
          mode={mode}
          setMode={setMode}
          autoDesign={autoDesign}
          isDesigning={isDesigning}
          onComplete={() => setShowComplete(true)}
          onBack={() => setScreen('result')}
        />
      )}

      {showBirth && <BirthModal birth={birth} setBirth={setBirth} onClose={() => setShowBirth(false)} onSubmit={generateResult} />}
      {showComplete && <CompleteModal zodiac={zodiac} uniqueSelected={uniqueSelected} cardRef={cardRef} onClose={() => setShowComplete(false)} onDownload={downloadCard} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  )
}

function Home({ onStart }) {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-copy reveal reveal-1">
          <p className="eyebrow"><span className="eyebrow-line" /> FIND YOUR EVERYDAY RITUAL</p>
          <h1>找到属于你的<br /><em>幸运水晶</em></h1>
          <p className="hero-description">输入出生信息，认识与你同频的水晶，<br />再亲手设计一条只属于你的手串。</p>
          <button className="primary-button" onClick={onStart}>开始我的水晶之旅 <ArrowRight size={18} /></button>
          <div className="hero-footnote"><span>01</span><span className="footnote-rule" /><span>PERSONAL CRYSTAL RITUAL</span></div>
        </div>
        <div className="hero-visual reveal reveal-2" aria-label="水晶与手串静物">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-card card-back"><span>your<br />little<br />ritual</span></div>
          <div className="hero-card card-front">
            <div className="card-topline"><span>CRYSTAL / 01</span><span>2024—2026</span></div>
            <div className="card-crystal-photo" />
            <div className="card-footer"><span>rose quartz</span><span>♡</span></div>
          </div>
          <div className="floating-bead bead-pink" />
          <div className="floating-bead bead-gold" />
          <div className="floating-bead bead-clear" />
          <div className="floating-label label-top">A QUIET<br /><strong>START</strong></div>
          <div className="floating-label label-bottom">MADE FOR<br /><strong>YOU</strong></div>
        </div>
      </section>
      <section className="home-strip">
        <div><span className="strip-number">01</span><span>MEET YOUR CRYSTAL</span></div>
        <p>A small, considered ceremony<br />for an ordinary day.</p>
        <div className="strip-arrow"><ChevronRight size={17} /></div>
      </section>
      <section className="principles-section">
        <div><p className="eyebrow">THE ATELIER METHOD</p><h2>把一份<br /><em>好心情</em>戴在手上</h2></div>
        <div className="principle-grid"><Principle index="01" title="认识" copy="从出生日期开始，找到与你气质相合的水晶。" icon={<Sparkles size={18} />} /><Principle index="02" title="选择" copy="在材料桌上慢慢挑选，让直觉也参与设计。" icon={<Layers3 size={18} />} /><Principle index="03" title="创造" copy="把心里的愿望，排成一条可以每天佩戴的手串。" icon={<Gem size={18} />} /></div>
      </section>
    </main>
  )
}

function Principle({ index, title, copy, icon }) {
  return <article className="principle"><div className="principle-head"><span>{index}</span><span className="principle-icon">{icon}</span></div><h3>{title}</h3><p>{copy}</p></article>
}

function BirthModal({ birth, setBirth, onClose, onSubmit }) {
  return <div className="modal-backdrop"><div className="birth-modal modal-surface">
    <button className="modal-close" onClick={onClose} aria-label="关闭"><X size={18} /></button>
    <div className="modal-aside"><span className="modal-aside-number">01 / 03</span><span className="modal-aside-title">YOUR<br /><em>RITUAL</em><br />STARTS<br />HERE.</span><span className="modal-aside-caption">A considered beginning<br />for your everyday.</span></div>
    <form className="birth-form" onSubmit={onSubmit}>
      <p className="eyebrow">MEET YOUR CRYSTAL</p><h2>先从你的<br /><em>出生日期</em>开始</h2><p className="form-intro">我们会根据你的生日找到最适合你的水晶。<br />出生时间和地点可以留给以后。</p>
      <label>出生日期 <span>必填</span><input required type="date" value={birth.date} onChange={(event) => setBirth({ ...birth, date: event.target.value })} /></label>
      <div className="form-row"><label>出生时间 <span>可选</span><input type="time" value={birth.time} onChange={(event) => setBirth({ ...birth, time: event.target.value })} /></label><label>出生地点 <span>可选</span><div className="input-with-icon"><MapPin size={15} /><input placeholder="例如：深圳" value={birth.place} onChange={(event) => setBirth({ ...birth, place: event.target.value })} /></div></label></div>
      <button className="primary-button form-submit" type="submit">生成我的专属水晶 <ArrowRight size={18} /></button>
      <p className="privacy-note"><Info size={14} /> 这是一个轻盈的文化体验，不是科学或命理诊断。</p>
    </form>
  </div></div>
}

function Result({ zodiac, recommendations, onBack, onStart }) {
  const [primary, secondary, third] = recommendations
  return <main className="result-page">
    <div className="result-topbar"><button className="back-button" onClick={onBack}><ChevronLeft size={16} /> 返回</button><span>YOUR CRYSTAL / 01</span><span>PERSONAL MATCH</span></div>
    <section className="result-hero"><div className="result-heading"><p className="eyebrow"><span className="eyebrow-line" /> YOUR CELESTIAL MATCH</p><p className="zodiac-symbol">{zodiac[0].slice(0, 1)}</p><h1>{zodiac[0]}</h1><p className="result-english">{zodiac[1].toUpperCase()}</p><p className="result-copy">你的节奏里有一种温柔的力量。<br />这是为你挑出的三颗同频水晶。</p></div><div className="result-primary-card"><div className="result-card-image" style={{ backgroundImage: `url(${primary.image})` }} /><div className="result-card-caption"><span>01 / YOUR MAIN CRYSTAL</span><span className="result-card-dot" style={{ background: primary.hex }} /></div><h2>{primary.name}</h2><p>{primary.english}</p><div className="keyword-row">{primary.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div></section>
    <section className="result-details"><div><p className="eyebrow">YOUR THREE</p><h2>和你同频的<br /><em>日常能量</em></h2><button className="primary-button" onClick={onStart}>用我的水晶开始设计 <ArrowRight size={18} /></button></div><div className="recommendation-list">{[primary, secondary, third].map((crystal, index) => <article className={`recommendation-item ${index === 0 ? 'is-primary' : ''}`} key={crystal.id}><span className="recommendation-index">0{index + 1}</span><div className="mini-crystal" style={{ background: `radial-gradient(circle at 30% 25%, #fff, ${crystal.hex} 42%, ${crystal.dark})` }} /><div><h3>{crystal.name}</h3><p>{crystal.english}</p></div><span className="recommendation-tone">{crystal.tone}</span></article>)}</div></section>
  </main>
}

function Studio({ zodiac, recommendations, slots, activeMaterial, setActiveMaterial, category, setCategory, materialsForCategory, putInSlot, clearSlot, resetSlots, mode, setMode, autoDesign, isDesigning, onComplete, onBack }) {
  const [selectedInfo, setSelectedInfo] = useState(null)
  const handleDragStart = (event, material) => { event.dataTransfer.setData('materialId', material.id); setActiveMaterial(material.id) }
  const mainCrystal = recommendations[0]
  return <main className="studio-page">
    <div className="studio-topbar"><button className="back-button" onClick={onBack}><ChevronLeft size={16} /> 结果</button><div className="studio-title"><span>MY CRYSTAL TABLE</span><strong>Design No. 001</strong></div><div className="studio-actions"><button className="text-button" onClick={resetSlots}><RotateCcw size={15} /> 重置</button><button className="primary-button compact-button" onClick={onComplete}>完成手串 <Check size={16} /></button></div></div>
    <section className="studio-workspace">
      <div className="workspace-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> YOUR BRACELET</p><h1>把灵感<br /><em>串起来</em></h1></div><div className="workspace-note"><span className="note-number">{String(slots.filter((slot) => slot.materialId).length).padStart(2, '0')} / 24</span><p>点击材料加入，<br />拖动到任意位置替换。</p></div></div>
      <div className="studio-canvas">
        <div className="canvas-paper"><div className="paper-line line-a" /><div className="paper-line line-b" /><span className="paper-stamp">HANDMADE<br /><strong>FOR YOU</strong></span></div>
        <div className="bracelet-stage"><div className="bracelet-halo" /><div className="bracelet-orbit" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const id = event.dataTransfer.getData('materialId'); if (id) putInSlot(id) }}>
          {slots.map((slot, index) => { const material = crystals.find((item) => item.id === slot.materialId) || materials.find((item) => item.id === slot.materialId); const angle = (360 / slots.length) * index - 90; return <button key={slot.id} className={`slot-bead ${material ? 'filled' : 'empty'} ${activeMaterial === material?.id ? 'selected' : ''}`} style={{ '--angle': `${angle}deg`, '--bead-color': material?.hex || '#d9d0c8', '--bead-dark': material?.dark || '#aaa19a' }} onClick={() => material ? clearSlot(index) : activeMaterial ? putInSlot(activeMaterial, index) : null} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.stopPropagation(); const id = event.dataTransfer.getData('materialId'); if (id) putInSlot(id, index) }} aria-label={material ? `移除${material.name}` : '空的串珠位置'}><span className="bead-glint" />{material?.type === 'charm' && <span className="bead-charm">✦</span>}</button> })}
          <div className="bracelet-center"><span>MY<br /><strong>LUCKY</strong><br />MIX</span></div>
        </div></div>
        <div className="workspace-side-card"><div className="side-card-top"><span>YOUR MAIN CRYSTAL</span><span className="side-card-dot" style={{ background: mainCrystal.hex }} /></div><div className="side-crystal-photo" style={{ backgroundImage: `url(${mainCrystal.image})` }} /><h3>{mainCrystal.name}</h3><p>{mainCrystal.keywords.join('  ·  ')}</p><button onClick={() => setSelectedInfo(mainCrystal)} className="side-info-button">查看寓意 <ArrowRight size={14} /></button></div>
      </div>
    </section>
    <section className="materials-panel"><div className="materials-header"><div><p className="eyebrow">THE MATERIALS TABLE</p><h2>选一颗，让它加入你的故事</h2></div><div className="mode-switcher"><button className={mode === 'free' ? 'active' : ''} onClick={() => setMode('free')}>FREE STYLE</button><button className={mode === 'lucky' ? 'active' : ''} onClick={() => setMode('lucky')}>MY LUCKY MIX</button><button className={mode === 'ai' ? 'active' : ''} onClick={() => setMode('ai')}>AI DESIGN</button></div></div><div className="materials-body"><div className="category-tabs">{[['crystal', '水晶'], ['spacer', '隔珠'], ['charm', '吊坠']].map(([id, label]) => <button key={id} className={category === id ? 'active' : ''} onClick={() => setCategory(id)}>{label}<span>{id === 'crystal' ? crystals.length : id === 'spacer' ? '03' : '02'}</span></button>)}</div><div className="material-grid">{materialsForCategory.map((material) => <button className={`material-card ${activeMaterial === material.id ? 'active' : ''}`} key={material.id} draggable onDragStart={(event) => handleDragStart(event, material)} onClick={() => { setActiveMaterial(material.id); putInSlot(material.id) }} onMouseEnter={() => setSelectedInfo(material)} onFocus={() => setSelectedInfo(material)}><span className="material-swatch" style={{ background: `radial-gradient(circle at 32% 22%, #fff, ${material.hex} 42%, ${material.dark})` }}>{material.type === 'charm' && <span>✦</span>}</span><span className="material-name">{material.name}</span><span className="material-tone">{material.english}</span><GripVertical className="drag-hint" size={13} /></button>)}</div><div className="material-inspector">{selectedInfo ? <><span className="inspector-kicker">SELECTED MATERIAL</span><h3>{selectedInfo.name}</h3><p>{selectedInfo.keywords?.join(' · ')}</p><span className="match-meter"><span style={{ width: `${selectedInfo.zodiac?.includes(zodiac[0]) ? 98 : 76}%` }} /></span><small>{selectedInfo.zodiac?.includes(zodiac[0]) ? '与你的星座高度匹配' : '为整体增加层次'}</small></> : <><Sparkles size={20} /><p>悬停查看一颗水晶<br />与你的关系。</p></>}</div></div><div className="materials-footer"><span><span className="footer-dot" /> {slots.filter((slot) => slot.materialId).length} 颗已加入</span><button className="ai-recommend-button" onClick={autoDesign} disabled={isDesigning}>{isDesigning ? <LoaderCircle className="spin" size={16} /> : <WandSparkles size={16} />} {isDesigning ? '正在为你设计…' : '帮我设计一条'}</button></div></section>
  </main>
}

function CompleteModal({ zodiac, uniqueSelected, cardRef, onClose, onDownload }) {
  return <div className="modal-backdrop"><div className="complete-modal modal-surface"><button className="modal-close" onClick={onClose} aria-label="关闭"><X size={18} /></button><div className="complete-heading"><p className="eyebrow">DESIGNED BY YOU</p><h2>这条手串，<br /><em>只属于你。</em></h2><p>把今天的好心情保存下来，<br />下次想起时，你还能找到它。</p></div><div ref={cardRef} className="lucky-card"><div className="lucky-card-top"><span>MY CRYSTAL</span><span>{zodiac[1].toUpperCase()}</span></div><div className="lucky-card-symbol">{zodiac[0].slice(0, 1)}</div><p className="lucky-card-zodiac">{zodiac[0]}</p><p className="lucky-card-english">{zodiac[1].toUpperCase()}</p><div className="lucky-card-line" /><p className="lucky-card-label">TODAY'S CRYSTALS</p><div className="lucky-card-crystals">{uniqueSelected.slice(0, 4).map((material) => <span key={material.id}><i style={{ background: `radial-gradient(circle at 30% 25%, #fff, ${material.hex} 45%, ${material.dark})` }} />{material.name}</span>)}</div><div className="lucky-card-footer"><span>LOVE · BALANCE · INTUITION</span><span>♡</span></div></div><div className="complete-actions"><button className="secondary-button" onClick={onClose}>继续调整</button><button className="primary-button" onClick={onDownload}><Download size={16} /> 保存幸运卡</button></div></div></div>
}

function HelpModal({ onClose }) {
  return <div className="modal-backdrop"><div className="help-modal modal-surface"><button className="modal-close" onClick={onClose} aria-label="关闭"><X size={18} /></button><p className="eyebrow">HOW IT WORKS</p><h2>一个轻盈的<br /><em>水晶小仪式</em></h2><div className="help-steps"><div><span>01</span><p><strong>认识</strong><br />输入生日，发现与你同频的水晶。</p></div><div><span>02</span><p><strong>选择</strong><br />在材料桌上点选或拖拽你喜欢的珠子。</p></div><div><span>03</span><p><strong>创造</strong><br />完成后保存一张属于你的幸运卡。</p></div></div><p className="privacy-note"><Info size={14} /> 水晶寓意属于文化与生活方式体验，不替代任何专业判断。</p></div></div>
}

createRoot(document.getElementById('root')).render(<App />)
