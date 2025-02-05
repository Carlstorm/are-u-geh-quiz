import style from './intro.module.css'

export default function Intro({setState, state}) {
    return (
        <div className={style.intro}>
            <p className={style.intro_text}>Are you gay</p>
            <button className={style.intro_text} onClick={() => setState(state+1)}>no</button>
            <button className={style.intro_text}>yes</button>
        </div>
    )
}