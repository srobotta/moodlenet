import { getCoreConfigs } from '@moodlenet/core/ignite'
import { mountApp } from '@moodlenet/http-server/server'
import session from 'express-session'
import passport from 'passport'
import { Strategy as SamlStrategy } from 'passport-saml'
import { extractAttributesFromSamlProfile, upsertSamlUser } from '../lib.mjs'
import { shell } from '../shell.mjs'
import { validateConfigAndGetCert } from './configtools.mjs'

shell.call(mountApp)({
  getApp: function getHttpApp(express) {
    const app = express()

    const { config, cert } = validateConfigAndGetCert()
    const { entryPoint, issuer, sessionSecret } = config

    const coreConfigs = getCoreConfigs()
    const callbackUrl = `${coreConfigs.instanceDomain}/.pkg/@citricity/saml-auth/callback`

    const samlStrategy = new SamlStrategy(
      {
        entryPoint,
        issuer,
        callbackUrl,
        cert,
        // TODO - type done and maybe profile
      },
      (profile: any, done: any) => {
        // Process user profile and extract necessary information.
        const attributes = extractAttributesFromSamlProfile(config.attributeMap, profile)
        // TODO - at some point we will want to support a displayName attribute along side firstName, lastName
        // so that we don't end up concatenating firstName and lastName which could be totally wrong for some
        // locales.
        const { uuid, email, firstName, lastName } = attributes

        upsertSamlUser({ uuid, email, displayName: `${firstName} ${lastName}` })

        return done(null, profile)
      },
    )

    passport.use(samlStrategy)

    // Setup middleware
    app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: true }))
    app.use(express.urlencoded({ extended: true }))

    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user: any, done: any) => {
      //shell.log('debug','SERIALIZE USER', user);
      done(null, user)
    })

    passport.deserializeUser((obj: any, done: any) => {
      //shell.log('debug','DESERIALIZE USER', obj);
      done(null, obj)
    })

    app.get('/login-failed', (req, res) => {
      console.log('Saml login failed for request', req)
      res.send('Saml login failed')
    })

    app.get(
      '/login',
      passport.authenticate('saml', {
        successRedirect: '/success',
        failureRedirect: '/login',
      }),
    )

    app.post(
      '/callback',
      passport.authenticate('saml', {
        failureRedirect: '/login',
        failureFlash: true,
      }),
      (req, res) => {
        res.send(`WHAT DO WE DO NOW? ${JSON.stringify(req.user)}`)
      },
    )

    app.get('/logout', (req, res) => {
      req.logout({}, () => res.redirect('/'))
    })

    app.post('/success', (req, res) => {
      shell.log('debug', '!!!req.user', req.user)
      if (req.user) {
        res.send(JSON.stringify(req.user))
      }

      res.send('Login failed!')
    })
    return app
  },
})
