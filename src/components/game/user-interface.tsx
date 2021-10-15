import { useCallback, useContext } from 'react'

import { StageContext } from '@hooks/provider/stageProvider'
import { CreateBuildingModal } from './modal'

export default function UserInterface() {
  const { isCreateMode, cancelCreateBuilding } = useContext(StageContext)
  const handleOnClose = useCallback(() => {
    cancelCreateBuilding()
  }, [])
  return (
    <div>
      <CreateBuildingModal visible={isCreateMode} onCancel={handleOnClose} />
    </div>
  )
}
