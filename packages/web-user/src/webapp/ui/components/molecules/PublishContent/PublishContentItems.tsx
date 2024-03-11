import type { Href } from '@moodlenet/component-library'
import { PrimaryButton } from '@moodlenet/component-library'
import { Link } from '@moodlenet/react-app/ui'
import { t } from '@moodlenet/react-app/webapp'
import { ArrowForward, LibraryAdd, NoteAdd, StreamOutlined } from '@mui/icons-material'
import type { FC } from 'react'

export type CreateResourcePublishContentItemProps = { createResource(): void }
export const CreateResourcePublishContentItem: FC<CreateResourcePublishContentItemProps> = ({
  createResource,
}) => (
  <div onClick={createResource}>
    <PrimaryButton className="" color="card">
      <NoteAdd />
      <div className="content">
        <div className="title">{t('publish_a_new_resource')}</div>
        <div className="subtitle">{t('subtitle_create_resource')}</div>
      </div>
    </PrimaryButton>
  </div>
)

export type CreateCollectionPublishContentItemProps = { createCollection(): void }
export const CreateCollectionPublishContentItem: FC<CreateCollectionPublishContentItemProps> = ({
  createCollection,
}) => (
  <div onClick={createCollection}>
    <PrimaryButton className="" color="card">
      <LibraryAdd />
      <div className="content">
        <div className="title">{t('publish_a_new_collection')}</div>
        <div className="subtitle">{t('subtitle_create_collection')}</div>
      </div>
    </PrimaryButton>
  </div>
)

export type LoginPublishContentItemProps = { loginHref: Href }
export const LoginPublishContentItem: FC<LoginPublishContentItemProps> = ({ loginHref }) => (
  <Link href={loginHref}>
    <PrimaryButton className="" color="card">
      <ArrowForward />
      <div className="content">
        <div className="title">{t('login')}</div>
        <div className="subtitle">{t('enter_your_account')}</div>
      </div>
    </PrimaryButton>
  </Link>
)

export type SignUpPublishContentItemProps = { signUpHref: Href }
export const SignUpPublishContentItem: FC<SignUpPublishContentItemProps> = ({ signUpHref }) => (
  <Link href={signUpHref}>
    <PrimaryButton className="" color="card">
      <StreamOutlined />
      <div className="content">
        <div className="title">{t('join_noe')}</div>
        <div className="subtitle">{t('create_account')}</div>
      </div>
    </PrimaryButton>
  </Link>
)
