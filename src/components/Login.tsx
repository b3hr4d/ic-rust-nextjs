import { useAuth } from "lib/hooks"

const Login = () => {
  const { login, logout, identity, isAuthenticating, isAuthenticated, error } =
    useAuth()

  return (
    <div className="login-section">
      {error && (
        <div className="status status-error" style={{ marginBottom: "16px" }}>
          ⚠️ {error.message}
        </div>
      )}

      {isAuthenticated && identity ? (
        <>
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-principal">
              {identity.getPrincipal().toText()}
            </div>
          </div>
          <button className="btn-secondary" onClick={() => logout()}>
            Disconnect Wallet
          </button>
        </>
      ) : (
        <>
          <h2 className="login-title">Connect Your Wallet</h2>
          <p className="login-description">
            Sign in with Internet Identity to interact with the IC
          </p>
          <button
            className="btn-primary"
            onClick={() => login()}
            disabled={isAuthenticating}
          >
            {isAuthenticating ? (
              <>
                <span className="spinner" />
                Connecting...
              </>
            ) : (
              "🔑 Connect with Internet Identity"
            )}
          </button>
        </>
      )}
    </div>
  )
}

export default Login
