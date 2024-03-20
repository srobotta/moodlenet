import { t } from '@moodlenet/core/i18n'
import level1Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-1.png'
import level10Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-10.png'
import level2Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-2.png'
import level3Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-3.png'
import level4Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-4.png'
import level5Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-5.png'
import level6Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-6.png'
import level7Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-7.png'
import level8Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-8.png'
import level9Avatar from '../../webapp/ui/assets/img/userLevelAvatar/level-9.png'
import { pointSystem as P } from './point-system.mjs'

export type UserLevelDetails = {
  minPoints: number
  maxPoints: number
  avatar: string
  title: string
  level: number
}

export const userLevels: UserLevelDetails[] = [
  { minPoints: 0, maxPoints: 14, title: t('ambitious_seed'), level: 1, avatar: level1Avatar },
  { minPoints: 15, maxPoints: 74, title: t('determined_sprout'), level: 2, avatar: level2Avatar },
  { minPoints: 75, maxPoints: 249, title: t('rooted_learner'), level: 3, avatar: level3Avatar },
  { minPoints: 250, maxPoints: 499, title: t('seedling_scholar'), level: 4, avatar: level4Avatar },
  { minPoints: 500, maxPoints: 1499, title: t('steadily_grower'), level: 5, avatar: level5Avatar },
  { minPoints: 1500, maxPoints: 4999, title: t('photosynthesist'), level: 6, avatar: level6Avatar },
  { minPoints: 5000, maxPoints: 14999, title: t('sky_reacher'), level: 7, avatar: level7Avatar },
  {
    minPoints: 15000,
    maxPoints: 49999,
    title: t('firmly_grounded'),
    level: 8,
    avatar: level8Avatar,
  },
  {
    minPoints: 50000,
    maxPoints: 99999,
    title: t('versatile_canopy'),
    level: 9,
    avatar: level9Avatar,
  },
  {
    minPoints: 100000,
    maxPoints: 1000000,
    title: t('dazzling biome'),
    level: 10,
    avatar: level10Avatar,
  },
]

export const actionsAndPointsObtained: { action: string; points: number; abbr?: string }[] = [
  {
    action: t('create_account'),
    points: P.engagement.profile.welcome.points,
    abbr: t('congrats_you_already_did_it'),
  },
  {
    action: t('complete_profile'),
    points: 5 * P.engagement.profile.perMetaDataField.points,
    abbr: t('get_a_point_for_each_detail'),
  },
  {
    action: t('set_up_interests'),
    points: P.engagement.profile.interestsSet.points,
    abbr: t('get_a_point_interests'),
  },
  { action: t('publish_collection'), points: P.contribution.collection.published.toCreator.points },
  {
    action: t('add_someone_elses_resource_in_published_collection'),
    points: P.contribution.collection.listCuration.toCollectionCreator.points,
  },
  {
    action: t('your_resource_added_in_a_collection'),
    points: P.contribution.collection.listCuration.toResourceCreator.points,
  },
  { action: t('publish_resource'), points: P.contribution.resource.published.toCreator.points },
  {
    action: t('follow_a_user_a_collection_or_a_subject'),
    points: P.engagement.follow.followerProfile.points,
  },
  { action: t('new_follower'), points: P.engagement.follow.followedProfile.points },
  {
    action: t('new_follower_on_your_collection'),
    points: P.engagement.follow.entityCreatorProfile.points,
  },
  { action: t('new_like_on_your_resource'), points: P.curation.like.toTargetEntityCreator.points },
  { action: t('like_a_resource'), points: P.curation.like.toActor.points },
  {
    action: t('new_bookmark_on_your_profile_or_contribution'),
    points: P.curation.bookmark.toTargetEntityCreator.points,
  },
  { action: t('bookmark_a_contribution_or_auser'), points: P.curation.bookmark.toActor.points },
  { action: t('become_a_publisher'), points: P.engagement.profile.publisher.points },
]

export const getUserLevelDetails = (points: number): UserLevelDetails => {
  for (const level of userLevels) {
    if (points >= level.minPoints && points <= level.maxPoints) {
      return level
    }
  }

  return (
    userLevels[userLevels.length - 1] ?? {
      minPoints: 0,
      maxPoints: 14,
      title: t('ambitious_seed'),
      level: 1,
      avatar: level1Avatar,
    }
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> c01322079 (Adding my latestes update to new architecture and squashing previous commits)
