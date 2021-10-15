import { MouseEventHandler } from 'react'

import Button from '@components/base/button'

export interface CreateBuildingProps {
  onCreate: MouseEventHandler<HTMLButtonElement>
  onHide: () => void
}

export function CreateBuildingContent({
  onCreate,
  onHide
}: CreateBuildingProps) {
  return (
    <div className='w-full stats'>
      <div className='stat place-items-center place-content-center self-center flex flex-col'>
        <div className='stat-title'>
          Create the building on this vacant land with your assets.
        </div>
        {/* <div className='stat-value'>$89,400</div> */}
        <div className='stat-actions'>
          <button onClick={onCreate} className='btn btn-success'>
            Start Building Here!
          </button>
        </div>
      </div>
      <Button className='btn-circle btn-sm' ghost onClick={onHide}>
        X
      </Button>
    </div>
  )
}
