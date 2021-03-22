import { FC } from 'react'
import { BaseContentNodePanel, UseBaseContentNodePanelProps } from '../components/BaseContentNodePanel'
import { UsePageHeaderProps } from '../components/PageHeader'
import { HeaderPageTemplate } from '../templates/page/HeaderPageTemplate'

export type BaseContentNodePageProps = {
  usePageHeaderProps: UsePageHeaderProps
  useBaseContentNodePanelProps: UseBaseContentNodePanelProps
}
export const BaseContentNodePage: FC<BaseContentNodePageProps> = ({
  usePageHeaderProps,
  useBaseContentNodePanelProps,
}) => {
  return (
    <HeaderPageTemplate useProps={usePageHeaderProps}>
      <BaseContentNodePanel useProps={useBaseContentNodePanelProps} />
    </HeaderPageTemplate>
  )
}
