import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'

const MUSIC_SRC = '/music/coffee-shop.mp3'

const TORCH_STORAGE_KEY = 'torch-origin-position'
const DEFAULT_BOTTOM_VH = 36
const DEFAULT_LEFT_PERCENT = 50

/* Six balloons scattered with even spacing, staggered so no vertical alignment */
const BALLOON_ENDS = [
  { x: 18, y: 14 },
  { x: 48, y: 16 },
  { x: 78, y: 15 },
  { x: 32, y: 26 },
  { x: 58, y: 25 },
  { x: 88, y: 27 },
]

const BALLOON_IMAGES = [0, 1, 2, 3, 4, 5].map((i) => `/balloons/balloon-${i}.png`)

function loadTorchPosition() {
  try {
    const raw = localStorage.getItem(TORCH_STORAGE_KEY)
    if (!raw) return { bottomVh: DEFAULT_BOTTOM_VH, leftPercent: DEFAULT_LEFT_PERCENT }
    const { bottomVh, leftPercent } = JSON.parse(raw)
    return {
      bottomVh: Number(bottomVh) || DEFAULT_BOTTOM_VH,
      leftPercent: Number(leftPercent) || DEFAULT_LEFT_PERCENT,
    }
  } catch {
    return { bottomVh: DEFAULT_BOTTOM_VH, leftPercent: DEFAULT_LEFT_PERCENT }
  }
}

function saveTorchPosition(bottomVh, leftPercent) {
  try {
    localStorage.setItem(TORCH_STORAGE_KEY, JSON.stringify({ bottomVh, leftPercent }))
  } catch (_) {}
}

function App() {
  const [torch, setTorch] = useState(loadTorchPosition)
  const [dragging, setDragging] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicLoadError, setMusicLoadError] = useState(false)
  const audioRef = useRef(null)
  const dragRef = useRef(null)
  const latestTorchRef = useRef(torch)
  latestTorchRef.current = torch

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => {
      const { startBottomVh, startLeftPercent, startX, startY } = dragRef.current
      const deltaX = (e.clientX ?? e.touches?.[0]?.clientX) - startX
      const deltaY = (e.clientY ?? e.touches?.[0]?.clientY) - startY
      const innerHeight = window.innerHeight
      const innerWidth = window.innerWidth
      const newBottomVh = Math.min(50, Math.max(20, startBottomVh - (deltaY / innerHeight) * 100))
      const newLeftPercent = Math.min(65, Math.max(35, startLeftPercent + (deltaX / innerWidth) * 100))
      setTorch({ bottomVh: newBottomVh, leftPercent: newLeftPercent })
    }
    const onUp = () => {
      setDragging(false)
      const { bottomVh, leftPercent } = latestTorchRef.current
      saveTorchPosition(bottomVh, leftPercent)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('touchmove', onMove, { passive: true })
      window.removeEventListener('touchend', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, torch.bottomVh, torch.leftPercent])

  const onTorchPointerDown = useCallback((e) => {
    e.preventDefault()
    dragRef.current = {
      startBottomVh: torch.bottomVh,
      startLeftPercent: torch.leftPercent,
      startX: e.clientX ?? e.touches?.[0]?.clientX,
      startY: e.clientY ?? e.touches?.[0]?.clientY,
    }
    setDragging(true)
  }, [torch.bottomVh, torch.leftPercent])

  const onBalloonClick = useCallback((e, index) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`Balloon ${index + 1} clicked`)
  }, [])

  const toggleMusic = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (musicPlaying) {
      el.pause()
      setMusicPlaying(false)
    } else {
      el.play()
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false))
    }
  }, [musicPlaying])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onEnded = () => setMusicPlaying(false)
    const onPlay = () => setMusicPlaying(true)
    const onPause = () => setMusicPlaying(false)
    const onError = () => setMusicLoadError(true)
    el.addEventListener('error', onError)
    el.addEventListener('ended', onEnded)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    return () => {
      el.removeEventListener('error', onError)
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [])

  /* Autoplay on load — works in some browsers / after prior visits; otherwise user uses ♪ */
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const tryPlay = () => {
      el.play().catch(() => {})
    }
    tryPlay()
    const onCanPlay = () => {
      if (el.paused) tryPlay()
    }
    el.addEventListener('canplay', onCanPlay, { once: true })
    return () => el.removeEventListener('canplay', onCanPlay)
  }, [])

  const torchX = torch.leftPercent
  const torchY = 100 - torch.bottomVh

  return (
    <div className="sky">
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <a href="#" className="cta cta--create" aria-label="Create yours">
        Create yours
      </a>
      <button
        type="button"
        className="cta cta--music"
        onClick={toggleMusic}
        aria-label={musicPlaying ? 'Pause music' : 'Play music'}
        title={musicLoadError ? 'Add public/music/coffee-shop.mp3 to enable music' : (musicPlaying ? 'Pause music' : 'Play coffee shop music')}
      >
        {musicPlaying ? '♫' : '♪'}
      </button>
      <div className="scene">
        <div className="scene__spacer" />
        <div className="stage">
          <svg
            className="strings-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {BALLOON_ENDS.map((end, i) => {
              const midX = (torchX + end.x) / 2
              const midY = (torchY + end.y) / 2
              return (
                <path
                  key={`s-${i}`}
                  d={`M ${torchX} ${torchY} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  fill="none"
                  stroke="rgba(120,120,130,0.35)"
                  strokeWidth="0.2"
                  strokeLinecap="round"
                  pointerEvents="none"
                />
              )
            })}
          </svg>

          {BALLOON_ENDS.map((end, i) => (
            <button
              key={`b-${i}`}
              type="button"
              className={`balloon balloon--${i % 3}`}
              style={{
                left: `${end.x}%`,
                top: `${end.y}%`,
                animationDelay: `${(i * 0.65) % 4}s`,
                animationDuration: `${3.5 + (i % 4) * 0.5}s`,
              }}
              onClick={(e) => onBalloonClick(e, i)}
              aria-label={`Balloon ${i + 1}`}
            >
              <img
                src={BALLOON_IMAGES[i]}
                alt=""
                className="balloon__img"
              />
              <span className="balloon__shine" />
            </button>
          ))}

          <div
            className="torch-origin"
            role="img"
            aria-label="String origin – drag to align with Statue of Liberty torch"
            title="Drag to align with the torch flame"
            style={{
              bottom: `${torch.bottomVh}vh`,
              left: `${torch.leftPercent}%`,
              transform: 'translate(-50%, 50%)',
            }}
            onPointerDown={onTorchPointerDown}
          />
        </div>
      </div>
    </div>
  )
}

export default App
