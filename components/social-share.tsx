import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'

const SHARE_URL = 'https://time-speaking.selearn.online/'

const socialLinks = [
  {
    name: 'Twitter',
    url: `https://twitter.com/intent/tweet?text=Learn%20to%20speak%20time%20in%20English%20with%20this%20interactive%20web%20app!&url=${encodeURIComponent(SHARE_URL)}`,
    icon: FaTwitter,
    color: 'hover:text-[#1DA1F2]'
  },
  {
    name: 'Facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`,
    icon: FaFacebook,
    color: 'hover:text-[#4267B2]'
  },
  {
    name: 'LinkedIn',
    url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(SHARE_URL)}`,
    icon: FaLinkedin,
    color: 'hover:text-[#0077b5]'
  }
]

export function SocialShare() {
  return (
    <div className="flex gap-4 items-center">
      {socialLinks.map(({ name, url, icon: Icon, color }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-2xl transition-colors ${color}`}
          aria-label={`Share on ${name}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}
