import type { Href } from '@moodlenet/component-library'
import { Modal, PrimaryButton } from '@moodlenet/component-library'
import { t } from '@moodlenet/react-app/webapp'
import type { ComponentType, FC } from 'react'
import { useState } from 'react'
import './PublishContent.scss'
import {
  CreateCollectionPublishContentItem,
  CreateResourcePublishContentItem,
  LoginPublishContentItem,
  SignUpPublishContentItem,
} from './PublishContentItems.js'

export type PublishContentItem = {
  Component: ComponentType
  key: string
  className?: string
}

export type PublishContentHrefs = {
  loginHref: Href
  signUpHref: Href
  createResource(): void
  createCollection(): void
}

export type PublishContentProps = {
  publishContentHrefs: PublishContentHrefs
  isAuthenticated: boolean
}

export const PublishContent: FC<PublishContentProps> = ({
  publishContentHrefs,
  isAuthenticated,
}) => {
  const { loginHref, signUpHref, createResource, createCollection } = publishContentHrefs
  const [isShowingContentModal, setIsShowingContentModal] = useState<boolean>(false)

  const modals = [
    !isAuthenticated && isShowingContentModal && (
      <Modal
        className="create-content-modal"
        title={t('start_publishing')}
        closeButton={false}
        onClose={() => {
          setIsShowingContentModal(false)
        }}
        style={{ maxWidth: '500px', width: '100%', gap: '22px' }}
      >
        <LoginPublishContentItem loginHref={loginHref} />
        <SignUpPublishContentItem signUpHref={signUpHref} />
      </Modal>
    ),
    isAuthenticated && isShowingContentModal && (
      <Modal
        className="create-content-modal"
        title={t('what_do_you_want_to_publish')}
        closeButton={false}
        onClose={() => {
          setIsShowingContentModal(false)
        }}
        style={{ maxWidth: '500px', width: '100%', gap: '22px' }}
      >
        <CreateResourcePublishContentItem createResource={createResource} />
        <CreateCollectionPublishContentItem createCollection={createCollection} />
      </Modal>
    ),
  ]

  return (
    <>
      {modals}
      <PrimaryButton
        className="share-content"
        color="blue"
        onClick={() => setIsShowingContentModal(true)}
      >
        {t('publish_content')}
      </PrimaryButton>
    </>
  )
}
