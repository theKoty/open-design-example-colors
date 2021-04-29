import { useSdkContext } from '../src/stores/sdk-store'

export default function IndexPage() {
  const { sdk } = useSdkContext()

  return (
    <div className='container'>
      <h1 className='headline-1'>Homepage</h1>
    </div>
  )
}
