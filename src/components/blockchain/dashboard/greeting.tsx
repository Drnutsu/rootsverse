import { Card } from '@components/base/card'

export function Greeting() {
  return (
    <Card className='self-start dash-col max-w-lg flex-shrink-0'>
      <span className='text-lg'>🤵🏻‍♂ ️ Chavis (assistance) </span>
      <span className='text-sm'>
        hello, my name is chavis, I'm your assistance. I will alert you if I
        notice some Impermanent loss. Let's see your report today.
      </span>
    </Card>
  )
}
