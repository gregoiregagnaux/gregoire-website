'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Briefcase, Folder, Home } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/projets', label: 'Projets', icon: Folder },
  { href: '/blog', label: 'Blog', icon: BookOpen },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-lux-canvas text-lux-fg">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-lux-violet/[0.07] blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-lux-emerald/[0.05] blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-lux-violet/[0.06] blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-lux-border/60 bg-lux-canvas/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-lux-violet to-lux-emerald text-lux-canvas shadow-lg shadow-lux-violet/20">
              <Briefcase className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-tight text-lux-fg">Grégoire</span>
              <span className="text-xs text-lux-fg-muted">Founder Associate / COO</span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    'group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 sm:py-2',
                    active
                      ? 'bg-lux-card text-lux-fg'
                      : 'text-lux-fg-muted hover:bg-lux-card/60 hover:text-lux-fg',
                  ].join(' ')}
                >
                  <Icon
                    className={[
                      'h-4 w-4 transition-colors',
                      active ? 'text-lux-violet' : 'text-lux-fg-muted group-hover:text-lux-fg',
                    ].join(' ')}
                    strokeWidth={2}
                  />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1">{children}</main>
    </div>
  )
}
