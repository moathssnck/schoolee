export function Header() {
  return (
    <header className="w-full bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">✓</span>
          </div>
          <span className="text-white font-semibold text-lg">تحقق</span>
        </div>
        <div className="text-white/80 text-sm">التحقق الآمن من الهوية</div>
      </div>
    </header>
  )
}
