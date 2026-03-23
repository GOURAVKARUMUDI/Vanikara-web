const INFO = [
  { icon: '📧', title: 'Email Us',     value: 'vanikara26@gmail.com', link: 'mailto:vanikara26@gmail.com' },
  { icon: '🌐', title: 'Website',      value: 'www.vanikara.com',      link: 'https://vanikara.com' },
  { icon: '📍', title: 'Headquarters', value: 'Andhra Pradesh, India',  link: '#' },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      {INFO.map(({ icon, title, value, link }) => (
        <div
          key={title}
          className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: '#e8f0fe' }}
          >
            {icon}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold mb-0.5">{title}</div>
            <a
              href={link}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors no-underline"
            >
              {value}
            </a>
          </div>
        </div>
      ))}

      {/* Response callout */}
      <div
        className="p-6 rounded-2xl text-white"
        style={{ background: 'linear-gradient(135deg,#1B2A4A,#1E6BD6)' }}
      >
        <div className="text-3xl mb-3">⚡</div>
        <h3 className="font-bold text-lg mb-2">Quick Response Guaranteed</h3>
        <p className="text-white/75 text-sm leading-relaxed">
          We typically respond within <strong>24 hours</strong> Monday–Friday.
          For urgent requests, email us directly.
        </p>
      </div>
    </div>
  );
}
