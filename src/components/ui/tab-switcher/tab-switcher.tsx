import { FC } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import { Typography } from '../typography'

import s from './tab-switcher.module.scss'

type TabSwitcherType = {
  options?: any[]
  onChangeCallback: (value: any) => void
}
export const TabSwitcher: FC<TabSwitcherType> = ({ options, onChangeCallback }) => {
  return (
    <Tabs.Root className={s.tabsRoot} onValueChange={onChangeCallback}>
      <Tabs.List className={s.tabsList}>
        {options?.map((tab, index) => {
          return (
            <Tabs.Trigger
              disabled={tab.isDisabled}
              className={s.tabsTrigger}
              value={tab.value}
              key={index}
            >
              <Typography className={'Body1'}>{tab.name}</Typography>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
