import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "ETTO Invite"
}

export default function SecretInviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
