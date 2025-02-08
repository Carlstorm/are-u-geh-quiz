import Button from './inputs/Button'
import style from './intro.module.css'
import IntroHeader from './IntroHeader'

export default function Intro({AddProgress}) {
    return (
        <div className={style.intro}>
            <IntroHeader />
            <Button OnClick={AddProgress}>
                BEGIN
            </Button>
        </div>
    )
}