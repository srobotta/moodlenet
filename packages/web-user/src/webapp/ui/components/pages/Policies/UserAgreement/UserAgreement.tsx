import { Card, PrimaryButton, Switch } from '@moodlenet/component-library'
import type { MainFooterProps, MinimalisticHeaderProps } from '@moodlenet/react-app/ui'
import { SimpleLayout } from '@moodlenet/react-app/ui'
import { useFormik } from 'formik'
import type { FC } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfileHomePageRoutePath } from '../../../../../../common/webapp-routes.mjs'
import { AuthCtx } from '../../../../../rt/exports.mjs'
import { shell } from '../../../../../rt/shell.mjs'
import './UserAgreement.scss'

export type UserAgreementProps = {
  headerProps: MinimalisticHeaderProps
  footerProps: MainFooterProps
}

export const UserAgreement: FC<UserAgreementProps> = ({ footerProps, headerProps }) => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthCtx)
  const form = useFormik<{ confirmTerms: boolean }>({
    initialValues: { confirmTerms: false },
    enableReinitialize: true,
    onSubmit: values => {
      if (!values.confirmTerms) {
        form.setFieldError('confirmTerms', 'Confirmation needed')
        return
      }
      const terms = document.querySelector('.user-agreement')?.innerHTML ?? ''
      shell.rpc
        .me('webapp/confirmUser')({ terms: terms })
        .then(() => {
          let redirectTo = '/'
          const hasProfile = authCtx.clientSessionData?.myProfile
          if (hasProfile) {
            redirectTo = getProfileHomePageRoutePath({
              _key: hasProfile._key,
              displayName: hasProfile.displayName,
            })
            authCtx.clientSessionData!.isConfirmed = true
          }
          navigate(redirectTo)
        })
    },
  })
  return (
    <SimpleLayout footerProps={footerProps} headerProps={headerProps}>
      {/* <MainPageWrapper onKeyDown={handleKeyDown}> */}
      <div className="user-agreement">
        <h1>MoodleNet Nutzungsbedinungen</h1>
        <p>V</p>
        <h2>1. Gültigkeit</h2>
        <p>
          Diese Version der Nutzungsbedingungen ist ab dem 10. Februar 2023 gültig und ersetzt alle
          vorherigen Versionen.
        </p>
        <h2>2. MoodleNet</h2>
        <p>
          MoodleNet ist ein open source OER-Repositorium, entwickelt von Moodle Pty Ltd. Es
          ermöglicht das Teilen von Lerninhalten über ein Netz von föderierten Knoten und einem
          Hauptrepositorium (MoodleNet Central,{' '}
          <a href="https://moodle.net" target="_blank" rel="noreferrer">
            https://moodle.net
          </a>
          ) bei Moodle Pty Ltd. Die BFH (Virtuelle Akademie) betreibt einen eigenen Node
          (Knotenpunkt,{' '}
          <a href="https://oer.virtuelleakademie.ch" target="_blank" rel="noreferrer">
            https://oer.virtuelleakademie.ch
          </a>
          ) innerhalb dieser Föderation auf einer eigenen Instanz. In Föderationen ist es analog zu
          Peer-to-peer-Netzen Nutzern möglich, über alle Nodes des Netzwerks hinweg Inhalte
          auszutauschen (durch das Hoch- und Runterladen von Inhalten). Die Datenstruktur der
          Metadaten der Inhalte basiert auf dem IEE Learning Object Metadata (LOM)-Standard, dies
          ermöglicht einen hindernisfreien Austausch über die MoodleNet-Föderation hinaus.
        </p>
        <h2>3. Benutzerdaten</h2>
        <p>
          Um sich bei dem Moodle Net Knoten der BFH anzumelden, wird eine E-Mail Adresse und ein
          Passwort verwendet. Die Anmeldung kann direkt an der Instanz sowie über das SSO Login von
          Switch via EDU ID erfolgen. Darüber hinaus muss jeder Benutzer einen eigenen Displaynamen
          angeben, der aber nicht der wirkliche Name der Person sein muss.
        </p>
        <p>
          Beim Löschen eines Accounts werden alle Personendaten gelöscht; geteilte Inhalte und
          Interaktionen bleiben aber (ggf. anonymisiert) erhalten.
        </p>
        <h2>4. Hochladen von Inhalten, Verantwortlichkeit</h2>
        <p>
          Moodle Net ist für den Austausch von Lehrinhalten konzipiert. Jeder Nutzer muss
          sicherstellen, dass die von ihm hochgeladenen Materialien:
        </p>
        <ol>
          <li>frei von Rechten Dritter sind, oder die Einwilligung dieser zur Nutzung vorliegt.</li>
          <li>
            mit einem Copyright versehen sind, unter welchem die Nutzung der Inhalte erfolgen darf.
          </li>
          <li>frei von personenbezogenen Daten ind, bzw. diese unkenntlich gemacht sind.</li>
          <li>
            Jeder Nutzer ist für die von ihm hochgeladenen Inhalte selbst verantwortlich. Die BFH
            lehnt jegliche Haftungsübernahme ab.
          </li>
        </ol>
        <h2>5. Löschen von Inhalten</h2>
        <p>
          Jeder Nutzer hat die Möglichkeit, seine hochgeladenen Daten zu entfernen. Die Daten werden
          aber nur auf dem Moodle Net Knoten der BFH gelöscht. Sollten die Inhalte bereits zu
          anderen Knoten im förderierten Netz übertragen worden sein, kann der Inhalt von dort nicht
          mehr entfernt werden.
        </p>
        <p>
          Darüber hinaus hat der Betreiber des Moodle Net Knotens (die BFH) unabhängig von den
          Nutzern die Möglichkeit, Inhalte von der Plattform zu entfernen, sollte dies erforderlich
          sein, was insbesondere bei Nichteinhalten der unter Punkt 4 sicherzustellenden Massnahmen
          der Fall ist.
        </p>
      </div>
      <div className="user-agreement-form">
        <Card className="column">
          <div className="parameter">
            <div className="name">User Agreement Confirmation</div>
            <Switch
              enabled={form.values.confirmTerms}
              toggleSwitch={() => form.setFieldValue('confirmTerms', !form.values.confirmTerms)}
            />
          </div>
          <PrimaryButton
            disabled={!form.dirty}
            onClick={() => {
              form.submitForm()
            }}
          >
            Confirm
          </PrimaryButton>
        </Card>
      </div>
    </SimpleLayout>
  )
}

UserAgreement.displayName = 'UserAgreementPage'
