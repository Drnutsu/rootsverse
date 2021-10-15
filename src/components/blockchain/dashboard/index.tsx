import { AssetsReport } from './assets-report'
import { Greeting } from './greeting'
import { FarmReport } from './farms-report'

export function Dashboard() {
  return (
    <div className='flex flex-col px-4'>
      <Greeting />
      <div className='flex flex-row gap-6'>
        <FarmReport />
        <AssetsReport />
      </div>
    </div>
  )
}
