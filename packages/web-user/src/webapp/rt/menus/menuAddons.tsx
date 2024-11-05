import { AddToCollectionButtonByResourceContextContainer as addResourceToCollectionButton } from '@moodlenet/collection/webapp'
import type { AddonItemNoKey } from '@moodlenet/component-library'
import type { AddonsByUserRule } from '../lib/AddonsByUserRule.js'
import { LoginButtonContainer, SignupButtonContainer } from '../page/access/AccessContainers.js'
import { AdminUsersContainer, AdminUsersMenu } from '../page/admin/AdminUsersContainer.js'
import { AddMenuContainer } from './AddMenuContainer.js'
import { AvatarMenuContainer } from './AvatarMenuContainer.js'
import { HelpMenuContainer } from './HelpMenuContainer.js'
import { LanguageMenuContainer } from './LanguageMenuContainer.js'

export const menuHeaderButtonsItems = {
  loginButton: { Item: LoginButtonContainer },
  signupButton: { Item: SignupButtonContainer },
  avatarMenu: { Item: AvatarMenuContainer },
  addMenu: { Item: AddMenuContainer },
  languageMenu: { Item: LanguageMenuContainer },
  helpButton: { Item: HelpMenuContainer },
}
const { loginButton, signupButton, avatarMenu, addMenu, languageMenu, helpButton } =
  menuHeaderButtonsItems
export const menuHeaderButtonsAuthAddons: AddonsByUserRule<AddonItemNoKey> = {
  guest: { languageMenu, loginButton, signupButton, helpButton },
  auth: { languageMenu, addMenu, avatarMenu, helpButton },
  root: { addMenu: undefined, avatarMenu, helpButton },
}

export const menuAddonsDefaultSetting = {
  default: { Content: AdminUsersContainer, Menu: AdminUsersMenu },
}

export const resourcePageAddonsByAuth: AddonsByUserRule<AddonItemNoKey> = {
  guest: { addToCollectionButton: undefined },
  root: { addToCollectionButton: undefined },
  auth: { addToCollectionButton: { Item: addResourceToCollectionButton } },
}
