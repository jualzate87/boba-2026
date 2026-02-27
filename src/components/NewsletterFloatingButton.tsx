import { Link } from 'react-router-dom'

interface NewsletterFloatingButtonProps {
  visible: boolean
}

export default function NewsletterFloatingButton({ visible }: NewsletterFloatingButtonProps) {
  if (!visible) return null

  return (
    <Link
      to="/pro/newsletter"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-intuit-blue text-white font-medium rounded-full shadow-lg hover:bg-intuit-blue-dark transition-colors"
    >
      <span className="text-sm">Bi-weekly report</span>
    </Link>
  )
}
