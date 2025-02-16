import CookieConsent from 'react-cookie-consent'

const CookieBanner = () => {
  return (
    <div>
      <CookieConsent
        location='bottom'
        buttonText='Accept'
        declineButtonText='Cancel'
        enableDeclineButton
        cookieName='vocdoni_cookie_consent'
        onAccept={() => {
          localStorage.setItem('cookieConsent', 'accepted')
        }}
        onDecline={() => {
          localStorage.setItem('cookieConsent', 'declined')
        }}
        style={{ background: '#2B373B' }}
        buttonStyle={{
          color: '#fff',
          background: '#4e503b',
          fontSize: '14px',
        }}
        declineButtonStyle={{
          color: '#fff',
          background: '#c00',
          fontSize: '14px',
        }}
      >
        This website uses cookies to enhance the user experience.{' '}
        <a href='/privacy-policy' style={{ color: '#4e9c81' }}>
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href='/terms-and-conditions' style={{ color: '#4e9c81' }}>
          Terms and Conditions
        </a>
        .
      </CookieConsent>
    </div>
  )
}

export default CookieBanner
