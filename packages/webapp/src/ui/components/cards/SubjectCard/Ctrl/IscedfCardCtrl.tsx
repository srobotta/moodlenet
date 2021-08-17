import { ID } from '@moodlenet/common/lib/graphql/scalars.graphql'
import { nodeGqlId2UrlPath } from '@moodlenet/common/lib/webapp/sitemap/helpers'
import { useMemo } from 'react'
import { useLocalInstance } from '../../../../../context/Global/LocalInstance'
import { href } from '../../../../elements/link'
import { CtrlHook } from '../../../../lib/ctrl'
import { SubjectCardProps } from '../SubjectCard'
import { useIscedfCardQuery } from './IscedfCard.gen'

export const useIscedfCardCtrl: CtrlHook<SubjectCardProps, { id: ID }> = ({ id }) => {
  const subjectNode = useIscedfCardQuery({ variables: { id } }).data?.node
  const { org: localOrg } = useLocalInstance()
  const subjectCardUIProps = useMemo<SubjectCardProps | null>(() => {
    if (!(subjectNode && subjectNode.__typename === 'IscedField')) {
      return null
    }
    const orgData = null ?? localOrg
    const organization: SubjectCardProps['organization'] = {
      color: orgData.color,
      url: `${orgData.domain}`,
    }

    return {
      organization,
      title: subjectNode.name,
      subjectHomeHref: href(nodeGqlId2UrlPath(id)),
    }
  }, [subjectNode, localOrg, id])
  return subjectCardUIProps && [subjectCardUIProps]
}
