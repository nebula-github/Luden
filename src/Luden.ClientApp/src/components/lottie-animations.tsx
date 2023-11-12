import { Player, Controls } from '@lottiefiles/react-lottie-player'
import ErroPage from '@/assets/animations/error-page.json'

const ErrorPageAnimation = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <Player autoplay={true} src={ErroPage} loop={false} keepLastFrame={true}>
        <Controls visible={false} />
      </Player>
    </div>
  )
}

export { ErrorPageAnimation }