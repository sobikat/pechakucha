import './PechakuchaTitle3D.css'

const IFRAME_SRC = '/text-animation-1/index.html'

export function PechakuchaTitle3D() {
  return (
    <div className="pechakucha-title-3d">
      <iframe
        className="pechakucha-title-3d__frame"
        src={IFRAME_SRC}
        title="Pechakucha — three.js text animation. Click and drag horizontally to scrub."
        loading="lazy"
      />
    </div>
  )
}
