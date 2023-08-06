import { AvaCard } from '../../../assets/icons/ava-card.tsx'
import Camera from '../../../assets/icons/camera.tsx'
import { Edit } from '../../../assets/icons/edit.tsx'
import { Logout } from '../../../assets/icons/logout.tsx'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Typography } from '../../ui/typography'

import s from './personal-information.module.scss'

type Props = {
  email: string
  //avatar: string
  name: string
  onLogout: () => void
  onAvatarChange: (newAvatar: string) => void
  onNameChange: (newName: string) => void
}
export const PersonalInformation = ({
  //avatar,
  email,
  name,
  onAvatarChange,
  onNameChange,
  onLogout,
}: Props) => {
  const handleAvatarChanged = () => {
    onAvatarChange('new Avatar')
  }
  const handleNameChanged = () => {
    onNameChange('New name')
  }
  const handleLogout = () => {
    onLogout()
  }

  return (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Personal Information
      </Typography>
      <div className={s.photoContainer}>
        <div>
          <AvaCard />
          {/*<img src={avatar} alt={'avatar'} />*/}
          <button className={s.editAvatarButton} onClick={handleAvatarChanged}>
            <Camera />
          </button>
        </div>
      </div>
      <div className={s.nameWithEditButton}>
        <Typography variant="H1" className={s.name}>
          {name}
        </Typography>
        <button className={s.editNameButton} onClick={handleNameChanged}>
          <Edit />
        </button>
      </div>
      <Typography variant="Body2" className={s.email}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        {email}
      </Typography>
      <div className={s.buttonContainer}>
        <Button variant={'secondary'} onClick={handleLogout}>
          <Logout />
          Sign Out
        </Button>
      </div>
    </Card>
  )
}
